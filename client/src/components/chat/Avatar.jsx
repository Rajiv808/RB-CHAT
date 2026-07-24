import React, { useState, useEffect } from "react";

// Deterministic dynamic gradient generator based on user name
const GRADIENT_PALETTES = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-indigo-600",
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

  // Dynamic sizing calculations
  const statusBadgeSize = Math.max(10, Math.round(size * 0.26));
  const statusBadgeOffset = Math.max(0, Math.round(size * 0.02));
  const gradientClass = getGradientByName(name);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
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
          className="w-full h-full rounded-full object-cover border border-slate-200/80 shadow-sm transition-transform duration-200"
        />
      ) : (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-semibold shadow-sm border border-white/30`}
          style={{
            fontSize: Math.max(10, Math.round(size * 0.38)),
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </div>
      )}

      {/* Responsive Online Status Indicator */}
      {online && (
        <span
          className="absolute rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center shadow-sm z-10"
          style={{
            width: statusBadgeSize,
            height: statusBadgeSize,
            bottom: statusBadgeOffset,
            right: statusBadgeOffset,
          }}
        >
          {/* Subtle pulsating glow effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75 pointer-events-none" />
        </span>
      )}
    </div>
  );
};

export default Avatar;