const express = require("express");
const { allMessages, sendMessage,uploadFile,getFile } = require("../controller/messageController");

const { protect } = require("../middleware/authMiddleware");
const {upload}=require("../config/upload");
const { seenChat } = require("../controller/chatController");

const router = express.Router();

// for sending message
router.route("/").post(protect,seenChat, sendMessage);

// fetch all the message from a particular chat
router.route("/:chatId").get(protect, seenChat,allMessages);

router.route("/uploadFile/:chatId").post(protect,upload.single('file'),seenChat,uploadFile)
router.route("/file/:filename").get(getFile)

module.exports = router;
