import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Text,
  Container,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ResetPage = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const loginHandler = () => {
    history.push("/");
  };

  const submitHandlerForPassword = async () => {
    setLoading(true);
    if (!email) {
      toast({
        title: "Please Fill Email Feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/forgot-password",
        { email },
        config
      );

      toast({
        title: "Email Sent Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      toast({
        title: "Email not sent!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
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
          Forgot Password?
        </Text>
        <Text
          fontSize="sm"
          fontFamily="Work sans"
          textAlign="center"
          ml={7}
          mr={7}
          mt={1}
        >
          Enter your email address and we'll send you a link to get back into
          your account.
        </Text>
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel ml={39.9} mt={30}>
              Email
            </FormLabel>
            <Input
              ml={39.9}
              width="80%"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="80%"
            style={{ marginTop: 15 }}
            onClick={submitHandlerForPassword}
            cursor="pointer"
            // isDisabled={true}
          >
            Send Login Link
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
            onClick={loginHandler}
          >
            Back to Login
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPage;
