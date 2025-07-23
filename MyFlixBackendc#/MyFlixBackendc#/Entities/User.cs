namespace MyFlixBackendc_.Entities
{
    public class User
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string HashedPassword { get; set; }
        public string Role { get; set; } = "User";
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; } 

    }
}
