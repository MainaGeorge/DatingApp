using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DatingAppContext _context;

        public DatingRepository(DatingAppContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<UserModel> GetUser(int id)
        {
            return await _context.UserModels.Include(u => u.Photos)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PagedList<UserModel>> GetUsers(QueryParameters queryParameters)
        {
            var users = _context.UserModels.Include(u => u.Photos)
                .OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != queryParameters.UserId);

            users = users.Where(u => u.Gender == queryParameters.Gender);

            if (queryParameters.Likees)
            {
                var userLikees = await GetLikes(queryParameters.UserId, queryParameters.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (queryParameters.Likers)
            {
                var userLikers = await GetLikes(queryParameters.UserId, queryParameters.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            var minDob = DateTime.Today.AddYears(-queryParameters.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-queryParameters.MinAge);

            users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            if (!string.IsNullOrWhiteSpace(queryParameters.OrderBy))
            {
                users = queryParameters.OrderBy switch
                {
                    "created" => users.OrderByDescending(u => u.Created),
                    _ => users.OrderByDescending(u => u.LastActive)
                };
            }

            return await PagedList<UserModel>.CreateAsync(users, queryParameters.PageNumber, queryParameters.PageSize);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(p => p.UserModelId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Like> GetLike(int userId, int likeeId)
        {
            return await _context.Likes.FirstOrDefaultAsync(l => l.LikerId == userId && l.LikeeId == likeeId);
        }

        public async Task<Message> GetMessage(int messageId)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
        }

        public Task<PagedList<Message>> GetMessagesForUser()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            throw new NotImplementedException();
        }

        private async Task<IEnumerable<int>> GetLikes(int userId, bool likers)
        {
            var users = await _context.UserModels.Include(u => u.Likers)
                .Include(u => u.Likees)
                .FirstOrDefaultAsync(u => u.Id == userId);

            return likers ? users.Likers.Where(x => x.LikeeId == userId).Select(x => x.LikerId)
                          : users.Likees.Where(x => x.LikerId == userId).Select(x => x.LikeeId);
        }
    }
}
