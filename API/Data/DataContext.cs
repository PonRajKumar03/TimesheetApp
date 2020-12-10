using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<Timesheet> Timesheet { get; set; }
        public DbSet<Email> EmailTbl { get; set; }
        public DbSet<UsrEmail> UsrEmail { get; set; }
        public DbSet<Client> ClientTable { get; set; }
    }
}