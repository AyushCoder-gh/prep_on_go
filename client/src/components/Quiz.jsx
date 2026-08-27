import { useEffect, useState } from "react";
import { getQuestions, submitQuiz } from "../api/userApi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Quiz() {
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
      } catch (error) {
        console.error(error);

        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Failed to fetch questions.");
        }
      }
    };

    fetchQuestions();
  }, [user]);

  if (!user) {
    return null;
  }

  const handleAnswerChange = (questionId, option) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(questions.length === 0){
        setMessage("No questions available.");
        return;
    }

    if(Object.keys(answers).length !== questions.length){
        setMessage("Please answer all questions before submitting.");
        return ;
    }

    setMessage("");
    setResult(null);
    setSubmitting(true);

    try{
        const formattedAnswers = Object.entries(answers).map(
            ([questionId, selectedOption]) => ({
                questionId: Number(questionId),
                selectedOption,
            })
        );

        const data = await submitQuiz(formattedAnswers);

        setResult(data);
        setMessage("Quiz submitted successfully.");
    }catch(error){
        console.error(error);

        if(error.response){
            setMessage(error.response.data.message);
        }else{
            setMessage("Failed to submit quiz.");
        }
    }finally{
        setSubmitting(false);
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    setResult(null);
    setMessage("");
  };

  return (
  <section className="quiz-section">
    <div className="section-heading">
      <div>
        <p className="card-label">PRACTICE QUIZ</p>
        <h2>Test Your Knowledge</h2>
        <p>Answer all questions and submit your quiz to see your score.</p>
      </div>

      <span className="question-count">
        {questions.length} {questions.length === 1 ? "Question" : "Questions"}
      </span>
    </div>

    {message && (
      <div className="quiz-message">
        {message}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="questions-list">
        {questions.map((question, index) => (
          <div className="question-card" key={question.id}>
            <div className="question-number">
              Question {index + 1}
            </div>

            <h3>{question.question}</h3>

            <div className="options-list">
              <label
                className={`option ${
                  answers[question.id] === "A" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="A"
                  checked={answers[question.id] === "A"}
                  onChange={() =>
                    handleAnswerChange(question.id, "A")
                  }
                />

                <span className="option-letter">A</span>
                <span>{question.option_a}</span>
              </label>

              <label
                className={`option ${
                  answers[question.id] === "B" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="B"
                  checked={answers[question.id] === "B"}
                  onChange={() =>
                    handleAnswerChange(question.id, "B")
                  }
                />

                <span className="option-letter">B</span>
                <span>{question.option_b}</span>
              </label>

              <label
                className={`option ${
                  answers[question.id] === "C" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="C"
                  checked={answers[question.id] === "C"}
                  onChange={() =>
                    handleAnswerChange(question.id, "C")
                  }
                />

                <span className="option-letter">C</span>
                <span>{question.option_c}</span>
              </label>

              <label
                className={`option ${
                  answers[question.id] === "D" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="D"
                  checked={answers[question.id] === "D"}
                  onChange={() =>
                    handleAnswerChange(question.id, "D")
                  }
                />

                <span className="option-letter">D</span>
                <span>{question.option_d}</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        className="submit-quiz-button"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </form>

    {result && (
      <div className="quiz-result">
        <div>
          <span>Score</span>
          <strong>
            {result.score}/{result.total}
          </strong>
        </div>

        <div>
          <span>Percentage</span>
          <strong>{result.percentage}%</strong>
        </div>
      </div>
    )}
  </section>
);
}

export default Quiz;