import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChannel from "./SingleChannel";

const ChannelBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChannel, setSelectedChannel } = ChatState();
  return (
    <Box
      display={{ base: selectedChannel ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "77.8%" }}
      // borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChannel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChannelBox;
