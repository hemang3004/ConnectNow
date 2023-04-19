import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();
  let x;
  const url = window.location.href.toString();
  let pathName = url.split("/");
  let id = pathName[4];
  let token = pathName[5];
  const handleClick = () => setShow(!show);

  const validatePassword = () => {
    var regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexPass.test(password)) {
      toast({
        title: "Password constraint Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // const validateCnfPassword = () => {
  //   if (password !== confPassword) {
  //     x = 0;
  //     document.getElementById("invconfpass").style = "color:red";
  //     document.getElementById("invconfpass").innerHTML = "Passwords not match!";

  //     return false;
  //   } else {
  //     x = 1;
  //     document.getElementById("invconfpass").innerHTML = "";
  //     return true;
  //   }
  // };

  const validate = () => {
    if (x == 0) {
      return false;
    } else {
      return true;
    }
  };

  const updateUserPass = async () => {
    if (!password || !confPassword) {
      toast({
        title: "Please Fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confPassword) {
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
        `/api/user/reset-password/${id}/${token}`,
        {
          password,
        },
        config
      );
      // console.log(data);
      toast({
        title: "Password update Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      history.push("/");
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
    <Container maxW="xl" centerContent>
      <Box
        bg="white"
        w="80%"
        h={490}
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        mt={130}
      >
        <Text
          fontSize="3xl"
          fontFamily="Work sans"
          fontWeight={"bold"}
          textAlign="center"
          mt={7}
          ml={1}
          mr={1}
        >
          Create a new password
        </Text>
        <Text
          fontSize="sm"
          fontFamily="Work sans"
          textAlign="center"
          mt={2}
          ml={7}
          mr={8}
        >
          Your password must be at least eight characters and should include a
          combination of numbers, letters and special characters.
        </Text>
        <VStack spacing="1px">
          {/* <form style={{ width: "100%" }} onSubmit={validate()}> */}
          <FormControl id="password" isRequired>
            <FormLabel ml={39.9} mt={30}>
              New Password
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                ml={39.9}
                width="72%"
                placeholder="Enter Your New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // onfocuschanged={validatePassword}
              />

              <InputRightElement width="4.5rem">
                <button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </button>
              </InputRightElement>
            </InputGroup>
            {/* <span
              id="invpass"
              style={{
                color: "red",
                fontSize: "10px",
                paddingLeft: "39.9px",
              }}
            ></span> */}
          </FormControl>

          <FormControl id="confpassword" isRequired>
            <FormLabel ml={39.9} mt={1}>
              New Password, again
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                ml={39.9}
                width="72%"
                placeholder="Enter Your New Password Again"
                onChange={(e) => {
                  setConfPassword(e.target.value);
                }}
                // onKeyUp={validateCnfPassword}
              />
              <InputRightElement width="4.5rem">
                <button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </button>
              </InputRightElement>
            </InputGroup>

            {/* <span
              id="invconfpass"
              style={{
                color: "red",
                paddingLeft: "39.9px",
                fontSize: "10px",
              }}
            ></span> */}
          </FormControl>

          <Button
            id="reset"
            colorScheme="blue"
            width="40%"
            style={{ marginTop: 12 }}
            ml={115}
            onClick={updateUserPass}
          >
            Reset Password
          </Button>
          {/* </form> */}
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPassword;
