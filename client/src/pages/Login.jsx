import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await login(values);

      toast.success("Welcome back! Loading your chats...", {
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a",
        },
      });

      navigate("/chat");
    } catch (err) {
      const message = err?.response?.data?.message || "";

      if (message.toLowerCase().includes("verify")) {
        toast.error("Please verify your email first.", {
          style: {
            background: "#18181b",
            color: "#f87171",
            border: "1px solid #7f1d1d",
          },
        });

        navigate("/verify-otp", {
          state: {
            email: values.email,
          },
        });

        return;
      }

      toast.error(message || "Invalid email or password", {
        style: {
          background: "#18181b",
          color: "#f87171",
          border: "1px solid #7f1d1d",
        },
      });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast("Password reset instructions sent if account exists.", { icon: "ℹ️" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#09090b] relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Subtle Minimalist Gradients */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent blur-3xl" />

      {/* Clean Minimal Card */}
      <div className="w-full max-w-md bg-[#121216] border border-zinc-800/80 rounded-2xl p-8 sm:p-10 shadow-2xl relative z-10 transition-all duration-300">
        
        {/* Top Header Badge & Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Secure Portal</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-left mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
            Sign in to your account
          </h1>
          <p className="text-sm text-zinc-400 font-normal">
            Enter your credentials to access your active chats and workspace.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
              <input
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                className={`w-full bg-[#18181b] border ${
                  errors.email
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10"
                } rounded-xl py-3 pl-11 pr-4 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-400 font-medium mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-zinc-300">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className={`w-full bg-[#18181b] border ${
                  errors.password
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10"
                } rounded-xl py-3 pl-11 pr-11 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 font-medium mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/10 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-zinc-800/80 pt-6">
          <p className="text-sm text-zinc-400">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;