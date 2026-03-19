const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const userRouter = require("./routes/users");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
