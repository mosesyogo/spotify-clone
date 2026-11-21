import React, { useState } from 'react'
import './Player.css'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'

function Player({ spotify }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className='player'>
      <div className='player_body'>
        {/* dark backdrop behind the drawer on phones; tap it to close */}
        <div
          className={`player_backdrop ${sidebarOpen ? 'show' : ''}`}
          onClick={closeSidebar}
        />

        <Sidebar spotify={spotify} open={sidebarOpen} onClose={closeSidebar} />
        <Body spotify={spotify} onMenuClick={() => setSidebarOpen(open => !open)} />
      </div>

      <Footer spotify={spotify} />
    </div>
  )
}

export default Player