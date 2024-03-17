import { Badge} from '@chakra-ui/react'
import { IoClose } from "react-icons/io5"
import './Badge.css'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge Class="badge"
    onClick={handleFunction}
  >
    {user.name}
    {admin === user._id && <span> (Admin) </span>}   
    <IoClose Class="close-icon"/>
  </Badge>
  );
};

export default UserBadgeItem