// ============================================================
// server.js — HealthyLife AI  |  Main Entry Point
// ============================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());                          // Allow cross-origin requests
app.use(express.json());                  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve the frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// ── API Routes ──────────────────────────────────────────────
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));
app.use("/api/diary", require("./routes/diaryRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// ── 404 handler for unknown API routes ──────────────────────
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// ── Catch-all: serve index.html for any non-API route ───────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── Start server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ HealthyLife server running on http://localhost:${PORT}`);
});
