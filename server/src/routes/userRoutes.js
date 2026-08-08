const express = require("express");

const {
  getAllUsers,
  createUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;