import { Avatar, Box, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";

const ChannelStack = ({ fetchAgain }) => {
  const { user, selectedChannel, setSelectedChannel, channels, setChannels } =
    ChatState();
  const toast = useToast();

  const fetchChannels = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // give list of chats
      const { data } = await axios.get("/api/channel", config);
      setChannels(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the channels",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [fetchAgain]);

  return (
    <Stack overflowY="scroll">
      {channels.map((channel) => (
        <Box
          onClick={() => setSelectedChannel(channel)}
          cursor="pointer"
          bg={selectedChannel === channel ? "#4c6ed5" : "#E8E8E8"}
          color={selectedChannel === channel ? "white" : "black"}
          px={3}
          py={2}
          borderRadius="lg"
          key={channel._id}
        >
          <HStack>
            <Avatar name={channel?.channelName} size={"sm"}></Avatar>
            <Text>{channel.channelName}</Text>
          </HStack>
        </Box>
      ))}
    </Stack>
  );
};

export default ChannelStack;
