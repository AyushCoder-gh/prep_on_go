import { useEffect, useState, useContext } from "react";
import { getQuestions, submitQuiz } from "../api/userApi";
import AuthContext from "../context/AuthContext";

const OPTIONS = ["A", "B", "C", "D"];

function Quiz({ onQuizSubmitted }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();

        setQuestions(data);
        setMessage("");
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message ||
            "Failed to fetch questions."
        );
      }
    };

    fetchQuestions();
  }, [user]);

  if (!user) {
    return null;
  }

  const answeredCount = Object.keys(answers).length;

  const progressPercentage =
    questions.length > 0
      ? (answeredCount / questions.length) * 100
      : 0;

  const handleAnswerChange = (questionId, option) => {
    if (result || submitting) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: option,
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (questions.length === 0) {
      setMessage("No questions available.");
      return;
    }

    if (answeredCount !== questions.length) {
      setMessage(
        `Please answer all questions before submitting. ${answeredCount} of ${questions.length} answered.`
      );
      return;
    }

    setMessage("");
    setResult(null);
    setSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, selectedOption]) => ({
          questionId: Number(questionId),
          selectedOption,
        })
      );

      const data = await submitQuiz(formattedAnswers);

      console.log("QUIZ SUBMIT RESPONSE:", data);

      setResult(data);
      setMessage("Quiz submitted successfully.");

      if (onQuizSubmitted) {
        onQuizSubmitted();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to submit quiz."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    setResult(null);
    setMessage("");
  };

  const getResultForQuestion = (questionId) => {
    if (!result?.results) {
      return null;
    }

    return result.results.find(
      (item) =>
        Number(item.questionId) === Number(questionId)
    );
  };

  const getOptionText = (question, option) => {
    return question[`option_${option.toLowerCase()}`];
  };

  const getOptionClassName = (
    question,
    option,
    questionResult
  ) => {
    const classes = ["option"];

    if (answers[question.id] === option) {
      classes.push("selected");
    }

    if (
      questionResult &&
      questionResult.correctOption === option
    ) {
      classes.push("correct-option");
    }

    if (
      questionResult &&
      questionResult.selectedOption === option &&
      !questionResult.isCorrect
    ) {
      classes.push("wrong-option");
    }

    return classes.join(" ");
  };

  return (
    <section className="quiz-section">

      {/* Quiz heading */}

      <div className="section-heading">
        <div>
          <p className="card-label">
            PRACTICE QUIZ
          </p>

          <h2>Test Your Knowledge</h2>

          <p>
            Answer all questions and submit your quiz to
            see your score.
          </p>
        </div>

        <span className="question-count">
          {questions.length}{" "}
          {questions.length === 1
            ? "Question"
            : "Questions"}
        </span>
      </div>

      {/* Progress */}

      {questions.length > 0 && !result && (
        <div className="quiz-progress">

          <div className="quiz-progress-header">
            <span>Quiz Progress</span>

            <strong>
              {answeredCount} / {questions.length}
            </strong>
          </div>

          <div className="quiz-progress-track">
            <div
              className="quiz-progress-bar"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <p>
            {answeredCount === questions.length
              ? "All questions answered. You can submit the quiz."
              : `${questions.length - answeredCount} question${
                  questions.length - answeredCount === 1
                    ? ""
                    : "s"
                } remaining`}
          </p>

        </div>
      )}

      {/* Message */}

      {message && (
        <div className="quiz-message">
          {message}
        </div>
      )}

      {/* No questions */}

      {questions.length === 0 ? (
        <div className="quiz-empty-state">
          <h3>No Questions Available</h3>

          <p>
            There are currently no quiz questions available.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>

          <div className="questions-list">

            {questions.map((question, index) => {
              const questionResult =
                getResultForQuestion(question.id);

              const questionClassName = [
                "question-card",
                result
                  ? "quiz-question-submitted"
                  : "",
                questionResult
                  ? questionResult.isCorrect
                    ? "quiz-question-correct"
                    : "quiz-question-incorrect"
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  className={questionClassName}
                  key={question.id}
                >

                  {/* Question header */}

                  <div className="question-header">

                    <div className="question-number">
                      Question {index + 1}
                    </div>

                    {questionResult && (
                      <span
                        className={`question-result-badge ${
                          questionResult.isCorrect
                            ? "result-correct"
                            : "result-incorrect"
                        }`}
                      >
                        {questionResult.isCorrect
                          ? "✓ Correct"
                          : "✕ Incorrect"}
                      </span>
                    )}

                  </div>

                  {/* Question */}

                  <h3>{question.question}</h3>

                  {/* Options */}

                  <div className="options-list">

                    {OPTIONS.map((option) => (
                      <label
                        key={option}
                        className={getOptionClassName(
                          question,
                          option,
                          questionResult
                        )}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={
                            answers[question.id] ===
                            option
                          }
                          onChange={() =>
                            handleAnswerChange(
                              question.id,
                              option
                            )
                          }
                          disabled={
                            !!result || submitting
                          }
                        />

                        <span className="option-letter">
                          {option}
                        </span>

                        <span>
                          {getOptionText(
                            question,
                            option
                          )}
                        </span>
                      </label>
                    ))}

                  </div>

                  {/* Answer feedback */}

                  {questionResult && (
                    <div className="answer-feedback">

                      <div>
                        <span>Your Answer</span>

                        <strong
                          className={
                            questionResult.isCorrect
                              ? "feedback-correct"
                              : "feedback-wrong"
                          }
                        >
                          {questionResult.selectedOption}
                        </strong>
                      </div>

                      <div>
                        <span>Correct Answer</span>

                        <strong className="feedback-correct">
                          {questionResult.correctOption}
                        </strong>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* Submit */}

          {!result && (
            <div className="quiz-actions">

              <button
                className="submit-quiz-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Quiz"}
              </button>

            </div>
          )}

        </form>
      )}

      {/* Result */}

      {result && (
        <div className="quiz-result-container">

          <div className="quiz-result-header">

            <p className="card-label">
              QUIZ COMPLETED
            </p>

            <h3>
              Great job, {user.name}!
            </h3>

            <p>
              Here is your performance for this attempt.
            </p>

          </div>

          <div className="quiz-result">

            <div>
              <span>Score</span>

              <strong>
                {result.score}/{result.total}
              </strong>
            </div>

            <div>
              <span>Percentage</span>

              <strong>
                {result.percentage}%
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="try-again-button"
            onClick={handleTryAgain}
          >
            Try Again
          </button>

        </div>
      )}

    </section>
  );
}

export default Quiz;