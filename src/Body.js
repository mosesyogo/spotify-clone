import React from 'react'
import './Body.css'
import Header from './Header'
import { useDataLayerValue } from './DataLayer'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from './SongRow'

function Body({ spotify }) {
  const [{ discover_weekly }] = useDataLayerValue();

  // Spotify's 2026 API renamed tracks.items -> items.items (old shape kept as a fallback)
  const entries = discover_weekly?.items?.items || discover_weekly?.tracks?.items || [];

  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className='body__info'>
        <img
          src={discover_weekly?.images?.[0]?.url || 'https://picsum.photos/seed/weeklymix/400'}
          alt='Playlist Cover'
        />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name || 'Discover Weekly'}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon className='body__shuffle' />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
        {/* You can add song list rendering here */}
        {entries.map((entry, index) => {
          // each entry's song is now called "item" (it used to be "track")
          const track = entry?.item || entry?.track;
          return track ? <SongRow key={track.id || index} track={track} /> : null;
        })}
      </div>
    </div>
  )
}



export default Body