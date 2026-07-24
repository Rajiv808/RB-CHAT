import { Users } from "lucide-react";
import Avatar from "./Avatar";
import useAuth from "../../hooks/useAuth";

const ChatListItem = ({
  chat,
  active,
  onClick,
  onlineUsers = [],
}) => {
  const { user } = useAuth();

  const otherUser = !chat.isGroupChat
    ? chat.users?.find((u) => u._id !== user?._id)
    : null;

  const chatName = chat.isGroupChat
    ? chat.chatName
    : otherUser?.name || "Unknown User";

  const avatar = chat.isGroupChat ? "" : otherUser?.avatar || "";

  const online = chat.isGroupChat
    ? false
    : onlineUsers.includes(otherUser?._id);

  const isLastMessageMine = chat.latestMessage?.sender?._id === user?._id;
  const rawMessage = chat.latestMessage?.content;
  
  const latestMessage = rawMessage
    ? `${isLastMessageMine ? "You: " : ""}${rawMessage}`
    : "Start a conversation...";

  const updatedTime = chat.updatedAt
    ? new Date(chat.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const unreadCount = chat.unreadCount || 0;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl transition-all duration-200 text-left border relative group select-none active:scale-[0.98] cursor-pointer ${
        active
          ? "bg-indigo-600 border-indigo-500 shadow-md shadow-indigo-500/20 text-white"
          : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 shadow-2xs"
      }`}
    >
      {/* Avatar Container */}
      <div className="relative shrink-0">
        <Avatar
          src={avatar}
          name={chatName}
          online={online}
          size={46}
        />
        {chat.isGroupChat && (
          <div
            className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 ${
              active
                ? "border-indigo-600 bg-indigo-950 text-indigo-200"
                : "border-white bg-slate-200 text-slate-600"
            }`}
          >
            <Users size={10} />
          </div>
        )}
      </div>

      {/* Main Info Wrapper */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Top Row: Name + Time */}
        <div className="flex justify-between items-center mb-0.5 sm:mb-1">
          <h3
            className={`font-semibold text-xs sm:text-sm truncate pr-2 ${
              active ? "text-white" : "text-slate-900"
            }`}
          >
            {chatName}
          </h3>

          <span
            className={`text-[10px] sm:text-[11px] shrink-0 font-medium ${
              active ? "text-indigo-100" : "text-slate-400"
            }`}
          >
            {updatedTime}
          </span>
        </div>

        {/* Bottom Row: Message Preview + Unread Count */}
        <div className="flex justify-between items-center">
          <p
            className={`text-[11px] sm:text-xs truncate pr-2 ${
              active
                ? "text-indigo-100/90"
                : unreadCount > 0
                ? "text-slate-900 font-bold"
                : "text-slate-500"
            }`}
          >
            {latestMessage}
          </p>

          {/* Unread Badge Indicator */}
          {unreadCount > 0 && (
            <span
              className={`shrink-0 min-w-[18px] sm:min-w-[20px] h-4.5 sm:h-5 px-1.5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold ${
                active
                  ? "bg-white text-indigo-600"
                  : "bg-indigo-600 text-white shadow-xs"
              }`}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;