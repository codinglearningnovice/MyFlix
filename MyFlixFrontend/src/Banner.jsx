import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "./request";
import "./Banner.css"
import {useNavigate}  from "react-router";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      const request = await axios.get(requests.getUpcoming);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchMovie();
  }, []);

  function truncate(str,n) {
    return str?.length > n? str.substr(0,n-1) + "..." : str;
  }

  function myList() {
    const navigate = useNavigate(); 
    navigate("/mylist");
   
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button" onClick={()=>{myList}}>My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadebutton" />
    </header>
  );
}

export default Banner;
