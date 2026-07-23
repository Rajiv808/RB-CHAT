import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState([]);

  const [chatLoading, setChatLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  // ==========================
  // Fetch Chats
  // ==========================
  const fetchChats = async () => {
    try {
      setChatLoading(true);

      const { data } = await API.get("/chats");

      if (data.success) {
        setChats(data.chats);
      }
    } catch (err) {
      console.error("Fetch Chats Error:", err);
    } finally {
      setChatLoading(false);
    }
  };

  // ==========================
  // Create / Access Chat
  // ==========================
  const createChat = async (userId) => {
    try {
      const { data } = await API.post("/chats", {
        userId,
      });

      if (data.success) {
        await fetchChats();

        setSelectedChat(data.chat);

        await fetchMessages(data.chat._id);

        return data.chat;
      }
    } catch (err) {
      console.error("Create Chat Error:", err);
    }
  };

  // ==========================
  // Fetch Messages
  // ==========================
  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    try {
      setMessageLoading(true);

      const { data } = await API.get(`/messages/${chatId}`);

      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    } finally {
      setMessageLoading(false);
    }
  };

  // ==========================
  // Select Chat
  // ==========================
  const selectChat = async (chat) => {
    if (!chat) return;

    setSelectedChat(chat);

    await fetchMessages(chat._id);
  };

  // ==========================
  // Send Message
  // ==========================
  const sendMessage = async (content = "", image = null) => {
    if (!selectedChat) return;

    const text = content.trim();

    if (!text && !image) return;

    try {
      const formData = new FormData();

      formData.append("chatId", selectedChat._id);
      formData.append("content", text);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await API.post("/messages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        // DO NOT add message here.
        // SocketContext will receive "messageReceived"
        // and update the messages automatically.

        setChats((prev) =>
          prev.map((chat) =>
            chat._id === selectedChat._id
              ? {
                  ...chat,
                  latestMessage: data.data,
                  updatedAt: new Date().toISOString(),
                }
              : chat
          )
        );

        return data.data;
      }
    } catch (err) {
      console.error("Send Message Error:", err);
      throw err;
    }
  };

  // ==========================
  // Initial Load
  // ==========================
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        selectedChat,
        messages,

        chatLoading,
        messageLoading,

        fetchChats,
        fetchMessages,
        createChat,
        selectChat,
        sendMessage,

        setChats,
        setMessages,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;