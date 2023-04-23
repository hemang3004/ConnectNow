// context provides a way to pass data through the component tree without having to pass props down manually at every level

import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

// creating context
const ChatContext = createContext();
const ENDPOINT = "http://localhost:5000";
var socket = io(ENDPOINT);

// provide the value that need to use direct in diff pages
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [channelNotification, setChannelNotification] = useState([]);
  const [chats, setChats] = useState();
  const [channels, setChannels] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  // for displaying lastest msg on chat box to do
  const [newMsg, setNewMsg] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Chats");
  const [selectedChannel, setSelectedChannel] = useState();
  const [verifiedEmail, setVerifiedEmail] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const history = useHistory();
  useEffect(()=>{

  },[])
  useEffect(() => {
    //   fetching userinfo from local storage that is logged in or signed up
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    setUser(userInfo);
    const url = window.location.href.toString();
    //   if user not logged in then redirect to homepage
    if (!userInfo) {
      let pathName = url.split("/");
      
      let path = pathName[3];
      if (path === "reset-password") {
        path += "/" + pathName[4] + "/" + pathName[5];
        history.push(`/${path}`);
      }else if(pathName.pop()!="verify"){
        history.push("/")
      }
    }else{
    
    socket.emit("setup", userInfo);
    socket.on("connected", () =>{
      setSocketConnected(true);
    } );
    }
    
    
  }, [history]);
  
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        newMsg,
        setNewMsg,
        selectedItem,
        setSelectedItem,
        selectedChannel,
        setSelectedChannel,
        channels,
        setChannels,
        channelNotification,
        setChannelNotification,
        verifiedEmail,
        setVerifiedEmail,
        socket,
        activeUsers,
        setActiveUsers

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// use the context
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
