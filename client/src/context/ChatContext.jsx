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
    if (!chatId) {
      setMessages([]);
      return;
    }

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
  // Select Chat (Fix: Allows passing null to clear selection on mobile)
  // ==========================
  const selectChat = async (chat) => {
    if (!chat) {
      setSelectedChat(null);
      setMessages([]);
      return;
    }

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
        // Update latest message & bring this chat to top of the sidebar
        setChats((prev) => {
          const updatedChats = prev.map((chat) =>
            chat._id === selectedChat._id
              ? {
                  ...chat,
                  latestMessage: data.data,
                  updatedAt: new Date().toISOString(),
                }
              : chat
          );

          // Re-sort: Most recently updated chat first
          return updatedChats.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        });

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