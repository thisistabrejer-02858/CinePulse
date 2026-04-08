import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/MovieDetails.css";
import { getMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
  const loadMovie = async () => {
    const data = await getMovieDetails(id);
    setMovie(data);
  };

  loadMovie();
}, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="details-page">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="details-info">
        <h2>{movie.title}</h2>
        <p><strong>Rating:</strong> {movie.vote_average}</p><br/>
        <p><strong>Release:</strong> {movie.release_date}</p><br />
        <p><strong>Overview:-</strong> <br/>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;