import React from 'react'
import { ChatState } from './Context/ChatProvider';
import { Card, CardHeader, CardBody, CardFooter,Text, Box } from '@chakra-ui/react'
import "./ChatBox.css"
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat}=ChatState();

  return (
    <Card Class='ChatBoxrd'>
  <CardBody>
             <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
  </CardBody>
     </Card>
    )
}

export default ChatBox