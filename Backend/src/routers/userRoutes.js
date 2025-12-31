const express = require("express");
const router = express.Router();
const { rejisteruser } = require("../controllers/userController");

router.post("/rejister", rejisteruser);

module.exports = router;
