const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
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
    next(error);
  }
};

const createUser = async (req, res, next) => {
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
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    const token = jwt.sign(
    { userId: user.id,
      role: user.role,
     },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    college: user.college,
    year: user.year,
    role: user.role,
  },
});
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name, email, college, year, created_at
      FROM users
      WHERE id = $1;
      `,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async(req, res, next) => {
  try {
    const userId = req.params.id;

    if(Number(userId) === Number(req.user.userId)){
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, name, email",
      [userId]
    );

    if(result.rows.length === 0){
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getProfile,
  deleteUser,
};