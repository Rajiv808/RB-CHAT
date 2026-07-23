import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

import Message from "../models/Message.js";
import Chat from "../models/chat.js";

// ======================
// Send Message
// ======================

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content = "" } = req.body;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    let imageUrl = "";

    // ======================
    // Upload Image (if exists)
    // ======================

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "chat-app/messages",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = uploadResult.secure_url;
    }

    // ======================
    // Validate Message
    // ======================

    if (!content.trim() && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // ======================
    // Create Message
    // ======================

    let message = await Message.create({
      sender: req.user._id,
      chat: chatId,
      content: content.trim(),
      image: imageUrl,
    });

    // ======================
    // Populate Sender
    // ======================

    message = await message.populate(
      "sender",
      "name email avatar"
    );

    // ======================
    // Populate Chat + Users
    // ======================

    message = await message.populate({
      path: "chat",
      populate: {
        path: "users",
        select: "name email avatar",
      },
    });

    // ======================
    // Update Latest Message
    // ======================

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
      updatedAt: new Date(),
    });

    // ======================
    // Socket.IO
    // ======================

    const io = req.app.get("io");

    if (io) {
      io.to(chatId).emit(
        "messageReceived",
        message
      );
    }

    // ======================
    // Response
    // ======================

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Send Message Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Messages
// ======================

export const allMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({
      chat: chatId,
    })
      .populate(
        "sender",
        "name email avatar"
      )
      .sort({
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};