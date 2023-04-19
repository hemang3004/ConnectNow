import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

var x;
const UserBadgeItem = ({ user1, handleFunction, admin }) => {
  const { user } = ChatState();
  const fn = () => {
    return user._id === admin._id;
  };
  x = fn();
  return (
    <div>
      {x ? (
        <Badge
          px={2}
          py={1}
          borderRadius="lg"
          m={1}
          mb={2}
          variant="solid"
          fontSize={12}
          colorScheme="purple"
          cursor="pointer"
          onClick={handleFunction}
        >
          {user1.name}
          {admin._id === user1._id && <span> (Admin)</span>}
          {admin._id === user._id && <CloseIcon pl={1} />}
        </Badge>
      ) : (
        <Badge
          px={2}
          py={1}
          borderRadius="lg"
          m={1}
          mb={2}
          variant="solid"
          fontSize={12}
          colorScheme="purple"
          cursor="pointer"
          // onClick={handleFunction}
        >
          {user1.name}
          {admin._id === user1._id && <span> (Admin)</span>}
          {admin._id === user._id && <CloseIcon pl={1} />}
        </Badge>
      )}
    </div>
  );
};

export default UserBadgeItem;
