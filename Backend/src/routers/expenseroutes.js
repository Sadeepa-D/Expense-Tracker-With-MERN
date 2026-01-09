const express = require("express");
const router = express.Router();
const { addexpense } = require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMidlleware");

// test route
router.get("/ping", (req, res) => {
  res.json({ message: "PONG" });
});

// real route
router.post("/add", authMiddleware, addexpense);

module.exports = router;
