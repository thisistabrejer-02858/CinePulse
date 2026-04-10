import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../css/NavBar.css'

function NavBar() {
  const { user, logout } = useAuth()
  const resetHomeIfNeeded = () => window.dispatchEvent(new Event('home:reset'))

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={resetHomeIfNeeded}>CinePulse</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={resetHomeIfNeeded}>Home</Link>
        <Link to="/favourites" className="nav-link">Favourites</Link>
        
        {!user && (
  <Link to="/register" className="nav-link">Register</Link>
)}

        {user ? (
          <button onClick={logout} className="nav-link">Logout</button>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar