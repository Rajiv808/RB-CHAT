const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    // =======================
    // User Setup
    // =======================
    socket.on("setup", (userId) => {
      socket.join(userId);

      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", [...onlineUsers.keys()]);

      console.log(`${userId} connected`);
    });

    // =======================
    // Join Chat Room
    // =======================
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);

      console.log(`${socket.id} joined ${chatId}`);
    });

    // =======================
    // Typing
    // =======================
    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing");
    });

    socket.on("stopTyping", (chatId) => {
      socket.to(chatId).emit("stopTyping");
    });

    // =======================
    // New Message
    // =======================
    socket.on("newMessage", (message) => {
      socket.to(message.chat._id).emit("messageReceived", message);
    });

    // =======================
    // Read Message
    // =======================
    socket.on("messageRead", ({ chatId, userId }) => {
      socket.to(chatId).emit("messageSeen", userId);
    });

    // =======================
    // Disconnect
    // =======================
    socket.on("disconnect", () => {
      console.log(`❌ ${socket.id} disconnected`);

      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("onlineUsers", [...onlineUsers.keys()]);
    });
  });
};

export default socketHandler;