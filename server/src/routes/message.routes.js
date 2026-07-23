import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

import {
  sendMessage,
  allMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

// Send Text / Image Message
router.post(
  "/",
  protect,
  upload.single("image"),
  sendMessage
);

// Get all messages of a chat
router.get("/:chatId", protect, allMessages);

export default router;