import React from 'react'
import '../css/MovieCard.css'
import { fetchWithAuth } from '../services/api'
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, favourites = [], refreshFavourites }) {

  const navigate = useNavigate();

 const movieId = String(movie.id || movie.imdbID || "");
  const isFav = favourites.some(
    fav => String(fav.id || fav.imdbID) === String(movieId)
  );

  const onFavoriteClick = async (e) => {
    e.preventDefault();
      if (!movieId) return;

    if (isFav) {
      await fetchWithAuth(`/favourites/${String(movieId)}`, {
        method: "DELETE"
      });
    } else {
      await fetchWithAuth("/favourites/add", {
        method: "POST",
        body: JSON.stringify({
          imdbID: String(movieId),
             id: String(movieId),
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          release_date: movie.release_date,
          vote_average: movie.vote_average
        })
      });
    }

    if (refreshFavourites) {
      await refreshFavourites();
    }

    console.log("Clicked:", movieId, "isFav:", isFav);
  };

  return (
    <div
      className="movie-card"
      onClick={() => movieId && navigate(`/movie/${movieId}`)}
    >
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />

        <div className="movie-overlay">
          <button 
            className={`favourite-btn ${isFav ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); 
              onFavoriteClick(e);
            }}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split('-')[0]}</p>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;