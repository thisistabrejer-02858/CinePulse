# 🎬 CinePulse

CinePulse is a modern movie web application that allows users to explore trending films, search for movies, and manage their personal favourites. It provides a smooth and interactive user experience with real-time data from TMDB.

---

## 🚀 Features

* 🔍 Search movies by name
* 📈 View trending and popular movies
* ❤️ Add / remove favourites
* 🔐 User authentication (Login / Register)
* 🎬 Movie details page (overview, rating, release date)
* 💡 Responsive and modern UI
* ⚡ Fast and dynamic updates (React-based SPA)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* CSS (Glassmorphism UI)

### Backend

* Node.js
* Express.js
* MongoDB

### API

* TMDB (The Movie Database API)


## 🔑 Environment Variables

Create a `.env` file in the root:

```
VITE_TMDB_API_KEY=
VITE_BACKEND_URL=http://localhost:5000/api


---

## ▶️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/thisistabrej.er-02858/CinePulse.git
cd cinepulse
```

---

### 2. Install dependencies

```
npm install
```

### 3. Run the app

```
npm run dev
```

### 4. Start backend

```
cd backend
npm install
node server.js
```

## 🧠 Key Concepts Used

* React Hooks (useState, useEffect,useContext)
* Context API for authentication
* REST API integration
* Protected routes
* State synchronization
* Dynamic routing

---

## 👨‍💻 Author

**Tabrej Ansari**
Electronics & Communication Engineering Student

---

## 📌 Note

This project is built for learning and portfolio purposes. It demonstrates full-stack development with modern tools and real-world API integration.

---

⭐ If you like this project, feel free to star the repository!

---

## 🌍 Deployment (Recommended: Render + Vercel)

### 1) Deploy backend on Render

1. Push code to GitHub.
2. In Render, create a **Web Service** from your repo.
3. Configure:
   * Root directory: `Backend`
   * Build command: `npm install`
   * Start command: `node server.js`
4. Add environment variables:
   * `MONGO_URI=...`
   * `JWT_SECRET=...`
   * `PORT` is auto-provided by Render (supported in code).
5. Deploy and copy backend URL, e.g.:
   * `https://cinepulse-api.onrender.com`

### 2) Deploy frontend on Vercel

1. In Vercel, import the same GitHub repo.
2. Configure:
   * Root directory: `frontend`
   * Build command: `npm run build`
   * Output directory: `dist`
3. Add environment variables:
   * `VITE_TMDB_API_KEY=`
   * `VITE_BACKEND_URL=https://cinepulse-api.onrender.com/api`
4. Deploy.

### 3) CORS note

If frontend cannot call backend after deployment, set CORS in backend to allow your Vercel domain in production.
