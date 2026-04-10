import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { searchMovies, getPopularMovies, } from '../services/api'
import { fetchWithAuth } from '../services/api'
import '../css/Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [favourites, setFavourites] = useState([])

  const loadFavourites = async () => {
    const res = await fetchWithAuth("/favourites")
    const data = await res.json()
    console.log(data);

    const formatted = data.map(movie => ({
       id: String(movie.id || movie.imdbID),
       title: movie.title,
       poster_path: (movie.poster || "").replace("https://image.tmdb.org/t/p/w500", "")
        }))

    setFavourites(formatted)
  }

  const loadPopularMovies = async () => {
    setLoading(true)
    const data = await getPopularMovies()
    setMovies(data)
    setLoading(false)
  }

  useEffect(() => {
    loadPopularMovies()
    loadFavourites()
  }, [])

    useEffect(() => {
    const resetHomeFeed = () => {
      setSearchQuery('')
      loadPopularMovies()
    }

    window.addEventListener('home:reset', resetHomeFeed)
    return () => window.removeEventListener('home:reset', resetHomeFeed)
  }, [])



  const onSearchSubmit = async (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      loadPopularMovies()
      return
    }

    setLoading(true)
    const results = await searchMovies(searchQuery)
    setMovies(results)
    setLoading(false)
  }

  return (
    <div className="home">

      {/* HERO */}
      <div className="hero">
        <h1>Discover Movies</h1>
        <p>Explore trending, popular and your favourite movies</p>

        <form onSubmit={onSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* 🎬 MOVIES */}
      <div className="movies-section">
        <h2>Popular Movies</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard
                key={movie.id  || movie.imdbID}
                movie={movie}
                favourites={favourites}
                refreshFavourites={loadFavourites}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home