const User = require("../models/usermodle");

const rejisteruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "invaild user details" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { rejisteruser };
