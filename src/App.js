import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();
const PLAYLIST_ID = '4mFlvz3WZHzwydoo7htKPq';// Replace with your Discover Weekly playlist ID


function App() {

  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getTokenFromUrl().then((_token) => {
      if (_token) {
        dispatch({
          type: 'SET_TOKEN',
          token: _token,
        });
        spotify.setAccessToken(_token);
        spotify.getMe().then((user) => {
          dispatch({
            type: 'SET_USER',
            user: user,
          });
        }).catch((err) => {
          console.error("Error fetching user info:", err.responseText || err);
        });
        spotify.getUserPlaylists().then((playlists) => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists,
          });
        }).catch((err) => {
          console.error("Error fetching playlists:", err.responseText || err);
        });
        spotify.getPlaylist(PLAYLIST_ID).then((discover_weekly) => {
          dispatch({
            type: 'SET_DISCOVER_WEEKLY',
            discover_weekly: discover_weekly,
          });
        }).catch((err) => {
          console.error("Error fetching Discover Weekly playlist:", err.responseText || err);
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;