console.log("✅ app.js loaded");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

// ===================== CORS =====================

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌐 Incoming Origin:", origin);

      // Allow Postman, Thunder Client, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      // Local development
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Any Vercel deployment
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Optional custom frontend URL
      if (
        process.env.CLIENT_URL &&
        origin === process.env.CLIENT_URL
      ) {
        return callback(null, true);
      }

      console.log("❌ Blocked Origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
  res.json({
    success: true,
    message: "RB Chat API Running 🚀",
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
  console.error("❌ ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;