const API_KEY = "c2a8a56d549f083ddae49369202efe93";

const requests = {
  getTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
  getAiringToday: ` https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`,
  getNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
  getPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  getUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
};



export default requests;