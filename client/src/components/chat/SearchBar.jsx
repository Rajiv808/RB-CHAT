import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search chats or users...",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon Indicator */}
      <Search
        className={`absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-200 pointer-events-none ${
          isFocused || value
            ? "text-violet-600 dark:text-violet-400"
            : "text-slate-400 dark:text-slate-500"
        }`}
      />

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className="w-full h-9 sm:h-10 pl-9 sm:pl-10 pr-9 sm:pr-10 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-violet-500/20 backdrop-blur-md shadow-xs transform-gpu"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150 active:scale-90 touch-manipulation cursor-pointer"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;