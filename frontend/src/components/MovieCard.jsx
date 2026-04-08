import React from 'react'
import '../css/MovieCard.css'
import { fetchWithAuth } from '../services/api'
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, favourites = [], refreshFavourites }) {

  const navigate = useNavigate();

  // ✅ Normalize ID
  const movieId = movie.id || movie.imdbID;

  // ✅ Favourite check
  const isFav = favourites.some(
    fav => String(fav.id) === String(movieId)
  );

  const onFavoriteClick = async (e) => {
    e.preventDefault();

    if (isFav) {
      await fetchWithAuth(`/favourites/${String(movieId)}`, {
        method: "DELETE"
      });
    } else {
      await fetchWithAuth("/favourites/add", {
        method: "POST",
        body: JSON.stringify({
          imdbID: String(movieId),
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          release_date: movie.release_date
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
      onClick={() => navigate(`/movie/${movieId}`)} // ✅ FIXED
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
              e.stopPropagation(); // ✅ prevent navigation
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