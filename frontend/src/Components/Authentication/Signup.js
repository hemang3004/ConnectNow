import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
const Signup = () => {
  const toast = useToast();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  let x;
  let re='0';
  const {setVerifiedEmail}=ChatState();

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setPicLoading(true);
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
    // FormData object is a common way to create a bundle of data to send to the server using XMLHttpRequest or fetch
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "hemang3004");
      fetch("https://api.cloudinary.com/v1_1/hemang3004/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
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
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
          re 
        },
        config
      );
      console.log(data);
      // toast({
      //   title: "Registration Successful",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      setVerifiedEmail(email);
      history.push("/verify");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const validateEmail = () => {
    var regxEmail =
      /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]+)\.([a-z]{2,5})(.[a-z]{2,5})?$/;
    if (!regxEmail.test(email)) {
      x = 0;
      document.getElementById("invemail").innerHTML =
        "Please enter email in proper format!!";
      return false;
    } else {
      x = 1;
      document.getElementById("invemail").innerHTML = "";
      return true;
    }
  };

  const validatePassword = () => {
    var regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexPass.test(password)) {
      x = 0;
      document.getElementById("invpass").innerHTML =
        "Password must be atleast 8 characters, including uppercase letter,lowercase letter,number,special character!!";
      return false;
    } else {
      x = 1;
      document.getElementById("invpass").innerHTML = "";
      return true;
    }
  };

  const validate = () => {
    if (x == 0) {
      return false;
    } else {
      return true;
    }
  };

  const validateCnfPassword = () => {
    if (password !== confirmpassword) {
      x = 0;
      document.getElementById("invconfpass").innerHTML = "Passwords not match!";
      return false;
    } else {
      x = 1;
      document.getElementById("invconfpass").innerHTML = "";
      return true;
    }
  };

  return (
    <VStack spacing="5px">
      <form style={{ width: "100%" }} onSubmit={validate()}>
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyUp={validateEmail}
          />
          <span id="invemail" style={{ color: "red", fontSize: "12px" }}></span>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyUp={validatePassword}
            />
            <InputRightElement width="4.5rem">
              <button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </button>
            </InputRightElement>
          </InputGroup>
          <span id="invpass" style={{ color: "red", fontSize: "12px" }}></span>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password Again"
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
              onKeyUp={validateCnfPassword}
            />
            <InputRightElement width="4.5rem">
              <button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </button>
            </InputRightElement>
          </InputGroup>
          <span
            id="invconfpass"
            style={{ color: "red", fontSize: "12px" }}
          ></span>
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
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
      </form>
    </VStack>
  );
};

export default Signup;
