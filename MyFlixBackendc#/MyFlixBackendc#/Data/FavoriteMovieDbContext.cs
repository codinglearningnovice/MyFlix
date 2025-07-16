using Microsoft.EntityFrameworkCore;
using MyFlixBackendc_.Entities;

namespace MyFlixBackendc_.Data
{
    public class FavoriteMovieDbContext:DbContext
    {
        public FavoriteMovieDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<MovieID> MovieIDs => Set<MovieID>();
        public DbSet<User> Users => Set<User>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MovieID>()
                .HasIndex(m => m.MovieId)
                .IsUnique();
        }

    }

}
