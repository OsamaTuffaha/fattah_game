const pool = require("../models/db");

const createQuestion = async (req, res) => {
  try {
    const { question_text, answer, points, category_id } = req.body;

    const image = req.file.path;

    const query = `
  INSERT INTO questions (question_text , image , answer , points, category_id) 
  VALUES ($1 , $2 ,$3 ,$4 ,$5)
  RETURNING *
`;

    const data = [question_text, image, answer, points, category_id];

    const result = await pool.query(query, data);

    return res.status(201).json({
      success: true,
      message: "question added successfully",
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
      SELECT * FROM questions
      WHERE category_id = ANY($1)
      AND id NOT IN (
        SELECT question_id FROM user_played_questions
        WHERE user_id = $2
      )
      ORDER BY points ASC
    `;

    const result = await pool.query(query, [categoryIds, userId]);

    return res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
