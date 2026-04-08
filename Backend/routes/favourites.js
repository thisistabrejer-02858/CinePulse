const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const movie = req.body;

    const user = await User.findById(userId);

    const exists = user.favourites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (!exists) {
      user.favourites.push(movie);
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
 const imdbID = String(req.params.id); 
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter(
      (movie) => movie.imdbID !== imdbID
    );

    await user.save();

    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;