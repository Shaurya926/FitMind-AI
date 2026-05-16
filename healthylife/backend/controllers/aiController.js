// ============================================================
// controllers/aiController.js — AI Plan & Chat Logic
// ============================================================

const fetch        = require("node-fetch");
const TrainingPlan = require("../models/TrainingPlan");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL          = "nvidia/nemotron-3-super-120b-a12b:free";

const HEADERS = () => ({
  "Content-Type":  "application/json",
  "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}`,
  "HTTP-Referer":  "http://localhost:5000",
  "X-Title":       "HealthyLife AI",
});

// ── Helper: extract JSON object from a string ─────────────────
// Free models sometimes wrap JSON in text — this pulls it out safely
const extractJSON = (text) => {
  // Remove markdown code fences if present
  let clean = text.replace(/```json|```/g, "").trim();

  // Try direct parse first
  try {
    return JSON.parse(clean);
  } catch (_) {}

  // Find the first { ... } block in the response
  const start = clean.indexOf("{");
  const end   = clean.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(clean.slice(start, end + 1));
    } catch (_) {}
  }

  throw new Error("Model did not return valid JSON. Please try again.");
};

// ── POST /api/ai/plan ─────────────────────────────────────────
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

IMPORTANT: Respond ONLY with a raw JSON object. No explanations, no markdown, no backticks, no extra text before or after. Start your response with { and end with }.

Use exactly this structure:
{
  "bmi": "${bmi}",
  "bmiCategory": "one of: Underweight / Normal weight / Overweight / Obese",
  "dailyCalories": 2200,
  "proteinGoal": 150,
  "waterGoal": 3.5,
  "summary": "2 sentence personalised plan overview",
  "tips": ["tip1", "tip2", "tip3"],
  "days": [
    {
      "day": "Monday",
      "type": "active",
      "focus": "Chest & Triceps",
      "exercises": "Bench Press 4x10, Push-ups 3x15, Tricep Dips 3x12",
      "duration": "50 min",
      "intensity": "Moderate"
    },
    {
      "day": "Tuesday",
      "type": "rest",
      "focus": "Rest & Recovery",
      "exercises": "Light stretching or walk",
      "duration": "20 min",
      "intensity": "Low"
    }
  ]
}

Fill in all 7 days. At least 1 day must have type "rest".`;

    const response = await fetch(OPENROUTER_URL, {
      method:  "POST",
      headers: HEADERS(),
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: 1500,
        messages:   [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "OpenRouter API error");
    }

    const data = await response.json();
    const raw  = data.choices[0].message.content;

    console.log("Raw AI response:", raw); // helpful for debugging

    const plan = extractJSON(raw);

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
const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ success: false, message: "Message is required" });

    const messages = [
      {
        role: "system",
        content:
          "You are a friendly, certified AI health and fitness assistant. Give practical, evidence-based advice on workouts, nutrition, recovery, sleep, and wellbeing. Keep responses concise (3-5 sentences). Never provide medical diagnoses — advise users to see a doctor for medical concerns.",
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch(OPENROUTER_URL, {
      method:  "POST",
      headers: HEADERS(),
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: 512,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "OpenRouter API error");
    }

    const data  = await response.json();
    const reply = data.choices[0].message.content;

    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    console.error("AI Chat Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generatePlan, getLatestPlan, chatWithAI };