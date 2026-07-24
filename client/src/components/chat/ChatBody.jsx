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
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 relative overflow-hidden select-none">
        {/* Modern Vibrant Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 sm:w-112 h-80 sm:h-112 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none transform-gpu animate-pulse" />

        <div className="relative z-10 max-w-xs sm:max-w-md text-center p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-800 shadow-xl backdrop-blur-xl">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30 mb-4 sm:mb-5 text-white">
            <MessagesSquare className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center justify-center gap-2">
            <span>Welcome Back</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
            Select a conversation from the sidebar to start chatting or send a message.
          </p>
        </div>
      </div>
    );
  }

  // 2. Loading Skeleton State
  if (messageLoading) {
    return (
      <div className="h-full w-full overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 px-3 sm:px-6 py-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex items-end gap-2.5 sm:gap-3 animate-pulse ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            {i % 2 === 0 && (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-300 dark:bg-slate-800 shrink-0 shadow-xs" />
            )}
            <div
              className={`h-10 sm:h-12 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 ${
                i % 2 === 0 ? "w-2/5 rounded-bl-xs" : "w-1/3 rounded-br-xs"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }

  // 3. Main Message Feed
  return (
    <div className="relative h-full w-full min-h-0 flex-1 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      
      {/* Scrollable Feed */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 custom-scrollbar touch-manipulation transform-gpu"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center select-none">
            <div className="text-center max-w-xs p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 shadow-md shadow-sky-500/20 text-white mb-3">
                <MessageSquareDashed className="w-6 h-6" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 text-base sm:text-lg font-bold">No messages yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Break the ice! Send the first message below.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {groupedMessages.map((group) => (
              <div key={group.dateKey} className="space-y-2 sm:space-y-3">
                {/* Date Header Badge */}
                <div className="flex items-center justify-center my-4 sm:my-5">
                  <div className="px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 shadow-xs backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase">
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
                <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-xs px-4 py-3 shadow-md flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Typing</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce"
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

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          aria-label="Scroll to bottom"
          className="absolute bottom-4 right-4 sm:right-6 p-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-white dark:ring-slate-900 transition-all duration-200 active:scale-90 touch-manipulation z-20 flex items-center justify-center cursor-pointer"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ChatBody;