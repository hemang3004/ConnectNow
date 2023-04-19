import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import MyChannel from "../Components/MyChannel";
import { ChatState } from "../Context/ChatProvider";
import ChannelBox from "../Components/ChannelBox";

const ChannelPage = () => {
  const { user, setUser } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="100vh"
        pl="3px"
      >
        {user && <MyChannel fetchAgain={fetchAgain} />}
        {user && (
          <ChannelBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChannelPage;
