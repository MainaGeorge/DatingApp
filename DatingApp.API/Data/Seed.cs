using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DatingAppContext context)
        {
            if (context.UserModels.Any()) return;

            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");

            var users = JsonConvert.DeserializeObject<List<UserModel>>(userData);

            foreach (var user in users)
            {
                (user.PasswordHash, user.PasswordSalt) = CreatePassWordHash("password");
                user.Username = user.Username.ToLower();

                context.UserModels.Add(user);
            }

            context.SaveChanges();
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
