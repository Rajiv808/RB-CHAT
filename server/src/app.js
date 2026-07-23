console.log("✅ app.js loaded");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

// ===================== ALLOWED ORIGINS =====================

const allowedOrigins = [
  "http://localhost:5173",
  "https://rbchat-jelp.vercel.app",
  "https://rb-chat-gw6a.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

// ===================== CORS =====================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, Thunder Client, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ===================== BODY PARSERS =====================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===================== REQUEST LOGGER =====================

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// ===================== HOME =====================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to RB Chat API 🚀",
  });
});

// ===================== ROUTES =====================

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// ===================== 404 =====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===================== ERROR HANDLER =====================

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;