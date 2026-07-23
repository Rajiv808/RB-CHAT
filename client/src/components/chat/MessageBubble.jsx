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
      } my-1.5`}
    >
      <div
        className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[70%] ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isOwnMessage && (
          <Avatar
            src={sender?.avatar || ""}
            name={sender?.name || "User"}
            size={32}
            className="mb-0.5"
          />
        )}

        <div
          className={`relative px-4 py-2.5 rounded-2xl border shadow-sm ${
            isOwnMessage
              ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm border-indigo-500/20"
              : "bg-white text-zinc-800 rounded-bl-sm border-zinc-200"
          }`}
        >
          {showSender && (
            <p className="mb-1 text-[11px] font-semibold text-indigo-600">
              {sender?.name || "Unknown"}
            </p>
          )}

          {message.image && (
            <img
              src={message.image}
              alt="Shared"
              className="rounded-xl mb-2 max-w-full max-h-80 object-cover cursor-pointer"
              onClick={() => window.open(message.image, "_blank")}
            />
          )}

          {message.content && (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          <div
            className={`flex justify-end items-center gap-1 mt-1 text-[10px] ${
              isOwnMessage
                ? "text-indigo-100"
                : "text-zinc-400"
            }`}
          >
            <span>{messageTime}</span>

            {isOwnMessage && (
              <>
                {isRead ? (
                  <CheckCheck className="w-3.5 h-3.5 text-sky-200" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-indigo-200" />
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