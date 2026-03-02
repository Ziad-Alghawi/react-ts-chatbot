import dayjs from 'dayjs';

import RobotProfileImage from '../assets/robot.png'
//import UserProfileImage from '../assets/user.png'
import ZiadProfileImage from '../assets/ziad.png'
import './ChatMessage.css'

type ChatMessageProps = {
  message: string;
  sender: string;
  time: number;
};

export function ChatMessage({message, sender, time} : ChatMessageProps) { //3rd

  /*
  if (sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    )
  }
    // shorter way down
  */
      // we use && instead of if statment >

  return (
    <div className= {
      sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot' 
    } >

      {sender === 'robot' && (
        <img src={RobotProfileImage}
          className = "chat-message-profile" />
      ) }
      <div className="chat-message-text">
        {message}

        {/* The "time && (" check is optional. I added it just to be safe. */}
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}

        
      </div>
      {sender === 'user' && (
        <img src={ZiadProfileImage}
          className = "chat-message-profile" />
      ) }
    </div>
  )
  }