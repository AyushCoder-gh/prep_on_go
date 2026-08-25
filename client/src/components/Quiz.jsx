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

  return (
  <div>
    <h2>Quiz</h2>

    {message && <p>{message}</p>}

    <form onSubmit={handleSubmit}>

      {questions.map((question, index) => (
        <div key={question.id}>
          <h3>
            {index + 1}. {question.question}
          </h3>

          <div>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="A"
                checked={answers[question.id] === "A"}
                onChange={() =>
                  handleAnswerChange(question.id, "A")
                }
              />
              {question.option_a}
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="B"
                checked={answers[question.id] === "B"}
                onChange={() =>
                  handleAnswerChange(question.id, "B")
                }
              />
              {question.option_b}
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="C"
                checked={answers[question.id] === "C"}
                onChange={() =>
                  handleAnswerChange(question.id, "C")
                }
              />
              {question.option_c}
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="D"
                checked={answers[question.id] === "D"}
                onChange={() =>
                  handleAnswerChange(question.id, "D")
                }
              />
              {question.option_d}
            </label>
          </div>

          <hr />
        </div>
      ))}
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </form>
    {result && (
        <div>
            <h3>Quiz Result</h3>
            <p>
                Score: {result.score} / {result.total}
            </p>
            <p>
                Percentage: {result.percentage}%
            </p>
        </div>
    )}
    </div>
  );
}

export default Quiz;