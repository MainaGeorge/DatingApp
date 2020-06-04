using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<UserModel>> GetUsers()
        {
            return await _context.UserModels.Include(u => u.Photos).ToListAsync();
        }
    }
}
