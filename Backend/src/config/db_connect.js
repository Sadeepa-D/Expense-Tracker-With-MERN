//DnQOKPOZDcDpxoNN
//sadeepa123
//Sadeepa
//mongodb+srv://Sadeepa:<db_password>@cluster0.ldrfk9g.mongodb.net/?appName=Cluster0
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
