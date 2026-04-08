import { data } from "react-router-dom";


const API_KEY = "29de4a1bad3afd3ae282dfa3c30ac373";
const BASE_URL = "https://api.themoviedb.org/3";

const BACKEND_URL = "http://localhost:5000/api";

export const registerUser = async (email, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// ✅ LOGIN
export const loginUser = async (email, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  // 🔥 SAVE TOKEN HERE
  localStorage.setItem("token", data.token);

  return data;
};

// ✅ GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ GENERIC AUTH FETCH (VERY IMPORTANT)
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();

  return fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
};
export const getPopularMovies = async () => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  console.log(url); // DEBUG

  const response = await fetch(url);
  const data = await response.json();

  return data.results || [];
};

export const searchMovies = async (query) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    
    console.log(url); // DEBUG

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// ✅ GET MOVIE DETAILS
export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

  console.log(url); // DEBUG

  const response = await fetch(url);
  const data = await response.json();

  return data;
};