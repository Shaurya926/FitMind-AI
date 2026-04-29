// ============================================================
// controllers/healthController.js — Daily Tracking Logic
// ============================================================

const HealthData = require("../models/HealthData");

// Helper: today's date as YYYY-MM-DD
const today = () => new Date().toISOString().split("T")[0];

// ── POST /api/health/log ─────────────────────────────────────
// Upsert today's health entry (create if not exists, update if exists)
const logHealth = async (req, res) => {
  try {
    const { steps, water, calories, sleep } = req.body;
    const date = req.body.date || today();

    const record = await HealthData.findOneAndUpdate(
      { user: req.user._id, date },
      { steps, water, calories, sleep },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, message: "Health data saved", data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/health/today ────────────────────────────────────
const getTodayHealth = async (req, res) => {
  try {
    const record = await HealthData.findOne({ user: req.user._id, date: today() });
    res.status(200).json({ success: true, data: record || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/health/history ──────────────────────────────────
// Returns last 30 days of records
const getHistory = async (req, res) => {
  try {
    const records = await HealthData.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30);
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { logHealth, getTodayHealth, getHistory };
