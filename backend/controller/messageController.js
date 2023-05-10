// import grid from 'gridfs-stream';
// import mongoose from 'mongoose';
const grid=require('gridfs-stream')
const mongoose =require('mongoose')
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const getDate = require("../config/getDate");

const allMessages = asyncHandler(async (req, res) => {
  try {
    var chat = await Chat.findById(req.params.chatId);
    var lastDel;
    chat.lastDeleted.forEach((element) => {
      if (String(req.user._id) === String(element.participant)) {
        lastDel = element.lastTime;
      }
    });
    
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    
    const newMsg = messages.filter((elem) => elem.time > lastDel);
    res.json(newMsg);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId ,type,url} = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
var tm=getDate()
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    type:type,
    url:url,
    time: tm,
  };


  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
   
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message,upTime: tm});

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const url = 'http://localhost:5000';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


const uploadFile = (request, response) => {
    if(!request.file) 
        return response.status(404).json("File not found");
    
    const imageUrl = `${url}/api/message/file/${request.file.filename}`;
    response.status(200).json(imageUrl);    
}

const getFile = async (request, response) => {
    try {
          
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

module.exports = { allMessages, sendMessage,uploadFile,getFile };
