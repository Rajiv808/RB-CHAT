import { Menu, MoreVertical, Phone, Video } from "lucide-react";
import Avatar from "./Avatar";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";

const ChatHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { selectedChat } = useChat();
  const { onlineUsers = [] } = useSocket();

  // Debug
  console.log("====== ChatHeader ======");
  console.log("Rendered");
  console.log("Window Width:", window.innerWidth);
  console.log("Selected Chat:", selectedChat);

  // No chat selected
  if (!selectedChat) {
    return (
      <header className="h-16 w-full flex items-center px-4 bg-white border-b border-zinc-200">

        {/* DEBUG BUTTON */}
        <button
          onClick={onToggleSidebar}
          className="fixed top-4 left-4 z-[99999] bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          MENU
        </button>

        <h2 className="ml-20 text-lg font-semibold text-zinc-800">
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
    <header className="w-full h-16 flex items-center justify-between px-4 bg-white border-b border-zinc-200">

      <div className="flex items-center gap-3">

        {/* DEBUG BUTTON */}
        <button
          onClick={onToggleSidebar}
          className="fixed top-4 left-4 z-[99999] bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          MENU
        </button>

        <Avatar
          src={selectedChat.isGroupChat ? "" : otherUser?.avatar}
          name={chatName}
          online={isOnline}
          size={40}
        />

        <div>
          <h2 className="font-semibold">{chatName}</h2>

          <p className="text-xs text-zinc-500">
            {selectedChat.isGroupChat
              ? `${selectedChat.users?.length || 0} members`
              : isOnline
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
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