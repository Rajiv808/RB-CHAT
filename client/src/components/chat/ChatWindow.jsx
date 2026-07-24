import React from "react";
import { MessagesSquare, Sparkles } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";

const ChatWindow = ({ onToggleSidebar }) => {
  const { selectedChat } = useChat();

  // No Chat Selected Fallback / Empty State
  if (!selectedChat) {
    return (
      <div className="relative flex flex-1 items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 overflow-hidden select-none">
        {/* Modern Vibrant Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 sm:w-112 h-80 sm:h-112 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none transform-gpu animate-pulse" />

        <div className="relative z-10 max-w-sm sm:max-w-md text-center p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-800/80 shadow-xl backdrop-blur-xl transition-all">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30 mb-4 sm:mb-5 text-white">
            <MessagesSquare className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center justify-center gap-2">
            <span>Welcome to Chat</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Select a conversation from the sidebar or start a new chat to begin messaging.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden transform-gpu transition-colors">
      {/* Top Header Bar */}
      <ChatHeader onToggleSidebar={onToggleSidebar} />

      {/* Main Scrollable Messages Container */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <ChatBody />
      </div>

      {/* Bottom Fixed Message Input */}
      <div className="shrink-0 z-10">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;