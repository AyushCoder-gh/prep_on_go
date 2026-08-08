const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        college,
        year,
        created_at
      FROM users
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, college, year } = req.body;

    // Required fields validation
    if (!name || !email || !password || !college || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email validation
    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, college, year)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, college, year, created_at;
      `,
      [name, email, hashedPassword, college, year]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};