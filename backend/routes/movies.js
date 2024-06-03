const express = require("express");
const router = express.Router();
// const passport = require('passport');
const movieController = require("../controllers/movie_controller");
const PlayList = require("../models/playList");
const axios = require("axios");

// router.post('/playlist',movieController.playlist);

// Create a new playlist
router.post("/create-playlist", async (req, res) => {
  const { playlistName, creater, playlistPrivacy, movies, userId } = req.body;
  const movieToAdd = movies; // Assuming movies is an array and we're adding one movie at a time

  console.log(req.body);

  try {
    console.log("Inside Playlist");

    // Check if a playlist with the same name already exists for the user
    const existingPlaylist = await PlayList.findOne({ playlistName });

    console.log("Existing playlist : ", existingPlaylist);
    console.log(movieToAdd);

    if (existingPlaylist) {
      // Check if the movie is already in the playlist
      const movieExists = existingPlaylist.movies.filter(
        (movie) => movie === movieToAdd
      );

      console.log("Exist : ", movieExists);

      if (movieExists.length != 0) {
        return res
          .status(400)
          .json({ message: "Movie already added to the playlist" });
      }

      console.log("No ");

      // Add the new movie to the existing playlist
      existingPlaylist.movies.push(movieToAdd);
      await existingPlaylist.save();
      console.log(existingPlaylist.movies);

      return res.status(200).json(existingPlaylist);
    }

    // If no existing playlist, create a new one
    const newPlaylist = await PlayList.create({
      playlistName,
      creator: creater, // Assuming username is stored in the user object after authentication
      userId,
      movies,
      playlistPrivacy,
    });

    console.log("Saved ", newPlaylist);
    res.status(200).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Error creating playlist", error });
  }
});

router.get("/playlists/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const playlist = await PlayList.findById(id);
    console.log(playlist);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    console.log("Below Playlist");

    const movieDetails = await Promise.all(
      playlist.movies.map(async (movie) => {
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?t=${movie}&apikey=9e835846`
          );
          console.log(`Movie: ${movie}, Response:`, response.data);
          return response.data;
        } catch (error) {
          console.error(`Error fetching details for movie ${movie}:`, error);
          return null; // Handle errors gracefully
        }
      })
    );

    console.log("Movies Details : ", movieDetails);

    res.status(200).json({ playlist, movieDetails });
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlist", error });
  }
});

router.delete("/delete/:playlistId", async (req, res) => {
  try {
    const { playlistId } = req.params;
    await PlayList.findByIdAndDelete(playlistId);
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting playlist", error });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await PlayList.find({ userId });
    console.log("User playlist : ", playlists);
    res.status(200).json({ playlists });
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists", error });
  }
});

// Fetch all public playlists
router.get("/public-playlists", async (req, res) => {
  try {
    const publicPlaylists = await PlayList.find({ playlistPrivacy: "public" });
    res.status(200).json(publicPlaylists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching public playlists", error });
  }
});
// router.get('/destroy/:id', passport.checkAuthentication, movieController.destroy);

module.exports = router;
