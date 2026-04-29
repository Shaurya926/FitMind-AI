// ============================================================
// routes/healthRoutes.js
// ============================================================

const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/auth");
const {
  logHealth,
  getTodayHealth,
  getHistory,
} = require("../controllers/healthController");

router.post("/log",     protect, logHealth);
router.get( "/today",   protect, getTodayHealth);
router.get( "/history", protect, getHistory);

module.exports = router;
