using System.ComponentModel.DataAnnotations;

namespace MyFlixBackendc_.Entities
{
    public class MovieID
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        [StringLength(100)]
        public string MovieId { get; set; }

        [Required]
        [StringLength(100)]
        public string Username{ get; set; } 

    }
}
