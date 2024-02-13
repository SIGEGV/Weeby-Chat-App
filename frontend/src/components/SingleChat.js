import React from 'react'
import { ChatState } from './Context/ChatProvider'
import { Box, Text } from '@chakra-ui/react';
import {getSender} from '../config/ChatLogics'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
      const {user, selectedChat, setSelectedChat }=ChatState();

  return (
    <>{
        selectedChat?(<>
        <Text
               fontSize={{ base: "28px", md:"30px"}}
               pb={3}
               px={2}
               w="100%" 
               fontFamily={"Work sans"}
               d="flex"
               justifyContent={{base: "space-between"}}
               alignItems={"center"}>
                {!selectedChat.isGroupChat?(
                <>
                    {getSender(user,selectedChat.user)} </>
                )
                   :(<>
                           {selectedChat.chatname.toUpperCase()}
                           {/* <UpdateGroupModal
                             fetchAgain={fetchAgain}
                             setFetchAgain={setFetchAgain}/> */}
                      </>
                )}
        </Text>
        </>): 
            (
                <Box d="flex" h="100%" justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                  Click on a user to start chatting
                </Text>
              </Box>    
            )
    }</>
  )
}

export default SingleChat