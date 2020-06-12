﻿using System;
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
            var users = _context.UserModels.Include(u => u.Photos).AsQueryable();

            users = users.Where(u => u.Id != queryParameters.UserId);

            users = users.Where(u => u.Gender == queryParameters.Gender);

            var minDob = DateTime.Today.AddYears(-queryParameters.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-queryParameters.MinAge);

            users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

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
    }
}
