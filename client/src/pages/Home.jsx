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

  // Mobile behavior
  useEffect(() => {
    if (isMobile()) {
      setIsSidebarOpen(!selectedChat);
    } else {
      setIsSidebarOpen(true);
    }
  }, [selectedChat]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isMobile()) {
        setIsSidebarOpen(!selectedChat);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

      {isSidebarOpen && selectedChat && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <div className="flex h-full w-full">

        {/* Sidebar */}
        <aside
          className={`
            fixed
            inset-y-0
            left-0
            z-40
            w-[85%]
            max-w-[320px]
            bg-white
            border-r
            border-slate-200
            transition-transform
            duration-300
            md:relative
            md:translate-x-0
            md:w-80
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <Sidebar onClose={closeSidebar} />
        </aside>

        {/* Chat */}
        <main className="flex-1 min-w-0 h-full overflow-hidden">
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