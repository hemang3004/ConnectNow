import { AddIcon, BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  effect,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ChannelStack from "./ChannelStack";
import ChatLoading from "./ChatLoading";
import ChannelModal from "./miscellaneous/ChannelModal";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";

const MyChannel = ({ fetchAgain }) => {
  const {
    user,
    selectedChannel,
    setSelectedChannel,
    channels,
    setChannels,
    channelNotification,
    setChannelNotification,
  } = ChatState();
  const toast = useToast();

  useEffect(() => {
    fetchChannels();
    // console.log("notif ", channelNotification);
  }, [fetchAgain]);

  const fetchChannels = async () => {
    // setSelectedChat(chatSelect);
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
  return (
    <Box
      display={{ base: selectedChannel ? "none" : "flex", md: "flex" }}
      flexDir="column"
      // alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "22%" }}
      //   borderRadius="lg"
      borderWidth="1px"
      h={"100%"}
    >
      <Box justifyContent={"space-between"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          // display={"flex"}
        >
          <Box
            pb={3}
            px={3}
            fontSize={{ base: "28px", md: "25px" }}
            fontFamily="Work sans"
            display="flex"
            w="100%"
          >
            Channels
          </Box>
          <Box>
            <Menu>
              <MenuButton p="1">
                <NotificationBadge
                  count={channelNotification.length}
                  effect={effect.SCALE}
                />
                <BellIcon fontSize="2xl" m="1" />
              </MenuButton>
              {/* if notification lengh is 0 then display no new notification */}
              <MenuList pl={4}>
                {/* {!notification.length && "No new Messages"} */}

                {/* {!notification.length && "No New Messages"} */}
                {channelNotification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChannel(notif.channel);
                      setChannelNotification(
                        channelNotification.filter((n) => n !== notif)
                      );
                    }}
                  >
                    {`Video Call from ${notif.channel.channelName}`}
                    {/* <div>Video Call from</div> */}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Stack>
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

        {channels ? <ChannelStack fetchAgain={fetchAgain} /> : <ChatLoading />}
      </Box>
      <Box justifyContent={"center"} display={"flex"}>
        <ChannelModal>
          <Button
            bg=""
            display="flex"
            fontSize={{ base: "17px", md: "13px !important", lg: "17px" }}
            leftIcon={<AddIcon />}
          >
            New Channel
          </Button>
        </ChannelModal>
      </Box>
    </Box>
  );
};

export default MyChannel;
