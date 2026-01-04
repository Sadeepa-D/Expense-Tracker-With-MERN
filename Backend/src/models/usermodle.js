const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add Name"],
    },
    email: {
      type: String,
      required: [true, "please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    salaryLimit: {
      type: Number,
      default: 5000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
