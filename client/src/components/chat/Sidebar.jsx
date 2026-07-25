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

const Sidebar = ({ onClose }) => {
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

 
  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats || [];

    return (chats || []).filter((chat) => {
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

  
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      <motion.aside
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="h-full w-full bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl flex flex-col border-r border-slate-800/80 relative z-20 overflow-hidden select-none transform-gpu"
      >
       
        <div className="p-3.5 sm:p-4 border-b border-slate-800/80 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-md shrink-0">
          <div className="flex justify-between items-center mb-3 gap-2">
            
           
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <Avatar
                src={user?.avatar}
                name={user?.name}
                online
                size={40}
              />

              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-slate-100 text-xs sm:text-sm md:text-base truncate flex items-center gap-1 sm:gap-1.5 tracking-tight">
                  <span className="truncate">{user?.name || "User"}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                </h2>

                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
                  <span>Online</span>
                </div>
              </div>
            </div>

          
            <div className="flex items-center gap-1 shrink-0">
              
             
              <button
                onClick={() => setShowUsers(true)}
                title="New Chat"
                className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white shadow-md shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer touch-manipulation"
              >
                <Plus className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                title="Notifications"
                className="p-2 sm:p-2.5 rounded-2xl hover:bg-slate-800/80 text-slate-400 hover:text-slate-100 transition-all active:scale-95 hidden sm:block cursor-pointer touch-manipulation"
              >
                <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                title="Settings"
                className="p-2 sm:p-2.5 rounded-2xl hover:bg-slate-800/80 text-slate-400 hover:text-slate-100 transition-all active:scale-95 hidden sm:block cursor-pointer touch-manipulation"
              >
                <Settings className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 sm:p-2.5 rounded-2xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-all active:scale-95 cursor-pointer touch-manipulation"
              >
                <LogOut className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              
              {onClose && (
                <button
                  onClick={onClose}
                  className="md:hidden p-2 rounded-2xl hover:bg-slate-800 text-slate-400 hover:text-slate-100 ml-0.5 cursor-pointer touch-manipulation"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>
          </div>

          {/* Search Bar Input */}
          <div className="mt-2">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

       
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 custom-scrollbar min-h-0">
          {chatLoading ? (
        
            <div className="space-y-2.5 p-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60 animate-pulse"
                >
                  <div className="w-11 h-11 rounded-full bg-slate-800 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-slate-800 rounded-md w-1/2" />
                    <div className="h-3 bg-slate-800/60 rounded-md w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredChats.length === 0 ? (
        
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3.5 shadow-inner">
                <MessageSquarePlus className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-200">
                {search ? "No matches found" : "No conversations yet"}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed font-medium">
                {search
                  ? "Try searching for another contact name"
                  : "Click '+' above to start chatting with friends"}
              </p>
            </div>
          ) : (
        
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

  
      <UserListModal
        open={showUsers}
        onClose={() => setShowUsers(false)}
        onSelectUser={handleSelectUser}
      />
    </>
  );
};

export default Sidebar;