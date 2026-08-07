const pool = require("../config/db");

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

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, college, year)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, college, year, created_at;
      `,
      [name, email, password, college, year]
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