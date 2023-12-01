import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {



  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);



  const submitHandler = async () => {
    // Set loading state to indicate image loading in progress
    setPicLoading(true);

    // Validate form input fields
    if (!name || !email || !password || !confirmpassword) {
        // Display error message for missing fields
        toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

        // Reset loading state
        setPicLoading(false);
        return;
    }

    // Verify that passwords match
    if (password !== confirmpassword) {
        // Display error message for password mismatch
        toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        return;
    }

    // Log user registration data to console
    console.log(name, email, password, pic);

    try {
        // Configure API request headers
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Send POST request to '/api/user' endpoint
        const { data } = await axios.post(
            "/api/user",
            {
                name,
                email,
                password,
                pic,
            },
            config
        );

        // Log API response data to console
        console.log(data);

        // Display success message upon successful registration
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

        // Store user information in local storage
        localStorage.setItem("userInfo", JSON.stringify(data));

        // Reset loading state
        setPicLoading(false);

        // Redirect to '/chats' route
        history.push("/chats");
    } catch (error) {
        // Handle API error response
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position:
 
"bottom",
        });

        // Reset loading state
        setPicLoading(false);
    }
};



const postDetails = (pics) => {
  // Set the loading state to indicate that image uploading is in progress
  setPicLoading(true);

  // Check if the selected file is undefined
  if (pics === undefined) {
    // Display an error message if no image is selected
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }


  // Log the selected image file to the console
  console.log(pics);

  // Check if the selected file is an image of type JPEG or PNG
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    // Create a FormData object to hold the file and other data for the upload request
    const data = new FormData();

    // Append the selected image file to the FormData object
    data.append("file", pics);

    // Specify the upload preset for Cloudinary
    data.append("upload_preset", "chat-app");

    // Specify the Cloudinary cloud name
    data.append("cloud_name", "piyushproj");

    // Send a POST request to the Cloudinary API endpoint to upload the image
    fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
      method: "post",
      body: data,
    })
      .then((response) => response.json()) // Parse the JSON response from the API
      .then((data) => {
        // Extract the image URL from the API response
        const imageUrl = data.url.toString();

        // Update the state with the uploaded image URL
        setPic(imageUrl);

        // Log the uploaded image URL to the console
        console.log(imageUrl);

        // Reset the loading state to indicate that image uploading is complete
        setPicLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occur during the image upload process
        console.error(error);

        // Reset the loading state to indicate that image uploading failed
        setPicLoading(false);
      });
  } else {
    // Display an error message if an invalid file type is selected
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
  }
};

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;