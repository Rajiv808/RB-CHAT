import { useEffect, useRef, useState, useMemo } from "react";
import { MessageSquareDashed, MessagesSquare, Sparkles, ArrowDown } from "lucide-react";

import MessageBubble from "./MessageBubble";
import useChat from "../../hooks/useChat";
import useSocket from "../../hooks/useSocket";

const ChatBody = () => {
  const { selectedChat, messages = [], messageLoading } = useChat();
  const { typing } = useSocket();

  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  // =========================================================
  // FIX: Isolated Container Auto-Scroll (Prevents Window Scroll)
  // =========================================================
  const scrollToBottom = (behavior = "smooth") => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, typing]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 120;
    setShowScrollBottom(isFarFromBottom);
  };

  // =========================================================
  // Date Grouping
  // =========================================================
  const groupedMessages = useMemo(() => {
    const groups = [];
    messages.forEach((msg) => {
      const msgDate = new Date(msg.createdAt || Date.now());
      const dateKey = msgDate.toDateString();

      let group = groups.find((g) => g.dateKey === dateKey);
      if (!group) {
        group = { dateKey, rawDate: msgDate, items: [] };
        groups.push(group);
      }
      group.items.push(msg);
    });
    return groups;
  }, [messages]);

  const formatDateLabel = (rawDate) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (rawDate.toDateString() === today.toDateString()) return "Today";
    if (rawDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return rawDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: rawDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  };

  // 1. Empty State - No Chat Selected
  if (!selectedChat) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#EFEFEF] px-4 relative overflow-hidden select-none">
        {/* Soft Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-md text-center p-8 rounded-3xl bg-[#F8F9FA]/90 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-md shadow-indigo-600/20 mb-5 text-white">
            <MessagesSquare className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-800 tracking-tight flex items-center justify-center gap-2">
            <span>Welcome Back</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </h2>
          <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
            Select a conversation from the sidebar to start chatting or send a message.
          </p>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (messageLoading) {
    return (
      <div className="h-full w-full overflow-hidden bg-[#EFEFEF] px-4 md:px-6 py-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 animate-pulse ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {i % 2 === 0 && <div className="w-8 h-8 rounded-full bg-zinc-300 flex-shrink-0" />}
            <div
              className={`h-12 rounded-2xl bg-zinc-300/60 ${
                i % 2 === 0 ? "w-2/5 rounded-bl-none" : "w-1/3 rounded-br-none"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }

  // 3. Main Message Feed
  return (
    <div className="relative h-full w-full min-h-0 flex-1 bg-[#EFEFEF] overflow-hidden">
      
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center select-none">
            <div className="text-center max-w-xs p-6 rounded-2xl bg-[#F8F9FA]/80 border border-black/5 shadow-xs">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-200/70 text-zinc-600 mb-3">
                <MessageSquareDashed className="w-6 h-6" />
              </div>
              <h3 className="text-zinc-800 text-lg font-semibold">No messages yet</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Break the ice! Send the first message below.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {groupedMessages.map((group) => (
              <div key={group.dateKey} className="space-y-3">
                <div className="flex items-center justify-center my-4">
                  <div className="px-3.5 py-1 rounded-full bg-[#E4E7EC] border border-black/5 text-[11px] font-semibold text-zinc-600 tracking-wider uppercase">
                    {formatDateLabel(group.rawDate)}
                  </div>
                </div>

                {group.items.map((message) => (
                  <MessageBubble key={message._id || message.createdAt} message={message} />
                ))}
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center gap-3 mt-3">
                <div className="bg-[#F8F9FA] border border-black/5 text-zinc-700 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-medium">Typing</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} className="h-1" />
          </div>
        )}
      </div>

      {/* Floating Scroll Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to bottom"
          className="absolute bottom-4 right-6 p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white shadow-lg border border-zinc-700/30 transition-all duration-200 active:scale-90 z-20 flex items-center justify-center"
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  );
};

export default ChatBody;