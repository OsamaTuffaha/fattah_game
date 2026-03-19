const pool = require("../models/db");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const image = req.file.path;

    const query = `INSERT INTO category (cat_name , image) VALUES ($1 , $2)`;

    const data = [name, image];

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

module.exports = { createCategory };
