const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/connectDB.js");

connectDB();

const PORT = 8000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const userRoutes = require("./routes/userRoutes.js");
const movieRoutes = require("./routes/movies.js");
app.use(movieRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("This is a Movie Searching API by Amit Kumar");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgBlue.white);
});
