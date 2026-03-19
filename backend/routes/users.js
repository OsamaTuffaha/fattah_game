const express = require("express");
const {
  register,
  login,
  deleteUserById,
  getAllUsers,
  updateUserById,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/update/:id", updateUserById);

userRouter.put("/:id", deleteUserById);

userRouter.get("/", getAllUsers);

module.exports = userRouter;
