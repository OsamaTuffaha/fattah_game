const express = require("express");

const upload = require("../utils/upload");

const { createQuestion } = require("../controllers/questions");

const questionRouter = express.Router();

questionRouter.post("/add", upload.single("image"), createQuestion);

module.exports = questionRouter;
