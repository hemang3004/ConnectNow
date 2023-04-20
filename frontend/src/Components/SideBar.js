import { CopyIcon, EmailIcon } from "@chakra-ui/icons";
import SideDrawer from "../Components/miscellaneous/SideDrawer";

import {
  Avatar,
  Box,
  ChakraProvider,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { TiGroup } from "react-icons/ti";
import { MdOutlineLogout } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { extendTheme } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

const breakpoints = {
  base: "100px",
  sm: "505px",
  md: "1351px",
  lg: "1229px",
  xl: "2304px",
  "2xl": "4096px",
};
const theme = extendTheme({ breakpoints });

const SideBar = () => {
  const { selectedItem, setSelectedItem, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (component) => {
    setSelectedItem(component);
  };

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box width="70px" m={0} bg={"#ffffff"} borderWidth="1px" minW={"65px"}>
        <Stack spacing={8} mt={5} ml={2}>
          <Icon as={RxHamburgerMenu} ml={3} boxSize={6} h={12} />
          {user && <SideDrawer />}

          <Box
            onClick={() => {
              handleClick("Chats");
            }}
            display="flex"
            cursor="pointer"
            bg={selectedItem === "Chats" ? "#4c6ed5" : "#ffffff"}
            color={selectedItem === "Chats" ? "#ffffff" : "black"}
            key={1}
            w={"85%"}
            borderRadius="lg"
            borderWidth="1px"
          >
            <Icon
              as={BiMessageDots}
              ml={{ md: 3, sm: 3, base: 3 }}
              boxSize={{ md: 6, sm: 5, base: 5 }}
              h={{ md: 12, sm: 10, base: 9 }}
            />

            {/* <Text display={"grid"} ml={8} alignContent={"center"}>
            Chats
          </Text> */}
          </Box>

          <Box
            onClick={() => {
              handleClick("Channel");
            }}
            display="flex"
            cursor={"pointer"}
            bg={selectedItem === "Channel" ? "#4c6ed5" : "#ffffff"}
            color={selectedItem === "Channel" ? "#ffffff" : "black"}
            key={2}
            w={"85%"}
            borderRadius="lg"
            borderWidth="1px"
          >
            <Icon
              as={TiGroup}
              ml={{ md: 3, sm: 3, base: 3 }}
              boxSize={{ md: 6, sm: 5, base: 5 }}
              h={{ md: 12, sm: 10, base: 9 }}
            />
          </Box>

          <Box
            onClick={() => {
              handleClick("UpdateUser");
            }}
            display="flex"
            cursor={"pointer"}
            color={"black"}
            key={3}
            w={"80%"}
          >
            {user?.pic ? (
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
                ml={2}
              />
            ) : (
              <Avatar size="sm" cursor="pointer" name={user?.name} ml={2} />
            )}
          </Box>

          <Box
            onClick={onOpen}
            display="flex"
            cursor={"pointer"}
            color={"black"}
            key={4}
            w={"85%"}
          >
            <Icon
              as={MdOutlineLogout}
              ml={{ md: 3, sm: 3, base: 3 }}
              boxSize={{ md: 8, sm: 7, base: 6 }}
              h={{ md: 16, sm: 16, base: 9 }}
            />
            <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader>Log Out</AlertDialogHeader>
                  <AlertDialogBody>
                    {"Are you sure want to log out?"}
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button onClick={onClose} ml={3}>
                      NO
                    </Button>
                    <Button onClick={logoutHandler} colorScheme="red" ml={3}>
                      YES
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default SideBar;
