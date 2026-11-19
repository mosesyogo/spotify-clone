import React from 'react'
import './Login.css'
import { redirectToSpotifyLogin } from './spotify'


function Login() {
  return (
    <div className='login'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png" alt="Spotify Logo" className="spotify-logo" />
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                redirectToSpotifyLogin();
              }}
            >
                LOGIN WITH SPOTIFY
            </a>
    </div>
  )
}

export default Login