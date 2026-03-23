const pool = require("../models/db");

const createCategory = async (req, res) => {
  try {
    const { cat_name, genre_name } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "image is required",
      });
    }

    const image = req.file.path;

    const query = `
      INSERT INTO category (cat_name, image, genre)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [
      cat_name,
      image,
      genre_name,
    ]);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    console.log("ERROR:", err); // 🔥 مهم
    return res.status(500).json({
      message: "server error",
      error: err.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const query = `select * from category`;

    const result = await pool.query(query);

    return res.status(201).json({
      success: true,
      message: "fetch all catigories",
      data: result.rows,
    });
  } catch (err) {}
};

const createGenre = async (req, res) => {
  try {
    const { genre_name } = req.body;

    const query = `insert into genre (genre_name) values ($1)`;
    const data = [genre_name];

    const result = await pool.query(query, data);

    return res.status(201).json({
      success: true,
      message: "genre created",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: err.message,
    });
  }
};

const getGenre = async (req, res) => {
  const query = `select * from genre`;

  const result = await pool.query(query);

  return res.status(200).json({
    success : true,
    data : result.rows
  })
};

module.exports = { createCategory, getCategory, createGenre ,getGenre };
