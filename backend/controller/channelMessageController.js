const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ChannelMessage = require("../models/channelMessageModel");
const Channel = require("../models/channelModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await ChannelMessage.find({
      channel: req.params.channelId,
    })
      .populate("sender", "name pic email")
      .populate("channel");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, channelId, title } = req.body;

  if (!content || !channelId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    title: title,
    content: content,
    channel: channelId,
  };

  try {
    var message = await ChannelMessage.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("channel");
    message = await User.populate(message, {
      path: "channel.users",
      select: "name pic email",
    });

    await Channel.findByIdAndUpdate(req.body.channelId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
