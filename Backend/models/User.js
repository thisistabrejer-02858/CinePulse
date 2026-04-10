const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: [
    {
      id: String,
      imdbID: String,
      title: String,
      poster: String,
      release_date: String,
      vote_average: Number,
      year: String,
    }
  ]
});

module.exports = mongoose.model("User", userSchema);