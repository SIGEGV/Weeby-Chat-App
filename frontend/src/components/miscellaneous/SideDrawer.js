import { Box, Button, Tooltip,Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Input, useToast, Spinner} from '@chakra-ui/react';
import './drawer.css'
import {
   Drawer,
   DrawerBody,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
 } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiUserSearchFill } from "react-icons/ri";
import { FaBell, FaChevronDown } from "react-icons/fa";
import {ChatState} from '../Context/ChatProvider';
import { Link , useNavigate } from 'react-router-dom';
import{useDisclosure} from '@chakra-ui/hooks'
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import Profile from './Profile';
import getSender from '../../config/ChatLogics';


const SideDrawer = () => {
  const [search, setSearch] = useState("")  
  const [searchResult , setsearchResult]=useState();
  const [Loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const navigate=useNavigate();
  const {user,setSelectedChat,chats, setChats, notification, setNotification}=ChatState()

   
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast=useToast();



   const logouthandler=()=>{
      localStorage.removeItem("userInfo");
      navigate("/")
   }
   const accessChat=async(userId)=>{
       try{
       setLoadingChat(true);
       const config={
         headers:{
             "Content-type":"application/json",
            Authorization:`Bearer ${user.token}`,
         },
      };
        const {data}= await axios.post('/api/chat',{userId},config);
        if(!chats.find((c)=>c._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose()
       }
       catch(error){
         toast({
            title:"Error Fetching the chats ",
            description: error.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
         })
       }
   }

   const handleSearch = async () => {
      if (!search) {
        toast({
          title: "Enter the name of the user",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        return;
      }
  
      setLoading(true); 
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
  
        await new Promise(resolve => setTimeout(resolve, 2000));

        setsearchResult(data);

      } catch (error) {
        console.error("Error Occurred:", error);
        toast({
          title: "Error Occurred",
          description: "Failed to load the search result",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      } finally {
        setLoading(false);
      }
    };
  
 return(
   <>
  <Box
  display="flex" 
  justifyContent='space-between'
  background={"#74ccf4 "}
  w="100%"
  margin={"auto"}
  p="0px 0px 0px 0px "
   borderRadius={"1px"} >
     <Tooltip label="Search User to Chat" hasArrow placement='bottom-end'>
        <Button variant={"ghost"} onClick={onOpen}>
            <Text d={{base:"none", md:'flex'}}> Search User</Text>
            <RiUserSearchFill/>
            </Button>
     </Tooltip>
        <Text position='fixed' top="0%" left="45%" fontFamily="Work sans" fontSize={"2xl"} >Sociopedia</Text>
        <div>
       <Menu>
           <MenuButton p={1} fontSize={"2xl"} m={1} position='absolute' top="0" right="20">
           <FaBell />
           </MenuButton>
       </Menu>

       <Menu>
           <MenuButton as={Button} p={1} position='absolute' top="0" right="5" rightIcon={<FaChevronDown/>}   background={"#74ccf4 "}>
              <Avatar size={"sm"} cursor={'pointer'} name={user.name} src={user.pic}></Avatar>
           </MenuButton>
           <MenuList>
           <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
             <MenuItem onClick={logouthandler}>Logout </MenuItem>
           </MenuList>
       </Menu>
        </div>
  </Box>
  <Drawer className="drawer"
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className='drawer-header'>Search User</DrawerHeader>
          <DrawerBody className='drawer-body '>
              <Input
              className='drawer-input'
              position={"relative"}
              top={"5vh"}
               left="-6%"
                 placeholder="Username"
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}/>

                  <Button className="drawer-button" left={"63%"} backgroundColor={"#00d8ff"} onClick={handleSearch} top={"6%"}>
                      Search 
                 </Button>

                 <div className='skeleton'>
                 {Loading ? <ChatLoading /> : (
                  searchResult?.map((user)=>(
                     <UserListItem
                        top={"50%"}
                        key={user._id}
                        user={user}
                        handleFunction={()=> accessChat(user._id)}
                     />
                  )))
                 }
                </div>
                  {loadingChat && <Spinner className='spinner'/>}      
              </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
)
}

export default SideDrawer