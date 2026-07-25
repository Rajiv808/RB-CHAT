import { Link } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Globe,
  Star,
  Users,
  Activity,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 overflow-hidden relative font-sans selection:bg-sky-500 selection:text-white">
      {/* Absolute background glowing mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-[10%] left-[10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 backdrop-blur-2xl bg-[#07090e]/80 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-xl shadow-sky-500/20 group-hover:scale-105 transition-all duration-300">
              <MessageCircle className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400">
                RB-CHAT
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                  Systems Live
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-6 py-3 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold tracking-wide shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2.5 text-xs font-extrabold tracking-wider text-sky-300 mb-8 backdrop-blur-xl shadow-lg shadow-sky-500/10">
            <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
            WORLD CLASS REAL-TIME COMMUNICATION SUITE
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto text-white">
            Conversations, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              Elevated to Perfection.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 font-medium leading-relaxed">
            Welcome to <strong className="text-white font-bold">RB-CHAT</strong>. A lightning-fast, ultra-secure messenger engineered with pristine craftsmanship and zero clutter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Launch RB-CHAT Workspace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 hover:border-sky-500/40 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-base backdrop-blur-xl transition-all duration-200 flex items-center justify-center"
            >
              Access Existing Account
            </Link>
          </div>

          {/* Social Proof / Stats Bar */}
          <div className="mt-20 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">99.9%</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Uptime Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">&lt;10ms</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">256-bit</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Encryption Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">24 / 7</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Syncing</div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Unmatched Speed</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Explore the core pillars that make RB-CHAT the definitive choice for modern communication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-sky-500/50 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner shadow-sky-500/20">
                <Zap className="w-8 h-8 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Messaging</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Messages transmit in real-time across all your channels with zero delay, keeping conversations dynamic and fluid.
              </p>
            </div>

            <div className="group rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner shadow-cyan-500/20">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Bank-Grade Security</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Your credentials and chat data are heavily protected with robust authentication protocols ensuring absolute privacy.
              </p>
            </div>

            <div className="group rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-blue-500/50 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner shadow-blue-500/20">
                <Smartphone className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Cross-Platform</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Enjoy a gorgeously responsive interface optimized for desktops, tablets, and mobile devices seamlessly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#040609]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-white">RB-CHAT</span>
              <p className="text-xs text-slate-500 font-medium">World Class Messaging Experience</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            © 2026 RB-CHAT. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;