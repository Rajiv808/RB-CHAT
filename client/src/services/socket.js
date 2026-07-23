import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("✅ Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("⚠️ Socket Connection Error:", error.message);
});

export default socket;