import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";
import useChat from "../../hooks/useChat";

const ChatWindow = ({ onToggleSidebar }) => {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-100">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold text-slate-700">
            Welcome to Chat
          </h1>
          <p className="mt-2 text-slate-500">
            Select a conversation to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col bg-slate-100">
      <ChatHeader onToggleSidebar={onToggleSidebar} />

      <div className="flex-1 min-h-0 overflow-hidden">
        <ChatBody />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;