import { Check, CheckCheck } from "lucide-react";
import Avatar from "./Avatar";

import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();
  const { selectedChat } = useChat();

  // Works whether sender is an object or just an ID
  const senderId =
    typeof message.sender === "object"
      ? message.sender?._id
      : message.sender;

  const currentUserId = user?._id || user?.id;

  const isOwnMessage = senderId === currentUserId;

  const sender =
    typeof message.sender === "object"
      ? message.sender
      : null;

  const showSender =
    selectedChat?.isGroupChat && !isOwnMessage;

  const messageTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const isRead = (message.readBy?.length || 0) > 1;

  return (
    <div
      className={`w-full flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } my-1.5 sm:my-2 px-1 touch-manipulation transform-gpu`}
    >
      <div
        className={`flex items-end gap-2 sm:gap-2.5 max-w-[85%] sm:max-w-[70%] md:max-w-[65%] ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
     
        {!isOwnMessage && (
          <Avatar
            src={sender?.avatar || ""}
            name={sender?.name || "User"}
            size={32}
            className="mb-0.5 shrink-0"
          />
        )}

  
        <div
          className={`relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border shadow-md min-w-[68px] transition-all duration-200 ${
            isOwnMessage
              ? "bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-700 text-white rounded-br-xs border-indigo-500/30 shadow-indigo-500/20"
              : "bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 rounded-bl-xs border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md"
          }`}
        >
          {/* Sender Name in Group Chat */}
          {showSender && (
            <p className="mb-1 text-[10px] sm:text-[11px] font-bold text-violet-600 dark:text-violet-400 truncate">
              {sender?.name || "Unknown"}
            </p>
          )}

       
          {message.image && (
            <div className="relative overflow-hidden rounded-xl mb-2 group">
              <img
                src={message.image}
                alt="Shared attachment"
                className="max-w-full max-h-60 sm:max-h-80 w-full object-cover rounded-xl border border-white/20 shadow-xs cursor-pointer transition-transform duration-200 active:scale-[0.99] group-hover:scale-[1.02]"
                onClick={() => window.open(message.image, "_blank")}
              />
            </div>
          )}

          {/* Text Content */}
          {message.content && (
            <p className="text-xs sm:text-sm font-medium whitespace-pre-wrap break-words leading-relaxed tracking-wide">
              {message.content}
            </p>
          )}

       
          <div
            className={`flex justify-end items-center gap-1 mt-1 text-[9px] sm:text-[10px] font-medium select-none ${
              isOwnMessage
                ? "text-indigo-100/90"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <span>{messageTime}</span>

            {isOwnMessage && (
              <>
                {isRead ? (
                  <CheckCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-indigo-200/80 shrink-0" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;