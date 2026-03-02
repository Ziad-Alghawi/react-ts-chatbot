import { useState } from 'react'
import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css';

type ChatMessages = {
  message: string | React.ReactNode;
  sender: string;
  id: string;
}[];


type ChatInputProps = {
 chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};

export function ChatInput({chatMessages, setChatMessages}: ChatInputProps) { //2nd
  const [inputText, setInputText] = useState('');

// Tracks if chatbot is currently waiting for a response
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: {
    target: {
      value: string;
    };
  }){
    setInputText(event.target.value);

  }
// we added async to make wait for the response >EX 03k
  async function sendMessage() {
// Stop if bot is busy OR input is empty
    if (isLoading || inputText === '') {
      return;
    }
// Lock sending while waiting for chatbot reply
    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
      {
        //add loading message while the chatbot is thinking >> then we delete it down
      //message: 'loading...'  ,
        message: <img src ={LoadingSpinner}      className="loading-img"/>,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);

    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages.slice(0, newChatMessages.length -1), // to remove the loading message
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

// Unlock sending after response arrives
    setIsLoading(false);
    
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    }else if (event.key === 'Escape'){
      setInputText('');
    }
  }

  function clearMessages() {
    setChatMessages([]);
    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([])); However, because chatMessages is being updated, the useEffect in the App component will run, and it willautomatically update messages in localStorage to be [].

    
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Sene a message to Chatbot" 
        size={30} 
        onChange={saveInputText}
        value={inputText}//controlled input >> to make the input value change on html
        onKeyDown= {handleKeyDown}
        className="chat-input"
      />
      <button onClick={sendMessage}
        className="send-button" >Send</button>

        <button onClick={clearMessages}
        className="clear-button" >Clear</button>
    </div>
  )
}