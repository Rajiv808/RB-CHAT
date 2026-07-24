import React, { useState, useEffect } from "react";

// Vibrant multi-stop gradients tailored for high pixel-density mobile screens
const GRADIENT_PALETTES = [
  "from-violet-600 via-purple-500 to-pink-500 shadow-purple-500/25",
  "from-cyan-400 via-sky-500 to-blue-600 shadow-sky-500/25",
  "from-emerald-400 via-teal-500 to-cyan-500 shadow-teal-500/25",
  "from-rose-500 via-pink-500 to-fuchsia-500 shadow-pink-500/25",
  "from-amber-400 via-orange-500 to-red-500 shadow-orange-500/25",
  "from-fuchsia-500 via-fuchsia-600 to-indigo-600 shadow-fuchsia-500/25",
  "from-teal-300 via-emerald-500 to-lime-500 shadow-emerald-500/25",
];

const getGradientByName = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENT_PALETTES.length;
  return GRADIENT_PALETTES[index];
};

const Avatar = ({
  src = "",
  name = "",
  size = 48,
  online = false,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  // Reset error state if the src prop updates
  useEffect(() => {
    setImageError(false);
  }, [src]);

  // Compute initials cleanly
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "?";

  // Dynamic sizing calculations adjusted for mobile clarity
  const statusBadgeSize = Math.max(10, Math.round(size * 0.28));
  const statusBadgeOffset = Math.max(-1, Math.round(size * 0.01));
  const ringWidth = size < 36 ? "ring-1" : "ring-2"; // Thinner ring for small mobile avatars
  const gradientClass = getGradientByName(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none touch-manipulation transform-gpu transition-all duration-150 active:scale-95 sm:hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Avatar Image or Fallback Gradient */}
      {src && !imageError ? (
        <img
          src={src}
          alt={name || "Avatar"}
          onError={() => setImageError(true)}
          className={`w-full h-full rounded-full object-cover ${ringWidth} ring-white dark:ring-slate-900 shadow-md transition-shadow duration-200`}
        />
      ) : (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-tr ${gradientClass} flex items-center justify-center text-white font-bold shadow-md ${ringWidth} ring-white dark:ring-slate-900 transition-shadow duration-200`}
          style={{
            fontSize: Math.max(11, Math.round(size * 0.38)),
            letterSpacing: "0.02em",
            textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          {initials}
        </div>
      )}

      {/* Mobile-optimized Online Status Indicator */}
      {online && (
        <span
          className={`absolute rounded-full bg-emerald-500 ${ringWidth} ring-white dark:ring-slate-900 flex items-center justify-center shadow-md z-10`}
          style={{
            width: statusBadgeSize,
            height: statusBadgeSize,
            bottom: statusBadgeOffset,
            right: statusBadgeOffset,
          }}
        >
          {/* Subtle pulsating core glow */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75 pointer-events-none" />
          <span className="relative rounded-full bg-white/90 w-1/3 h-1/3" />
        </span>
      )}
    </div>
  );
};

export default Avatar;