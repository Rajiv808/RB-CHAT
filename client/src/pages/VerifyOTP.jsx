import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      return toast.error("Email and OTP are required");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      if (data.success) {
        toast.success("Email verified successfully!");

        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      return toast.error("Enter your email");
    }

    try {
      setResending(true);

      const { data } = await API.post("/auth/resend-otp", {
        email,
      });

      if (data.success) {
        toast.success("OTP sent successfully");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center">
          Verify Email
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={handleVerify} className="space-y-5">

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-indigo-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              OTP
            </label>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white text-center tracking-[8px] text-xl outline-none focus:border-indigo-500"
              placeholder="123456"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full mt-4 py-3 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VerifyOTP;