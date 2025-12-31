const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db_connect");
const userroutes = require("./routers/userRoutes");

dotenv.config();

connectdb();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running...");
});
app.use("/api/user", userroutes);
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
