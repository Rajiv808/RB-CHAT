console.log("🚀 SERVER BUILD v2 - 24 JULY");
console.log("Node Version:", process.version);

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import initializeSocket from "./socket/socket.js";

// ================= CONNECT DATABASE =================
connectDB();

// ================= CREATE HTTP SERVER =================
const server = http.createServer(app);

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://rb-chat-gw6a.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// Make io available in controllers
app.set("io", io);

// Initialize socket events
initializeSocket(io);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 CLIENT_URL: ${process.env.CLIENT_URL}`);
  console.log("======================================");
});