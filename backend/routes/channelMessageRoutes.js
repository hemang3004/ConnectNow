const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/channelMessageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// for sending message
router.route("/").post(protect, sendMessage);

// fetch all the message from a particular chat
router.route("/:channelId").get(protect, allMessages);

module.exports = router;
