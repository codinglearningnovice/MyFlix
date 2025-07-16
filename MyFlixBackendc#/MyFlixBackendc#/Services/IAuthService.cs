using MyFlixBackendc_.Dtos;
using MyFlixBackendc_.Entities;

namespace MyFlixBackendc_.Services
{
    // Fixing CS0246: Correcting 'Interface' to 'interface'
    // Fixing CS0548: Removing invalid property declaration and defining a method instead
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto user);
        Task<TokenResponseDto?> LoginAsync(UserDto user);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenDto request);

    }
}
