import { useEffect, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import useChat from "../hooks/useChat";

const MOBILE_BREAKPOINT = 768;

const Home = () => {
  const { selectedChat } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsSidebarOpen(true);
      } else if (!selectedChat) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedChat]);

  useEffect(() => {
    if (window.innerWidth < MOBILE_BREAKPOINT && selectedChat) {
      setIsSidebarOpen(false);
    }
  }, [selectedChat]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <div className="flex h-full w-full">
        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            w-80 max-w-[85vw]
            bg-[#0B0F19]
            transition-transform duration-300
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
            md:relative md:translate-x-0
          `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </aside>

        <main className="flex flex-1 min-w-0 min-h-0 overflow-hidden">
          <ChatWindow
            onToggleSidebar={toggleSidebar}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;