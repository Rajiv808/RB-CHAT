import { Menu, MoreVertical, Phone, Video } from "lucide-react";
import Avatar from "./Avatar";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const ChatHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const { onlineUsers = [] } = useSocket();

  if (!selectedChat) return null;

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
    <header className="w-full h-16 flex-shrink-0 px-3 sm:px-4 md:px-6 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between z-30 shadow-xs">
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 mr-2">
        
        {/* Mobile Drawer Toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="md:hidden p-1.5 sm:p-2 -ml-1 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 transition-all active:scale-95 shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <Avatar
          src={selectedChat.isGroupChat ? "" : otherUser?.avatar}
          name={chatName}
          online={isOnline}
          size={40}
        />

        {/* Chat Metadata */}
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-zinc-900 text-sm sm:text-base truncate tracking-tight">
            {chatName}
          </h2>
          <p className="text-[11px] sm:text-xs truncate font-medium mt-0.5">
            {selectedChat.isGroupChat ? (
              <span className="text-zinc-500">
                {selectedChat.users?.length || 0} members
              </span>
            ) : isOnline ? (
              <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 inline-block animate-pulse shadow-xs shadow-emerald-500/50" />
                Online
              </span>
            ) : (
              <span className="text-zinc-400">Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Header Controls */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        <button 
          aria-label="Audio call" 
          className="p-2 sm:p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </button>
        <button 
          aria-label="Video call" 
          className="p-2 sm:p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          <Video className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </button>
        <button 
          aria-label="More options" 
          className="p-2 sm:p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-zinc-900 transition-all active:scale-95"
        >
          <MoreVertical className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;