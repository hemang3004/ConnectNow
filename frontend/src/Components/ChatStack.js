import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import CryptoJS from "crypto-js";
import axios from "axios";
// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:5000";
// var socket;

const ChatStack = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const decryptMsg = (key, message) => {
    return (message = CryptoJS.AES.decrypt(message, key).toString(
      CryptoJS.enc.Utf8
    ));
  };

  const fetchChats = async () => {
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

  const isChatSelected = (chat) => {
    return selectedChat && selectedChat._id === chat._id;
  };

  const hasUnreadMessages = (chat) => {
    return chat.latestMessage?.sender?.id !== user._id;
  };

  const getChatBgColor = (chat) => {
    if (isChatSelected(chat)) {
      return hasUnreadMessages(chat) ? "#4c6ed5" : "#E8E8E8";
    } else {
      return "#E8E8E8";
    }
  };

  const getChatTextColor = (chat) => {
    return isChatSelected(chat) ? "white" : "black";
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Stack overflowY="scroll">
      {chats.map((chat,index) =>{ 
        var lastSeen="";
        chat?.lastSeen.forEach(element => {
          if(element.participant===String(user._id)){
            lastSeen=element.lastTime
            console.log(lastSeen,index)
          }
          
        });
        console.log(lastSeen<chat?.latestMessage?.time)
        return (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          // bg={selectedChat === chat ? "#4c6ed5" : "#E8E8E8"}
          // color={selectedChat === chat ? "white" : "black"}
          bg={getChatBgColor(chat)}
          color={getChatTextColor(chat)}
          px={3}
          py={2}
          borderRadius="lg"
          key={chat._id}
        >
          <Text>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </Text>
          {chat.latestMessage && (
            <Text fontSize="xs">
              <Text fontWeight={lastSeen<chat?.latestMessage?.time? "bold":"normal"} display={"inline"}>{chat.latestMessage.sender.name} : </Text>
              <Text 
               fontWeight={lastSeen<chat?.latestMessage?.time? "bold":"normal"} display={"inline"}
              >
              {chat.latestMessage.content.length > 50
                ? decryptMsg(chat._id, chat.latestMessage.content).substring(
                    0,
                    51
                  ) + "..."
                : decryptMsg(chat._id, chat.latestMessage.content)}
              </Text>
              
            </Text>
          )}
        </Box>
      )})}
    </Stack>
  );
};

export default ChatStack;
