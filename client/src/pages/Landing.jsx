import { Link } from "react-router-dom";
import {
  MessageCircle,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden relative">
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-44 -left-44 w-[450px] h-[450px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -bottom-44 -right-44 w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

     
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">ChatSphere</h1>
              <p className="text-xs text-slate-400">
                Real-Time Messaging Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:flex px-5 py-2.5 rounded-xl border border-white/10 hover:border-violet-500 hover:bg-white/5 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 transition-all shadow-xl"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

  
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 mb-8">
            <Zap className="w-4 h-4" />
            Fast • Secure • Reliable
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Experience
            <span className="block bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Real-Time Messaging
            </span>
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-9">
            RB-CHAT is a modern messaging platform designed for instant
            communication. Enjoy fast conversations, secure authentication and
            a clean, responsive interface that works beautifully across desktop
            and mobile devices.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <Link
              to="/login"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 transition-all shadow-2xl flex items-center gap-2"
            >
              Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-white/5 transition-all"
            >
              Create Account
            </Link>
          </div>
        </section>

       
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-violet-500/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-violet-600/20 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-violet-400" />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Fast Messaging
              </h3>

              <p className="text-slate-400 leading-8">
                Send and receive messages instantly with a smooth, responsive
                chatting experience.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-cyan-500/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-cyan-400" />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Secure
              </h3>

              <p className="text-slate-400 leading-8">
                Protected authentication and secure access help keep your
                conversations private.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:border-indigo-500/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-indigo-400" />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Responsive
              </h3>

              <p className="text-slate-400 leading-8">
                Built to provide a seamless messaging experience on desktop,
                tablet and mobile.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h3 className="text-xl font-semibold">
            RB-CHAT
          </h3>

          <p className="mt-3 text-slate-400">
            Fast Messaging • Secure Communication • Modern Experience
          </p>

          <p className="mt-6 text-sm text-slate-500">
            © 2026 RB-CHAT. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;