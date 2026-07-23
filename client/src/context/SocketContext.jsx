import { createContext, useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import useAuth from "../hooks/useAuth";
import useChat from "../hooks/useChat";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const { selectedChat, setMessages } = useChat();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  // Keep a ref synchronized to avoid socket listener re-subscriptions on chat switch
  const selectedChatRef = useRef(selectedChat);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // ======================
  // Connect Socket
  // ======================

  useEffect(() => {
    if (!user) return;

    socket.connect();
    socket.emit("setup", user._id);

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // ======================
  // Join Selected Chat
  // ======================

  useEffect(() => {
    if (!selectedChat) return;

    socket.emit("joinChat", selectedChat._id);
  }, [selectedChat]);

  // ======================
  // Online Users
  // ======================

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  // ======================
  // Receive Message
  // ======================

  useEffect(() => {
    const handleMessageReceived = (newMessage) => {
      const currentChat = selectedChatRef.current;

      if (!currentChat) return;

      const incomingChatId =
        typeof newMessage.chat === "object"
          ? newMessage.chat?._id
          : newMessage.chat;

      if (incomingChatId !== currentChat._id) {
        return;
      }

      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);

        if (exists) return prev;

        return [...prev, newMessage];
      });
    };

    socket.on("messageReceived", handleMessageReceived);

    return () => {
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [setMessages]);

  // ======================
  // Typing
  // ======================

  useEffect(() => {
    socket.on("typing", () => {
      setTyping(true);
    });

    socket.on("stopTyping", () => {
      setTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        typing,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;