import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, MessageSquare } from "lucide-react";

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
          background: "#090d16",
          color: "#fff",
          border: "1px solid #312e81",
        },
      });

      navigate("/chat");
    } catch (err) {
      const message = err?.response?.data?.message || "";

      if (message.toLowerCase().includes("verify")) {
        toast.error("Please verify your email first.", {
          style: {
            background: "#090d16",
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
          background: "#090d16",
          color: "#f87171",
          border: "1px solid #7f1d1d",
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05070d] relative overflow-hidden px-4 sm:px-8 py-12 font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* World-Class Ambient Background Lights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/30 via-violet-600/20 to-pink-500/10 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/10 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-48 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-full blur-[150px]" />

      {/* Expanded Main Glassmorphism Card (max-w-xl) */}
      <div className="w-full max-w-xl bg-[#0d121f]/85 backdrop-blur-2xl border border-slate-800/80 rounded-[2.5rem] p-8 sm:p-14 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-300">
        
        {/* Subtle Inner Glow Border */}
        <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 pointer-events-none" />

        {/* Top Header Badge & Logo Icon */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-xl shadow-indigo-500/30">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen Workspace</span>
          </div>
        </div>

        {/* Hero Header with Big World-Class Typography */}
        <div className="text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3 leading-tight">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">Back.</span>
          </h1>
          <p className="text-base text-slate-400 font-medium leading-relaxed">
            Enter your credentials to access your active chats and workspace.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
          
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                className={`w-full bg-[#070a12]/90 border ${
                  errors.email
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                } rounded-2xl py-4 pl-13 pr-5 text-slate-100 placeholder-slate-600 text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-inner`}
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
              <p className="text-xs text-rose-400 font-semibold mt-2 ml-2">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-2.5 ml-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Password reset instructions sent if account exists.", { icon: "ℹ️" });
                }}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className={`w-full bg-[#070a12]/90 border ${
                  errors.password
                    ? "border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
                } rounded-2xl py-4 pl-13 pr-14 text-slate-100 placeholder-slate-600 text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-inner`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 font-semibold mt-2 ml-2">{errors.password.message}</p>
            )}
          </div>

          {/* Prominent High-Impact Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-4.5 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Continue</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center border-t border-slate-800/80 pt-8">
          <p className="text-base text-slate-400 font-medium">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 hover:underline transition-all ml-1.5"
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