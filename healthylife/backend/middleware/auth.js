// ============================================================
// middleware/auth.js — JWT Authentication Middleware
// ============================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Validate JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is not set in environment variables");
    return res.status(500).json({ success: false, message: "Server configuration error" });
  }

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user (without password) to req
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

module.exports = { protect };
