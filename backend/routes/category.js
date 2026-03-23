const express = require("express");
const upload = require("../utils/upload");
const authentication = require("../middlewares/authentication");

const { createCategory, getCategory ,createGenre ,getGenre } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post(
  "/add",
  authentication,
  upload.single("image"),
  createCategory
);

categoryRouter.get("/", authentication, getCategory);
categoryRouter.get('/genre' , getGenre)

categoryRouter.post('/genre' , createGenre)

module.exports = categoryRouter;