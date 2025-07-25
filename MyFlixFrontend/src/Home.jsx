import React from 'react'
import Row from "./Rows";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "./request";

function Home() {
  return (
    <div>
      <Nav />
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.getTrending} isLargeRow />
      <Row title="Now Playing" fetchUrl={requests.getNowPlaying} />
      <Row title="Popular" fetchUrl={requests.getPopular} />
      <Row title="Upcoming" fetchUrl={requests.getUpcoming} />
      <Row title="Airing Today" fetchUrl={requests.getAiringToday} />
    </div>
  );
}

export default Home