const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pavansharma1226:nWw1nPXroFUrSGoy@movie.e8vz7h5.mongodb.net/?retryWrites=true&w=majority&appName=Movie");
    console.log(`Connected to MongoDB successfully`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`.bgRed.white);
  }
};


module.exports = connectDB;
