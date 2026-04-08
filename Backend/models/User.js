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
      title: String,
      poster: String,
      year: String,
    }
  ]
});

module.exports = mongoose.model("User", userSchema);