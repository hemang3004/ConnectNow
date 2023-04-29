import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import ChatBox from "../Components/ChatBox";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
const MyChats = React.lazy(() => import("../Components/MyChats"));
const ChatPages = () => {
  // taking user state from context api

  const history = useHistory();
  const {
    user,
    setUser,
    activeUsers,
    setActiveUsers,
    socket,
    setNotification,
  } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    //   fetching userinfo from local storage that is logged in or signed up
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setNotification(userInfo.notification);
    console.log(userInfo.notification);
    userInfo.notification = [];
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUser(userInfo);
    socket.emit("addUsers", userInfo);

    //   if user not logged in then redirect to homepage
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  window.addEventListener("beforeunload", () => {
    // Emit a "disconnect" event to the server
    socket.emit("disconnect");
  });

  useEffect(() => {
    socket.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="100vh"
        pl="3px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPages;