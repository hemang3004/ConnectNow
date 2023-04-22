import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import {
  isLastMessage,
  isNextOppoSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import axios from "axios";
import {
  useToast,
  Text,
  Divider
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import moment from "moment-timezone";

const icons={"pdf": 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png',
 "png":"https://thenounproject.com/api/private/icons/212328/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkL-ishbtD-BAl2Ufeu258ij8Ma1EOZJB0HXEbs8KGgWBe3ESYUErhoB7Q_g_splqDn9MQIVDGaZKbS4qZrN2aj1p4GQ%3D%3D"
 }
 const getUTCTime=()=>{
  const now = new Date();
const utcDate = now.getUTCFullYear() + '-' + (now.getUTCMonth() + 1) + '-' + now.getUTCDate();
const utcTime = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
const utcDateTime = utcDate + ' ' + utcTime;
return utcDateTime;
}
 const ScrollableChat = ({ messages }) => {
  const { user,selectedChat } = ChatState();
  const getMsgDate=(Datetime)=>{
    if(Datetime===null){
    const date_ob = new Date(getUTCTime());
    let curr="";
    const offset = -moment.tz(date_ob, user.timeZone).utcOffset();
     // const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
     date_ob.setMinutes(date_ob.getMinutes()-offset)
     let day = ("0" + date_ob.getDate()).slice(-2);
     // // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
     // // current year
     let year = date_ob.getFullYear();
    curr = day+'/'+month+'/'+year;
    console.log(curr)
     return curr;}
     else{
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
    // DD/MM/YYYY 
    let curr = day+'/'+month+'/'+year
    // console.log(date_ob)
    return curr;
     }
  }
let chatDate=messages.length!==0?getMsgDate(messages[0]?.time):getMsgDate(null)
  const toast=useToast()
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
  const decryptMsg = (message) => {
    const key = String(selectedChat._id);
    let decryptedMessage;
    try {
      decryptedMessage = CryptoJS.AES.decrypt(message, key).toString(
        CryptoJS.enc.Utf8
      );
      return decryptedMessage;
    } catch (error) {
      console.log("Error: ", error);
    }
    return decryptedMessage;
  };
  const downloadMedia = async (e, originalImage) => {
   
    e.preventDefault();
    try {
      console.log(originalImage)
      const response = await axios.get(originalImage, { responseType: 'blob' ,headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }});
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const nameSplit = originalImage.split("/");
      const duplicateName = nameSplit.pop();
      a.download = "" + duplicateName + "";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log('Error while downloading the image ', error);
    }
  }
  const changeDate=(date)=>{
    chatDate=date;
    return true;
  }
  return (
    <ScrollableFeed>
      <Text fontWeight={"hairline"} display="flex" justifyContent="center">
      <Divider />
        {chatDate}
        <Divider/>
        </Text>
      {messages &&
        messages.map((m, i) => (
          <div key={m._id}>
          <Text fontWeight={"hairline"} display={chatDate!=getMsgDate(m?.time)&&changeDate(getMsgDate(m?.time))?"flex":"none" } justifyContent="center">{chatDate}</Text>
          <div style={{ display: "flex" }} >
            {(isNextOppoSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="15px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
           
            {/* setting diff color for sender and receiver's chat */}
            {m.type=="text"?(
              <span
              style={{
                backgroundColor: `${             
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "13px",
                padding: "5px 15px",
                maxWidth: "75%",
                height:"60px"
              }}
            ><span style={{fontSize:"10px"}} >{actualDate(m?.time)}</span><br/>
              {decryptMsg(m?.content)}
            </span>
            ):(<div
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "10px",
                padding: "1px 10px",
                width:"270px",
                height:"89px",
                maxWidth: "75%",
               display:"flex",
                flexDirection:"column"
              }}
              onClick={(e)=>downloadMedia(e,m?.url)}
            ><span display={"block"} style={{fontSize:"10px",paddingBottom:"7px",paddingTop:"5px",paddingLeft:"5px" }} >{actualDate(m?.time)}</span>
              <div  style={{display:"flex",justifyContent:"space-between"}}>
              <img src={icons[m.url.split(".").pop()]} style={{ height:50, width: 80,marginLeft:"0",display:"block", objectFit:"cover"}}  />
            <span
              style={{ display:"block",fontSize: 15 , margin:"auto"}}
            >
              {decryptMsg(m?.content)}
            </span>
              </div>
               
            </div>
           )}
            
          </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
