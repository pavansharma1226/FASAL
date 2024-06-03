import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';
import Navbar from './Navbar';

function PlaylistDetail() {
  const { playlist_id } = useParams();
  console.log(useParams(), playlist_id);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/playlists/${playlist_id}`);
        setPlaylist(res.data.movieDetails);
        // console.log("Playlist response : ",res);
        // console.log("Playlist response : ",res.data.movieDetails);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, [playlist_id]);

  return (
    <div>
        <Navbar/>
      {playlist != null ? (
        <div>
          <h3 className='text-center text-secondary mt-4'>Movies Inside Playlist</h3>
          <div className="row mt-3 p-3">
            {playlist.map((movie) => (
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
            ))}
          </div>
        </div>
      ) : (
        <h3 className='text-center text-secondary mt-4'>Loading...</h3>
      )}
    </div>
  );
}

export default PlaylistDetail;
