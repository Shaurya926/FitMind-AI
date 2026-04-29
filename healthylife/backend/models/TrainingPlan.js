// ============================================================
// models/TrainingPlan.js — AI Generated Weekly Plan Schema
// ============================================================

const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  day:       String,
  type:      { type: String, enum: ["active", "rest"] },
  focus:     String,
  exercises: String,
  duration:  String,
  intensity: String,
}, { _id: false });

const TrainingPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Input metrics used to generate this plan
    age:           Number,
    weight:        Number,
    height:        Number,
    gender:        String,
    goal:          String,
    activityLevel: String,
    conditions:    String,

    // AI-generated outputs
    bmi:           String,
    bmiCategory:   String,
    dailyCalories: Number,
    proteinGoal:   Number,
    waterGoal:     Number,
    summary:       String,
    tips:          [String],
    days:          [DaySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingPlan", TrainingPlanSchema);
