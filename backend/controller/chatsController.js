const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/UserModel");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { user: { $elemMatch: { $eq: req.user._id } } },
      { user: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("user", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      user: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "user",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/fetch
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ user: { $elemMatch: { $eq: req.user._id } } })
      .populate("user", "-password")
      .populate("GroupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {        /*this code segment retrieves the sender information
                                           from the latestMessage field of each user object and populates
                                                  the results array with the extracted data */
         results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.user || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var user = JSON.parse(req.body.user);  // frontend will send data in the form of string;

  if (user.length < 2) {
    return res            
      .status(400)
      .send("More than 2 user are required to form a group chat");
  }

  user.push(req.user);  // current logg in user

  try {
    const groupChat = await Chat.create({
      chatname: req.body.name,
      user: user,
      isGroupChat: true,
      GroupAdmin: req.user,     // the one who is creating a group is the group admin 
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("user", "-password")
      .populate("GroupAdmin", "-password")

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatname: chatName,
    },
    {
      new: true,    // if not given this func will return the old value(old name of the chat)
    }
  )
    .populate("user", "-password")
    .populate("GroupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Check if the user is a member of the chat
    const isMember = chat.user.includes(userId);
    if (!isMember) {
      return res.status(400).json({ error: 'User is not a member of the chat' });
    }

    // Remove the user from the chat
    chat.user.pull(userId);
    await chat.save();

    // Fetch the updated chat data after removing the user
    const updatedChat = await Chat.findById(chatId).populate('user', '-password').populate('GroupAdmin', '-password');

    res.json(updatedChat);
  } catch (error) {
    console.error('Error removing user from chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { user: userId },
    },
    {
      new: true,
    }
  )
    .populate("user", "-password")
    .populate("GroupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

module.exports = {
  accessChat,
  fetchChats, 
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};