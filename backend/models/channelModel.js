const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
  {
    channelName: { type: String, trim: true },
    discription: { type: String },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChannelMessage",
    },
    channelAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelModel);
module.exports = Channel;
