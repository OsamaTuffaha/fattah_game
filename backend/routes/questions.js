const express = require("express");

const upload = require("../utils/upload");

const {
  createQuestion,
  getQuestion,
  getQuestionByCategory,
  deleteQuestion,
  markQuestionPlayed,
  getQuestionsForGame,
} = require("../controllers/questions");

const questionRouter = express.Router();

questionRouter.post("/add", upload.single("image"), createQuestion);

questionRouter.get("/", getQuestion);

questionRouter.get("/category/:id", getQuestionByCategory);

questionRouter.delete("/:id", deleteQuestion);

questionRouter.post("/played", markQuestionPlayed);

questionRouter.post("/game", getQuestionsForGame);
module.exports = questionRouter;
