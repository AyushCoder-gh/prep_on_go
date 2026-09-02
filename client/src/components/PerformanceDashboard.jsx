import { useEffect, useState, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getQuizStats,
  getQuizHistory,
} from "../api/userApi";

import AuthContext from "../context/AuthContext";

function PerformanceDashboard({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchPerformance = async () => {
      try {
        setMessage("");

        const [statsData, historyData] = await Promise.all([
          getQuizStats(),
          getQuizHistory(),
        ]);

        setStats(statsData);
        setHistory(historyData);
      } catch (error) {
        console.error(error);

        if (error.response) {
          setMessage(
            error.response.data.message ||
              "Failed to fetch performance data."
          );
        } else {
          setMessage("Failed to fetch performance data.");
        }
      }
    };

    fetchPerformance();
  }, [user, refreshKey]);

  if (!user) {
    return null;
  }

  const chartData = [...history]
    .reverse()
    .map((attempt, index) => ({
      attempt: `Attempt ${index + 1}`,
      percentage: Number(attempt.percentage),
    }));

  return (
    <section className="performance-section">

      {/* Heading */}

      <div className="section-heading">
        <div>
          <p className="card-label">PERFORMANCE</p>

          <h2>My Performance</h2>

          <p>
            Track your quiz performance and progress over time.
          </p>
        </div>
      </div>

      {/* Error */}

      {message && (
        <div className="quiz-message">
          {message}
        </div>
      )}

      {/* Loading */}

      {!stats ? (
        <p>Loading performance...</p>
      ) : (
        <>
          {/* Statistics */}

          <div className="stats-grid">

            <div className="stat-card">
              <span>Total Attempts</span>
              <strong>
                {stats.totalAttempts}
              </strong>
            </div>

            <div className="stat-card">
              <span>Best Score</span>
              <strong>
                {stats.bestPercentage}%
              </strong>
            </div>

            <div className="stat-card">
              <span>Average Score</span>
              <strong>
                {stats.averagePercentage}%
              </strong>
            </div>

            <div className="stat-card">
              <span>Latest Score</span>
              <strong>
                {stats.latestPercentage}%
              </strong>
            </div>

          </div>

          {/* Performance Chart */}

          <div className="performance-chart-card">

            <div className="chart-heading">
              <div>
                <h3>Performance Trend</h3>

                <p>
                  Your quiz percentage across attempts.
                </p>
              </div>
            </div>

            {chartData.length === 0 ? (

              <p className="chart-empty">
                Complete a quiz to start tracking your
                performance.
              </p>

            ) : (

              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="attempt"
                    />

                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value) =>
                        `${value}%`
                      }
                    />

                    <Tooltip
                      formatter={(value) => [
                        `${value}%`,
                        "Score",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#6d28d9"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>
            )}

          </div>
        </>
      )}

    </section>
  );
}

export default PerformanceDashboard;