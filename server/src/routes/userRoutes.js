const express = require("express");

const {
  getAllUsers,
  createUser,
  loginUser,
  getProfile,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeAdmin = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.delete("/users/:id", authMiddleware, authorizeAdmin, deleteUser);

module.exports = router;