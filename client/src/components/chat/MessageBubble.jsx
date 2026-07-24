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
      } my-1 sm:my-1.5 px-1`}
    >
      <div
        className={`flex items-end gap-1.5 sm:gap-2.5 max-w-[85%] sm:max-w-[70%] md:max-w-[65%] ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isOwnMessage && (
          <Avatar
            src={sender?.avatar || ""}
            name={sender?.name || "User"}
            size={28}
            className="mb-0.5 shrink-0 sm:hidden"
          />
        )}
        {!isOwnMessage && (
          <Avatar
            src={sender?.avatar || ""}
            name={sender?.name || "User"}
            size={32}
            className="mb-0.5 shrink-0 hidden sm:inline-block"
          />
        )}

        <div
          className={`relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border shadow-xs min-w-[60px] ${
            isOwnMessage
              ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-xs border-indigo-500/20"
              : "bg-white text-zinc-800 rounded-bl-xs border-zinc-200/80"
          }`}
        >
          {showSender && (
            <p className="mb-0.5 sm:mb-1 text-[10px] sm:text-[11px] font-semibold text-indigo-600 truncate">
              {sender?.name || "Unknown"}
            </p>
          )}

          {message.image && (
            <img
              src={message.image}
              alt="Shared"
              className="rounded-xl mb-1.5 sm:mb-2 max-w-full max-h-60 sm:max-h-80 w-full object-cover cursor-pointer"
              onClick={() => window.open(message.image, "_blank")}
            />
          )}

          {message.content && (
            <p className="text-xs sm:text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          )}

          <div
            className={`flex justify-end items-center gap-1 mt-1 text-[9px] sm:text-[10px] select-none ${
              isOwnMessage
                ? "text-indigo-100"
                : "text-zinc-400"
            }`}
          >
            <span>{messageTime}</span>

            {isOwnMessage && (
              <>
                {isRead ? (
                  <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-200 shrink-0" />
                ) : (
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-200 shrink-0" />
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