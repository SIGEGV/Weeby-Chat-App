import { Button,FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  
  const [email, setEmail] =useState();
  const [password, setPassword] =useState();
  

  const submitHandler= ()=>{}

  return (
    <VStack spacing='5px'>

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

   <Button colorScheme='blue'
   width="100px"
   style={{marginTop: 15}}
   onClick={submitHandler()}
   >
     Login
   </Button>


   <Button 
   variant={'solid'}
   colorScheme='red'
   style={{marginTop: 15}}
   onClick={()=>{
    setEmail("guest@example.com");
    setPassword("123456");
  }
}>
     Get Guest User Credentials
   </Button>

    </VStack>
  )
}

export default Login