const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  playlistName: { type: String, required: true },
  creator: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [{ type: String }],
  playlistPrivacy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
