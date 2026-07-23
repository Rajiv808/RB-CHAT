import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div
      className="
      min-h-screen
      bg-[#0B1120]
      flex
      items-center
      justify-center
      px-5
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .5,
        }}
        className="
        w-full
        max-w-md
        bg-slate-900/80
        backdrop-blur-xl
        rounded-3xl
        p-8
        border
        border-slate-700
        shadow-2xl
        "
      >
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <p className="text-slate-400 mt-2 mb-8">
          {subtitle}
        </p>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;