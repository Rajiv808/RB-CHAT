import { useEffect, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import useChat from "../hooks/useChat"; // Imported to react to chat selection

const Home = () => {
  const { selectedChat } = useChat();

  // On mobile: Open sidebar when NO chat is selected, close it when a chat IS selected
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768 ? true : !selectedChat;
    }
    return true;
  });

  // Automatically handle mobile sidebar state on chat selection
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!selectedChat);
    }
  }, [selectedChat]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        // If switching to mobile, open sidebar if no chat selected, otherwise close it
        setIsSidebarOpen(!selectedChat);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedChat]);

  // Close sidebar using Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-slate-100">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-slate-50 to-sky-100" />

      {/* Mobile Overlay (Only active when sidebar is opened on top of an existing chat) */}
      {isSidebarOpen && selectedChat && (
        <button
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/40 md:hidden cursor-pointer"
          aria-label="Close Sidebar"
        />
      )}

      <div className="flex h-full w-full overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed
            top-0
            left-0
            z-40
            h-full
            w-full
            sm:w-80
            md:w-80
            bg-white
            border-r
            border-slate-200
            transition-transform
            duration-300
            ease-in-out
            md:relative
            md:translate-x-0
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />
        </aside>

        {/* Chat / Main Window */}
        <main className="flex flex-1 min-w-0 flex-col overflow-hidden h-full">
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