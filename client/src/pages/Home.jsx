import { useState, useEffect } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Close sidebar automatically on pressing the 'Escape' key for better accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        closeSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-slate-50 font-sans text-zinc-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Ambient Background Light Flares */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-300/30 via-violet-300/20 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-sky-300/30 via-indigo-200/20 to-transparent blur-[140px]" />

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full overflow-hidden bg-white/70 backdrop-blur-2xl">
        
        {/* Mobile Backdrop Overlay */}
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
          className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Sidebar Container */}
        <aside
          aria-label="Sidebar Navigation"
          className={`fixed inset-y-0 left-0 z-50 h-full w-80 shrink-0 transform bg-[#0B0F19]/95 backdrop-blur-xl border-r border-zinc-800/60 shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0 shadow-indigo-950/20" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </aside>

        {/* Chat Area Container */}
        <main className="flex flex-1 flex-col h-full min-w-0 overflow-hidden bg-slate-100/50 backdrop-blur-md relative">
          <ChatWindow onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </main>

      </div>
    </div>
  );
};

export default Home;