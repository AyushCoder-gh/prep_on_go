import { useEffect, useState } from "react";
import { getQuestions, deleteQuestion } from "../api/userApi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);

  const handleDelete = async (questionId) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this question ?"
    );

    if(!confirmed){
        return ;
    }

    try{
        await deleteQuestion(questionId);

        setMessage("Question deleted successfully.");

        setQuestions((currentQuestions) =>
            currentQuestions.filter((question) => question.id !== questionId)
        );
    } catch(error){
        console.error(error);

        if(error.response){
            setMessage(error.response.data.message);
        }else{
            setMessage("Failed to delete question.");
        }
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
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

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div>
      <h2>Manage Questions</h2>

      {message && <p>{message}</p>}

      {questions.map((question) => (
        <div key={question.id}>
          <p>
            <strong>Question:</strong> {question.question}
          </p>

          <p>
            <strong>A:</strong> {question.option_a}
          </p>

          <p>
            <strong>B:</strong> {question.option_b}
          </p>

          <p>
            <strong>C:</strong> {question.option_c}
          </p>

          <p>
            <strong>D:</strong> {question.option_d}
          </p>

          <p>
            <strong>Category:</strong> {question.category}
          </p>

          <p>
            <strong>Difficulty:</strong> {question.difficulty}
          </p>
        
          <button onClick={() => handleDelete(question.id)}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminQuestions;