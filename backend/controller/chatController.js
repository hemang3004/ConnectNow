const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const getDate = require("../config/getDate");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let dt = getDate();
    lastdel = [
      {
        participant: String(req.user._id),
        lastTime: dt,
      },
      {
        participant: String(userId),
        lastTime: dt,
      },
    ];
    lastseen = [
      {
        participant: String(req.user._id),
        lastTime: dt,
      },
      {
        participant: String(userId),
        lastTime: dt,
      },
    ];

    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
      lastDeleted: lastdel,
      lastSeen:lastseen
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        var final = [];
        results.forEach((item) => {
          if (item.lastDeleted) {
            var LastDel;
            item.lastDeleted.forEach((elem) => {
              if (String(elem.participant) === String(req.user._id)) {
                LastDel = elem.lastTime;
              }
            });
            // console.log(LastDel, item.latestMessage.time);
            if (!item.latestMessage || item.latestMessage.time > LastDel) {
              final.push(item);
            }
          }
        });

        // console.log("Final List of Chats", final);
        res.status(200).send(final);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please fill all the feilds require" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  let dt = getDate();
  users.push(String(req.user._id));
  let lastDeletedMessage = [];
  users.forEach((element) => {
    var userx = {
      participant: element,
      lastTime: dt,
    };
    lastDeletedMessage.push(userx);
  });
  try {
    // create grou chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
      lastDeleted: lastDeletedMessage,
      lastSeen:lastDeletedMessage
    });

    // send back full chat to user
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    // if dont use this it will return old value
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400);
    throw new Error("Chat not found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
var tm=getDate()
var str=String(userId)
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId,lastDeleted:{participant:str,lastTime:tm},lastSeen:{participant:str,lastTime:tm} },
      
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("User not added");
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  var reqUser = req.user._id.toString();
  const groupChat = await Chat.findById(chatId);
  let removed = null;

  if (reqUser === userId) {
    removed = await Chat.findByIdAndUpdate(
      groupChat,
      {
        $pull: { users: userId },
        $set: { groupAdmin: null },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    const updateAdmin = await Chat.findByIdAndUpdate(
      groupChat,
      {
        $set: { groupAdmin: groupChat.users[0] },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  } else {
    removed = await Chat.findByIdAndUpdate(
      groupChat,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  }

  if (!removed) {
    res.status(400);
    throw new Error("User is not removed");
  } else {
    res.json(removed);
  }
});

const deleteChat = asyncHandler(async (req, res) => {
  // console.log("Hello");
  const { chatId, userId } = req.body;
  var str = String(userId);
  var newLastTime = getDate();
  try {
    Chat.findByIdAndUpdate(
      chatId,
      { $set: { "lastDeleted.$[elem].lastTime": newLastTime } },
      {
        arrayFilters: [{ "elem.participant": str }],
        new: true,
      },
      function (err, chat) {
        if (err) {
          console.log(err);
          res.status(400);
        } else {
          res.status(200).json(chat);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
const seenChat = asyncHandler(async (req, res,next) => {
const {chatId} = req.body;
  let chatID=req.params.chatId===undefined?chatId._id:req.params.chatId;
  const userId=req.user._id;
  var str = String(userId);
  var newLastTime = getDate();
  try {
    Chat.findByIdAndUpdate(
      chatID,
      { $set: { "lastSeen.$[elem].lastTime": newLastTime } },
      {
        arrayFilters: [{ "elem.participant": str }],
        new: true,
      },
      function (err, chat) {
        if (err) {
          console.log(err);
          res.status(400);
        } else {
    next()
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
  
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  deleteChat,
  seenChat
};
