const pool = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = parseInt(process.env.SALT, 10);

const register = async (req, res) => {
  try {
    const { user_name, email, phone_number, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all fields",
      });
    }

    const encrypted_password = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (user_name, email, phone_number, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_name, email
    `;

    const data = [
      user_name,
      email.toLowerCase(),
      phone_number,
      encrypted_password,
    ];

    const result = await pool.query(query, data);

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err);

    return res.status(409).json({
      success: false,
      message: "Email already exists or DB error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `select * from users where email = $1 `;

    const data = [email.toLowerCase()];

    const result = await pool.query(query, data);

    if (result.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "password is incorrect",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      user_name: user.user_name,
    };

    const secret = process.env.SECRET;

    const option = { expiresIn: "1d" };

    const token = jwt.sign(payload, secret, option);

    return res.status(200).json({
      success: true,
      message: "login successfully",
      token,
      user_name: user.user_name,
      email: user.email,
      id: user.id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "server error",
      err: err.message,
    });
  }
};

module.exports = { register, login };
