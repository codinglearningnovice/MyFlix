namespace MyFlixBackendc_.Dtos
{
    public class UserDto
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string Password { get; set; }
        
    }
}
