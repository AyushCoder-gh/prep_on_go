import { useEffect, useState, useContext } from "react";
import apiClient from "../api/apiClient";
import AuthContext from "../context/AuthContext";

function QuizHistory({ refreshKey }) {
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
  }, [user, refreshKey]);

  if (!user) {
    return null;
  }

  const getScoreClass = (percentage) => {
    if (percentage >= 80) {
      return "score-good";
    }

    if (percentage >= 50) {
      return "score-average";
    }

    return "score-low";
  };

  return (
    <div className="history-section">
      <div className="history-header">
        <div>
          <p className="card-label">QUIZ ACTIVITY</p>
          <h2>Quiz History</h2>
          <p>Review your previous quiz attempts and scores.</p>
        </div>

        <span className="attempt-count">
          {attempts.length}{" "}
          {attempts.length === 1 ? "Attempt" : "Attempts"}
        </span>
      </div>

      {message && <p className="history-message">{message}</p>}

      {attempts.length === 0 ? (
        <div className="empty-history">
          <h3>No quiz attempts yet</h3>
          <p>
            Complete your first quiz to start building your history.
          </p>
        </div>
      ) : (
        <div className="history-list">
          {attempts.map((attempt, index) => (
            <div className="history-card" key={attempt.id}>
              <div className="history-number">
                #{index + 1}
              </div>

              <div className="history-score">
                <span>Score</span>
                <strong>
                  {attempt.score}/{attempt.total}
                </strong>
              </div>

              <div className="history-percentage">
                <span>Percentage</span>
                <strong className={getScoreClass(attempt.percentage)}>
                  {attempt.percentage}%
                </strong>
              </div>

              <div className="history-date">
                <span>Submitted</span>
                <strong>
                  {new Date(attempt.submitted_at).toLocaleString()}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizHistory;