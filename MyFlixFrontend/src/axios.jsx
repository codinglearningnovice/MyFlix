import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmE4YTU2ZDU0OWYwODNkZGFlNDkzNjkyMDJlZmU5MyIsIm5iZiI6MTc0MTE3MjU1MS44NzIsInN1YiI6IjY3YzgyZjQ3MGM2NWVlOWFiYWU3MDFhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zKGTXFia_e2FauEOwFmLDPNSlN24NdWyQjNGo4uHOgU ",
  },
});

export const backendUrl = axios.create({
  baseURL: "http://localhost:5268/api",
  headers: {
    "Content-Type": "application/json",
  },
});

