 import React from 'react'
 import {Box} from '@chakra-ui/react'
import { ChatState } from '../components/Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
// import ChatBox from '../components/ChatBox'
// import Contacts from '../components/Contacts'
 const Chatpage = () => {
    const{user}=ChatState();
  return (
     <div style={{width:"100%",  position: "fixed",top: "0",left: "0"}}>
      { user && <SideDrawer/>}
      <Box d="100%" 
      justifyContent='space-between'
      w="100px"
      p="10px">
      {/* {user && <Contacts/>}
      {user && <ChatBox/>} */}
      </Box>
     </div>
   )
 }
 
 export default Chatpage