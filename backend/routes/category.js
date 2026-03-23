const express = require("express");
const upload = require("../utils/upload");
const authentication = require("../middlewares/authentication");

const { createCategory, getCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post(
  "/add",
  authentication,
  upload.single("image"),
  createCategory
);

categoryRouter.get("/", authentication, getCategory);

module.exports = categoryRouter;