import { useEffect, useState, useContext } from "react";
import apiClient from "../api/apiClient";
import AuthContext from "../context/AuthContext";

function QuizHistory() {
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await apiClient.get("/quiz/history");
        setAttempts(response.data);
      } catch (error) {
        console.error(error);

        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Failed to fetch quiz history.");
        }
      }
    };

    fetchHistory();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>Quiz History</h2>

      {message && <p>{message}</p>}

      {attempts.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        attempts.map((attempt) => (
          <div key={attempt.id}>
            <p>
              <strong>Score:</strong>{" "}
              {attempt.score}/{attempt.total}
            </p>

            <p>
              <strong>Percentage:</strong>{" "}
              {attempt.percentage}%
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(attempt.submitted_at).toLocaleString()}
            </p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default QuizHistory;