const pool = require("../models/db");

const createCategory = async (req, res) => {
  try {
    const { cat_name } = req.body;

    const image = req.file.path;

    const query = `INSERT INTO category (cat_name , image) VALUES ($1 , $2)`;

    const data = [cat_name, image];

    const result = await pool.query(query, data);

    return res.status(201).json({
      success: true,
      message: "category created successfully",
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

module.exports = { createCategory, getCategory };
