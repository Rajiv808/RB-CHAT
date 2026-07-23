import express from "express";

import {
  register,
  login,
  logout,
  getMe,
  verifyOTP,
  resendOTP,
} from "../controllers/auth.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// ================= AUTH =================
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.post("/logout", logout);

// ================= USER =================
router.get("/me", protect, getMe);

export default router;