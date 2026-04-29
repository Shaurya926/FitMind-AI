// ============================================================
// models/HealthData.js — Daily Health Tracking Schema
// ============================================================

const mongoose = require("mongoose");

const HealthDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,  // stored as YYYY-MM-DD for easy lookup
      required: true,
    },
    steps:    { type: Number, default: 0 },
    water:    { type: Number, default: 0 },   // litres
    calories: { type: Number, default: 0 },   // kcal burned
    sleep:    { type: Number, default: 0 },   // hours
  },
  { timestamps: true }
);

// One record per user per day
HealthDataSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("HealthData", HealthDataSchema);
