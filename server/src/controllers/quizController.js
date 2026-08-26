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

    await pool.query(
      `
        INSERT INTO quiz_attempts(
          user_id,
          score,
          total,
          percentage
        )
        VALUES ($1, $2, $3, $4)
      `,
      [req.user.userId, score, total, percentage]
    );

    res.status(200).json({
      message: "Quiz submitted successfully.",
      score, 
      total,
      percentage,
    });
  } catch (error) {
    next(error);
  }
};

const getQuizHistory = async (req, res, next) => {
  try{
    const result = await pool.query(
      `
        SELECT
          id, 
          score,
          total,
          percentage,
          submitted_at
        FROM quiz_attempts
        WHERE user_id = $1
        ORDER BY submitted_at DESC
      `,
      [req.user.userId]
    );

    res.status(200).json(result.rows);
  }catch(error){
    next(error);
  }
};

const getQuizStats = async (req, res, next) => {
  try{
    const result = await pool.query(
      `
        SELECT 
          COUNT(*)::int AS total_attempts,
          COALESCE(MAX(percentage), 0)::int AS best_percentage,
          COALESCE(ROUND(AVG(percentage)), 0)::int AS average_percentage
        FROM quiz_attempts
        WHERE user_id = $1
      `,
      [req.user.userId]
    );

    const latestResult = await pool.query(
      `
        SELECT percentage
        FROM quiz_attempts
        WHERE user_id = $1
        ORDER BY submitted_at DESC
        LIMIT 1
      `,
      [req.user.userId]
    );

    const stats = result.rows[0];

    res.status(200).json({
      totalAttempts: stats.total_attempts,
      bestPercentage: stats.best_percentage,
      averagePercentage: stats.average_percentage,
      latestPercentage:
        latestResult.rows.length > 0 ? latestResult.rows[0].percentage : 0,
    });
  }catch(error){
    next(error);
  }
};

module.exports = {
  submitQuiz,
  getQuizHistory,
  getQuizStats,
};