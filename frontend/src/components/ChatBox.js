import React from 'react'
import { Card, CardBody } from '@chakra-ui/react'
import "./ChatBox.css"
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  return (
    <Card Class='ChatBoxrd'>
  <CardBody>
             <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
  </CardBody>
     </Card>
    )
}

export default ChatBox