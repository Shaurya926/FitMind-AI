// ============================================================
// models/Diary.js — Daily Diary / Journal Entry Schema
// ============================================================

const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: {
      type: String,
      enum: ["😄", "🙂", "😐", "😟", "😴"],
      default: "🙂",
    },
    text: {
      type: String,
      required: [true, "Diary text cannot be empty"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diary", DiarySchema);
