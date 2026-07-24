import { useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    // 'fixed inset-0 h-screen w-screen overflow-hidden' guarantees the app stays locked to the screen
    <div className="fixed inset-0 h-screen h-[100dvh] w-screen overflow-hidden bg-slate-50 font-sans text-zinc-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Ambient Background Light Flares (Soft Modern Glows) */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-300/30 via-violet-300/20 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-sky-300/30 via-indigo-200/20 to-transparent blur-[140px]" />

      {/* Main Container locked to exact screen height */}
      <div className="relative z-10 flex h-full w-full overflow-hidden bg-white/70 backdrop-blur-2xl">
        
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar Container - Dark Modern Contrast Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 h-full w-80 transform bg-[#0B0F19]/95 backdrop-blur-xl border-r border-zinc-800/60 shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0 shadow-indigo-950/20" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Chat Area Container - Bright, Clean & Vibrant Chat Canvas */}
        <main className="flex flex-1 flex-col h-full min-w-0 overflow-hidden bg-slate-100/50 backdrop-blur-md relative">
          <ChatWindow onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </main>

      </div>
    </div>
  );
};

export default Home;