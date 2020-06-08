using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }

        public DbSet<UserModel> UserModels { get; set; }

        public DbSet<Photo> Photos { get; set; }

    }
}
