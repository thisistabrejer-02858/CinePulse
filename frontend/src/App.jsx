import './css/App.css'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import Register from './pages/Register'
import Login from './pages/login'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import NavBar from './components/NavBar'
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
   
    <AuthProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App