import Expense from "../models/expensemodle.js";

export const addexpense = async (req, res) => {
  try {
    const { description, cateogry, amount, date } = req.body;
    if (!description || !amount || !cateogry) {
      return res.status(400).json({ message: "Please Fill all the field" });
    }
    const expensess = new Expense({
      user: req.user._id,
      description,
      amount,
      cateogry,
      date: date || new date(),
    });
    await expensess.save();
    res.status(201).json({ message: "Expensess add Sucessfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
