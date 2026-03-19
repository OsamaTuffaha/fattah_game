const express = require("express");
const upload = require("../utils/upload");

const { createCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/add", upload.single("image"), createCategory);

module.exports = categoryRouter;
