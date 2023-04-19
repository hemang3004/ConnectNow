import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Stack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { ArrowBackIcon, Icon } from "@chakra-ui/icons";
import {
  MdAttachFile,
  MdManageAccounts,
  MdVideoCall,
  MdGroupAdd,
} from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import io from "socket.io-client";

import { useHistory } from "react-router-dom";
import UserListItem from "./UserAvatar/UserListItem";

const ENDPOINT = "http://localhost:5000";
var socket;
const SingleChannel = ({ fetchAgain, setFetchAgain }) => {
  const {
    selectedChannel,
    setSelectedChannel,
    user,
    socket,
    channelNotification,
    setChannelNotification,
  } = ChatState();
  const modalDisclosure = useDisclosure();
  const alertDisclosure = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Chats");
  const [videoCallOn, setVideoCallOn] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [videoCallMsg, setvideoCallMsg] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();
  const history = useHistory();

  const handleClick = (component) => {
    setSelectedItem(component);
  };

  const fetchMessages = async () => {
    if (!selectedChannel) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      // const { data } = await axios.get(
      //   `/api/message/${selectedChannel._id}`,
      //   config
      // );
      // setMessages(data);
      // console.log("decrypt data ", data);

      setLoading(false);

      socket.emit("join chat", selectedChannel._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendNotification = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      //  setNewMessage("");

      const { data } = await axios.post(
        "/api/channelmessage",
        {
          content: "video call",
          channelId: selectedChannel,
        },
        config
      );

      console.log("new msgsss ", data);

      socket.emit("group video", data);
      //  setMessages([...messages, data]);
      //  setNewMsg([...newMsg, data]);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // for delete a user
  const handleRemove = async (user1) => {
    if (
      selectedChannel.channelAdmin._id !== user._id &&
      user1._id !== user._id
    ) {
      toast({
        title: "Only admin can remove a user!",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      // setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/channel/channelremoveuser`,
        {
          channelId: selectedChannel._id,
          userId: user1._id,
        },
        config
      );

      // if logged in user is admin and remove him self then we don't want that a user see a group as he left group
      user1._id === user._id ? setSelectedChannel() : setSelectedChannel(data);
      setFetchAgain(!fetchAgain);
      // fetchMessages();
      // setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      // setLoading(false);
    }
    // setGroupChatName("");
  };

  // handle user , handleadd user and handle search for add user
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleUser = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/channel/channeladduser`,
        {
          channelId: selectedChannel._id,
          userId: selectedUsers.map((u) => u._id),
        },
        config
      );

      setSelectedChannel(data);
      modalDisclosure.onClose();
      setSelectedUsers([]);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  
  // for delete channel
  const deleteHandler = async () => {
    console.log(user.token);
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      console.log("in delete");
      const data = await axios.put(
        `/api/channel/channeldelete`,
        {
          channelId: selectedChannel._id,
        },
        config
      );

      console.log("in delete 2");
      window.location.reload();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const startVideoCall = async () => {
    socket.emit("join video", selectedChannel._id, user.name,user._id);
    if (!videoCallOn) {
      socket.emit(
        "show calling",
        selectedChannel._id,
        user._id,
        selectedChannel
      );
      sendNotification();
    }
    history.push("/video-call");
  };
  useEffect(()=>{
    console.log(selectedChannel)
    socket.emit("isVideoOn",selectedChannel?._id);
    socket.on("VideoOn",(res)=>setVideoCallOn(res))
  },[selectedChannel])
  useEffect(() => {
    // socket = io(ENDPOINT);
    socket.emit("setup", user);
    
    socket.on("connected", () => setSocketConnected(true));
    socket.on("show calling", () => setVideoCallOn(true));
  }, []);

  useEffect(() => {
    socket.on("group video recieved", (channel) => {
      setChannelNotification([channel, ...channelNotification]);
      console.log("ch", channel);
      // console.log("selected ", channelNotification);
    });
  });

  useEffect(() => {
    fetchMessages();

    //  selectedChatCompare = selectedChat;
  }, [selectedChannel]);

  return (
    <>
      {selectedChannel ? (
        <>
          <Box width="100%" m={0} bg={"#fffff"} borderBottomWidth="2px">
            <Text
              justifyContent={"center"}
              w="100%"
              display={"flex"}
              fontSize={"2xl"}
              fontWeight={"semibold"}
            >
              {selectedChannel.channelName}
            </Text>
            <Text
              justifyContent={"center"}
              w="100%"
              display={"flex"}
              fontSize={"md"}
              fontWeight={"light"}
            >
              {selectedChannel.discription}
            </Text>
            <Stack
              spacing={5}
              mt={1}
              direction={"row"}
              justifyContent={"center"}
              // justifyContent={"space-between"}
            >
              <Box
                onClick={() => {
                  handleClick("Chats");
                }}
                display="flex"
                cursor="pointer"
                color={"black"}
                key={1}
                // ml={10}
                w={"4.5%"}
                style={{
                  borderBottomColor:
                    selectedItem === "Chats" ? "#4c6ed5" : "#ffffff",
                  borderBottomWidth: selectedItem === "Chats" ? "3px" : "0px",
                }}
              >
                <Icon
                  as={FaBloggerB}
                  ml={{ md: 3, sm: 3, base: 3 }}
                  boxSize={{ md: 6, sm: 5, base: 5 }}
                  h={{ md: 12, sm: 12, base: 12 }}
                />
              </Box>

              <Box
                onClick={() => {
                  handleClick("Channel");
                }}
                display="flex"
                cursor={"pointer"}
                color={"black"}
                key={2}
                w={"4.5%"}
                style={{
                  borderBottomColor:
                    selectedItem === "Channel" ? "#4c6ed5" : "#ffffff",
                  borderBottomWidth: selectedItem === "Channel" ? "3px" : "0px",
                }}
              >
                <Icon
                  as={MdManageAccounts}
                  ml={{ md: 3, sm: 3, base: 3 }}
                  boxSize={{ md: 6, sm: 5, base: 5 }}
                  h={{ md: 12, sm: 12, base: 12 }}
                />
              </Box>

              <Button
                leftIcon={<MdVideoCall />}
                onClick={startVideoCall}
                // colorScheme={videoCallOn ? "green" : "red"}
                _hover={{ backgroundColor: "green", color: "#ffffff" }}
                size={"lg"}
                bg={videoCallOn ? "red" : "#ffffff"}
                color={videoCallOn ? "white" : "black"}
                // bg={"#ffffff"}
                // style={videoCallOn ? colorScheme : "red"}
              >
                Meet
              </Button>
            </Stack>
          </Box>

          <HStack
            justifyContent={"start"}
            display="flex"
            w="100%"
            mt={2}
            mb={2}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChannel("")}
            />
          </HStack>

          {selectedItem === "Chats" && (
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {/* Messages ui */}
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                // {/* messages */}
                <div className="messages">
                  {/* <ScrollableChat messages={messages} /> */}
                </div>
              )}

              <FormControl
                //   onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={25}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
                <HStack>
                  <Input
                    variant="filled"
                    bg="#E0E0E0"
                    placeholder="Enter a message..."
                    //   onClick={handleInputClick}
                    //   onChange={typingHandler}
                    //   value={newMessage || transcript}
                  />

                  {/* <IconButton
                  icon={<MdOutlineMic />}
                  colorScheme="blue"
                  variant="solid"
                  // onClick={speechToText}
                  //   onClick={handleButtonClick}
                ></IconButton> */}

                  <IconButton
                    icon={<MdAttachFile />}
                    colorScheme="blue"
                    // backgroundColor="#E0E0E0"
                    variant="solid"
                  ></IconButton>
                </HStack>
              </FormControl>
            </Box>
          )}

          {selectedItem === "Channel" && (
            <Box
              pb={3}
              px={3}
              fontSize={{ base: "18px", md: "18px" }}
              fontFamily="Work sans"
              // display="flex"
              w="100%"
              // justifyContent="space-between"
              // alignItems="center"
            >
              <Box mt={1}>
                <Stack direction={"column"}>
                  <Text
                    justifyContent={"center"}
                    w="100%"
                    fontSize={{ base: "28px", md: "28px" }}
                    display={"flex"}
                  >
                    Members
                  </Text>

                  <Stack direction={"row"} justifyContent={"space-between"}>
                    {user._id === selectedChannel.channelAdmin._id && (
                      <Button
                        leftIcon={<MdGroupAdd />}
                        bg="#4c6ed5"
                        color={"#ffffff"}
                        _hover={{
                          backgroundColor: "#3953a2",
                          color: "#ffffff",
                        }}
                        onClick={modalDisclosure.onOpen}
                      >
                        Add Member
                      </Button>
                    )}

                    <Modal
                      onClose={() => {
                        modalDisclosure.onClose();
                        setSelectedUsers([]);
                      }}
                      isOpen={modalDisclosure.isOpen}
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader
                          fontSize="35px"
                          fontFamily="Work sans"
                          display="flex"
                          justifyContent="center"
                        >
                          {selectedChannel.channelName}
                        </ModalHeader>

                        <ModalCloseButton />

                        <ModalBody
                          display="flex"
                          flexDir="column"
                          alignItems="center"
                        >
                          <FormControl>
                            <Input
                              placeholder="Add Users"
                              mb={1}
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                          </FormControl>

                          <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                              <Badge
                                px={2}
                                py={1}
                                borderRadius="lg"
                                m={1}
                                mb={2}
                                variant="solid"
                                fontSize={12}
                                colorScheme="purple"
                                cursor="pointer"
                              >
                                {u.name}
                              </Badge>
                            ))}
                          </Box>

                          {loading ? (
                            // <ChannelLoading />
                            <div>Loading...</div>
                          ) : (
                            searchResult
                              ?.slice(0, 3)
                              .map((user) => (
                                <UserListItem
                                  key={user._id}
                                  user={user}
                                  handleFunction={() => handleUser(user)}
                                />
                              ))
                          )}
                        </ModalBody>

                        <ModalFooter>
                          <Button onClick={handleAddUser} colorScheme="blue">
                            Add User
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    {user._id === selectedChannel.channelAdmin._id && (
                      <Button
                        leftIcon={<RiDeleteBin6Fill />}
                        _hover={{
                          backgroundColor: "#cc0000",
                          color: "#ffffff",
                        }}
                        onClick={alertDisclosure.onOpen}
                      >
                        Delete Channel
                      </Button>
                    )}

                    <AlertDialog
                      isOpen={alertDisclosure.isOpen}
                      onClose={alertDisclosure.onClose}
                      isCentered
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader>Delete Channel</AlertDialogHeader>
                          <AlertDialogBody>
                            {"Are you sure want to delete channel?"}
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button onClick={alertDisclosure.onClose} ml={3}>
                              NO
                            </Button>
                            <Button
                              onClick={deleteHandler}
                              colorScheme="red"
                              ml={3}
                            >
                              YES
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Stack>
                </Stack>
              </Box>

              <Box
                display="flex"
                flexDir="column"
                p={3}
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
              >
                {selectedChannel.users.map((u) => (
                  <Box
                    // cursor="pointer"
                    px={3}
                    py={2}
                    h={47}
                    bg="#F8F8F8"
                    borderRadius="lg"
                    key={u._id}
                    mb={2}
                  >
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <HStack>
                        {u?.pic ? (
                          <Avatar
                            size="sm"
                            cursor="pointer"
                            name={u?.name}
                            src={u?.pic}
                            ml={2}
                          />
                        ) : (
                          <Avatar
                            size="sm"
                            cursor="pointer"
                            name={u?.name}
                            ml={2}
                          />
                        )}
                        {/* <Text>{u.name}</Text> */}
                        {u._id === selectedChannel.channelAdmin._id ? (
                          <Text>{u.name} (Admin)</Text>
                        ) : (
                          <Text>{u.name}</Text>
                        )}
                      </HStack>
                      {user._id === selectedChannel.channelAdmin._id && (
                        <Icon
                          as={TiDelete}
                          cursor={"pointer"}
                          boxSize={6}
                          onClick={() => handleRemove(u)}
                        />
                      )}
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </>
      ) : (
        // if channel not seleced

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a channel
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChannel;
