import React from 'react'
import './ChatDashboard.css'
import ChattingImage from '../assets/chatting.png'
function ChatDashboard() {
  return (
    <div className='chatdashboard'>
        <div className='chatting-body'>
            <img className='chatting-image' src={ChattingImage} alt='chatting-image' />
        </div>
    </div>
  )
}

export default ChatDashboard