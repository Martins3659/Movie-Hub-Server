// import dotenv package and configure it
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// imports routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

// import the error file from middleware folder
const error = require("./middlewares/error");
// const movies = require("./models/movies");

// Spins up a new express application
const app = express();

// creating the port
const port = 4000;

app.use(cors());

// A middleware that allows access to the req.body on all request(without this, you can't test on postman)
app.use(express.json());

// middleware for login and register  for authentication router
app.use("/api/auth", authRouter);

// middleware for movie router
app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for errors
app.use(error);

// Start listening on a given port and run the callback function when it does
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Databased connected");

    await app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

// =================================================
// atmartinz3659
// OtF3XpMKiDAfrxc7
// mongodb+srv://atmartinz3659:OtF3XpMKiDAfrxc7@cluster0.27qzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
