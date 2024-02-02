import axios from "axios";
import { Link } from "react-router-dom"
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useNavigate } from "react-router";
import './Signup.css';
import { FaUserAlt ,FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";




const Registration = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();


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
      console.log(name, email, password, pic);
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
      console.log(data);
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

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "sociopedia");
      data.append("cloud_name", "dhnywnneh");
      fetch("https://api-ap.cloudinary.com/v1_1/:dhnywnneh/:upload",
       {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };
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
           <div className="profile-picture"> 
           <input type="file" onChange={(e) => postDetails(e.target.files[0])} accept="image/*"  />
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