import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles, CloudSun } from "lucide-react";
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
          background: "#ffffff",
          color: "#0369a1",
          border: "1px solid #bae6fd",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
        },
      });
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        style: {
          background: "#ffffff",
          color: "#0369a1",
          border: "1px solid #bae6fd",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
        },
      });
    }

    try {
      setLoading(true);

      await register(formData);

      toast.success("Account created successfully!", {
        style: {
          background: "#ffffff",
          color: "#0f172a",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
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
            background: "#ffffff",
            color: "#0369a1",
            border: "1px solid #bae6fd",
            boxShadow: "0 10px 25px -5px rgba(2, 132, 199, 0.1)",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-sky-400 via-sky-200 to-indigo-300 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Sky Aura Floating Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[160px]" />

      {/* Fantabulous Glassmorphic Floating Card */}
      <div className="w-full max-w-lg sm:max-w-xl bg-white/80 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(3,105,161,0.25)] relative z-10 transition-all duration-300">
        
        {/* Top Header Badge & Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/40">
            <CloudSun className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50/80 border border-sky-100 text-sky-700 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
            <span>Sky Workspace</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Create an <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600">Account.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Join our platform and start collaborating instantly.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rajiv Burman"
                className="w-full bg-white/90 border border-sky-100 focus:border-sky-500 focus:ring-sky-500/20 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/90 border border-sky-100 focus:border-sky-500 focus:ring-sky-500/20 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/90 border border-sky-100 focus:border-sky-500 focus:ring-sky-500/20 rounded-2xl py-4 pl-12 pr-12 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all duration-200 shadow-sm"
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
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group cursor-pointer"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center border-t border-sky-100 pt-8">
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 hover:opacity-80 transition-all ml-1"
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