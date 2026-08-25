const express = require("express");

const { submitQuiz } = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quiz/submit", authMiddleware, submitQuiz);

module.exports = router;