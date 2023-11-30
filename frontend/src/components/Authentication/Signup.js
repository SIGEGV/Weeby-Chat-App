import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

const Signup = () => {
  const [name, setName] =useState();
  const [email, setEmail] =useState();
  const [password, setPassword] =useState();
  const [confirmpassword, setConfirmpassword] =useState();
  const [pic, setPic] =useState();
  
  const postDetails= (pics) => {

  }
  
  const submitHandler= ()=>{}
  
  
  return (
    <VStack spacing='5px'>

    <FormControl>
      <FormLabel id='first-name' isRequired>Name</FormLabel>
      <Input
        placeholder="Enter Your Name"
        onChange={(e)=>setName=(e.target.value)}
      />
    </FormControl>



    <FormControl>
      <FormLabel id='email' isRequired>Email</FormLabel>
      <Input
        placeholder="Enter Your Email"
        onChange={(e)=>setEmail=(e.target.value)}
      />
    </FormControl>




    <FormControl>
      <FormLabel id='password' isRequired>Password</FormLabel>
      <Input
        placeholder="Enter Password"
        onChange={(e)=>setPassword=(e.target.value)}
      />
    </FormControl>



    <FormControl>
      <FormLabel id='confirm-password' isRequired>Confirm-Password</FormLabel>
      <Input
        placeholder="Enter your Password Again"
        onChange={(e)=>setConfirmpassword=(e.target.value)}
      />
    </FormControl>

    <FormControl>
      <FormLabel id='Picture' isRequired>Upload Your Picture</FormLabel>
      <Input
         type="file"
         p={1.5}
         accept='image/*'
        onChange={(e)=>postDetails=(e.target.files[0])}
      />
    </FormControl>
  

   <Button colorScheme='blue'
   width="100px"
   style={{marginTop: 15}}
   onClick={submitHandler()}
   >
     Signup
   </Button>

    </VStack>
  )
}

export default Signup