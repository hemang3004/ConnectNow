// import React from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,Container,
    Box,
    Text,
    VStack,
  } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
const Verify = () => {
const toast=useToast();
const history=useHistory();
const {verifiedEmail}=ChatState();
const re="1"
let email=null;
  const [otp, setOTP] = useState("")
  const resendHandler=async ()=>{
    console.log("RESENDDDDDDD ")
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      email=verifiedEmail;
     const response= await axios.post(
        "/api/user",
        {
          email,
          re 
        },
        config
      );
      console.log(response);
     
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setPicLoading(false);
    }
  }
  const submitHandler=async()=>{
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "/api/user/verify",
        {
          verifiedEmail,
          code:otp
        },
        config
      );
    toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history.push("/")
    }
    catch(error){
      toast({
        title: "Error Occured!",
        description: error.response.data.message+" OR try requesting otp once again by clicking on Resend OTP ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  return (
    <Container maxW="xl" centerContent>
    <Box
      bg="white"
      w="80%"
      h="380"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      mt={160}
    >
      <Text
        fontSize="3xl"
        fontFamily="Work sans"
        textAlign="center"
        fontWeight={"bold"}
        mt={8}
      >
        OTP Verification
      </Text>
      <Text
        fontSize="sm"
        fontFamily="Work sans"
        textAlign="center"
        ml={7}
        mr={7}
        mt={1}
      >
        You Will have recieved an One-Time-Password for verification of your account on this email:<strong>{verifiedEmail}</strong>. 
        Enter that OTP here to verify your account. 
      </Text>
      <VStack spacing="5px">
        <FormControl id="otp" >
          <FormLabel ml={39.9} mt={30}>
            OTP
          </FormLabel>
          <Input
            ml={39.9}
            width="80%"
            placeholder="Enter Your OTP here"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          width="80%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          cursor="pointer"
          // isDisabled={true}
        >
          Verify
        </Button>
        <Button
          colorScheme="white"
          color="#718096"
          width="100%"
          fontSize={14}
          fontWeight={{ bold: 750 }}
          style={{ marginTop: 15 }}
          // pl={{ md: 230, sm: 270 }}
          // pr={{ base: 0, md: 0 }}
          onClick={resendHandler}
        >
          Resend OTP
        </Button>
      </VStack>
    </Box>
  </Container>
  )
}

export default Verify