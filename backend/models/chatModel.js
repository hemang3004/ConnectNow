const mongoose = require("mongoose");
const getDate = require("../config/getDate");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastDeleted: [
      {
        participant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        lastTime: { type: String },
      },
    ],
    lastSeen:[{
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      lastTime: { type: String },
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    upTime:{type:String,
      default:getDate()
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
