 import React, { useState } from 'react'
 import {Box} from '@chakra-ui/react'
import { ChatState } from '../components/Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import Contacts from '../components/Contacts'
import ChatBox from '../components/ChatBox'

const Chatpage = () => {
const [fetchAgain, setFetchAgain] = useState(false);
const { user } = ChatState();

return (
  <>
  <div style={{ width: "100%", position:"absolute",top:"0vh" }}>
    {user && <SideDrawer />}
    </div>
  
      {user && <Contacts fetchAgain={fetchAgain} />}

      {/* {user && (
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )} */}
</>
)};

 export default Chatpage