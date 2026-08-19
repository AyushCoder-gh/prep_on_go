const express = require("express");

const {
  getAllUsers,
  createUser,
  loginUser,
  getProfile,
  deleteUser,
} = require("../controllers/userController");

const { registerSchema, loginSchema } = require("../validators/userValidator");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeAdmin = require("../middleware/roleMiddleware");

const validate = require("../middleware/validateMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", validate(registerSchema), createUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", authMiddleware, getProfile);
router.delete("/users/:id", authMiddleware, authorizeAdmin, deleteUser);


module.exports = router;