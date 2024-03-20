import React, { useEffect, useState } from 'react';
import { ChatState } from './Context/ChatProvider';
import { Avatar, Box, FormControl, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import {getSender, getUser} from '../config/ChatLogics';
import ChatProfile from './miscellaneous/ChatProfile';
import UpdateGroup from './miscellaneous/UpdateGroup';
import axios from 'axios';
import Chats from './Chats';
import io from'socket.io-client'


const ENDPOINT="https://sociopedia-ygsd.onrender.com";
var socket, selectedChatComapare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
      const {user, selectedChat,notification, setNotification  }=ChatState();
      const[messages,setMessages] =useState([]);
      const [loading, setLoading] = useState(false);
      const [typing, setTyping] = useState(false);
      const [otherUserTyping, setOtherUserTyping] = useState(false);
      const [newMessages, setNewMessages] = useState();
      const [socketConnected, setSocketConnected] = useState(false)
      const toast=useToast();
    

    const fetchMessages=async()=>{
      if(!selectedChat) return;
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };        
        const {data}= await axios.get(`/api/messages/${selectedChat._id}`,config);
        setMessages(data);
        setLoading(false);
        socket.emit('joinChat', selectedChat._id)
      } catch (error) {
        console.log("unable to fetch messages");
        setLoading(false); 
      }
    }

     useEffect(() => {
         socket=io(ENDPOINT);
         socket.emit("setup",user);
         socket.on('connected',()=>setSocketConnected(true));
         socket.on('typing',()=>setOtherUserTyping(true));
         socket.on('stop typing', () => setOtherUserTyping(false));
        // eslint-disable-next-line
        }, [])
     

     useEffect(() => {
       fetchMessages();
       selectedChatComapare=selectedChat;
       // eslint-disable-next-line
     }, [selectedChat]
     )

     useEffect(()=>{
      socket.on('message recieved',(newMessageRecieved)=>{
        if(!selectedChatComapare || selectedChatComapare._id!==newMessageRecieved.chat._id){
              if(!notification.includes(newMessageRecieved)){
                setNotification([newMessageRecieved, ...notification]);
                setFetchAgain(!fetchAgain);
              }
        }
        else{
          setMessages([...messages, newMessageRecieved]);
        }
      })
     })

    const sendMessage=async(event)=>{
         if(event.key === 'Enter' && newMessages){
          socket.emit('stop typing', selectedChat._id)
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
            setNewMessages("");
            const { data }= await axios.post('/api/messages/send',
            {
              content: newMessages,
              chatId: selectedChat._id
            },config);
                socket.emit("new message", data);
               setMessages([...messages, data]);
          } catch (error) {
            toast({
              title: "Error Occurred",
              description: "Failed to send the message",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
         }
    }
    const typingHandler=(e)=>{
          setNewMessages(e.target.value);
          if(!socketConnected) return ;
          if(!typing){
            setTyping(true);
            socket.emit('typing', selectedChat._id);
          }
          let lastTypingTime= new Date().getTime();
          var timerLength=3000;
          setTimeout(() => {
             var timeNow=new Date().getTime();
             var timeDiff=timeNow-lastTypingTime;
             if(timeDiff>=timerLength && typing){
              socket.emit('stop typing', selectedChat._id);
              setTyping(false);
             }
          }, timerLength);
    }

  return (
    <Box position="relative" height="100%" overflowX="hidden">
      {selectedChat ? (
        <>
          {/* Box containing the profile Picture */}
          <Box display={{ base: 'none', md: 'block' }}>
          <Avatar 
              size="sm" 
              cursor="pointer" 
              src={selectedChat.user[0]._id === user._id ? selectedChat.user[1].pic : selectedChat.user[0].pic}
            />       
          </Box>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {messages && (
              !selectedChat.isGroupChat ? (
                <Box marginTop={{ base: "-5.5vh", md: "-3.9vh" }} marginLeft={{ base: "5vh", md: "5vh" }} fontSize={{ base: "l", md: "l" }} color={'black'} fontStyle={"Work sans"}>
                  {getSender(user, selectedChat.user)}
                  <ChatProfile
                    user={getUser(user, selectedChat.user)}
                  />
                </Box>
              ) : (
                <Box marginTop={{ base: "-5.5vh", md: "-3.9vh" }} marginLeft={{ base: "5vh", md: "5vh" }} fontSize={{ base: "l", md: "l" }} color={'black'} fontStyle={"Work sans"}>
                  {selectedChat.chatname.toUpperCase()}
                  <UpdateGroup
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </Box>
              )
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            w="100%"
            h={{ base: 'calc(100% - 10px)', md: 'calc(100% - 65px)' }}
            color="black"
            borderRadius="lg"
          >
            {loading ? (
              <Spinner size="xl" margin="auto" />
            ) : (
              <Chats messages={messages}/>
            )}
          </Box>
          <FormControl position="absolute" bottom="0" width="100%">
            {otherUserTyping && <div style={{ color: 'Green' }}>typing...</div>}
            <Input
              variant="filled"
              color="black"
              placeholder="Type a message"
              onChange={typingHandler}
              value={newMessages}
              onKeyDown={sendMessage}
            />
          </FormControl>
        </>
      ) : (
        <Box
          display="flex"
          h="100%"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="black">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
