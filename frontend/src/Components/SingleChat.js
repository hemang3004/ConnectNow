import { ArrowBackIcon, Icon,InfoIcon } from "@chakra-ui/icons";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, Stack, HStack } from "@chakra-ui/layout";
import "./styles.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  position,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import CryptoJS from "crypto-js";
import Picker from "emoji-picker-react";

import { BsEmojiSmileFill } from "react-icons/bs";

import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { MdCall, MdOutlineMic, MdAttachFile, MdDelete,MdAlbum } from "react-icons/md";
import { useHistory } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

var  selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoCallOn, setVideoCallOn] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [status,setStatus]=useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState('');
  const [url,setUrl]=useState('')
  const [activeUser,setActiveUser]=useState({});
  const fileInputRef = useRef();
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    newMsg,
    setNewMsg,
    activeUsers,
    socket,
    socketConnected
  } = ChatState();

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const toast = useToast();
  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (transcript) {
      inputRef.current.value = transcript;
      setNewMessage(transcript);
    }
  }, [transcript]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      // console.log("decrypt data ", data);

      setLoading(false);

      socket.emit("join chat", selectedChat._id);
      
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    // if enter key is pressed and newMessage is typed
    // if (transcript) {
    //   setNewMessage(transcript);
    //   // resetTranscript;
    // }
    if (event.key === "Enter" && newMessage && !file) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const cipherText = CryptoJS.AES.encrypt(
          newMessage,
          String(selectedChat._id)
        ).toString();
        const { data } = await axios.post(
          "/api/message",
          {
            content: cipherText,
            chatId: selectedChat,
            type:"text",
            url:""
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMsg([...newMsg, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
    else if(event.key === "Enter" && newMessage && file){
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        // setFile("");
        setUrl("");
        const cipherText = CryptoJS.AES.encrypt(
          newMessage,
          String(selectedChat._id)
        ).toString();
        const { data } = await axios.post(
          "/api/message",
          {
            content:cipherText,
            chatId: selectedChat,
            type:"file",
            url:String(url)
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
        setNewMsg([...newMsg, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
  }};

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        SpeechRecognition.startListening({ continuous: true });
      }
    }
  };

  const handleInputClick = () => {
    resetTranscript();
    // setNewMessage("");
  };

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("show calling", ()=> {setVideoCallOn(true)});
    // socket.on("show members of video",(nums)=>{console.log(nums);})
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // if we are in karan chat and sejal sent msg to hemang then that msg will not render in karan's chat but that will be displayed in notification
      // setNewMsg(true);
      if (
        // if chat is not selected or selected chat's id not eq to newmsg.chat's id then give it to notification

        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const deleteHandler = async () => {
    console.log(user.token);
    try {
      // setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const data = await axios.put(
        `/api/chat/deletechat`,
        {
          chatId: selectedChat._id,
          userId: user._id,
        },
        config
      );

      window.location.reload();
      //  setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // typing functionality
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      // &&typing is not needed i guess
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const uploadFile = async (data) => {
    try {
     
        const config = {
          headers: {
            "Content-type": "FormData",
            Authorization: `Bearer ${user.token}`,
          }}
        
      console.log("Files here",data)
        const response = await axios.post(`api/message/uploadFile/${selectedChat._id}`,data,config);
       return response.data
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}
useEffect(()=>{
  const getImage = async () => {
    if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
       const response=await uploadFile(data);
       setUrl(response);
    }
}
getImage();
console.log()
},[file])

 

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    // console.log("emoji", typeof emoji.emoji);
    let messg = newMessage;
    messg += emoji.emoji;
    setNewMessage(messg);
  };
useEffect(()=>{

},[inputRef])
const sendStatus = () => {
  const y = getSenderFull(user, selectedChat.users)._id;
  const x = activeUsers?.filter((u) => u._id === y)[0];
  return x?.online;
};
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {/* arrow back icon if screen is small */}
            <HStack>
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              <IconButton
                display={{ base: "flex" }}
                icon={<MdDelete />}
                // fontSize="25px"
                onClick={onOpen}
                ml={{ md: "0px!important" }}
              />
              <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader>Delete Chat</AlertDialogHeader>
                    <AlertDialogBody>
                      {"Are you sure want to delete chat?"}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button onClick={onClose} ml={3}>
                        NO
                      </Button>
                      <Button onClick={deleteHandler} colorScheme="red" ml={3}>
                        YES
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </HStack>

            {/* if group chat selected show group chat ui and if not group chat then show  user name and profile*/}
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {/* oppo. user name and icon */}
                  {/* {getSender(user, selectedChat.users)} */}
                  {/* {(activeUser && !selectedChat.isGroupChat)&&(<IconButton
                icon={<MdAlbum />}
                fontSize="20px"
                size={"m"}
               
                variant={"ghost"}
                colorScheme={activeUser && !selectedChat.isGroupChat ?"whatsapp":"red"}
                ml={{ md: "0px!important" }}
              />)} */}
                  <Stack>
                    {/* oppo. user name and icon */}
                    <Box fontSize={"25px !important"}>
                      {getSender(user, selectedChat.users)}
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      fontSize={"12px !important"}
                      mt={"0px !important"}
                    >
                      {sendStatus() ? "Online" : "Offline"}
                    </Box>
                  </Stack>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {/* group name */}
                  {selectedChat.chatName.toUpperCase()}
                  
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    

                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </div>
                </>
              ))}
          </Text>

          {/* for displaying text msg */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* Messages ui */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              // {/* messages */}
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={25}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <HStack>
                <div className="wrapper">
                  <IconButton
                    className="emoji"
                    icon={<BsEmojiSmileFill />}
                    size={"md"}
                    backgroundColor="#e8e8e8"
                    variant="solid"
                    color={"#3182ce"}
                    onClick={handleEmojiPickerHideShow}
                  ></IconButton>
                  {showEmojiPicker && (
                    <div className="picker-wrapper">
                      <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>

                <Input
                  ref={inputRef}
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message..."
                  onClick={handleInputClick}
                  onChange={typingHandler}
                  value={newMessage || transcript}
                />

                <IconButton
                  icon={<MdOutlineMic />}
                  colorScheme="blue"
                  variant="solid"
                  // onClick={speechToText}
                  onClick={handleButtonClick}
                ></IconButton>

                <IconButton
                  icon={<MdAttachFile />}
                  colorScheme="blue"
                  onClick={()=>fileInputRef.current.click()}
                  variant="solid"
                ></IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) =>{
                    console.log(e.target.files[0])
                    setFile(e.target.files[0])
                    setNewMessage(e.target.files[0]?.name)
                  } }

                />
              </HStack>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        // if chat not seleced

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
