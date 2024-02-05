import React, {useEffect, useState} from 'react';
import { ChatState } from './Context/ChatProvider';
import { Box, Button, Card,CardBody,Stack,Text,useToast } from '@chakra-ui/react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import './style/contacts.css'
import ChatLoading from './ChatLoading'
import getSender from '../config/ChatLogics';
const Contacts = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {user,setSelectedChat,SelectedChat,chats, setChats}=ChatState();
  const toast=useToast();

const fetchChats= async()=>{
  try {
    const config={
      headers:{
        Authorization: `Bearer ${user.token}`,
      }
    }
    const {data}=await axios.get("/api/chat/fetch",config);
    console.log(data)
    setChats(data);
  }
   catch (error) {
    toast({
      title: "Error Occurred",
      description: "Failed to load the Chats",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};
   useEffect(() => {
     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
       }, [])
   
  return (
<Card Class='Card'>
  <CardBody className='Card-Body'>
     <Text className='Text'>
       My Chats
      <Button className='Button'>New Group Chat<IoMdAdd/></Button>
      </Text>
      <Box 
      d="flex"
      flexDir="column"
      p={3}
      bg="transparent"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden">
         { chats?( 
              <Stack overflow={"scroll"}>
                {chats.map((chat) => (
                  <Box
                   onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  className='My-Chats'
                  bg={SelectedChat === chat ? "#7CB9E8" : "#7CB9E8"}
                  color={SelectedChat === chat ? "white" : "black"}
                  px={1}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}>
                    <Text>
                      {!chat.isGroupChat 
                                 ? getSender(loggedUser,chat.user)
                                : chat.chatname}

                    </Text>
                  </Box>
                ))}
              </Stack>
         ):(
          <ChatLoading/>
   )}
      </Box>
  </CardBody>
</Card>
  
  
  )};

export default Contacts