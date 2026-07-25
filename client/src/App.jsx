import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="w-screen h-dvh overflow-hidden bg-slate-100">
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Chat */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </div>
  );
}

export default App;