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
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-2xl transition-all duration-200 text-left border relative group select-none touch-manipulation transform-gpu active:scale-[0.98] cursor-pointer ${
        active
          ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20"
          : "bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 shadow-xs backdrop-blur-md"
      }`}
    >

      <div className="relative shrink-0">
        <Avatar
          src={avatar}
          name={chatName}
          online={online}
          size={48}
        />
        {chat.isGroupChat && (
          <div
            className={`absolute -bottom-0.5 -right-0.5 p-1 rounded-full ring-2 transition-colors ${
              active
                ? "ring-indigo-700 bg-slate-900 text-violet-300"
                : "ring-white dark:ring-slate-900 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-sm"
            }`}
          >
            <Users size={10} />
          </div>
        )}
      </div>

     
      <div className="flex-1 min-w-0 flex flex-col justify-center">
      
        <div className="flex justify-between items-center mb-1">
          <h3
            className={`font-bold text-xs sm:text-sm truncate pr-2 leading-tight ${
              active ? "text-white" : "text-slate-900 dark:text-slate-100"
            }`}
          >
            {chatName}
          </h3>

          <span
            className={`text-[10px] sm:text-[11px] shrink-0 font-semibold transition-colors ${
              active
                ? "text-indigo-100/90"
                : unreadCount > 0
                ? "text-violet-600 dark:text-violet-400 font-bold"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {updatedTime}
          </span>
        </div>

        {/* Bottom Row: Message Preview + Unread Count */}
        <div className="flex justify-between items-center">
          <p
            className={`text-[11px] sm:text-xs truncate pr-2 font-medium transition-colors ${
              active
                ? "text-indigo-100/80"
                : unreadCount > 0
                ? "text-slate-900 dark:text-slate-50 font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {latestMessage}
          </p>

        
          {unreadCount > 0 && (
            <span
              className={`shrink-0 min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-extrabold tracking-tight transition-transform group-hover:scale-105 ${
                active
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/30"
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