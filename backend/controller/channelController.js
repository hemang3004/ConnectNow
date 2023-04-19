const asyncHandler = require("express-async-handler");
const Channel = require("../models/channelModel");
const User = require("../models/userModel");

const createChannel = asyncHandler(async (req, res) => {
  if (!req.body.name && !req.body.discription) {
    return res
      .status(400)
      .send({ message: "Please fill all the feilds require" });
  }

  // var users = JSON.parse(req.body.users);

  // if (users.length < 2) {
  //   return res
  //     .status(400)
  //     .send("More than 2 users are required to form a channel");
  // }

  // users.push(req.user);

  try {
    // create grou chat
    const groupChannel = await Channel.create({
      channelName: req.body.name,
      users: req.user,
      discription: req.body.discription,
      channelAdmin: req.user,
    });

    // send back full chat to user
    const fullChannel = await Channel.findOne({ _id: groupChannel._id })
      .populate("users", "-password")
      .populate("channelAdmin", "-password");

    res.status(200).json(fullChannel);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const addToChannel = asyncHandler(async (req, res) => {
  const { channelId, userId } = req.body;

  const added = await Channel.findByIdAndUpdate(
    channelId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("channelAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("User not added");
  } else {
    res.json(added);
  }
});

const removeFromChannel = asyncHandler(async (req, res) => {
  const { channelId, userId } = req.body;

  const removed = await Channel.findByIdAndUpdate(
    channelId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("channelAdmin", "-password");

  if (!removed) {
    res.status(400);
    throw new Error("User is not removed");
  } else {
    res.json(removed);
  }
});

const renameChannel = asyncHandler(async (req, res) => {
  const { channelId, channelName } = req.body;

  const updatedChannel = await Channel.findByIdAndUpdate(
    channelId,
    {
      channelName: channelName,
    },
    // if dont use this it will return old value
    { new: true }
  )
    .populate("users", "-password")
    .populate("channelAdmin", "-password");

  if (!updatedChannel) {
    res.status(400);
    throw new Error("Channel not found");
  } else {
    res.json(updatedChannel);
  }
});

const deleteChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.body;

  const deleted = await Channel.deleteOne({ _id: channelId });

  if (!deleted) {
    res.status(400);
    throw new Error("Channel not found");
  } else {
    res.status(200).send("Channel Deleted");
  }
});

const fetchChannels = asyncHandler(async (req, res) => {
  console.log("hello");
  try {
    Channel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("channelAdmin", "-password")
      // .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
        // console.log("results", results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const accessChannel = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChannel = await Channel.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChannel = await User.populate(isChannel, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChannel.length > 0) {
    res.send(isChannel[0]);
  } else {
    var channelData = {
      channelName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const createdChannel = await Channel.create(channelData);
      const FullChannel = await Channel.findOne({
        _id: createdChannel._id,
      }).populate("users", "-password");
      res.status(200).json(FullChannel);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

module.exports = {
  createChannel,
  addToChannel,
  removeFromChannel,
  renameChannel,
  deleteChannel,
  fetchChannels,
  accessChannel,
};
