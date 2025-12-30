//DnQOKPOZDcDpxoNN
//sadeepa123
//Sadeepa
//sadeedina2002_db_user

const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed!");
    process.exit(1);
  }
};
module.exports = connectdb;
