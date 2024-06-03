import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistPrivacy, setPlaylistPrivacy] = useState("public");
  const [playlists, setPlaylists] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    console.log("is User Exist : ", userData);
    if (userData) {
      // console.log(JSON.parse(userData));
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com?i=${imdbID}&apikey=9e835846`
        );
        setMovie(response.data);
        console.log("Movie Description : ", response.data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovie();
  }, [imdbID]);

  const handleAddToPlaylist = () => {
    if (user == null) {
      navigate("/login");
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPlaylistName("");
    setPlaylistPrivacy("public");
  };

  const handleInputChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handlePrivacyChange = (event) => {
    setPlaylistPrivacy(event.target.value);
  };

  const handleSubmit = async () => {
    if (user == null) {
      navigate("/login");
    }
    if (playlistName) {
      // Logic to add movie to the specified playlist
      // console.log(
      //   `Movie added to playlist: ${playlistName} (Privacy: ${playlistPrivacy})`
      // );
      const response = await axios.post(
        "http://localhost:8000/create-playlist",
        {
          movies: movie.Title,
          playlistName,
          playlistPrivacy,
          userId: user._id,
          creater: user.name,
        }
      );

      // console.log(response);

      handleCloseModal();
      navigate('/');
    }
  };

  return (
    <>
    <Navbar/>
    {movie != null ? (
      <div className="container mt-3 p-4">
        <div
          className="row p-2"
          style={{ border: "2px solid black", borderRadius: "20px" }}
        >
          <div className="col-md-4 mt-5 text-center">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/400x750"
              }
              className="img-fluid"
              width={"80%"}
              alt={movie.Title}
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-center text-secondary">{movie.Title}</h1>
            {movie.Year !== "N/A" && (
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
            )}
            {movie.Released !== "N/A" && (
              <p>
                <strong>Released:</strong> {movie.Released}
              </p>
            )}
            {movie.Runtime !== "N/A" && (
              <p>
                <strong>Runtime:</strong> {movie.Runtime}
              </p>
            )}
            {movie.Genre !== "N/A" && (
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
            )}
            {movie.Director !== "N/A" && (
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
            )}
            {movie.Writer !== "N/A" && (
              <p>
                <strong>Writer:</strong> {movie.Writer}
              </p>
            )}
            {movie.Actors !== "N/A" && (
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
            )}
            {movie.Language !== "N/A" && (
              <p>
                <strong>Language:</strong> {movie.Language}
              </p>
            )}
            {movie.Country !== "N/A" && (
              <p>
                <strong>Country:</strong> {movie.Country}
              </p>
            )}
            {movie.Awards !== "N/A" && (
              <p>
                <strong>Awards:</strong> {movie.Awards}
              </p>
            )}
            {movie.imdbRating !== "N/A" && (
              <p>
                <strong>IMDB Rating:</strong> {movie.imdbRating}
              </p>
            )}
            <button
              type="button"
              className="btn btn-primary mt-3"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              onClick={handleAddToPlaylist}
            >
              Add to Playlist
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal fade show modalFade d-block bd-example-modal-lg"
            id="modelFade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog " role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add to Playlist</h5>
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="close"
                    onClick={handleCloseModal}
                  >
                    <span style={{ padding: "5px", fontSize: "18px" }}>
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="playlistName">Playlist Name</label>
                    <input
                      list="playlists"
                      type="text"
                      className="form-control"
                      id="playlistName"
                      value={playlistName}
                      onChange={handleInputChange}
                    />
                    <datalist id="playlists">
                      {playlists.map((playlist, index) => (
                        <option key={index} value={playlist.name} />
                      ))}
                    </datalist>
                  </div>
                  <div className="form-group">
                    <label htmlFor="playlistPrivacy">Privacy</label>
                    <select
                      className="form-control"
                      id="playlistPrivacy"
                      value={playlistPrivacy}
                      onChange={handlePrivacyChange}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="close btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="close btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Add to Playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> ): (
        <h3 className='text-center text-secondary mt-4'>Loading...</h3>
      )}
    </>
  );
}

export default MovieDetail;
