import React, {useEffect, useState} from 'react';
import { ChatState } from './Context/ChatProvider';
import { Box, Button, Card,CardBody,Stack,Text,useToast } from '@chakra-ui/react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import './style/contacts.css'
import ChatLoading from './ChatLoading'
import getSender from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

const Contacts = (fetchAgain) => {
  const [loggedUser, setLoggedUser] = useState();
  const {user,setSelectedChat,chats, setChats}=ChatState();
  const toast=useToast();

const fetchChats= async()=>{
  try {
    const config={
      headers:{
        Authorization: `Bearer ${user.token}`,
      }
    }
    const {data}=await axios.get("/api/chat/fetch",config);
    // console.log(data);
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
      // eslint-disable-next-line
       }, [fetchAgain]);

  return (
<Card Class='Card'>
@@ -103,4 +102,4 @@

  )};

export default Contacts;
   
  return (
<Card Class='Card'>
  <CardBody className='Card-Body'>
     <Text className='Text'>
       My Chats
       <GroupChatModal>
      <Button className='Button'>New group<IoMdAdd/></Button>
      </GroupChatModal>
      </Text>
      <Box 
      d="flex"
      flexDir="column"
      p={3}
      // bg="transparent"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowX={"hidden"}
      overflowY={"auto"}>
       {chats ? (
              <Stack >
                {chats.map((chat) => (
                  <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"                
                  bg={'transparent'}
                  border={"2px"}
                  borderColor={'Black'}
                  color={"Black"}
                  borderStyle={"solid"}
                  px={1}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  >
                      <Text>
                      {!chat.isGroupChat 
                                 ? getSender(loggedUser,chat.user)
                                : chat.chatname}
                      </Text>
                      {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                      )}
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

export default Contacts;
