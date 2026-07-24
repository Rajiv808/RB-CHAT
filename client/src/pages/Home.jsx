import { useEffect, useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth >= 768
  );

  // Update sidebar when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar using Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
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

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <button
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
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
            w-80
            max-w-[85vw]
            bg-white
            border-r
            border-slate-200
            transition-transform
            duration-300
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

        {/* Chat */}
        <main className="flex flex-1 min-w-0 flex-col overflow-hidden">
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