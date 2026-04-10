import { data } from "react-router-dom";


const API_KEY = "29de4a1bad3afd3ae282dfa3c30ac373";
const BASE_URL = "https://api.themoviedb.org/3";

const BACKEND_URL = "https://cinepulse-u77p.onrender.com/api";

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

export const loginUser = async (email, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  localStorage.setItem("token", data.token);

  return data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

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

  console.log(url); 

  const response = await fetch(url);
  const data = await response.json();

  return data.results || [];
};

export const searchMovies = async (query) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    
    console.log(url); 

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

  console.log(url); 

  const response = await fetch(url);
  const data = await response.json();

  return data;
};