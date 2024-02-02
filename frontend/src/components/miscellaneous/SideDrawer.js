import { Box, Button, Tooltip,Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Input, useToast} from '@chakra-ui/react';
import {
   Drawer,
   DrawerBody,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
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

const SideDrawer = () => {
  const [search, setSearch] = useState("")  
  const [searchResult , setsearchResult]=useState([]);
  const [Loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const navigate=useNavigate();
  const {user}=ChatState()

   
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast=useToast();



   const logouthandler=()=>{
      localStorage.removeItem("userInfo");
      navigate("/")
   }
   const accessChat=(UserId)=>{
       try{
       setLoadingChat(true);
       const config={
         headers:{
             "Content-type":"application/json",
            Authorization:`Bearer ${user.token}`,
         },
      };


       }
       catch{

       }
   }

   const handleSearch= async()=>{
      if(!search){
         toast({
            title:"Enter the name of the user ",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top-left",
         });
         return;
      }
         try {
            setLoading(true);
            const config={
               headers:{
                  Authorization:`Bearer ${user.token}`,
               },
            };
            const {data}= await axios.get(`/api/user?search=${user.token}`,config)
            console.log(data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
            setsearchResult(data);
         } catch (error) {
            toast({
               title:"Error Occoured ",
               description: "Failed to Load the Search Result",
               status:"error",
               duration:5000,
               isClosable:true,
               position:"bottom-left",
            })
         }finally{
            setLoading(false);
         }
   }
 return(
   <>
  <Box
  d="flex" 
  justifyContent='space-between'
  background={"#74ccf4 "}
  w="100%"
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
             <MenuItem><Link to='/Profile' >My Profile</Link></MenuItem>
             <MenuItem onClick={logouthandler}>Logout </MenuItem>
           </MenuList>
       </Menu>
        </div>
  </Box>
  <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader left="17.5%%">Search User</DrawerHeader>
          <DrawerBody >
          <DrawerCloseButton  top={"7%"}  right={"2%"}/>
            <Box position="relative" top="6%" left="0%">
              <Input
               left="-6%"
                 placeholder="Username"
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}
                 />
                   <Button left={"63%"} backgroundColor={"#00d8ff"} onClick={handleSearch}>
                      Search 
                 </Button>
                 {Loading ? <ChatLoading style={{ position: 'absolute', top: '10%', left: 0, right:0}} /> : (
                  searchResult?.map((user)=>(
                     <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={()=> accessChat(user.id)}
                     />
                  )))
                 }
            </Box>
              </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
)
}

export default SideDrawer