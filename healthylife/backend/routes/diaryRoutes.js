// ============================================================
// routes/diaryRoutes.js
// ============================================================

const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/auth");
const {
  createEntry,
  getEntries,
  deleteEntry,
} = require("../controllers/diaryController");

router.post("/",       protect, createEntry);
router.get( "/",       protect, getEntries);
router.delete("/:id",  protect, deleteEntry);

module.exports = router;
