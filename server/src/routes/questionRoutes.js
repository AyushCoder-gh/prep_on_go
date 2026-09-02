const express = require("express");

const {
    getAllQuestions,
    getAllQuestionsForAdmin,
    createQuestion,
    deleteQuestion,
    updateQuestion,
} = require("../controllers/questionController");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeAdmin = require("../middleware/roleMiddleware");

const validate = require("../middleware/validateMiddleware");

const validateId = require("../middleware/validateIdMiddleware");

const { createQuestionSchema, updateQuestionSchema } = require("../validators/questionValidator");

const router = express.Router();

router.get("/admin/questions", authMiddleware, authorizeAdmin, getAllQuestionsForAdmin);
router.get("/questions", authMiddleware, getAllQuestions);
router.post("/questions", authMiddleware, authorizeAdmin, validate(createQuestionSchema), createQuestion);
router.delete("/questions/:id", authMiddleware, authorizeAdmin, validateId, deleteQuestion);
router.put("/questions/:id", authMiddleware, authorizeAdmin, validateId, validate(updateQuestionSchema), updateQuestion);

module.exports = router;