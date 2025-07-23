import React from "react";
import { useEffect, useState } from "react";
import {instance} from "./axios";
import Nav from "./Nav";
import Movie from "./Movie";
import "./Search.css";
import { useLocation } from "react-router-dom";

function Search({isLargeRow}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  const baseURL = "https://image.tmdb.org/t/p/original";
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    if (query) {
      setSearchTerm(query);
      fetchSearchResult(query);
    }
  }, [location.search]);

  const fetchSearchResult = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await instance.get(
        `/search/movie?query=${query}`
        
      );
      console.log(response);

      const data = await response.data;
      console.log("this is the data:", data);
      const results = response.data.results || [];
      setSearchResults(results);
      //setSearchResults(Array.isArray(data) ? data : [response.data]);
    } catch (err) {
      console.error("Fetching search results failed :", err);
      setError("Failed to load search results, please try again");
    }
  };
  useEffect(() => {
    if (!searchTerm.trim()) return;
    const handler = setTimeout(() => {
      fetchSearchResult(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="search">
      <Nav />
      
        {searchResults.map((movie, index) => (
          <div key={movie.id ?? index} className="search_poster">
            <Movie
              movieid={movie.id}
              isLargeRow={isLargeRow}
              baseURL={baseURL}
              posterPath={movie.poster_path}
              backdropPath={movie.backdrop_path}
              movieName={movie.name||movie.title}
              movie={movie}
            />
          </div>
        ))}
      
    </div>
  );
}

export default Search;
