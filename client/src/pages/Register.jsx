import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields", {
        style: {
          background: "#18181b",
          color: "#f87171",
          border: "1px solid #7f1d1d",
        },
      });
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        style: {
          background: "#18181b",
          color: "#f87171",
          border: "1px solid #7f1d1d",
        },
      });
    }

    try {
      setLoading(true);

      await register(formData);

      toast.success("Account created successfully!", {
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #27272a",
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed",
        {
          style: {
            background: "#18181b",
            color: "#f87171",
            border: "1px solid #7f1d1d",
          },
        }
      );
    } finally {
      setLoading(false);
    }
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
            Create Account
          </h1>
          <p className="text-sm text-zinc-400 font-normal">
            Join and start chatting instantly.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rajiv Burman"
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#18181b] border border-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-11 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 transition-all duration-200"
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
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/10 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-zinc-800/80 pt-6">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;