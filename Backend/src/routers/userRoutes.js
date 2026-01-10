const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMidlleware");
const {
  Saveuser,
  getDashboard,
  loginuser,
  updatesalary,
} = require("../controllers/userController");

router.post("/register", Saveuser);
router.post("/login", loginuser);
router.get("/dashboard", authMiddleware, getDashboard);
router.put("/updatesalary", authMiddleware, updatesalary);

module.exports = router;
