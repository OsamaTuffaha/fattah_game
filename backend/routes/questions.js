const express = require("express");
const authentication = require('../middlewares/authentication')

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

questionRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "answer_image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "answer_audio", maxCount: 1 },
    { name: "answer_video", maxCount: 1 },
  ]),
  createQuestion,
);


questionRouter.get("/", authentication,getQuestion);

questionRouter.get("/category/:id", authentication,getQuestionByCategory);

questionRouter.delete("/:id", authentication,deleteQuestion);

questionRouter.post("/played", markQuestionPlayed);

questionRouter.post("/game", getQuestionsForGame);
module.exports = questionRouter;
