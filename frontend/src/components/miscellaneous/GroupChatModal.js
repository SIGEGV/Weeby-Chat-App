import React, { useEffect, useState }  from 'react'
import { Button ,FormControl,Input,useDisclosure, useToast } from '@chakra-ui/react'
import {ChatState} from '../Context/ChatProvider'
import './Modal.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'
  import axios from "axios";
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast= useToast();
    const { chats, user,setChats}= ChatState();



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

    const handleSubmit=async()=>{
      if(!groupChatName || !selectedUsers){
        toast({
          title: "Error Occured!",
          description: "Please select at least two users and fill all the fields.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
    const { data } = await axios.post(`/api/chat/group`,{
      name: groupChatName,
      user: JSON.stringify(selectedUsers.map((u)=>u._id)),
    }, config);

    setChats([data, ...chats]);
       onClose();
       toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }catch (error) {
      console.log(error); // Add this line to log the error object
      toast({
        title: " Failed to Create the Chat!",
        description: error.description.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


    const handleGroup=(userToAdd)=>{
            if(selectedUsers.includes(userToAdd)){
              toast({
                title: "User Already Added",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              })
              return;
          }
          setSelectedUsers([...selectedUsers,userToAdd]);
    };
    
    const handleDelete=(userToDelete)=>{
          setSelectedUsers(selectedUsers.filter(sel=>sel._id!==userToDelete._id));
    };

    useEffect(() => {
      if (isOpen) {
        setSearchResult([]); // Reset search results when modal is opened
      }
    }, [isOpen]);
  

  return (
<>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent Class="modal-content">
          <ModalHeader Class="header">Create Group Chat</ModalHeader>
          <ModalBody Class="Body">
            <FormControl>
                    <Input Class="input-field"
                    placeholder='Group Name'
                    onChange={(e)=>{setGroupChatName(e.target.value)}}/>

                    <Input Class="input-field"
                    placeholder='Members'
                    onChange={(e)=>{handleSearch(e.target.value)}}/>
            </FormControl>

             {selectedUsers.map(user=>(
                    <UserBadgeItem key={user._id} user={user} handleFunction={()=>handleDelete(user)} />
             ))}

            {loading ? <div>Loading...</div> : (
                            <div>
                                {searchResult?.slice(0, 4).map(user => (
                                    <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                                ))}
                            </div>
                        )}
          </ModalBody>
          <ModalFooter>
            <Button Class="button" colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}

export default GroupChatModal