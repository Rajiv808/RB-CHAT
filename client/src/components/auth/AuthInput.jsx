import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AuthInput = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">
      <label className="text-slate-300 text-sm">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className="
          w-full
          h-12
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          px-4
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-blue-500
          transition
          "
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default AuthInput;