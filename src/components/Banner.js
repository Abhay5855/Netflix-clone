import React from "react";
import axios from "../axios";
import requests from "../requests";
import { useEffect, useState } from "react";
import './Banner.css'

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // fetch the api request for only one
      const request = await axios.get(requests.fetchNetflixOriginals);

      // To show only one image we use math.random
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }

    fetchData();
  }, []);

  // console.log(movie);

  return (
    <header
    className="banner"
      style={{
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,

        backgroundPosition: "center center",

        backgroundSize: "cover",

        backgroundRepeat:"no-repeat",

        opacity:"0.6",
      }}
    >
      <div className="banner__details">

      <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

      

     <div className="banner__buttons">
        <button>Play</button>
        <button>My List</button>
     </div>
           
          <div >
          <p className="banner__overview">{movie.overview}</p>
          </div>
          

          </div>
      
    </header>
  );
}

export default Banner;
