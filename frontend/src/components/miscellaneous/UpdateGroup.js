import React, { useEffect, useState } from 'react';
import { GrView } from "react-icons/gr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  useToast,
  Input,
  FormControl,
  Spinner,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const UpdateGroup = ({  fetchAgain, setFetchAgain , fetchMessages}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat ,setSelectedChat,user} = ChatState();

  const [groupChatName, setGroupChatName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleRename = async() => {
      if(!groupChatName) return;
      try {
           setRenameLoading(true);
           const config={
            headers:{
              Authorization: `Bearer ${user.token}`,
            }
          }
          const {data}=await axios.put("/api/chat/rename", 
          {
            chatId:selectedChat._id,
            chatName: groupChatName,
          }
          ,config);
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setRenameLoading(false);
      } catch (error) {
        toast({
            title: "Error Occurred",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
          setRenameLoading(false);  
      }
      setGroupChatName("");
  };

  const handleSearch=async(query)=>{
    setSearch(query);
    if(!query){return;}
    try {
       setLoading(true);
       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };
       const { data } = await axios.get(`/api/user?search=${search}`, config);
       console.log(data)
       setLoading(false);
       setSearchResult(data);
    }catch (error) {
       toast({
         title: "Error Occured!",
         description: "Failed to Load the Search Results",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom-left",
       });
     }
   };
   useEffect(() => {
    if (isOpen) {
      setSearchResult([]); // Reset search results when modal is opened
    }
  }, [isOpen]);

  const handleAddUser = async(userToAdd) => {
    if (selectedChat && selectedChat.users && selectedChat.users.find((u) => u._id === userToAdd._id)) {
        toast({
          title: "User Already in group!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      if (selectedChat.GroupAdmin._id !== user._id) {
        toast({
          title: "Only admins can add someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    try {
         setLoading(true);
         const config={
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data}=await axios.put("/api/chat/groupadd", 
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        }
        ,config);
        toast({
            title: `${userToAdd.name} Added`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
    } catch (error) {
      toast({
          title: "Error Occurred",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        setLoading(false);  
    }
};

const handleRemove = async (userToDelete) => {
    setLoading(true);
    if (selectedChat.GroupAdmin._id !== user._id && userToDelete._id!== user._id) {
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    try {
         console.log("before deletion", selectedChat.GroupAdmin._id,selectedChat._id);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        console.log("before deletion");
        const { data } = await axios.put(
          "/api/chat/remove",
          {
            chatId: selectedChat._id,
            userId: userToDelete._id,
          },
          config,
        );
        console.log("after deletion ", data)
        if (userToDelete._id === user._id) {
          setSelectedChat(); 
        } else {
          setSelectedChat(data); 
        }
        setFetchAgain(!fetchAgain);
        fetchMessages();
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };

  return (
    <>
      <GrView onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatname}
          </ModalHeader>
          <ModalBody d="flex" flexDir="column" alignItems="center">
            {/* <Box>
            {selectedChat && selectedChat.users && selectedChat.users.map((u)  => (
                     <UserBadgeItem key={user._id} user={user} handleFunction={()=>handleRemove(user)} />
              ))}
            </Box> */}

            {/* need to change the group update modal in order to make a 1/3 grid to show the users */}
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={3} // Increase margin to create space between inputs
                onChange={(e) => handleSearch(e.target.value)}
              />
              {loading ? (
                <Spinner size="lg" />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter >
          <Button
                variant="solid"
                colorScheme="green"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            <Button onClick={() => handleRemove(user)} colorScheme="red" >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroup;
