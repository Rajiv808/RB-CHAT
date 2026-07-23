import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // ================= Authorization Header =================
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ================= Cookie =================
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    console.log("\n========== AUTH DEBUG ==========");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Authorization Header:", req.headers.authorization);
    console.log("Cookie Token:", req.cookies?.token);
    console.log("Extracted Token:", token);
    console.log("JWT_SECRET Exists:", !!process.env.JWT_SECRET);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!token) {
      console.log("❌ No token found");

      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ User not found:", decoded.id);

      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    console.log("✅ Authenticated User:", user._id);
    console.log("===============================\n");

    req.user = user;

    next();
  } catch (error) {
    console.log("\n========== AUTH ERROR ==========");
    console.error(error);
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log("===============================\n");

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default protect;