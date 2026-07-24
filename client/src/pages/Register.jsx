import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/GenerateToken.js";

// Cookie Options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// ================= REGISTER =================
export const register = async (req, res) => {
  console.log("\n========== REGISTER DEBUG ==========");

  try {
    console.log("📥 Request Body:", req.body);

    const { name, email, password } = req.body;

    console.log("👤 Name:", name);
    console.log("📧 Email:", email);
    console.log("🔒 Password Length:", password ? password.length : 0);

    // Validate fields
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    console.log("🔍 Checking existing user...");

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    console.log("Existing User:", existingUser);

    if (existingUser) {
      console.log("❌ Email already exists");

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.log("🔐 Hashing password...");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("👤 Creating user...");

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    console.log("✅ User Created:", user._id);

    const token = generateToken(user._id);

    console.log("🎟 JWT Generated");

    res.cookie("token", token, getCookieOptions());

    console.log("✅ Registration Successful");

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};