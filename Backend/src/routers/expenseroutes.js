const express = require("express");
const router = express.Router();
const { addexpense, viewexpense } = require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMidlleware");

router.post("/add", authMiddleware, addexpense);
router.get("/viewexpense", authMiddleware, viewexpense);

module.exports = router;
