// ============================================================
// controllers/diaryController.js — Diary Entry Logic
// ============================================================

const Diary = require("../models/Diary");

// ── POST /api/diary ──────────────────────────────────────────
const createEntry = async (req, res) => {
  try {
    const { mood, text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: "Diary text is required" });

    const entry = await Diary.create({ user: req.user._id, mood, text });
    res.status(201).json({ success: true, message: "Entry saved", data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/diary ───────────────────────────────────────────
const getEntries = async (req, res) => {
  try {
    const entries = await Diary.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE /api/diary/:id ────────────────────────────────────
const deleteEntry = async (req, res) => {
  try {
    const entry = await Diary.findById(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    await entry.deleteOne();
    res.status(200).json({ success: true, message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createEntry, getEntries, deleteEntry };
