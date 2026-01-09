const Expense = require("../models/expensemodle");
const User = require("../models/usermodle");

const addexpense = async (req, res) => {
  try {
    const { description, category, amount, date } = req.body;
    if (!amount || !category) {
      return res.status(400).json({ message: "Please Fill all the field" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const expensess = new Expense({
      user: user._id,
      description,
      amount,
      category,
      date: date || new Date(),
    });
    await expensess.save();
    res.status(201).json({ message: "Expensess add Sucessfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewexpense = async (req, res) => {
  try {
    const userid = req.user.userId;
    const expenses = await Expense.find({ user: userid }).sort({ date: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addexpense, viewexpense };
