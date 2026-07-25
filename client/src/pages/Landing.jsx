import { Link } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowRight,
  Sparkles,
  Globe2,
  Lock,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden relative font-sans selection:bg-sky-500 selection:text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-sky-600/15 via-indigo-600/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 via-blue-600/15 to-transparent rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <header className="relative z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/70 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform duration-300">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
                RB-CHAT
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
                Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-bold tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-xs font-bold tracking-wider text-sky-300 mb-8 backdrop-blur-md shadow-inner shadow-sky-500/20">
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            NEXT-GENERATION REAL-TIME MESSAGING PLATFORM
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Connect Instantly with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
              RB-CHAT.
            </span>
          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 font-medium leading-relaxed">
            Experience lightning-fast communication, bulletproof security, and an exceptionally smooth design crafted for modern workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Launch RB-CHAT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 hover:border-sky-500/50 bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-base backdrop-blur-md transition-all duration-200 flex items-center justify-center"
            >
              Existing Account? Sign In
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 text-xs font-semibold text-slate-400 uppercase tracking-widest flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Zero Latency Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Peak Performance</span>
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Everything you need to communicate smoothly, packaged inside a gorgeous interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-sky-500/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-sky-400" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">Ultra-Fast Sync</h4>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Messages transmit in milliseconds using cutting-edge protocols, ensuring zero awkward pauses in conversations.
              </p>
            </div>

            <div className="group rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">Military Grade Security</h4>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Advanced encryption mechanisms and robust token authentication protect your data at rest and in transit.
              </p>
            </div>

            <div className="group rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-indigo-400" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">Fully Responsive</h4>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Fluid layout layouts adapt perfectly to desktops, tablets, and phones for an uninterrupted workflow.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">RB-CHAT</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Fast Messaging • Secure Communication • World Class Experience
            </p>
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