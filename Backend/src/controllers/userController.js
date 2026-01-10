const User = require("../models/usermodle");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      { userId: user._id, email: user.email },
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

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatesalary = async (req, res) => {
  try {
    const userid = req.user.userId;
    const { newsalarylimit } = req.body;
    const updateduser = await User.findByIdAndUpdate(
      userid,
      { salaryLimit: newsalarylimit },
      { new: true, runValidators: true }
    );
    if (!updateduser) {
      return res.status(404).json({ message: "Salary update Failed!" });
    }
    res.status(200).json({ message: "Salary Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getbudgetlimit = async (req, res) => {
  const userid = req.user.userId;
  try {
    const response = await User.findById(userid).select("salaryLimit");
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ salaryLimit: response.salaryLimit });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  Saveuser,
  getDashboard,
  loginuser,
  updatesalary,
  getbudgetlimit,
};
