const mongoose = require("mongoose");

const channelMessageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  },
  { timestamps: true }
);

const ChannelMessage = mongoose.model("ChannelMessage", channelMessageModel);
module.exports = ChannelMessage;
