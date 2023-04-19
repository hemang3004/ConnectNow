import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

let x;
const breakpoints = {
  base: "250px",
  sm: "600px",
  md: "1300px",
  lg: "950px",
  xl: "2304px",
  "2xl": "4096px",
};
const theme = extendTheme({ breakpoints });

const UpdateProfile = () => {
  const { user, setUser } = ChatState();
  const toast = useToast();
  const history = useHistory();
  const [name, setName] = useState(user.name);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState(user.pic);
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [item, setItem] = useState("Edit Profile");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // const handleClick = () => setShow(!show);

  const inputRef = useRef(null);

  const logoutHandler = () => {
    setIsOpen(false);
    localStorage.removeItem("userInfo");
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  const handleClicked = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    console.log("pics ", pics);
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
      data.append("cloud_name", "dm37epkmg");
      fetch("https://api.cloudinary.com/v1_1/dm37epkmg/image/upload", {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const id = user._id;
      const { data } = await axios.post(
        "/api/user/update-user",
        {
          name,
          pic,
          id,
        },
        config
      );
      console.log(data);
      toast({
        title: "Update Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setUpdated((prevUpdated) => {
        prevUpdated = prevUpdated + 1;
      });
      setPicLoading(false);
      history.push("/main");
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

  const passwordChange = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const id = user._id;
      const password = oldPassword;
      const { data } = await axios.get(
        `/api/user/verify-password/${id}/${password}`,
        config
      );

      if (!x) {
        toast({
          title: "Passwords Must be in format ",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if (newPassword !== confirmpassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if (data) {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          await axios
            .post("/api/user/update-password", { id, newPassword }, config)
            .then((res) => {
              console.log(res.data);
              setIsOpen(true);
              setAlertMessage(
                "Your password has been updated successfully. Please log in again."
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {}
      } else {
        toast({
          title: "Error Occured!",
          description: "Old PassWord is not correct",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "PassWord not updated",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitEmailHandlerForPassword = async () => {
    const email = user.email;
    console.log("email ", email);
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
      // history.push("/");
    } catch (error) {
      toast({
        title: "Email not sent!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const deletePicture = async () => {
    setPic(null);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const id = user._id;
      const { data } = await axios.post("/api/user/remove-pic", { id }, config);

      toast({
        title: "Profile removed Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setUpdated((prevUpdated) => {
        prevUpdated = prevUpdated + 1;
      });
      // history.push("/");
    } catch (error) {
      toast({
        title: "Please Upload Image First!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const validatePassword = () => {
    var regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexPass.test(newPassword)) {
      x = false;
      return false;
    } else {
      x = true;
      return true;
    }
  };

  useEffect(() => {
    console.log("updated", updated);
    // window.location.reload();
  }, [updated]);

  useEffect(() => {
    if (oldPassword && newPassword && confirmpassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [oldPassword, newPassword, confirmpassword]);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <HStack
          mb={10}
          mt={10}
          ml={20}
          mr={20}
          justifyContent="center"
          alignItems="center"
          overflow={"hidden"}
        >
          <Box
            width={{ base: "100%", md: "22%" }}
            display={{ base: "none", md: "block", sm: "none" }}
            mr={0}
            bg={"#ffffff"}
            borderWidth="1px"
            h={{ base: "auto", md: "90vh" }}
          >
            <Box mt={250}>
              <Text
                fontSize={{ base: 20, md: 25 }}
                fontWeight={"semibold"}
                ml={{ base: 1, md: 14 }}
                mt={{ base: 10, md: 5 }}
                mb={5}
              >
                Update User
              </Text>
            </Box>
            <Stack mt={10} height={{ base: "auto", md: "10vh" }}>
              <Box
                onClick={() => {
                  setItem("Edit Profile");
                }}
                display="flex"
                cursor="pointer"
                bg={item === "Edit Profile" ? "#2b6cb0" : "#ffffff"}
                color={item === "Edit Profile" ? "#ffffff" : "black"}
                w={{ base: "100%", md: "93%" }}
                ml={{ base: 0, md: 2 }}
                mr={{ base: 0, md: 2 }}
                mb={{ base: 4, md: 0 }}
              >
                <Text
                  display={"grid"}
                  m={"auto"}
                  mb={0}
                  h={"5vh"}
                  alignContent={"center"}
                >
                  Edit Profile
                </Text>
              </Box>

              <Box
                onClick={() => {
                  setItem("Change Password");
                }}
                display="flex"
                cursor="pointer"
                bg={item === "Change Password" ? "#2b6cb0" : "#ffffff"}
                color={item === "Change Password" ? "#ffffff" : "black"}
                w={{ base: "100%", md: "93%" }}
                ml={{ base: 0, md: "8px !important" }}
                mr={{ base: 0, md: "8px !important" }}
              >
                <Text
                  display={"grid"}
                  m={"auto"}
                  h={"5vh"}
                  alignContent={"center"}
                >
                  Change Password
                </Text>
              </Box>
            </Stack>
          </Box>

          {item === "Edit Profile" && (
            <Box
              display={"flex"}
              flexDir="column"
              p={3}
              bg="white"
              w={"78%"}
              maxWidth={{ base: "60%", sm: "80%", md: "80%", lg: "80%" }}
              borderWidth="1px"
              h={"90vh"}
              ml={"0px !important"}
            >
              <Box
                display={"flex"}
                alignItems="center"
                w={"80%"}
                ml={"auto"}
                mr={"auto"}
                flexDir="column"
              >
                <Text
                  // fontSize={30}
                  fontSize={["xl", "2xl", "3xl"]}
                  fontWeight={"semibold"}
                  mt={2}
                >
                  Edit Profile
                </Text>
              </Box>
              <Stack
                mt={35}
                direction={{ sm: "column", base: "column", md: "row" }}
                spacing={{ base: "20px", md: "0px" }}
                // bg={"#e8e8e8"}
              >
                <Box
                  w={{ base: "80%", md: "40%", sm: "80%" }}
                  ml={{
                    base: "0px !important",
                    md: "5%",
                    sm: "10px !important",
                  }}
                  m={{ md: 2 }}
                  // ml={5}
                  p={{ md: 5 }}
                >
                  <form style={{ width: "100%" }}>
                    <FormControl
                      id="pic"
                      ml={{
                        base: "25px !important",
                        md: "0% !important",
                        sm: "10px !important",
                      }}
                    >
                      <FormLabel mb={5} ml={{ base: 10, md: 0, sm: 0 }}>
                        Profile Picture
                      </FormLabel>
                      <Stack
                        direction={{ base: "column", md: "row", sm: "row" }}
                      >
                        <Avatar
                          size={{ md: "2xl", sm: "xl", base: "xl" }}
                          cursor="pointer"
                          name={user?.name}
                          src={user?.pic}
                          ml={2}
                          mr={5}
                        />
                        <VStack>
                          <Button
                            leftIcon={<MdEdit />}
                            w={{ base: "85%", md: "100%", sm: "90%" }}
                            fontSize={{
                              sm: "14px !important",
                              md: "16px !important",
                              base: "10px !important",
                            }}
                            mt={{ base: 0, md: 5, sm: 0 }}
                            onClick={handleClicked}
                          >
                            Update Profile Picture
                          </Button>
                          <Input
                            display={"none"}
                            type="file"
                            ref={inputRef}
                            p={1.5}
                            accept="image/*"
                            onChange={(e) => {
                              postDetails(e.target.files[0]);
                            }}
                          />
                          <Button
                            leftIcon={<MdDelete />}
                            w={{ base: "85%", md: "100%", sm: "90%" }}
                            fontSize={{
                              sm: "14px !important",
                              md: "16px !important",
                              base: "10px !important",
                            }}
                            onClick={deletePicture}
                          >
                            Remove Profile Picture
                          </Button>
                        </VStack>
                      </Stack>
                    </FormControl>
                  </form>
                </Box>

                <Box
                  w={{ base: "80%", md: "60%" }}
                  m={2}
                  mr={{ base: "0px !important", md: "5%" }}
                  ml={{ base: "20px !important", md: "0%", sm: "60px" }}
                  p={{ base: 0, md: 5 }}
                >
                  <form style={{ width: "100%" }}>
                    <FormControl id="first-name" mt={14}>
                      <HStack>
                        <FormLabel fontSize={{ base: 15, sm: 16 }}>
                          Name
                        </FormLabel>
                        <Input
                          placeholder="Enter Your Name"
                          type={"text"}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          defaultValue={user.name}
                          w={{ base: "40%", md: "60%", sm: "60%" }}
                        />
                      </HStack>
                    </FormControl>

                    <FormControl id="email" mt={3}>
                      <Stack
                        direction={{ base: "column", md: "row", sm: "row" }}
                      >
                        <FormLabel fontSize={{ base: 15, sm: 16 }}>
                          Email
                        </FormLabel>
                        <Input
                          placeholder="Enter Your Email"
                          value={user.email}
                          disabled="true"
                          fontSize={{
                            base: "90% !important",
                            sm: "70% important",
                            md: "100% !important",
                          }}
                          // fontSize={"15%"}
                          ml={"12px !important"}
                          w={{ base: "50%", md: "60%", sm: "60%" }}
                        />
                      </Stack>
                    </FormControl>
                  </form>
                </Box>
              </Stack>

              <Stack
                w={"100%"}
                ml={{
                  base: "0px !important",
                  lg: "15% important",
                  sm: "10% important",
                  md: "15% !important",
                }}
                direction={{
                  base: "column",
                  md: "row",
                  sm: "column",
                  lg: "row",
                }}
              >
                <Button
                  colorScheme="blue"
                  width="15%"
                  w={{ md: "15%", base: "40%", sm: "40%", lg: "30%" }}
                  fontSize={{ base: "10px", lg: "15px", sm: "12px" }}
                  // m={"auto"}
                  // ml={20}
                  ml={{ md: 20, base: "60px !important" }}
                  mr={2}
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={picLoading}
                >
                  Update
                </Button>
                <Button
                  colorScheme="blue"
                  // width="15%"
                  // m={"auto"}
                  // ml={2}
                  mr={5}
                  w={{ md: "15%", base: "40%", sm: "40%", lg: "30%" }}
                  fontSize={{ base: "10px", lg: "15px", sm: "12px" }}
                  // m={"auto"}
                  // ml={20}
                  ml={{ md: 20, base: "60px !important" }}
                  style={{ marginTop: 15 }}
                  onClick={submitHandler}
                  isLoading={picLoading}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          )}

          {item === "Change Password" && (
            <Box
              display={"flex"}
              flexDir="column"
              p={150}
              // p={{ base: 10 }}
              pl={{ base: 10, md: 150, sm: 0, lg: 0 }}
              pt={{ base: 20, md: 150, sm: 100, lg: 100 }}
              pr={{ base: 10, md: 150 }}
              pb={{ base: 10, md: 150, sm: 0, lg: 0 }}
              bg="white"
              w={"78%"}
              maxWidth={{ base: "100%", md: "80%", lg: "80%" }}
              borderWidth="1px"
              h={"90vh"}
              ml={"0px !important"}
            >
              <HStack>
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.pic}
                  ml={{
                    md: "85px !important",
                    sm: "120px !important",
                    lg: "180px !important",
                    base: "30px !important",
                  }}
                  mr={5}
                />
                <Text
                  fontSize={{
                    md: "20px !important",
                    lg: "16px !important",
                    sm: "14px !important",
                    base: "12px !important",
                  }}
                  fontWeight={"semibold"}
                  mt={2}
                  ml={"22px !important"}
                >
                  {user.name}
                </Text>
              </HStack>
              <Text
                fontSize={{
                  md: "11px !important",
                  lg: "10px !important",
                  sm: "9px !important",
                  base: "8px !important",
                }}
                fontWeight={"semibold"}
                mt={2}
                // ml={"22px !important"}
                ml={{
                  base: "60px !important",
                  sm: "150px !important",
                  md: "160px !important",
                  lg: "200px !important",
                }}
              >
                {
                  "Password must be atleast 8 characters and must be combination of letters, numbers and special characters!"
                }
              </Text>
              <form style={{ width: "100%" }}>
                <FormControl id="old-password" mt={8}>
                  <HStack>
                    <FormLabel
                      textAlign={"right"}
                      w={{ base: "50%", md: "20%" }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                    >
                      Old password
                    </FormLabel>
                    <Input
                      placeholder="Old Password"
                      type={"password"}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                      w={{ base: "50%", md: "45%", sm: "40%", lg: "35%" }}
                    />
                  </HStack>
                </FormControl>

                <FormControl id="new-password" mt={3}>
                  <HStack>
                    <FormLabel
                      textAlign={"right"}
                      w={{ base: "50%", md: "20%" }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                    >
                      New password
                    </FormLabel>
                    <Input
                      placeholder="New password"
                      type={"password"}
                      w={{ base: "50%", md: "45%", sm: "40%", lg: "35%" }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                      onKeyUp={validatePassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </HStack>
                </FormControl>
                <FormControl id="cnf-new-password" mt={2}>
                  <HStack>
                    <FormLabel
                      textAlign={"right"}
                      w={{ base: "50%", md: "20%" }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                    >
                      Confirm New Password
                    </FormLabel>
                    <Input
                      placeholder="Confirm new password"
                      type={"password"}
                      w={{ base: "50%", md: "45%", sm: "40%", lg: "35%" }}
                      fontSize={{
                        md: "16px !important",
                        lg: "14px !important",
                        sm: "14px !important",
                        base: "10px !important",
                      }}
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                      }}
                    />
                  </HStack>
                </FormControl>
              </form>
              <Stack>
                <Button
                  id="change-pass"
                  colorScheme="blue"
                  w={{ md: "30%", base: "60%", sm: "30%", lg: "25%" }}
                  ml={{
                    base: "80px !important",
                    sm: "220px !important",
                    md: "160px !important",
                    lg: "300px !important",
                  }}
                  fontSize={{ base: "9px", sm: "12px", md: "15px", lg: "13px" }}
                  style={{ marginTop: 25 }}
                  onClick={passwordChange}
                  isLoading={picLoading}
                  isDisabled={isDisabled}
                  cursor="pointer !important"
                >
                  Change Password
                </Button>
                <Button
                  colorScheme="white"
                  color="#718096"
                  ml={{
                    base: "60px !important",
                    sm: "150px !important",
                    md: "160px !important",
                    lg: "200px !important",
                  }}
                  width={{ md: "30%", base: "60%", sm: "60%", lg: "60%" }}
                  fontWeight={{ bold: 650 }}
                  fontSize={{
                    base: "9px",
                    sm: "12px",
                    md: "15px",
                    lg: "13px",
                  }}
                  style={{ marginTop: 15 }}
                  pl={{
                    base: "0px !important",
                    md: "0px !important",
                    sm: "0px !important",
                    lg: "0px !important",
                  }}
                  pr={{ base: 0, md: 0 }}
                  onClick={submitEmailHandlerForPassword}
                >
                  Forgotten your password?
                </Button>
              </Stack>
              <AlertDialog isOpen={isOpen} isCentered>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader>Alert</AlertDialogHeader>
                    <AlertDialogBody>{alertMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                      <Button onClick={logoutHandler} colorScheme="red" ml={3}>
                        OK
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          )}
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default UpdateProfile;
