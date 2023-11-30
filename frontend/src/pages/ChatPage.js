import axios from 'axios';
import React, { useEffect, useState } from 'react';
const ChatPage = () => {
const [chats, setChats] = useState([]); // State variable to hold chat data

  const fetchInfo = async() => { 
    return axios.get("/api/chat") 
             .then((response) => setChats(response.data));
  }
  
  useEffect(() => { 
        fetchInfo(); 
  }, [])
  

  return <div>
  {chats.map(chat=><div key={chat._id }>{chat.chatName}</div>)}
  </div>;}
export default ChatPage;