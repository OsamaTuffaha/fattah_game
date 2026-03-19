const pool = require("../models/db");

const createQuestion = async (req, res) => {
  try {
    const { question_text, answer, points, category_id } = req.body;

    const image = req.file.path;

    const query = `INSERT INTO questions (question_text , image , answer ,points, category_id) VALUES ($1 , $2 ,$3 ,$4 ,$5)`;

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

module.exports = { createQuestion };
