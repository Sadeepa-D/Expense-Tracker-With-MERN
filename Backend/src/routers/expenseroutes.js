const express = require("express");
const router = express.Router();
const { addexpense } = require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMidlleware");

router.post("/add", authMiddleware, addexpense);

module.exports = router;
