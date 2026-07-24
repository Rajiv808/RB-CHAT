import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Paperclip, Smile, Loader2, X } from "lucide-react";
import useChat from "../../hooks/useChat";
import useSocket from "../../hooks/useSocket";

const TYPING_TIMEOUT = 2500;

const MessageInput = () => {
  const { selectedChat, sendMessage } = useChat();
  const { socket } = useSocket();

  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const textareaRef = useRef(null);
  const typingTimeout = useRef(null);
  const fileInputRef = useRef(null);

  const QUICK_EMOJIS = ["👍", "❤️", "🔥", "😂", "🎉", "🙌"];

  useEffect(() => {
    return () => clearTimeout(typingTimeout.current);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      if (!message) {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [message]);

  if (!selectedChat) return null;

  const stopTyping = () => {
    if (isTyping) {
      socket?.emit("stopTyping", selectedChat._id);
      setIsTyping(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160
      )}px`;
    }

    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(stopTyping, TYPING_TIMEOUT);
  };

  const handleSend = async () => {
    const text = message.trim();

    if ((!text && !selectedImage) || isSending) return;

    stopTyping();
    setIsSending(true);
    setShowEmojiPicker(false);

    try {
      await sendMessage(text, selectedImage);

      setMessage("");

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");
      setSelectedImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        if (window.innerWidth < 768) {
          textareaRef.current.focus();
        }
      }
    } catch (err) {
      console.error("Failed to send:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;

    if (e.key === "Enter" && !e.shiftKey && window.innerWidth >= 768) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-2.5 sm:p-3.5 shrink-0 relative z-30 pb-[max(0.625rem,env(safe-area-inset-bottom))] transform-gpu transition-colors">
      
      {/* Quick Emoji Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-2 sm:left-4 mb-2.5 p-1.5 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-1 z-50 max-w-[calc(100vw-1rem)] overflow-x-auto">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                setMessage((prev) => prev + emoji);
                textareaRef.current?.focus();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-lg sm:text-xl active:scale-125 transition-all shrink-0 cursor-pointer touch-manipulation"
            >
              {emoji}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(false)}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center shrink-0 cursor-pointer touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
          }
        }}
      />

      {/* Image Preview Container */}
      {preview && (
        <div className="max-w-4xl mx-auto mb-2.5">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview attachment"
              className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-white dark:border-slate-800 shadow-md"
            />

            <button
              type="button"
              onClick={() => {
                URL.revokeObjectURL(preview);
                setPreview("");
                setSelectedImage(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer touch-manipulation"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-1.5 sm:gap-2.5 max-w-4xl mx-auto">
        
        {/* Attachment Action Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center shrink-0 active:scale-90 touch-manipulation transition-all cursor-pointer"
          title="Attach File"
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Emoji Selector Action Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border transition-all flex items-center justify-center shrink-0 active:scale-90 touch-manipulation cursor-pointer ${
            showEmojiPicker
              ? "border-violet-500/50 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 shadow-xs"
              : "bg-slate-100/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-200/80 dark:hover:bg-slate-700"
          }`}
          title="Select Emoji"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Text Field Input Container */}
        <div className="flex-1 relative min-w-0">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            autoCapitalize="sentences"
            autoCorrect="on"
            className="w-full resize-none rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 custom-scrollbar max-h-32 sm:max-h-44 block leading-relaxed transition-all"
          />
        </div>

        {/* High-Vibrancy Send Action Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={(!message.trim() && !selectedImage) || isSending}
          className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center shrink-0 active:scale-90 touch-manipulation transition-all cursor-pointer ${
            (message.trim() || selectedImage) && !isSending
              ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
              : "bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-400 dark:text-slate-600 cursor-not-allowed"
          }`}
          title="Send Message"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-indigo-200" />
          ) : (
            <SendHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

      </div>
    </div>
  );
};

export default MessageInput;