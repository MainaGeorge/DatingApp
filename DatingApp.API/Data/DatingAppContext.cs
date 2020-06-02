using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> options) : base(options) {}

    }
}
