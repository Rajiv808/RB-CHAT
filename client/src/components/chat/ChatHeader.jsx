import { Menu, MoreVertical, Phone, Video } from "lucide-react";
import Avatar from "./Avatar";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const ChatHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const { onlineUsers = [] } = useSocket();

  // No chat selected state
  if (!selectedChat) {
    return (
      <header className="h-16 w-full flex items-center gap-3 px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 z-20 transition-colors">
        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 touch-manipulation transition-all cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Messages
        </h2>
      </header>
    );
  }

  const otherUser = !selectedChat.isGroupChat
    ? selectedChat.users?.find((u) => u._id !== user?._id)
    : null;

  const chatName = selectedChat.isGroupChat
    ? selectedChat.chatName
    : otherUser?.name || "Chat";

  const isOnline = selectedChat.isGroupChat
    ? false
    : onlineUsers.includes(otherUser?._id);

  return (
    <header className="h-16 w-full flex items-center justify-between px-3 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 z-20 transform-gpu transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          className="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 touch-manipulation transition-all shrink-0 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* User / Group Avatar */}
        <Avatar
          src={selectedChat.isGroupChat ? "" : otherUser?.avatar}
          name={chatName}
          online={isOnline}
          size={42}
        />

        {/* Header Details */}
        <div className="min-w-0 flex flex-col justify-center">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-tight truncate">
            {chatName}
          </h2>

          <div className="flex items-center gap-1.5 mt-0.5">
            {selectedChat.isGroupChat ? (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                {selectedChat.users?.length || 0} members
              </span>
            ) : isOnline ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active now
              </span>
            ) : (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Offline
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          aria-label="Start voice call"
          className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 active:scale-90 touch-manipulation transition-all cursor-pointer"
        >
          <Phone className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
        </button>

        <button
          type="button"
          aria-label="Start video call"
          className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 active:scale-90 touch-manipulation transition-all cursor-pointer"
        >
          <Video className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
        </button>

        <button
          type="button"
          aria-label="More options"
          className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 active:scale-90 touch-manipulation transition-all cursor-pointer"
        >
          <MoreVertical className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;