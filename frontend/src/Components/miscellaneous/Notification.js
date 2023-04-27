
import {
    Box,
    Button,
    Menu,
    MenuButton,
    Text,
    Tooltip,
    MenuList,
    Avatar,
    MenuItem,
    MenuDivider,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    useToast,
    Spinner,
  } from "@chakra-ui/react";
  import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
  import React, { useEffect, useState } from "react";
  import { ChatState } from "../../Context/ChatProvider";
  import ProfileModal from "./ProfileModal";
  import { useHistory } from "react-router-dom";
  import ChatLoading from "../ChatLoading";
  import axios from "axios";
  import UserListItem from "../UserAvatar/UserListItem";
  import { getSender } from "../../config/ChatLogics";
  import { Effect } from "react-notification-badge";
  import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";

const Notification = () => {
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
      } = ChatState();
  return (
    <div>
          <Menu>
            <MenuButton p="1">
              <NotificationBadge
                count={notification?.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m="1" />
            </MenuButton>
            {/* if notification lengh is 0 then display no new notification */}
            <MenuList pl={10}>
              {/* {!notification.length && "No new Messages"} */}

              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
         
        </div>
  )
}

export default Notification