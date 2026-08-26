import { useEffect, useState, useContext } from "react";
import apiClient from "../api/apiClient";
import AuthContext from "../context/AuthContext";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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
      <>
        {attempts.map((attempt) => (
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
        ))}

        {/* Performance Trend */}
        <h3>Performance Trend</h3>

        <div style={{ width: "100%", height: 300}}>
            <ResponsiveContainer>
                <LineChart
                    data={attempts
                        .slice()
                        .reverse()
                        .map((attempt, index) => ({
                            attempt: index + 1,
                            percentage: attempt.percentage,
                        }))}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        datakey="attempt"
                        label={{
                            value: "Attempt",
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />

                    <YAxis
                        domain={[0, 100]}
                        label={{
                            value: "Percentage",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />

                    <Tooltip />

                    <Line   
                        type="monotone"
                        dataKey="percentage"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </>
    )}
  </div>
);
};

export default QuizHistory;