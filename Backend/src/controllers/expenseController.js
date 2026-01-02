import Expense from "../models/expensemodle.js";

export const addexpense = async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || !amount) {
      return res.status(400).json({ message: "Please Fill all the field" });
    }
    const expensess = new Expense({ title, amount });
    await expensess.save();
    res.status(201).json({ message: "Expensess add Sucessfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


