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
    const expenses = await Expense.find({ user: userid }).sort({
      createdAt: -1,
    });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const editexpense = async (req, res) => {};

const deleteexpense = async (req, res) => {
  const { expenseid } = req.params;
  if (!expenseid) {
    return res.status(400).json({ message: "expense id required!" });
  }
  try {
    const response = await Expense.findByIdAndDelete(expenseid);
    if (!response) {
      return res.status(404).json({ message: "expense Not Found!" });
    }
    return res.status(200).json({ message: "Expense delete Sucessfully!" });
  } catch (error) {
    console.error("Delete error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { addexpense, viewexpense, editexpense, deleteexpense };
