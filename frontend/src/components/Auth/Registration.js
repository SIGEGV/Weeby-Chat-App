import axios from "axios";
import { Link } from "react-router-dom"
import { useToast } from "@chakra-ui/toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import './Signup.css';
import { FaUserAlt ,FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid'; 
import { storage } from '../firebase'; 



const Registration = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [imageUpload, setImageUpload] = useState(null); 



const submitHandler = async (e) => {
      e.preventDefault();
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
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
      const data  = await axios.post(
        "/api/user",
        {
           name,
           email,
           password,
           pic,
        },
        config
      );      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } 
    catch (error) {
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


  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      setPic(url);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

 
  const handleFileInputChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  useEffect(() => {
    if (imageUpload) {
      uploadFile();
    }
    // eslint-disable-next-line 
  }, [imageUpload]); 

 return (
   <div className='Signup-wrapper'>
       <form action=''>
           <h1>Signup</h1>
             <div className='input-box'>
                  <input type="text" placeholder='Username' onChange={(e)=>setName(e.target.value)} required/>
                  <FaUserAlt className='icon' />
               </div>
               <div className='input-box'>
                  <input type="Email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required/>
                  <MdEmail className='icon' />
               </div>
               <div className='input-box'>
                  <input type="Password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required/>
                  <FaLock className='icon'/>
                  </div>
              <div className='input-box'>
              <input type="Password" placeholder='Confirm Password' onChange={(e)=>setConfirmpassword(e.target.value)} required/>
              <FaLock className='icon' />
            </div>
              <div>
                 <input type="file" accept="image/*" onChange={handleFileInputChange} required/>
               </div>
                <button type="Sign in" onClick={submitHandler}>Sign In</button>
             <div className="Register-Link">
                <p>Already have an Account?<Link to="/">Login</Link></p>
              </div>
       </form>
   </div>
 )
}

export default Registration