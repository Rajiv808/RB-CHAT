import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  getUsers,
  searchUsers,
  getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, getUsers);

router.get("/search", protect, searchUsers);

router.get("/:id", protect, getUserById);

export default router;