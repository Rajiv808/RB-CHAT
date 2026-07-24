import { useEffect, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import useChat from "../hooks/useChat";

const MOBILE_BREAKPOINT = 768;

const Home = () => {
  const { selectedChat } = useChat();

  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return !isMobile();
  });

  // Keep sidebar in sync with screen size and selected chat
  useEffect(() => {
    const updateLayout = () => {
      if (isMobile()) {
        setIsSidebarOpen(!selectedChat);
      } else {
        setIsSidebarOpen(true);
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [selectedChat]);

  const openSidebar = () => {
    if (isMobile()) {
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    if (isMobile()) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile()) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-slate-100">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-slate-50 to-sky-100" />

      {/* Mobile Overlay */}
      {isMobile() && isSidebarOpen && selectedChat && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={closeSidebar}
        />
      )}

      <div className="flex h-full w-full overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0
            z-40
            w-[85vw]
            max-w-[320px]
            bg-white
            border-r border-slate-200
            transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }

            md:relative
            md:w-80
            md:max-w-none
            md:translate-x-0
            md:flex-shrink-0
          `}
        >
          <Sidebar onClose={closeSidebar} />
        </aside>

        {/* Chat Area */}
        <main className="flex flex-1 min-w-0 min-h-0 overflow-hidden">
          <ChatWindow
            onToggleSidebar={toggleSidebar}
            onOpenSidebar={openSidebar}
          />
        </main>

      </div>
    </div>
  );
};

export default Home;