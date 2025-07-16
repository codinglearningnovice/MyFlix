using Microsoft.EntityFrameworkCore;
namespace MyFlixBackendc_.Data
{
    public static class DataExtensions
    {
        public static async Task MigrateDB(this WebApplication app)  
        {
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<FavoriteMovieDbContext>();
                 await dbContext.Database.MigrateAsync(); // Use MigrateAsync instead of Migrate to fix CS4008  
            }
        }
    }
}
