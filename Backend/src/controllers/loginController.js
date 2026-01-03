const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/usermodle");

const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your_secret_key",
      { expiresIn: "24h" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginuser };
