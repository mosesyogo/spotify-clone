import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from './DataLayer';

function Sidebar({ spotify, open, onClose }) {
  const [{ playlists }, dispatch] = useDataLayerValue();

  // Fetch the clicked playlist (cover, name and songs) and show it in Body
  const loadPlaylist = (id) => {
    spotify
      .getPlaylist(id)
      .then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      })
      .catch((err) => {
        console.error("Error fetching playlist:", err.responseText || err);
      });
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`} onClick={onClose}>
      <img
        className="sidebar__logo"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
        alt="Sidebar Logo"
      />

      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption Icon={SearchIcon} title="Search" />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      <br />
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr />

      {playlists?.items?.map((playlist) => (
        <SidebarOption
          key={playlist.id}
          title={playlist.name}
          onClick={() => loadPlaylist(playlist.id)}
        />
      ))}
    </div>
  )
}

export default Sidebar