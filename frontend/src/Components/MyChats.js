import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import Notification from "./miscellaneous/Notification"

// import CryptoJS from "crypto-js";
import ChatStack from "./ChatStack";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats, newMsg } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();
  // const chatSelect = selectedChat;
  const toast = useToast();

  const fetchChats = async () => {
    // setSelectedChat(chatSelect);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // give list of chats
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // console.log("chats : ", selectedChat);
  useEffect(() => {
    fetchChats();
    // setSelectedChat(chatSelect);
  }, [newMsg]);
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      mr={1}
      borderWidth="1px"
      height={"100%"}
    >
      <Box display="flex" justifyContent={"space-evenly"}>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        marginRight={16}
      >
        My Chats
        </Box>
        <Box display="flex" marginLeft={9}>
<GroupChatModal>

<Tooltip label="New Group Chat" hasArrow placement="bottom-end">
  <IconButton
  display="flex"
  fontSize={{ base: "10px", md: "10px", lg: "17px" }}
  icon={<AddIcon />}
  >

  </IconButton>
          
</Tooltip>
</GroupChatModal>        
<Notification/>

      </Box>
      </Box>
      
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {/* if there is chat then display chats other show chatloading */}

        {chats ? <ChatStack fetchAgain={fetchAgain} /> : <ChatLoading />}
      </Box>
    </Box>
  );
};

export default MyChats;
