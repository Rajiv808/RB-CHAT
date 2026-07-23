import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (values) => {
    const { data } = await API.post("/auth/login", values);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  };

  // Register now only sends OTP
  const register = async (values) => {
    const { data } = await API.post("/auth/register", values);
    return data;
  };

  const verifyOTP = async (values) => {
    const { data } = await API.post("/auth/verify-otp", values);
    return data;
  };

  const resendOTP = async (email) => {
    const { data } = await API.post("/auth/resend-otp", { email });
    return data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {}

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        verifyOTP,
        resendOTP,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;