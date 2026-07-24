import { useMemo, useState } from "react";
import {
  Bell,
  LogOut,
  Settings,
  Plus,
  MessageSquarePlus,
  X,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import Avatar from "./Avatar";
import SearchBar from "./SearchBar";
import ChatListItem from "./ChatListItem";
import UserListModal from "./UserListModal";

import API from "../../services/api";

import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import useSocket from "../../hooks/useSocket";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const {
    chats,
    selectedChat,
    selectChat,
    chatLoading,
    fetchChats,
  } = useChat();

  const { onlineUsers } = useSocket();

  const [search, setSearch] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  // ==========================
  // Filter Chats
  // ==========================
  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;

    return chats.filter((chat) => {
      let chatName = "";

      if (chat.isGroupChat) {
        chatName = chat.chatName || "";
      } else {
        const otherUser = chat.users?.find(
          (u) => u._id !== user?._id
        );
        chatName = otherUser?.name || "";
      }

      return chatName
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [search, chats, user]);

  // ==========================
  // Create / Open Chat
  // ==========================
  const handleSelectUser = async (selectedUser) => {
    try {
      const { data } = await API.post("/chats", {
        userId: selectedUser._id,
      });

      if (data.success) {
        await fetchChats();
        selectChat(data.chat);
        setShowUsers(false);
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("Failed to select user:", err);
    }
  };

  // ==========================
  // Logout
  // ==========================
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full bg-slate-100/90 backdrop-blur-xl flex flex-col border-r border-slate-200 relative z-20 overflow-hidden select-none"
      >
        {/* ================= Header / User Profile Card ================= */}
        <div className="p-3.5 sm:p-4 md:p-5 border-b border-slate-200/80 bg-white/70 backdrop-blur-md shrink-0">
          <div className="flex justify-between items-center mb-3 sm:mb-3.5 gap-2">
            
            {/* User Info */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <Avatar
                src={user?.avatar}
                name={user?.name}
                online
                size={40}
              />

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-slate-800 text-xs sm:text-sm md:text-base truncate flex items-center gap-1 sm:gap-1.5 tracking-tight">
                  <span className="truncate">{user?.name}</span>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                </h2>

                <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              
              {/* New Direct Chat Action */}
              <button
                onClick={() => setShowUsers(true)}
                title="New Chat"
                className="p-2 sm:p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                title="Notifications"
                className="p-2 sm:p-2.5 rounded-xl hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition-all active:scale-95 hidden sm:block cursor-pointer"
              >
                <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                title="Settings"
                className="p-2 sm:p-2.5 rounded-xl hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition-all active:scale-95 hidden sm:block cursor-pointer"
              >
                <Settings className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 sm:p-2.5 rounded-xl hover:bg-rose-100/70 text-slate-500 hover:text-rose-600 transition-all active:scale-95 cursor-pointer"
              >
                <LogOut className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              {/* Mobile Close Drawer Button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="md:hidden p-2 sm:p-2.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-900 ml-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>
              )}

            </div>
          </div>

          {/* Search Bar Input */}
          <div className="mt-2">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* ================= Conversations Feed ================= */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-1.5 custom-scrollbar min-h-0">
          {chatLoading ? (
            /* Skeleton Loader */
            <div className="space-y-2.5 p-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/60 border border-slate-200/50 animate-pulse"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-slate-200 rounded-md w-1/2" />
                    <div className="h-3 bg-slate-200/70 rounded-md w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredChats.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-10 sm:py-12 px-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400 mb-3">
                <MessageSquarePlus className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {search ? "No matches found" : "No conversations yet"}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                {search
                  ? "Try searching for another contact name"
                  : "Click '+' above to start chatting with friends"}
              </p>
            </div>
          ) : (
            /* Active Chat List */
            filteredChats.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                active={selectedChat?._id === chat._id}
                onlineUsers={onlineUsers}
                onClick={() => {
                  selectChat(chat);
                  if (onClose) onClose();
                }}
              />
            ))
          )}
        </div>
      </motion.aside>

      {/* User Selection Modal */}
      <UserListModal
        open={showUsers}
        onClose={() => setShowUsers(false)}
        onSelectUser={handleSelectUser}
      />
    </>
  );
};

export default Sidebar;