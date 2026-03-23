const express = require("express");
const {
  register,
  login,
  deleteUserById,
  getAllUsers,
  updateUserById,
} = require("../controllers/users");

const authentication = require("../middlewares/authentication"); // 👈 مهم

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

userRouter.put("/update/:id", authentication, updateUserById);

userRouter.put("/:id", authentication, deleteUserById);

userRouter.get("/", authentication, getAllUsers);

module.exports = userRouter;