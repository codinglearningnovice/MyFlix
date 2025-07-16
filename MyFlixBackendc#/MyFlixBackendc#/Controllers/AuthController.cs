
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MyFlixBackendc_.Dtos;
using MyFlixBackendc_.Entities;
using MyFlixBackendc_.Services;


namespace MyFlixBackendc_.Controllers
{
    [ApiController] // Move the attribute to the class declaration
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : Controller
    {
       

       

        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var user = await authService.RegisterAsync(request);
            if (user == null)
            {
                return BadRequest("User already exists or invalid data.");
            }
            return Ok(user);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserDto request)
        {
           var token = await authService.LoginAsync(request);
            if (token == null)
            {
                return BadRequest("Invalid credentials.");
            }
            return Ok(token); 
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenDto request)
        {
            var result = await authService.RefreshTokenAsync(request);
            if (result is null || result.AccessToken is null || result.RefreshToken is null)
            {
                return Unauthorized("Invalid refresh token.");
            }
            return Ok(result);
        }
        [Authorize] // Ensure this is imported from Microsoft.AspNetCore.Authorization
        [HttpGet("authenticated")]
        public IActionResult AuthenticatedEndPoints()
        {
            return Ok("Authenticated");
        }
    }
}
