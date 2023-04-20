import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
const SideBar=React.lazy(()=>import("../Components/SideBar"))
const UpdateProfile=React.lazy(()=>import("../Components/UpdateProfile"))
const ChannelPage=React.lazy(()=>import("./ChannelPage"))
const ChatPages=React.lazy(()=>import("./ChatPages"))
const ResetPage=React.lazy(()=>import("./ResetPage"))

const MainPage = () => {
  const { user, setUser, selectedItem } = ChatState();
  const history = useHistory();
  useEffect(() => {
    //   fetching userinfo from local storage that is logged in or signed up
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // if user not logged in then redirect to homepage
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <Box height="100vh" overflow="hidden" display="flex" p={0}>
      <SideBar />

      <Box width="1440px" ml={0}>
        {selectedItem === "Chats" && <ChatPages />}
        {selectedItem === "Channel" && <ChannelPage />}
        {selectedItem === "ResetPage" && <ResetPage />}
        {selectedItem === "UpdateUser" && <UpdateProfile />}
      </Box>
    </Box>
  );
};

export default MainPage;
