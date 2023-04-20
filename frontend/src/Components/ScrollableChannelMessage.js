import { Avatar, Box, TagLeftIcon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css";

const ScrollableChannelMessage = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map(
          (m, i) =>
            (m.content !== "Video call" && (
              <Box style={{ display: "flex" }} key={m._id} ml={10}>
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="25px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>

                <span
                  style={{
                    backgroundColor: `${m.title ? "#BEE3F8" : "#B9F5D0"}`,
                    marginLeft: 20,
                    marginTop: 20,
                    padding: "5px 15px",
                    width: "78%",
                    maxWidth: "80%",
                  }}
                >
                  <Box fontWeight={"semibold"} fontSize={"sm"}>
                    {m.sender.name}
                  </Box>
                  <Box
                    ml={2}
                    fontWeight={"bold"}
                    color="red.600"
                    fontSize={"xl"}
                  >
                    {m.title}
                  </Box>
                  <Box ml={2}>{m.content}</Box>
                </span>
              </Box>
            )) ||
            (m.content === "Video call" && (
              <Box display="flex" justifyContent="center">
                <h1>
                  <Text alignItems={"center"} color="#4c6ed5" padding="0 10px">
                    {m.sender.name && `${m.sender.name} started video call`}
                  </Text>
                </h1>
              </Box>
            ))
        )}
    </ScrollableFeed>
  );
};

export default ScrollableChannelMessage;
