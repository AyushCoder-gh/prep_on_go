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

module.exports = {
  getAllUsers,
};