const pool = require("../models/db");

const createQuestion = async (req, res) => {
  try {
    const { question_text, answer, points, category_id } = req.body;

    const image = req.files?.image?.[0]?.path;
    const answer_image = req.files?.answer_image?.[0]?.path;
    const audio = req.files?.audio?.[0]?.path;
    const video = req.files?.video?.[0]?.path;
    const answer_audio = req.files?.answer_audio?.[0]?.path;
    const answer_video = req.files?.answer_video?.[0]?.path;

    const query = `
      INSERT INTO questions 
      (question_text, image, answer,  category_id, points, answer_image,  video, audio, answer_audio, answer_video)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;

    const data = [
      question_text,
      image,
      answer,
      category_id,
      points,
      answer_image,
      video,
      audio,
      answer_audio,
      answer_video,
    ];

    const result = await pool.query(query, data);

    return res.status(201).json({
      success: true,
      message: "question added successfully",
      data: result.rows[0],
    });
    console.log(JSON.stringify(err, null, 2));
  } catch (err) {
  console.log("FULL ERROR:", err);

  if (err.response) {
    console.log("Cloudinary Error:", err.response.data);
  }

  return res.status(500).json({
    success: false,
    message: "server error",
    error: err.message,
    details: err.response?.data || err,
  });
}
};

const getQuestion = async (req, res) => {
  try {
    const query = `select * from questions`;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      message: "fetching all question",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const getQuestionByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT * FROM questions
      WHERE category_id = $1
    `;

    const result = await pool.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "questions by category",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM questions WHERE id = $1 RETURNING *`;

    const result = await pool.query(query, [id]);

    return res.status(200).json({
      success: true,
      message: "question deleted",
      data: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};
const getQuestionsForGame = async (req, res) => {
  try {
    const { userId, categoryIds } = req.body;

    const query = `
      SELECT q.*
      FROM questions q
      WHERE q.category_id = ANY($1)
      AND q.id NOT IN (
        SELECT question_id
        FROM user_played_questions
        WHERE user_id = $2
      )
      ORDER BY q.points ASC
    `;

    const result = await pool.query(query, [categoryIds, userId]);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
const markQuestionPlayed = async (req, res) => {
  const { userId, questionId } = req.body;

  await pool.query(
    `INSERT INTO user_played_questions (user_id, question_id)
     VALUES ($1, $2)`,
    [userId, questionId],
  );

  res.json({ success: true });
};

module.exports = {
  createQuestion,
  getQuestion,
  getQuestionByCategory,
  deleteQuestion,
  getQuestionsForGame,
  markQuestionPlayed,
};
