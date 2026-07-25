import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Zap, Shield, Smartphone, Sparkles } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-400 via-sky-200 to-indigo-300 text-slate-800 font-sans flex flex-col justify-between relative overflow-hidden selection:bg-sky-500 selection:text-white">
  
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] bg-white/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-300/40 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-200/30 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />


      <header className="max-w-7xl mx-auto w-full px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-800 to-blue-900">
            RB-CHAT
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 text-base font-black text-sky-900 hover:text-sky-950 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-base font-black text-white transition shadow-xl shadow-sky-500/30"
          >
            Register
          </Link>
        </div>
      </header>

    
      <main className="max-w-5xl mx-auto px-6 py-16 w-full text-center my-auto relative z-10 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 border border-sky-200/80 text-sky-800 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-sky-600" /> Next-Gen Real-Time Messenger
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900 max-w-4xl mx-auto text-center">
          Connect with anyone, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-cyan-700 to-blue-800">
            anytime with RB-CHAT.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto mb-12 font-semibold leading-relaxed text-center">
          Experience lightning-fast messaging, secure communication, and a clean interface built for seamless daily conversations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full max-w-md mx-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-bold text-base text-white transition shadow-xl shadow-sky-500/30 flex items-center justify-center gap-3 group"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-sky-200 bg-white/80 hover:bg-white font-bold text-base text-sky-900 transition shadow-sm backdrop-blur-md"
          >
            Sign In to Account
          </Link>
        </div>

       
        <div className="grid sm:grid-cols-3 gap-6 text-left pt-12 border-t border-sky-200/60 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white/80 border border-sky-100 shadow-lg shadow-sky-500/5 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4 text-sky-700">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-900">Instant Chat</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">Send and receive messages instantly without any lag.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 border border-sky-100 shadow-lg shadow-sky-500/5 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4 text-cyan-700">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-900">Secure & Private</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">Protected authentication keeping your chats fully private.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 border border-sky-100 shadow-lg shadow-sky-500/5 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4 text-blue-700">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-900">Responsive Design</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">Works smoothly across your desktop, tablet, and mobile.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-6 border-t border-sky-200/60 text-center text-xs text-sky-900 font-bold relative z-10 bg-white/30 backdrop-blur-sm">
        © 2026 RB-CHAT. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Landing;