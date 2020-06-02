using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;

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

        public Task<UserModel> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UserExists(string username, string email)
        {
            throw new NotImplementedException();
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
