import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import useChat from "../../hooks/useChat";
import { MessageSquare } from "lucide-react";

const MainLayout = () => {
  const { selectedChat, selectChat } = useChat();

  return (
    <div className="h-[100dvh] w-screen overflow-hidden flex bg-[#070b14] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 
        SIDEBAR CONTAINER (MOBILE vs DESKTOP):
        - Mobile: Shown IF no chat is selected (!selectedChat). Hidden IF chat is selected.
        - Desktop (md:flex): ALWAYS shown on left side (w-80 / lg:w-96).
      */}
      <div
        className={`w-full md:w-80 lg:w-96 h-full flex-shrink-0 bg-[#070b14] border-r border-slate-800/80 ${
          !selectedChat ? "flex flex-col" : "hidden md:flex md:flex-col"
        }`}
      >
        <Sidebar />
      </div>

      {/* 
        MAIN CHAT / WELCOME AREA:
        - Mobile: Shown ONLY when a chat IS selected (selectedChat).
        - Desktop (md:flex): ALWAYS shown on right side.
      */}
      <div
        className={`flex-1 h-full min-w-0 min-h-0 flex-col overflow-hidden relative bg-[#070b14] ${
          selectedChat ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedChat ? (
          <ChatWindow
            onToggleSidebar={() => selectChat(null)}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center relative">
            <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-xl shadow-indigo-950/30">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Welcome to your Chat Space</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              Select a conversation from the sidebar or start a new chat to begin messaging.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MainLayout;