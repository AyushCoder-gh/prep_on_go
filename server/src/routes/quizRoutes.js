const express = require("express");

const { submitQuiz, getQuizHistory, getQuizStats, getAdminStats } = require("../controllers/quizController");

const authorizeAdmin = require("../middleware/roleMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/quiz/submit", authMiddleware, submitQuiz);
router.get("/quiz/history", authMiddleware, getQuizHistory);
router.get("/quiz/stats", authMiddleware, getQuizStats);
router.get("/admin/stats", authMiddleware, authorizeAdmin, getAdminStats);

module.exports = router;