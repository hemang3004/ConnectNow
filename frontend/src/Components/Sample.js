import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TiGroup } from "react-icons/ti";
import { BiMessageDots } from "react-icons/bi";
import io from "socket.io-client";
import axios from "axios";

const Sample = () => {
  return (
    <>
      <Box
        width="100%"
        m={0}
        bg={"#fffff"}
        //   borderWidth="1px"
      >
        <Text
          justifyContent={"center"}
          w="100%"
          display={"flex"}
          fontSize={"2xl"}
          fontWeight={"semibold"}
        >
          BVM
        </Text>
        <Stack spacing={5} mt={2} direction={"row"} justifyContent={"center"}>
          <Box
            //   onClick={() => {
            //     handleClick("Chats");
            //   }}
            display="flex"
            cursor="pointer"
            //   bg={selectedItem === "Chats" ? "#4c6ed5" : "#ffffff"}
            //   color={selectedItem === "Chats" ? "#ffffff" : "black"}
            key={1}
            w={"4.5%"}
            borderRadius="lg"
            // borderWidth="1px"
          >
            <Icon
              as={BiMessageDots}
              ml={{ md: 3, sm: 3, base: 3 }}
              boxSize={{ md: 6, sm: 5, base: 5 }}
              h={{ md: 12, sm: 12, base: 12 }}
            />
          </Box>

          <Box
            //   onClick={() => {
            //     handleClick("Channel");
            //   }}
            display="flex"
            cursor={"pointer"}
            //   bg={selectedItem === "Channel" ? "#4c6ed5" : "#ffffff"}
            //   color={selectedItem === "Channel" ? "#ffffff" : "black"}
            key={2}
            w={"4.5%"}
            borderRadius="lg"
            // borderWidth="1px"
          >
            <Icon
              as={TiGroup}
              ml={{ md: 3, sm: 3, base: 3 }}
              boxSize={{ md: 6, sm: 5, base: 5 }}
              h={{ md: 12, sm: 12, base: 12 }}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Sample;
