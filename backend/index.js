const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

const userRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const questionRouter = require("./routes/questions");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/question", questionRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
