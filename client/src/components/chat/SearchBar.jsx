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
      <Search
        className={`absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-200 pointer-events-none ${
          isFocused || value ? "text-indigo-600" : "text-slate-400"
        }`}
      />

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
        className="w-full h-9 sm:h-10 pl-9 sm:pl-10 pr-9 sm:pr-10 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-2xs"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150 active:scale-90 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;