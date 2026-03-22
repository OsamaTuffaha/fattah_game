const express = require("express");
const upload = require("../utils/upload");

const { createCategory, getCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/add", upload.single("image"), createCategory);

categoryRouter.get("/", getCategory);

module.exports = categoryRouter;
