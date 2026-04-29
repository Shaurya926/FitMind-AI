// ============================================================
// routes/aiRoutes.js
// ============================================================

const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/auth");
const {
  generatePlan,
  getLatestPlan,
  chatWithAI,
} = require("../controllers/aiController");

router.post("/plan",         protect, generatePlan);
router.get( "/plan/latest",  protect, getLatestPlan);
router.post("/chat",         protect, chatWithAI);

module.exports = router;
