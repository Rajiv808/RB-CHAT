import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";

const ChatWindow = ({ onToggleSidebar }) => {
  return (
    <div className="relative flex flex-col h-full h-[100dvh] w-full min-w-0 min-h-0 overflow-hidden bg-slate-50 text-slate-900">
      
      {/* 1. Header (Pinned at Top - Pure White surface) */}
      <div className="shrink-0 z-20 w-full">
        <ChatHeader onToggleSidebar={onToggleSidebar} />
      </div>

      {/* 2. Chat Body (Scrolls Internally on soft off-white background) */}
      <div className="flex-1 min-h-0 relative z-10 overflow-hidden flex flex-col w-full">
        <ChatBody />
      </div>

      {/* 3. Input Bar (Pinned at Bottom with Safe Area Padding for Mobile) */}
      <div className="shrink-0 relative z-20 w-full pb-safe">
        <MessageInput />
      </div>

    </div>
  );
};

export default ChatWindow;