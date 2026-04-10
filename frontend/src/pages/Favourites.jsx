import React, { useEffect, useState } from 'react'
import '../css/Favourites.css'
import { fetchWithAuth } from '../services/api'
import MovieCard from '../components/MovieCard'

function Favourite() {
  const [favourites, setFavourites] = useState([])

  const loadFavourites = async () => {
    const res = await fetchWithAuth("/favourites")
    const data = await res.json()
    const safeData = Array.isArray(data) ? data : []

    const formatted = safeData.map(movie => ({
       id: String(movie.id || movie.imdbID),
      title: movie.title,
       poster_path: (movie.poster || "").replace("https://image.tmdb.org/t/p/w500", ""),
      vote_average: movie.vote_average || 0,
      release_date: movie.release_date || ""
    }))

    setFavourites(formatted)
  }
  useEffect(() => {
    loadFavourites()
  }, [])

  if (favourites.length > 0) {
    return (
      <div className="favourites-container">
        <h2>Your Favourites</h2><br />
        <hr />
        <div className="favourites-grid">
          {favourites.map((movie) => (
            <MovieCard 
              key={movie.id || movie.imdbID}
               movie={movie} 
              favourites={favourites} 
              refreshFavourites={loadFavourites}
            />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="favourites-empty">
        <h2>No favourite movies yet!</h2>
        <p>Start adding some movies to your favourites list.</p>
      </div>
    )
  }
}

export default Favourite