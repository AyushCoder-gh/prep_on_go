const express = require("express");

const { submitQuiz, getQuizHistory, getQuizStats } = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quiz/submit", authMiddleware, submitQuiz);
router.get("/quiz/history", authMiddleware, getQuizHistory);
router.get("/quiz/stats", authMiddleware, getQuizStats);

module.exports = router;