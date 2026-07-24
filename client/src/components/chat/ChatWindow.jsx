import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import MessageList from "./MessageList"; // adjust path if needed
import MessageInput from "./MessageInput"; // adjust path if needed
import Avatar from "../Avatar"; // adjust path if needed
import useChat from "../../hooks/useChat";

const ChatWindow = ({ onToggleSidebar }) => {
  const { selectedChat } = useChat();

  if (!selectedChat) return null;

  return (
    /* 
      1. h-full & flex-col: Takes full screen height and stacks items vertically.
      2. min-h-0: Prevents flex child overflow bugs on mobile.
    */
    <div className="flex flex-col h-full w-full min-h-0 bg-[#070b14] overflow-hidden">
      
      {/* 1. CHAT HEADER (Fixed Height, shrink-0) */}
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/90 border-b border-slate-800 shrink-0 z-20">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          
          {/* Mobile Back Button - Calls selectChat(null) via onToggleSidebar */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Back to contacts"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <Avatar
            src={selectedChat?.avatar}
            name={selectedChat?.name || "Chat"}
            size={38}
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-slate-100 truncate">
              {selectedChat?.name || "User"}
            </h3>
            <p className="text-[11px] sm:text-xs text-indigo-400 truncate">
              Online
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* 2. MESSAGES CONTAINER (Flexible Height: flex-1, overflow-y-auto) */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 sm:p-4">
        <MessageList />
      </div>

      {/* 3. MESSAGE INPUT (Fixed Bottom: shrink-0, z-30) */}
      <div className="shrink-0 w-full z-30 bg-slate-900 border-t border-slate-800">
        <MessageInput />
      </div>

    </div>
  );
};

export default ChatWindow;