import React, { useState } from 'react'
import './Footer.css'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import Slider from '@mui/material/Slider';
import { useDataLayerValue } from './DataLayer';

function Footer() {
  const [{ item }] = useDataLayerValue();

  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(30);

  const songName = item?.name || "Nothing playing";
  const artistName = item?.artists?.map((artist) => artist.name).join(", ") || "Pick a song";
  const albumArt = item?.album?.images?.[0]?.url;

  return (
    <div className='footer'>
      <div className='footer__left'>
        {albumArt ? (
          <img className='footer__albumLogo' src={albumArt} alt={songName} />
        ) : (
          <div className='footer__albumLogo footer__albumPlaceholder' />
        )}
        <div className='footer__songInfo'>
          <h4>{songName}</h4>
          <p>{artistName}</p>
        </div>
      </div>

      <div className='footer__center'>
        <ShuffleIcon
          className={shuffle ? 'footer__green' : 'footer__icon'}
          onClick={() => setShuffle(!shuffle)}
        />
        <SkipPreviousIcon className='footer__icon' />
        {playing ? (
          <PauseCircleOutlinedIcon
            className='footer__icon footer__play'
            fontSize='large'
            onClick={() => setPlaying(false)}
          />
        ) : (
          <PlayCircleOutlinedIcon
            className='footer__icon footer__play'
            fontSize='large'
            onClick={() => setPlaying(true)}
          />
        )}
        <SkipNextIcon className='footer__icon' />
        <RepeatIcon
          className={repeat ? 'footer__green' : 'footer__icon'}
          onClick={() => setRepeat(!repeat)}
        />
      </div>

      <div className='footer__right'>
        <PlaylistPlayIcon className='footer__icon' />
        <VolumeDownIcon className='footer__icon' />
        <Slider
          size='small'
          aria-label='Volume'
          value={volume}
          onChange={(event, newValue) => setVolume(newValue)}
          sx={{ color: '#1ed15e', width: 100, marginLeft: '10px' }}
        />
      </div>
    </div>
  )
}

export default Footer