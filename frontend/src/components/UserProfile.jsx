import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile.css';
import Navbar from './Navbar';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [privatePlaylists, setPrivatePlaylists] = useState([]);
  const [publicPlaylists, setPublicPlaylists] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = JSON.parse(localStorage.getItem('userDetails'));
      setUser(userData);

      const res = await axios.get(`http://localhost:8000/user/${userData._id}`);
      const playlists = res.data.playlists;

      setPrivatePlaylists(playlists.filter(playlist => playlist.playlistPrivacy === 'private'));
      setPublicPlaylists(playlists.filter(playlist => playlist.playlistPrivacy === 'public'));
    };

    fetchUserData();
  }, []);

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${playlistId}`);
      setPrivatePlaylists(privatePlaylists.filter(playlist => playlist._id !== playlistId));
      setPublicPlaylists(publicPlaylists.filter(playlist => playlist._id !== playlistId));
    } catch (error) {
      console.error('Error deleting playlist', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card user-card border border-dark">
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="rounded-circle img-fluid"
                />
              <h5 className="card-title mt-3">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <p className="card-text">Joined on: {new Date(user.createdAt).toDateString()}</p>
            </div>
          </div>
        </div>
      </div>
        <div className="col mt-5 p-3">
          <div className="card playlists-card mb-4 border border-dark">
            <div className="card-body">
              <h5 className="card-title text-center">Private Playlists</h5>
              {privatePlaylists.length > 0 ? (
                <div className="row">
                  {privatePlaylists.map((playlist) => (
                    <div className="col-md-3 mb-4" key={playlist._id}>
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">{playlist.playlistName}</h5>
                          <p className="card-text">Total Movies: {playlist.movies.length}</p>
                          <Link to={`/playlist/${playlist._id}`} className="btn btn-primary m-1">View Playlist</Link>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => handleDeletePlaylist(playlist._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No private playlists available.</p>
              )}
            </div>
          </div>
          <div className="card playlists-card border border-dark">
            <div className="card-body">
              <h5 className="card-title text-center">Public Playlists</h5>
              {publicPlaylists.length > 0 ? (
                  <div className="row">
                  {publicPlaylists.map((playlist) => (
                      <div className="col-md-3 mb-4" key={playlist._id}>
                      <div className="card">
                        <div className="card-body text-center">
                          <h5 className="card-title">{playlist.playlistName}</h5>
                          <p className="card-text">Total Movies: {playlist.movies.length}</p>
                          <Link to={`/playlist/${playlist._id}`} className="btn btn-primary m-1">View Playlist</Link>
                          <button
                            className="btn btn-danger m-1"
                            onClick={() => handleDeletePlaylist(playlist._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No public playlists available.</p>
            )}
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default UserProfile;
