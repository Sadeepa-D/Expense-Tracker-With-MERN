const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMidlleware");
const {
  Saveuser,
  getDashboard,
  loginuser,
  updatesalary,
  getbudgetlimit,
} = require("../controllers/userController");

router.post("/register", Saveuser);
router.post("/login", loginuser);
router.get("/dashboard", authMiddleware, getDashboard);
router.put("/updatesalary", authMiddleware, updatesalary);
router.get("/salarylimit", authMiddleware, getbudgetlimit);

module.exports = router;
