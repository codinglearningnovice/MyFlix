using Microsoft.AspNetCore.Identity;
using MyFlixBackendc_.Data;
using MyFlixBackendc_.Dtos;
using MyFlixBackendc_.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace MyFlixBackendc_.Services
{
    public class AuthService(FavoriteMovieDbContext dbcontext, IConfiguration configuration) : IAuthService
    {
        

        public async Task<User?> RegisterAsync(UserDto request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return null;
            }

            if (await dbcontext.Users.AnyAsync(u => u.Username == request.Username)) 
            {
                return null;
            }

            var newUser = new User(); // Renamed variable to avoid conflict  
            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(newUser, request.Password);
            newUser.Username = request.Username;
            newUser.HashedPassword = hashedPassword;

            dbcontext.Users.Add(newUser);
            await dbcontext.SaveChangesAsync();

            return newUser;
        }



        public async Task<TokenResponseDto?> LoginAsync(UserDto request) // Renamed parameter to avoid conflict  
        {
            var user = await dbcontext.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username); // Renamed variable to avoid conflict  

            if (user == null)
            {
                return null; // Return null if user is not found  
            }

            var passwordVerificationResult = new PasswordHasher<User>()
               .VerifyHashedPassword(user, user.HashedPassword, request.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                return null; // Return null for invalid credentials  
            }

            TokenResponseDto response = await CreateTokenResponse(user);
            return response;
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
           var AccessToken = CreateToken(user);
            var RefreshToken = await GenerateAndSaveRefreshToken(user);
            var response = new TokenResponseDto
            {
                AccessToken = AccessToken,
                RefreshToken = RefreshToken
            };
            /*var response = new TokenResponseDto
            {
                AccessToken = CreateToken(user),
                RefreshToken = await GenerateAndSaveRefreshToken(user)
            };*/
            return response;
        }
        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
            if ( user is null)
            {
                return null;// Return null if validation fails
            }
            return await CreateTokenResponse(user); // Create a new token response with the validated user
        }
        public async Task<User?> ValidateRefreshTokenAsync(Guid userId,string refreshtoken)
        {
            var user = await dbcontext.Users
                .FindAsync(userId);
            if (user is null || user.RefreshToken != refreshtoken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null; 
            }
            
            return user; 
        }
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
            
        } 

        private async Task<string> GenerateAndSaveRefreshToken(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); // Set expiry time for the refresh token
            await dbcontext.SaveChangesAsync();
            return refreshToken;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim> 
            { new Claim(ClaimTypes.Name, user.Username)
            , new Claim(ClaimTypes.NameIdentifier, user.ID.ToString())
            , new Claim(ClaimTypes.Role, user.Role) 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("Token")!)); // Use _configuration instead of Configuration
            Console.WriteLine($"Key: {Encoding.UTF8.GetString(key.Key)}"); // Log the key for debugging
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        
    }
}
