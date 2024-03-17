import {React, useState } from 'react';
import './Login.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import {  FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";




const Login = () => {


  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });


      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chat");
    } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
    }
  };

  return (
    <div className='wrapper'>
        <form action=''>
            <h1>Login</h1>
              <div className='input-box'>
                   <input type="Email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
                   <MdEmail className='icon' />
                </div>
                <div className='input-box'>
                   <input type="Password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
                   <FaLock className='icon'/>
              </div>
              <button type="submit" onClick={submitHandler}>Login</button>
              <div className="Register-Link">
                <p>Dont't have an Account?<Link to="/Registration">Register</Link></p>
              </div>
        </form>
    </div>
  )
}

export default Login