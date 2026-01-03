const User = require("../models/usermodle");
const bcrypt = require("bcryptjs");

const Saveuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User save Sucessfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const viewuser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Saveuser, viewuser };
