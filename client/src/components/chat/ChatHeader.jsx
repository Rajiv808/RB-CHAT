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
    <header className="w-full h-16 flex-shrink-0 px-4 md:px-6 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between z-30 shadow-xs">
      <div className="flex items-center gap-3.5 min-w-0">
        
        {/* Mobile Drawer Toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>

        {/* Avatar */}
        <Avatar
          src={selectedChat.isGroupChat ? "" : otherUser?.avatar}
          name={chatName}
          online={isOnline}
          size={40}
        />

        {/* Chat Metadata */}
        <div className="min-w-0">
          <h2 className="font-semibold text-zinc-900 text-sm md:text-base truncate tracking-tight">
            {chatName}
          </h2>
          <p className="text-xs truncate font-medium mt-0.5">
            {selectedChat.isGroupChat ? (
              <span className="text-zinc-500">
                {selectedChat.users?.length || 0} members
              </span>
            ) : isOnline ? (
              <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shadow-xs shadow-emerald-500/50" />
                Online
              </span>
            ) : (
              <span className="text-zinc-400">Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Header Controls */}
      <div className="flex items-center gap-1">
        <button 
          aria-label="Audio call" 
          className="p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          <Phone size={18} />
        </button>
        <button 
          aria-label="Video call" 
          className="p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          <Video size={18} />
        </button>
        <button 
          aria-label="More options" 
          className="p-2.5 rounded-xl hover:bg-zinc-200/60 text-zinc-600 hover:text-zinc-900 transition-all active:scale-95"
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;