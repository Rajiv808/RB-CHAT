import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import useChat from "../../hooks/useChat";
import { MessageSquare } from "lucide-react";

const MainLayout = () => {
  const { selectedChat } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#070b14] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 lg:w-96 h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] h-full z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full min-w-0 min-h-0 flex flex-col overflow-hidden relative">
        {selectedChat ? (
          <ChatWindow
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            isSidebarOpen={isSidebarOpen}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-[#070b14] relative">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden absolute top-4 left-4 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              Open Chats
            </button>
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