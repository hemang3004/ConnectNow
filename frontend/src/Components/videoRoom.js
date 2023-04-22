import React from "react";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import {
  Box,
  Text,
  Button,
  useToast,
  HStack,
  Input,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import "./videoRoom.css";
import AgoraRTC from "agora-rtc-sdk-ng";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AgoraRTM from "agora-rtm-sdk";
import { HiOutlineDownload } from "react-icons/hi";
const getTime = () => {
  const now = new Date();
  const utcDate =
    now.getUTCFullYear() +
    "-" +
    (now.getUTCMonth() + 1) +
    "-" +
    now.getUTCDate();
  const utcTime =
    now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();
  const utcDateTime = utcDate + " " + utcTime;
  return utcDateTime;
};
let localTracks = [];
let remoteUsers = {};
let localScreenTracks;
let sharingScreen = false;
let time = new Date();
let client;
let attend = {};
let logs = [["Email", "Name", "StartTime", "EndTime"]];
let rtmClient;
let channel;
let allMessages = [];
const getUTCDate = () => {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getUTCDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getUTCFullYear();

  // current hours
  let hours = ("0" + date_ob.getUTCHours()).slice(-2);

  // current minutes
  let minutes = ("0" + date_ob.getUTCMinutes()).slice(-2);

  // current seconds
  let seconds = ("0" + date_ob.getUTCSeconds()).slice(-2);

  // prints date in YYYY-MM-DD format
  // console.log(year + "-" + month + "-" + date);
  let curr =
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return curr;
};
const VideoRoom = () => {
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);

  const [isParticipantsClose, setIsParticipantsClose] = useState(false);
  const [isChatsClose, setIsChatsClose] = useState(false);
  const [localPeople, setLocalPeople] = useState(0);
  const [people, setPeople] = useState(0);
  const [videoState, setVideoState] = useState(true);
  const [audioState, setAudioState] = useState(true);

  const { selectedChat, user, selectedChannel, socket } = ChatState();
  const [excelFileName, setExcelFileName] = useState(
    selectedChannel.channelName + getTime() + ".xlsx"
  );
  const toast = useToast();
  const history = useHistory();

  const uid = String(user._id);
  const APP_ID = "3fe5c987fb424efb8970f6e6c20fa471";
  const options = {
    appId: APP_ID,
    token: null,
    roomId: selectedChannel._id,
  };

  let displayFrame = document.getElementById("stream__box");
  // gives htmlcollection
  let videoFrames = document.getElementsByClassName("video__container");
  let videoBox = document.getElementById("videoBox");
  let messageForm = document.getElementById("message__form");

  // console.log(videoFrames);
  let userIdInDisplayFrame = null;

  const setWidth = () => {
    if (isParticipantsClose && isChatsClose) {
      document.getElementById("stream__container").style.width = "100%";
      document.getElementById("stream__container").style.left = "0rem";
      document.getElementById("stream__actions").style.left = "50%";
    }
    if (!isParticipantsClose && isChatsClose) {
      document.getElementById("stream__container").style.width =
        "calc(100% - 15.7rem)";
      document.getElementById("stream__container").style.left = "15.7rem";
      document.getElementById("stream__actions").style.left = "58.4%";
    }
    if (isParticipantsClose && !isChatsClose) {
      document.getElementById("stream__container").style.width =
        "calc(100% - 22rem)";
      document.getElementById("stream__container").style.left = "0rem";
      document.getElementById("stream__actions").style.left = "38.2%";
    }
    if (!isParticipantsClose && !isChatsClose) {
      document.getElementById("stream__container").style.width =
        "calc(100% - 37.7rem)";
      document.getElementById("stream__container").style.left = "15.7rem";
      document.getElementById("stream__actions").style.left = "46.5%";
    }
  };
  useEffect(() => {
    setWidth();
  }, [isParticipantsClose, isChatsClose]);

  const handleChatClick = () => {
    setShowChat(!showChat);
    // setShowParticipants(false);
    setIsChatsClose(!isChatsClose);
  };

  const handleParticipantsClick = () => {
    // setShowChat(false);

    setShowParticipants(!showParticipants);
    setIsParticipantsClose(!isParticipantsClose);
  };

  const expandVideoFrame = (e) => {
    // check whether any item is there in stram box, if yes then remove it and add new
    let child = displayFrame?.children[0];
    // if there is already video in stream box then first add it into the streams__container
    if (child) {
      document.getElementById("streams__container").appendChild(child);
    }

    displayFrame.style.display = "block";
    displayFrame.appendChild(e.currentTarget);
    userIdInDisplayFrame = e.currentTarget.id;

    videoFrames = document.getElementsByClassName("video__container");

    // this will reduce height and width of all other than in stream box
    for (let i = 0; videoFrames.length > i; i++) {
      if (videoFrames[i].id !== userIdInDisplayFrame) {
        videoBox.style.paddingTop = "0px";
        videoFrames[i].style.width = "100px";
        videoFrames[i].style.height = "100px";
      }
    }
    displayFrame.addEventListener("click", hideDisplayFrame);
  };

  const hideDisplayFrame = () => {
    userIdInDisplayFrame = null;
    displayFrame.style.display = null;

    let child = displayFrame?.children[0];
    document.getElementById("streams__container").appendChild(child);

    videoBox.style.paddingTop = "20px";

    if (
      (!isParticipantsClose && isChatsClose) ||
      (isParticipantsClose && !isChatsClose)
    ) {
      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "200px";
        videoFrames[i].style.width = "200px";
      }
    }

    if (isParticipantsClose && isChatsClose) {
      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "300px";
        videoFrames[i].style.width = "300px";
      }
    }
  };

  const handleUserPublished = async (u, mediaType) => {
    // store user in remoteUsers list
    const uuu = await getUser(u.uid);

    // console.log(
    //   "<<<<<<<<<<<<<<<<<<<<<<<<---------------->>>>>>>>>>>>>>",
    //   uuu.name
    // );

    remoteUsers[u.uid] = u;
    // remoteUsers

    // subscribe user
    await client.subscribe(u, mediaType);
    // first check whether a user already joined a stream or not
    let player = document.getElementById(`user-container-${u.uid}`);
    if (player === null) {
      player = document.createElement("div");
      player.className = "video__container";
      player.id = `user-container-${u.uid}`;

      const videoPlayer = document.createElement("div");
      videoPlayer.className = "video-player";
      videoPlayer.id = `user-${u.uid}`;

      player.appendChild(videoPlayer);
      document.getElementById("streams__container").appendChild(player);

      const userName = document.createElement("p");
      userName.id = `user-name-${u.uid}`;
      userName.textContent = uuu.name;

      document.getElementById(`user-container-${u.uid}`).appendChild(userName);

      // document.getElementById(`user-${u.uid}`).style.cssText =
      //   "-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;";
    }

    // when someone is join when another user is focused so to change new user video
    if (document.getElementById("stream__box").style.display === "none") {
      document.getElementById("stream__box").style.height = "100px";
      document.getElementById("stream__box").style.width = "100px";
    }

    // this will create a video tag and append it to dynamically created div
    if (mediaType === "video") {
      u.videoTrack.play(`user-${u.uid}`);
    }

    if (mediaType === "audio") {
      // u.audioTrack.play();
    }

    setPeople((prevPeople) => prevPeople + 1);
  };

  const handleUserLeft = async (user) => {
    delete remoteUsers[user.uid];

    document.getElementById(`user-container-${user.uid}`).remove();

    if (userIdInDisplayFrame === `user-container-${user.uid}`) {
      displayFrame.style.display = null;

      let videoFrames = document.getElementsByClassName("video__container");
      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.width = "300px";
        videoFrames[i].style.height = "300px";
      }
    }
  };

  const callExpandVideo = () => {
    for (let i = 0; videoFrames.length > i; i++) {
      videoFrames[i].addEventListener("click", expandVideoFrame);
    }

    if (document.getElementById("stream__box").style.display === "block") {
      for (let i = 0; videoFrames.length > i; i++) {
        if (videoFrames[i].id !== userIdInDisplayFrame) {
          videoFrames[i].style.width = "100px";
          videoFrames[i].style.height = "100px";
        }
      }
    }
  };

  const joinStream = async () => {
    // Creates an audio track and a video track. and also ask permission for first time
    localTracks = await AgoraRTC
      .createMicrophoneAndCameraTracks
      // {},
      // {
      //   encoderConfig: {
      //     width: { min: 640, ideal: 1920, max: 1920 },
      //     height: { min: 480, ideal: 1080, max: 1080 },
      //   },
      // }
      ();
    // dynamically create a div for a local user in stram_container
    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                  </div>`;

    document
      .getElementById("streams__container")
      .insertAdjacentHTML("beforeend", player);
    const userName = document.createElement("p");
    userName.id = `user-name-${uid}`;
    userName.textContent = user.name;

    document.getElementById(`user-container-${uid}`).appendChild(userName);

    // this will create a video tag and append it to dynamically created div
    localTracks[1].play(`user-${uid}`);
    await client.publish([localTracks[0], localTracks[1]]);

    setLocalPeople((prevPeople) => prevPeople + 1);
  };

  const joinRoomInit = async () => {
    rtmClient = await AgoraRTM.createInstance(APP_ID);
    await rtmClient.login({ uid, token: null });

    await rtmClient.addOrUpdateLocalUserAttributes({ name: user.name });

    channel = await rtmClient.createChannel(options.roomId);
    await channel.join();

    channel.on("MemberJoined", handleMemberJoined);
    channel.on("MemberLeft", handleMemberLeft);
    channel.on("ChannelMessage", handleChannelMessage);

    getMembers();
    addBotMessageToDom(`${user.name} joined the room`);
    // create a client and join the client to the particular roomId
    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    await client.join(options.appId, options.roomId, options.token, uid);

    client.on("user-published", handleUserPublished);
    client.on("user-left", handleUserLeft);

    joinStream();
  };

  useEffect(() => {
    joinRoomInit();
  }, []);

  useEffect(() => {
    callExpandVideo();
  }, [people]);

  useEffect(() => {
    callExpandVideo();
  }, [localPeople]);

  let getMembers = async () => {
    let members = await channel.getMembers();
    updateMemberTotal(members);
    for (let i = 0; members.length > i; i++) {
      addMemberToDom(members[i]);
    }
  };

  let handleMemberJoined = async (MemberId) => {
    console.log("new member joind", MemberId);
    addMemberToDom(MemberId);
    let members = await channel.getMembers();
    updateMemberTotal(members);

    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);
    addBotMessageToDom(` ${name} joined the room!`);
  };

  let addMemberToDom = async (MemberId) => {
    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);
    const { email } = await getUser(MemberId);
    attend[MemberId] = {
      CandidateName: name,
      startTime: getTime(),
      endTime: "",
      Email: email,
    };

    let membersWrapper = document.getElementById("member__list");
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper" style="display: flex; align-items: center;">
                        <span class="green__icon" ></span>
                        <p class="member_name"  style="margin-left: 25px;">${name}</p>
                    </div>`;

    membersWrapper.insertAdjacentHTML("beforeend", memberItem);
  };

  let updateMemberTotal = async (members) => {
    let total = document.getElementById("members__count");
    total.innerText = members.length;
  };

  let handleMemberLeft = async (MemberId) => {
    removeMemberFromDom(MemberId);
    let members = await channel.getMembers();
    updateMemberTotal(members);
  };

  let removeMemberFromDom = async (MemberId) => {
    let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`);
    memberWrapper.remove();
    attend[MemberId].endTime = getTime();
    console.log(attend[MemberId]);
    logs.push([
      attend[MemberId].Email,
      attend[MemberId].CandidateName,
      attend[MemberId].startTime,
      attend[MemberId].endTime,
    ]);
    delete attend[MemberId];
    console.log(attend);
    console.log(logs);
    let name =
      memberWrapper.getElementsByClassName("member_name")[0].textContent;
    addBotMessageToDom(`${name} has left the room.`);
    console.log(attend);
    // agora rtm actually leave user after 30sec to solve this create leavechannel fn
  };

  let leaveChannel = async () => {
    await channel.leave();
    await rtmClient.logout();
  };

  let handleChannelMessage = async (messageData, MemberId) => {
    console.log("A new message was received");
    let data = JSON.parse(messageData.text);

    if (data.type === "chat") {
      addMessageToDom(data.displayName, data.message);
    }

    if (data.type === "user_left") {
      document.getElementById(`user-container-${data.uid}`).remove();

      if (userIdInDisplayFrame === `user-container-${uid}`) {
        displayFrame.style.display = null;

        for (let i = 0; videoFrames.length > i; i++) {
          videoFrames[i].style.height = "300px";
          videoFrames[i].style.width = "300px";
        }
      }
    }

    // if (data.type === "user_left") {
    //   document.getElementById(`user-container-${data.uid}`).remove();

    //   if (userIdInDisplayFrame === `user-container-${uid}`) {
    //     displayFrame.style.display = null;

    //     for (let i = 0; videoFrames.length > i; i++) {
    //       videoFrames[i].style.height = "300px";
    //       videoFrames[i].style.width = "300px";
    //     }
    //   }
    // }
  };

  let sendMessage = async (e) => {
    e.preventDefault();

    let message = e.target.message.value;
    channel.sendMessage({
      text: JSON.stringify({
        type: "chat",
        message: message,
        displayName: user.name,
      }),
    });
    addMessageToDom(user.name, message);
    e.target.reset();
  };

  let addMessageToDom = (name, message) => {
    let messagesWrapper = document.getElementById("messages");
    allMessages.push([getUTCDate(), { sender: name, message: message }]);
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author" style="font-weight: 600;">${name}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`;

    messagesWrapper.insertAdjacentHTML("beforeend", newMessage);

    let lastMessage = document.querySelector(
      "#messages .message__wrapper:last-child"
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  let addBotMessageToDom = (botMessage) => {
    let messagesWrapper = document.getElementById("messages");
    allMessages.push([getUTCDate(), { sender: "Bot", message: botMessage }]);
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body__bot">
                            <strong class="message__author__bot">🤖 ConnectNow Bot</strong>
                            <p class="message__text__bot">${botMessage}</p>
                        </div>
                    </div>`;

    messagesWrapper.insertAdjacentHTML("beforeend", newMessage);

    let lastMessage = document.querySelector(
      "#messages .message__wrapper:last-child"
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  window.addEventListener("beforeunload", leaveChannel);

  const toggleCamerea = async () => {
    let button = document.getElementById("camera-btn");

    if (videoState) {
      await client.unpublish([localTracks[1]]);
      await localTracks[1].stop();
      setVideoState(false);
      button.classList.remove("active");
    } else {
      await client.publish([localTracks[1]]);
      await localTracks[1].play(`user-${uid}`);
      setVideoState(true);
      button.classList.add("active");
    }
  };

  const toggleMic = async (e) => {
    let button = document.getElementById("mic-btn");

    if (audioState) {
      await client.unpublish([localTracks[0]]);
      await localTracks[0].stop();
      setAudioState(false);
      button.classList.remove("active");
    } else {
      await client.publish([localTracks[0]]);
      await localTracks[0].stop();
      setAudioState(true);
      button.classList.add("active");
    }
  };

  const toggleScreen = async (e) => {
    let screenButton = e.currentTarget;
    let cameraButton = document.getElementById("camera-btn");

    if (!sharingScreen) {
      sharingScreen = true;
      screenButton.classList.add("active");
      cameraButton.classList.remove("active");
      cameraButton.style.display = "none";

      await localTracks[1].stop(`user-${uid}`);

      localScreenTracks = await AgoraRTC.createScreenVideoTrack();
      // removing local user dynamically created video tag so that it's sharing screen can be focused but haven't unpublish it
      displayFrame.style.display = "block";
      document.getElementById(`user-container-${uid}`).remove();

      // creating a dynamic div tag for a local user to share a screen just like as previously created a tag for showing a video
      let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`;

      displayFrame.insertAdjacentHTML("beforeend", String(player));
      if (remoteUsers)
        document.getElementById(`user-${uid}`).style.transform = "scaleX(-1)";

      userIdInDisplayFrame = `user-container-${uid}`;
      // in local video tracks we have only video track
      // document.getElementById(`user-${uid}`).style.transform = "scaleX(-1)";
      localScreenTracks.play(`user-${uid}`);

      // unpublish local user only video
      await client.unpublish([localTracks[1]]);
      // publish local user screen
      await client.publish([localScreenTracks]);

      // this will reduce height and width of all other than in stream box
      let videoFrames = document.getElementsByClassName("video__container");
      for (let i = 0; videoFrames.length > i; i++) {
        if (videoFrames[i].id !== userIdInDisplayFrame) {
          videoFrames[i].style.width = "100px";
          videoFrames[i].style.height = "100px";
        }
      }
    } else {
      sharingScreen = false;
      cameraButton.style.display = "block";
      // displayFrame.style.display = "none";

      await localScreenTracks.close();
      // unpublish local user screen
      await client.unpublish(localScreenTracks);
      // removing local user screen sharing tag
      document.getElementById(`user-container-${uid}`).remove();
      // publish local user camera

      // swithToCamera();
      let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`;

      displayFrame.insertAdjacentHTML("beforeend", player);

      document
        .getElementById(`user-container-${uid}`)
        .addEventListener("click", expandVideoFrame);

      await client.publish([localTracks[1]]);
      localTracks[1].play(`user-${uid}`);
      // as we have unpublish only user's video so we don't have to publish user audio again
      await localTracks[0].setMuted(false);
      await localTracks[1].setMuted(false);

      document.getElementById("camera-btn").classList.add("active");
      document.getElementById("mic-btn").classList.add("active");
      document.getElementById("screen-btn").classList.remove("active");
    }
  };

  const getUser = async (uId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // give list of chats
      const response = await axios.get(`/api/user/get-user/${uId}`, config);
      // .then((d) => {
      //   ddata = d.data;

      //   console.log("<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>", ddata);
      // })
      // .catch((err) => console.log("error"));
      // console.log(
      //   "<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>",
      //   response.data
      // );

      return response.data;
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const leaveChat = async (e) => {
    e.preventDefault();
    for (let i = 0; localTracks.length > i; i++) {
      localTracks[i].stop();
      localTracks[i].close();
    }

    await client.unpublish([localTracks[0], localTracks[1]]);

    if (localScreenTracks) {
      await client.unpublish([localScreenTracks]);
    }

    document.getElementById(`user-container-${uid}`).remove();

    if (userIdInDisplayFrame === `user-container-${uid}`) {
      displayFrame.style.display = null;

      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "300px";
        videoFrames[i].style.width = "300px";
      }
    }
    channel.sendMessage({
      text: JSON.stringify({ type: "user_left", uid: uid }),
    });
    leaveChannel();
    socket.emit("leave video", selectedChannel._id);
    history.push("/main");
    window.location.reload();
  };
  const generateExcelFile = (data, filename) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([fileBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, filename);
  };
  const downloadAttendance = () => {
    socket.emit("getOrganizerName", selectedChannel._id);
    socket.on("organizerName", (name, id) => {
      if (id === user._id) {
        for (const MemberId in attend) {
          logs.push([
            attend[MemberId].Email,
            attend[MemberId].CandidateName,
            attend[MemberId].startTime,
            attend[MemberId].endTime,
          ]);
        }
        console.log(name);
        generateExcelFile(logs, name + "-" + excelFileName);
      }
    });
  };

  const adminAttandance = async () => {
    var bool;
    await socket.emit("getOrganizerName", selectedChannel._id);
    await socket.on("organizerName", (name, id) => {
      console.log(id === user._id);
      if (id === user._id) bool = true;
      else bool = false;
    });
    console.log("bool ", bool);
    return bool;
  };
  const downloadMesages = () => {
    socket.emit("getOrganizerName", selectedChannel._id);
    socket.on("organizerName", (name, id) => {
      if (id === user._id) {
        generateMessageData();
      }
    });
  };
  const generateMessageData = () => {
    const jsonString = JSON.stringify(allMessages);
    // Create a Blob object with the JSON data
    const blob = new Blob([jsonString], { type: "application/json" });
    // Create a download link for the file
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "data.json";
    // Append the link to the document body and click it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    // Clean up by removing the link and revoking the URL object
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Button
          variant={showParticipants ? "solid" : "ghost"}
          onClick={handleParticipantsClick}
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"
              fill="#1a202c"
            />
          </svg>
        </Button>

        <Text
          fontSize="2xl"
          fontFamily="Work sans"
          onClick={downloadAttendance}
        >
          {selectedChannel.channelName}
        </Text>

        <Button
          variant={showChat ? "solid" : "ghost"}
          onClick={handleChatClick}
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            fill="#ede0e0"
            clip-rule="evenodd"
          >
            <path
              d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z"
              fill="#1a202c"
            />
          </svg>
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" w="100%" h="92vh">
        <Box
          bg="gray.100"
          flexBasis={showParticipants ? "250px" : "0"}
          overflowY="scroll"
          // style={{
          //   display: {
          //     base: `${showParticipants ? "block" : "none"}`,
          //     md: "none",
          //   },
          //   padding: `${showParticipants ? "16px" : "0px"}`,
          //   md: "0px",
          // }}
          borderWidth={showParticipants ? "1px" : "0px"}
          // p={4}
          // pt={0}
          display={showParticipants ? "flex" : "none"}
          maxW="350px"
          height={"665px"}
          flexDirection={"column"}
        >
          {
            <section id="members__container">
              <Box
                id="members__header"
                fontSize="18px !important"
                fontWeight="medium"
                // display={showParticipants ? "block" : "none"}
                direction={"column"}
                justifyContent="center"
                h={"50px"}
                display="flex"
                p={2}
                pl={"auto"}
                pr={"auto"}
                bg={"#e2e8f0"}
              >
                <HStack display={"flex"} justifyContent="space-between">
                  <Box>{"Participants"}</Box>
                  <HStack>
                    <Box
                      ml={5}
                      display={"block"}
                      onClick={() => {
                        if (adminAttandance()) downloadAttendance();
                      }}
                      // bg={"#bee3f8"}
                    >
                      <Icon
                        mt={2}
                        as={HiOutlineDownload}
                        ml={{ md: 3, sm: 3, base: 3 }}
                        boxSize={{ md: 6, sm: 5, base: 5 }}
                        h={{ md: 12, sm: 10, base: 9 }}
                      />
                    </Box>
                    <Box
                      fontSize="13px !important"
                      display={showParticipants ? "flex" : "none"}
                      width={"40px"}
                      id="members__count"
                      bg={"#bee3f8"}
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={"md"}
                      fontWeight="bold !important"
                      h={"30px"}
                      fontFamily="Work sans"
                    >
                      {0}
                    </Box>
                  </HStack>
                </HStack>
              </Box>

              <Box
                mt={6}
                display={showParticipants ? "block" : "none"}
                height={"580px"}
                overflowY="scroll"
                p={4}
                pt={0}
              >
                <div id="member__list"></div>
              </Box>
            </section>
          }
        </Box>

        <Box
          id="videoBox"
          bg="gray.300"
          flex={1}
          p={4}
          pb={8}
          ml={0}
          // borderRadius={showParticipants || showChat ? "0" : "lg"}
          borderWidth="1px"
          overflowY="hidden"
        >
          {/* Info Partition */}
          <section id="stream__container">
            <div id="stream__box"></div>
            <div id="streams__container">
              {/* <div class="video__container" id="user-container-2">
                <h1></h1>
              </div> */}
            </div>

            {/* <!-- controls --> */}
            <div class="stream__actions" id="stream__actions">
              <button class="active" id="camera-btn" onClick={toggleCamerea}>
                {/* <!-- camera svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                </svg>
              </button>
              <button class="active" id="mic-btn" onClick={toggleMic}>
                {/* <!-- mic svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
                </svg>
              </button>
              <button id="screen-btn" onClick={toggleScreen}>
                {/* <!-- screen share svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
                </svg>
              </button>
              <button class="leave" id="leave-btn" onClick={leaveChat}>
                {/* <!-- leave svg --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
                </svg>
              </button>
            </div>
          </section>
        </Box>

        <Box
          bg="gray.100"
          flex={showChat ? 1 : 0}
          // p={4}
          // pt={0}
          display={showChat ? "flex" : "none"}
          borderWidth="1px"
          maxW="350px"
          height={"665px"}
          overflowY="scroll"
          flexDirection={"column"}
        >
          <section id="messages__container">
            <Box
              bg={"#e2e8f0"}
              h={"50px"}
              display="flex"
              p={2}
              pl={"auto"}
              pr={"auto"}
              justifyContent="center"
              fontWeight={"medium"}
              fontSize="18px !important"
              onClick={downloadMesages}
            >
              {"Messages"}
            </Box>
            <Box
              id="messages"
              height={"535px"}
              overflowY="scroll"
              mt={2}
              p={4}
              pt={0}
            ></Box>

            <Box p={3}>
              <form id="message__form" onSubmit={sendMessage}>
                <FormControl isRequired mt={1} position={"fixed"} w="320px">
                  <Input
                    type="text"
                    name="message"
                    placeholder="Send a message...."
                    variant="filled"
                    bg="#E2E8F0"
                  />
                </FormControl>
              </form>
            </Box>
          </section>
        </Box>
      </Box>
    </div>
  );
};

export default VideoRoom;