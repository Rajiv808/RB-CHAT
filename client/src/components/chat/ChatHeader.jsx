import { Menu, MoreVertical, Phone, Video } from "lucide-react";
import Avatar from "./Avatar";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const ChatHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const { onlineUsers = [] } = useSocket();

  // No chat selected
  if (!selectedChat) {
    return (
      <header className="h-16 w-full flex items-center gap-3 px-4 bg-white border-b border-zinc-200 shrink-0">
        {/* Mobile Menu */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-zinc-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold text-zinc-800">
          Chats
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
    <header className="h-16 w-full flex items-center justify-between px-4 bg-white border-b border-zinc-200 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-zinc-100 shrink-0"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Avatar
          src={selectedChat.isGroupChat ? "" : otherUser?.avatar}
          name={chatName}
          online={isOnline}
          size={40}
        />

        <div className="min-w-0">
          <h2 className="font-semibold truncate">
            {chatName}
          </h2>

          <p className="text-xs text-zinc-500">
            {selectedChat.isGroupChat
              ? `${selectedChat.users?.length || 0} members`
              : isOnline
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button className="p-2 rounded-lg hover:bg-zinc-100">
          <Phone className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-lg hover:bg-zinc-100">
          <Video className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-lg hover:bg-zinc-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;