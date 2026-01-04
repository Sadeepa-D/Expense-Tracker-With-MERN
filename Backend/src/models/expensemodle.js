const mongoose = require("mongoose");
const expensessschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Food",
        "Transport",
        "Bills",
        "Entertainment",
        "Shopping",
        "Other",
      ],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expensessschema);
