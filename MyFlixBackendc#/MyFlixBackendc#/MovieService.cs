namespace MyFlixBackendc_
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Threading.Tasks;
   
    using Newtonsoft.Json;

    public class MovieService
    {
        // Load environment variables from .env file in a static constructor
        

        private static readonly string apiKey = Environment.GetEnvironmentVariable("API_KEY");

        public static async Task<List<object>> GetFavouriteMoviesByIDs(List<string> ids)
        {
            if (string.IsNullOrEmpty(apiKey))
                throw new Exception("API Key not found");

            var results = new List<object>();
            using (var client = new HttpClient())
            {
                foreach (var id in ids)
                {
                    var url = $"https://api.themoviedb.org/3/movie/{id}?api_key={apiKey}";
                    var response = await client.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonString = await response.Content.ReadAsStringAsync();
                        var movieData = JsonConvert.DeserializeObject<object>(jsonString);
                        results.Add(movieData);
                    }
                }
            }

            return results;
        }
    }

}
