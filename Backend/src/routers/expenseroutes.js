const express = require("express");
const router = express.Router();
const {
  addexpense,
  viewexpense,
  //   editexpense,
  deleteexpense,
} = require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMidlleware");

router.post("/add", authMiddleware, addexpense);
router.get("/viewexpense", authMiddleware, viewexpense);
// router.post("/editexpense", authMiddleware, editexpense);
router.delete("/deleteexpense/:expenseid", authMiddleware, deleteexpense);

module.exports = router;
