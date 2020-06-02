using System.Security.Cryptography;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly DatingAppContext _context;

        public AuthenticationRepository(DatingAppContext context)
        {
            _context = context;
        }
        public async Task<UserModel> Register(UserModel user, string password)
        {
            var (passwordHash, passwordSalt) = CreatePassWordHash(password);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.UserModels.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<UserModel> Login(string username, string password)
        {
            var user = await _context.UserModels.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return null;
            }

            return !ComparePasswordHash(password, user.PasswordSalt, user.PasswordHash) ? null : user;
        }

        private static bool ComparePasswordHash(string password, byte[] userPasswordSalt, byte[] userPasswordHash)
        {
            using var hmac = new HMACSHA512(userPasswordSalt);
            var passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            return passHash == userPasswordHash;
        }

        public async Task<bool> UserExists(string username, string email)
        {
            return (await _context.UserModels.AnyAsync(u => u.Username == username));
        }

        private static (byte[], byte[]) CreatePassWordHash(string password)
        {
            using var hmac = new HMACSHA512();
            var salt = hmac.Key;
            var passHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            return (passHash, salt);
        }
    }
}
