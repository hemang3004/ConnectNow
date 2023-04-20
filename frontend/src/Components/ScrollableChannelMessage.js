import { Avatar, Box, TagLeftIcon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css";
import moment from "moment-timezone";

const ScrollableChannelMessage = ({ messages }) => {
  const { user } = ChatState();
  const actualDate=(Datetime)=>{
    let date_ob = new Date(Datetime);
    const date = new Date();
   const offset = -moment.tz(date, user.timeZone).utcOffset();

    // const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    date_ob.setMinutes(date_ob.getMinutes()-offset)

    let day = ("0" + date_ob.getDate()).slice(-2);
  
    // // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
    // // current year
    let year = date_ob.getFullYear();
  
    // // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);
  
    // // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
  
    // // current seconds
    
  
    // DD/MM/YYYY HH:MM
    let curr = day+'/'+month+'/'+year+' '+hours+':'+minutes;
    // console.log(date_ob)
    return curr;
  };
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
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Box fontWeight={"semibold"} fontSize={"sm"}>
                    {m.sender.name}
                  </Box>
                  <Box>
                  {actualDate(m?.time)}
                  </Box>
                  </div>
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
