const express = require("express");
const router = express.Router();
const { Saveuser, viewuser } = require("../controllers/userController");

router.post("/register", Saveuser);
router.get("/viewuser", viewuser);

module.exports = router;
