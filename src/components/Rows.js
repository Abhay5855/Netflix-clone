import React from "react";
import "./Rows.css";
import axios from "../axios";
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

import { useState, useEffect } from "react";

const base_url = "https://image.tmdb.org/t/p/original/";

function Rows({ title, fetchUrl, isImageBigger }) {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl]);


  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },

    };

     console.log(movies);


    const handleClick = (movie) => {
      if(trailerUrl){
        setTrailerUrl('')
      }else {
        movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error))
      }
    }
  return (
    <div className="row">
      <h2 className="row__heading">{title}</h2>
      <div className="row__poster">
        {movies.map((movie) => {
          return (
            <>
            <img
              onClick={()=>handleClick(movie)}
              className={`row__images ${isImageBigger && "row__imagesLarger"}`}
              key={movie.id}
              
              src={`${base_url}${
                isImageBigger ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            ></img>

            <p className="naming">{movie.name}</p>

            </>
            
          );
        })}
      </div>

      { trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Rows;
