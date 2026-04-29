// ============================================================
// controllers/aiController.js — AI Plan & Chat Logic
// ============================================================

const fetch        = require("node-fetch");
const TrainingPlan = require("../models/TrainingPlan");

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const HEADERS = () => ({
  "Content-Type":      "application/json",
  "x-api-key":         process.env.ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
});

// ── POST /api/ai/plan ─────────────────────────────────────────
// Accepts body metrics, calls Claude, saves plan to DB, returns it
const generatePlan = async (req, res) => {
  try {
    const { age, weight, height, gender, goal, activityLevel, conditions } = req.body;

    if (!age || !weight || !height || !goal || !activityLevel) {
      return res.status(400).json({
        success: false,
        message: "Please provide age, weight, height, goal, and activity level.",
      });
    }

    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);

    const prompt = `You are a certified personal trainer and sports nutritionist. Based on the user's data, create a detailed 7-day weekly training plan. The plan MUST include at least 1 full rest day.

User Data:
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Gender: ${gender || "not specified"}
- BMI: ${bmi}
- Primary Goal: ${goal}
- Activity Level: ${activityLevel}
- Health Conditions/Injuries: ${conditions || "None"}

Respond ONLY with a valid JSON object (no markdown, no backticks) with exactly this structure:
{
  "bmi": "${bmi}",
  "bmiCategory": "one of: Underweight / Normal weight / Overweight / Obese",
  "dailyCalories": <number>,
  "proteinGoal": <grams per day as number>,
  "waterGoal": <litres per day as number>,
  "summary": "2 sentence personalised plan overview",
  "tips": ["tip1", "tip2", "tip3"],
  "days": [
    {
      "day": "Monday",
      "type": "active",
      "focus": "Chest & Triceps",
      "exercises": "Bench Press 4x10, Push-ups 3x15, Tricep Dips 3x12, Cable Flyes 3x12",
      "duration": "50 min",
      "intensity": "Moderate"
    },
    ... 7 days total — at least 1 must have type "rest"
  ]
}`;

    const response = await fetch(ANTHROPIC_URL, {
      method:  "POST",
      headers: HEADERS(),
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages:   [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Anthropic API error");
    }

    const data = await response.json();
    const raw  = data.content.map((c) => c.text || "").join("");
    const clean = raw.replace(/```json|```/g, "").trim();
    const plan  = JSON.parse(clean);

    // Save plan to database (linked to logged-in user)
    const saved = await TrainingPlan.create({
      user: req.user._id,
      age, weight, height, gender, goal, activityLevel, conditions,
      ...plan,
    });

    res.status(200).json({
      success: true,
      message: "Weekly training plan generated successfully",
      data: saved,
    });
  } catch (error) {
    console.error("AI Plan Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/ai/plan/latest ───────────────────────────────────
// Fetch the user's most recently generated plan
const getLatestPlan = async (req, res) => {
  try {
    const plan = await TrainingPlan.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!plan) return res.status(404).json({ success: false, message: "No plan found" });
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── POST /api/ai/chat ─────────────────────────────────────────
// Multi-turn health Q&A — accepts { message, history: [{role, content}] }
const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ success: false, message: "Message is required" });

    const messages = [
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch(ANTHROPIC_URL, {
      method:  "POST",
      headers: HEADERS(),
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 512,
        system:
          "You are a friendly, certified AI health and fitness assistant. Give practical, evidence-based advice on workouts, nutrition, recovery, sleep, and wellbeing. Keep responses concise (3-5 sentences). Never provide medical diagnoses — advise users to see a doctor for medical concerns.",
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Anthropic API error");
    }

    const data  = await response.json();
    const reply = data.content.map((c) => c.text || "").join("");

    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    console.error("AI Chat Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generatePlan, getLatestPlan, chatWithAI };
