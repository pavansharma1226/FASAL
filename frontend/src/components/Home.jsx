import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [publicPlaylists, setPublicPlaylists] = useState([]);

  // console.log("Movies : ", movies, query);

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    console.log("is User Exist : ", userData);
    if (userData) {
      // console.log(JSON.parse(userData));
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchPublicPlaylists = async () => {
    try {
      const res = await axios.get("http://localhost:8000/public-playlists");
      setPublicPlaylists(res.data);
      // console.log("Public Playlist : ", res.data);
    } catch (error) {
      console.error("Error fetching public playlists", error);
    }
  };

  useEffect(() => {
    fetchPublicPlaylists();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `http://www.omdbapi.com?s=${query}&apikey=9e835846`
      );
      // console.log("Query Response : ", res);
      setMovies(res.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
  };

  return (
<div className="container-fluid">
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand text-white">
            Movie Mania
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <form className="d-flex mx-auto">
              <div className="input-group">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-control"
                  placeholder="Search Movies"
                />
                <button
                  type="button"
                  onClick={fetchMovies}
                  className="btn btn-primary"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="navbar-nav">
              {user ? (
                <>
                  <Link to={"/profile"} className="nav-item nav-link text-white">
                    Welcome, {user.name.split(" ")[0]}
                  </Link>
                  <button className="btn btn-outline-light nav-item" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={"/register"} className="nav-item nav-link text-white">
                    Register
                  </Link>
                  <Link to={"/login"} className="nav-item nav-link text-white">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="row mt-3 p-3">
        {movies ? (
          movies.map((movie) => (
            <div className="col-md-2 mb-4" key={movie.imdbID}>
              <Link to={`/movieDetail/${movie.imdbID}`}>
                <div className="card">
                  <img
                    src={movie.Poster}
                    className="card-img-top"
                    alt={movie.Title}
                    width={"100%"}
                    height={"350px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {movie.Title.substring(0, 15)}
                    </h5>
                    <p className="card-text">{movie.Year}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h2 className="text-secondary text-center">No Movies Found</h2>
        )}
      </div>

      {publicPlaylists.length > 0 && (
        <div className="container mt-4">
          <h2 className="text-center text-secondary mb-4">Public Playlists</h2>
          <div className="row">
            {publicPlaylists.map((playlist) => (
              <div className="col-md-3 mb-4" key={playlist._id}>
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      Name: {playlist.playlistName}
                    </h5>
                    <p className="card-text">Created by: {playlist.creator}</p>
                    <Link
                      to={`/playlist/${playlist._id}`}
                      className="btn btn-primary"
                    >
                      View Playlist
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    );
};

export default Home;
