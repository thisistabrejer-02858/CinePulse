const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const favouriteRoutes = require("./routes/favourites");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working ✅");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/favourites", favouriteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});