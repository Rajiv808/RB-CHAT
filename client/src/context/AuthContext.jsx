import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safely check user session
  const checkUser = async () => {
    const token = localStorage.getItem("token");

    // Guard Clause: Prevent API request if token is missing
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user);
      return data.user;
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (values) => {
    const { data } = await API.post("/auth/login", values);

    localStorage.setItem("token", data.token);

    // Hydrate authenticated user state before returning
    await checkUser();

    return data;
  };

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
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
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