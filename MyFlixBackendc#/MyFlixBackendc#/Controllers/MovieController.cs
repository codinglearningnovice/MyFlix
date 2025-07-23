using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFlixBackendc_.Data;
using MyFlixBackendc_.Entities;


namespace MyFlixBackendc_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly FavoriteMovieDbContext dbcontext;

        public MovieController(FavoriteMovieDbContext dbContext)
        {
            this.dbcontext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavouriteMovie()
        {
            try
            {
                var movieIds = await dbcontext.MovieIDs.ToListAsync();
                var favouriteMovies = await MovieService.GetFavouriteMoviesByIDs(movieIds.Select(m => m.MovieId.ToString()).ToList());

                return Ok(favouriteMovies);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddFavouriteMovie([FromBody] MovieID movie )
        {    
            Console.WriteLine("Adding movie to favourites: " + movie);
            if (movie == null)
            {
                return BadRequest("Invalid movie ID.");
            }

            try
            {
                
                var exists = await dbcontext.MovieIDs.AnyAsync(m => m.MovieId == movie.MovieId);
                if (exists)
                {
                    return Conflict("Movie already exists in favourites.");
                }

                dbcontext.MovieIDs.Add(movie);
                await dbcontext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetFavouriteMovie), new { id = movie.ID }, movie);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }


        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteFavouriteMovie(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid movie ID.");
            }
            try
            {
                var movie = await dbcontext.MovieIDs.FirstOrDefaultAsync(m => m.MovieId == id);
                if (movie == null)
                {
                    return NotFound("Movie not found in favourites.");
                }
                dbcontext.MovieIDs.Remove(movie);
                await dbcontext.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }
        }

    }
}
