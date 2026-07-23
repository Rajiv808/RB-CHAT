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
      // Reset height to calculate true scroll height when clearing text
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

    // Dynamic auto-expansion up to 220px height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        220
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
      }
    } catch (err) {
      console.error("Failed to send:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-zinc-200/80 bg-[#F8F9FA]/90 backdrop-blur-md p-4 md:p-5 flex-shrink-0 relative z-30">
      
      {/* Quick Emoji Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-4 mb-3 p-2 bg-white/95 border border-zinc-200 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-1.5 z-50">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setMessage((prev) => prev + emoji);
                textareaRef.current?.focus();
              }}
              className="w-10 h-10 rounded-xl hover:bg-zinc-100 flex items-center justify-center text-xl active:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => setShowEmojiPicker(false)}
            className="w-8 h-8 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center ml-1"
          >
            <X size={16} />
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

      {/* Image Preview Block */}
      {preview && (
        <div className="max-w-5xl mx-auto mb-4">
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="w-36 h-36 object-cover rounded-2xl border border-zinc-200 shadow-sm"
            />

            <button
              onClick={() => {
                URL.revokeObjectURL(preview);
                setPreview("");
                setSelectedImage(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-end gap-3 max-w-5xl mx-auto">
        
        {/* File Attachment Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="h-12 w-12 rounded-2xl bg-white border border-zinc-200/80 hover:bg-zinc-100/80 text-zinc-500 hover:text-indigo-600 flex items-center justify-center flex-shrink-0 active:scale-95 transition-all shadow-xs"
          title="Attach File"
        >
          <Paperclip size={21} />
        </button>

        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`h-12 w-12 rounded-2xl border transition-all flex items-center justify-center flex-shrink-0 active:scale-95 shadow-xs ${
            showEmojiPicker
              ? "border-indigo-500/40 text-indigo-600 bg-indigo-50/50"
              : "bg-white border-zinc-200/80 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100/80"
          }`}
          title="Select Emoji"
        >
          <Smile size={21} />
        </button>

        {/* Expanded Multiline Textarea */}
        <div className="flex-1 relative min-w-0">
          <textarea
            ref={textareaRef}
            rows={2}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none rounded-2xl bg-zinc-100/80 focus:bg-white border border-zinc-200 px-4 py-3 text-sm md:text-base text-zinc-800 placeholder-zinc-400 outline-none focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 custom-scrollbar max-h-56 block leading-relaxed transition-all shadow-xs"
          />
        </div>

        {/* Larger Send Button */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() && !selectedImage) || isSending}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 active:scale-95 shadow-md transition-all ${
            (message.trim() || selectedImage) && !isSending
              ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-indigo-500/20 hover:brightness-110"
              : "bg-zinc-200/60 border border-zinc-200/80 text-zinc-400 cursor-not-allowed shadow-none"
          }`}
          title="Send Message"
        >
          {isSending ? (
            <Loader2 size={20} className="animate-spin text-indigo-200" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>

      </div>
    </div>
  );
};

export default MessageInput;