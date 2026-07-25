import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CloudSun } from "lucide-react";

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
          background: "#ffffff",
          color: "#0f172a",
          border: "1px solid #bae6fd",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
        },
      });

      navigate("/chat");
    } catch (err) {
      const message = err?.response?.data?.message || "";

      if (message.toLowerCase().includes("verify")) {
        toast.error("Please verify your email first.", {
          style: {
            background: "#ffffff",
            color: "#0369a1",
            border: "1px solid #bae6fd",
            boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
          },
        });

       
      }

      toast.error(message || "Invalid email or password", {
        style: {
          background: "#ffffff",
          color: "#0369a1",
          border: "1px solid #bae6fd",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
        },
      });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast("Password reset instructions sent if account exists.", { icon: "ℹ️" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-sky-400 via-sky-200 to-indigo-300 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
  
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[160px]" />

      <div className="w-full max-w-lg sm:max-w-xl bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(3,105,161,0.25)] relative z-10 transition-all duration-300">
        
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/40">
            <CloudSun className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50/80 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
            <span>RB-CHAT</span>
          </div>
        </div>

        
        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600">Back.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Enter your credentials to access your active chats and workspace.
          </p>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          
         
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
              <input
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                className={`w-full bg-white/90 border ${
                  errors.email
                    ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/20"
                    : "border-sky-100 focus:border-sky-500 focus:ring-sky-500/20"
                } rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm`}
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
              <p className="text-xs text-rose-500 font-semibold mt-1.5 ml-2">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className={`w-full bg-white/90 border ${
                  errors.password
                    ? "border-rose-500 focus:ring-rose-500/20 bg-rose-50/20"
                    : "border-sky-100 focus:border-sky-500 focus:ring-sky-500/20"
                } rounded-2xl py-4 pl-12 pr-12 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 font-semibold mt-1.5 ml-2">{errors.password.message}</p>
            )}
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group cursor-pointer"
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
        <div className="mt-10 text-center border-t border-sky-100 pt-8">
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 hover:opacity-80 transition-all ml-1"
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