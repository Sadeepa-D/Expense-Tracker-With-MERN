const express = require("express");
const router = express.Router();
const { addexpense } = require("../controllers/expenseController");

router.post("/add", addexpense);

module.exports = router;
