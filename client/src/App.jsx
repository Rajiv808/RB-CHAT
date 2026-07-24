import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute"; // Redirects logged-in users away from auth pages

function App() {
  return (
    <div className="w-screen h-[100dvh] overflow-hidden bg-[#070b14]">
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />

        {/* Public / Guest Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOTP />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Fallback 404 Route */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </div>
  );
}

export default App;