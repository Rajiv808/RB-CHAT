import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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

  // Smooth container auto-scroll
  const scrollToBottom = useCallback((behavior = "smooth") => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  // Auto-scroll on new messages or typing state (only if near bottom)
  useEffect(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

    if (isNearBottom || messages.length <= 1) {
      scrollToBottom("smooth");
    }
  }, [messages, typing, scrollToBottom]);

  // Handle scroll detection for the bottom action button
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollBottom(isFarFromBottom);
  };

  // Group messages by calendar date
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
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-300/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-sm sm:max-w-md text-center p-6 sm:p-8 rounded-3xl bg-[#F8F9FA]/90 border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600 shadow-md shadow-indigo-600/20 mb-4 sm:mb-5 text-white">
            <MessagesSquare className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 tracking-tight flex items-center justify-center gap-2">
            <span>Welcome Back</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed">
            Select a conversation from the sidebar to start chatting or send a message.
          </p>
        </div>
      </div>
    );
  }

  // 2. Loading Skeleton State
  if (messageLoading) {
    return (
      <div className="h-full w-full overflow-hidden bg-[#EFEFEF] px-3 sm:px-6 py-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex items-end gap-2.5 sm:gap-3 animate-pulse ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {i % 2 === 0 && <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-300 shrink-0" />}
            <div
              className={`h-10 sm:h-12 rounded-2xl bg-zinc-300/60 ${
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
      
      {/* Scrollable Feed */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center select-none">
            <div className="text-center max-w-xs p-5 sm:p-6 rounded-2xl bg-[#F8F9FA]/80 border border-black/5 shadow-xs">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-200/70 text-zinc-600 mb-3">
                <MessageSquareDashed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-zinc-800 text-base sm:text-lg font-semibold">No messages yet</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Break the ice! Send the first message below.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {groupedMessages.map((group) => (
              <div key={group.dateKey} className="space-y-2 sm:space-y-3">
                {/* Date Header Badge */}
                <div className="flex items-center justify-center my-3 sm:my-4">
                  <div className="px-3 py-1 rounded-full bg-[#E4E7EC] border border-black/5 text-[10px] sm:text-[11px] font-semibold text-zinc-600 tracking-wider uppercase">
                    {formatDateLabel(group.rawDate)}
                  </div>
                </div>

                {/* Message Bubbles */}
                {group.items.map((message, idx) => (
                  <MessageBubble
                    key={message._id || `${group.dateKey}-${idx}`}
                    message={message}
                  />
                ))}
              </div>
            ))}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center gap-3 mt-2 sm:mt-3">
                <div className="bg-[#F8F9FA] border border-black/5 text-zinc-700 rounded-2xl rounded-bl-xs px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xs flex items-center gap-2">
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

      {/* Scroll to Bottom Floating Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to bottom"
          className="absolute bottom-4 right-4 sm:right-6 p-2.5 sm:p-3 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white shadow-lg border border-zinc-700/30 transition-all duration-200 active:scale-90 z-20 flex items-center justify-center cursor-pointer"
        >
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
};

export default ChatBody;