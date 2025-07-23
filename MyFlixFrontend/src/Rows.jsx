import React, { useEffect, useState } from "react";
import {instance} from "./axios";
import "./Row.css";
import Movie from "./Movie";
import YouTube from "react-youtube";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  //const [trailerUrl, setTrailerUrl] = useState();
  //const [favourite, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const request = await instance.get(fetchUrl);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchMovies();
  }, [fetchUrl]);

  /*const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },*/
  

  /*const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    }else{
      movieTrailer(movie?.name ||movie?.title || "")
      .then(url =>{
        const urlParams = new URLSearchParams(new URL (url).search);
        setTrailerUrl(urlParams.get("v"));
      }).catch(error => console.log(error));
    }
  }
  
  const handleFavorite = (e, movieId) =>{
    e.stopPropagation();
    
    const isfav = favourite.includes(movieId);
    if (isfav) {
      
          setFavorites((prev) => prev.filter((id) => id !== movieId));

      // API call to remove from DB
      fetch(`/api/favorites/${movieId}`, {
        method: "DELETE",
      });

      alert("Removed from Favorites");
    } else {
    
    setFavoritesList((prev) => [...prev, movieId]);

    fetch(`/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId }),
    });
    alert("Added to Favorites");
  }*/

  return (
    <div className="row">
      <h2 className="tittle">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <div key={movie.id} className="Poster">
            <Movie
              movieid={movie.id}
              isLargeRow={isLargeRow}
              baseURL={baseURL}
              posterPath={movie.poster_path}
              backdropPath={movie.backdrop_path}
              movieName={movie.name}
              movie={movie}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
