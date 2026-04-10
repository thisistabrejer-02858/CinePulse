const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const movie = req.body;
    const movieId = String(movie.id || movie.imdbID);
    const user = await User.findById(userId);

    const exists = user.favourites.some(
      (fav) => String(fav.id || fav.imdbID) === movieId
    );

      if (!exists) {
      user.favourites.push({
        ...movie,
        id: movieId,
        imdbID: movieId,
      });
await user.save();
    }

    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
  const movieId = String(req.params.id);
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter(
      (movie) => String(movie.id || movie.imdbID) !== movieId
    );

    await user.save();

    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;