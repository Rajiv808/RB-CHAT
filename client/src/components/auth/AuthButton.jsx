import { Loader2 } from "lucide-react";

const AuthButton = ({
  children,
  loading = false,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="
      w-full
      h-12
      rounded-xl
      bg-blue-600
      hover:bg-blue-700
      active:scale-[0.98]
      transition-all
      duration-300
      text-white
      font-semibold
      flex
      items-center
      justify-center
      disabled:opacity-70
      disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;