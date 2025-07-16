namespace MyFlixBackendc_.Dtos
{
    public class GetMoviesDto
    {
        public  Guid ID { get; set; }
        public int MovieID { get; set; }
        public string Poster_path { get; set; }
        public string Backdrop_path { get; set; }
        public string Name { get; set; }
    }
}
