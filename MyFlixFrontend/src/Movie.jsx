import React from 'react'
import { useState } from 'react';
import movieTrailer from 'movie-trailer'; 
import YouTube from "react-youtube";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {backendUrl} from './axios';
 

function Movie({movieid, isLargeRow,baseURL,posterPath,backdropPath,movieName,movie }) {

const [favourite, setFavorites] = useState([]); 
const [trailerUrl, setTrailerUrl] = useState();



const opts = {
    height: "390",
    width: "100%",
    
    playerVars: {
      autoplay: 1,
    },
    };
const handleClick = (movie) => {
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

   const handleFavorite = async(e, movieId) => {
     e.stopPropagation();
     const movieIdStr = String(movieId);
     const isfav = favourite.includes(movieIdStr);
     if (isfav) {
       setFavorites((prev) => prev.filter((id) => id !== movieIdStr));

       // API call to remove from DB
        await backendUrl.delete(`/movie/${movieIdStr}`, {
          headers: {
            
            "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
          },
          data: { username: localStorage.getItem("username") }
        });

       alert("Removed from Favorites");
     } else {
       
       setFavorites((prev) => [...prev, movieIdStr]);
       console.log("Adding movie to favorites:", movieIdStr,typeof movieIdStr);

       const response = await backendUrl.post(`/movie`, {movieId: movieIdStr, username: localStorage.getItem("username")},{headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
       }})
       if (response.status === 200) {
         console.log("Movie added to favorites successfully");
       }


     ;

      
       alert("Added to Favorites");
     }
   };


  


  return (
    <div className="moviePoster">
      <img
        key={movieid}
        onClick={() => handleClick(movie)}
        className={`row_poster ${isLargeRow && "row_posterlarge"}`}
        src={`${baseURL}${isLargeRow ? posterPath : backdropPath}`}
        alt={movieName}
      />
      <button
        onClick={(e) => handleFavorite(e, movieid)}
        className="fav_button"
      >
        {favourite.includes(String(movieid)) ? (
          <FavoriteOutlinedIcon />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </button>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );

}

export default Movie