import Chat from "../models/Chat.js";
import User from "../models/User.js";

// =========================================
// Create / Access One-to-One Chat
// POST /api/chats
// =========================================
export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: {
        $all: [req.user._id, userId],
      },
    })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email avatar",
        },
      });

    if (chat) {
      return res.status(200).json({
        success: true,
        chat,
      });
    }

    chat = await Chat.create({
      chatName: "private",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    chat = await Chat.findById(chat._id).populate(
      "users",
      "-password"
    );

    return res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Fetch All Chats
// GET /api/chats
// =========================================
export const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name email avatar",
        },
      })
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Create Group Chat
// POST /api/chats/group
// =========================================
export const createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;

    if (!chatName || !users || users.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Minimum 3 members required.",
      });
    }

    const groupChat = await Chat.create({
      chatName,
      isGroupChat: true,
      users: [...users, req.user._id],
      groupAdmin: req.user._id,
    });

    const chat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Rename Group
// PUT /api/chats/rename
// =========================================
export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Add User
// PUT /api/chats/groupadd
// =========================================
export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $addToSet: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Remove User
// PUT /api/chats/groupremove
// =========================================
export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};