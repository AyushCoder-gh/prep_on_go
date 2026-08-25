const pool = require("../config/db");

const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: "Answers are required",
      });
    }

    const questionIds = answers.map((answer) => answer.questionId);

    const result = await pool.query(
      `
      SELECT id, correct_option
      FROM questions
      WHERE id = ANY($1::int[])
      `,
      [questionIds]
    );

    const questions = result.rows;

    let score = 0;

    questions.forEach((question) => {
      const submittedAnswer = answers.find(
        (answer) => Number(answer.questionId) === Number(question.id)
      );

      if (
        submittedAnswer &&
        submittedAnswer.selectedOption === question.correct_option
      ) {
        score++;
      }
    });

    const total = questions.length;

    const percentage =
      total === 0 ? 0 : Math.round((score / total) * 100);

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      total,
      percentage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitQuiz,
};