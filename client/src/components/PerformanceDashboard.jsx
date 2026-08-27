import { useEffect, useState, useContext } from "react";
import { getQuizStats } from "../api/userApi";
import AuthContext from "../context/AuthContext";

function PerformanceDashboard() {
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await getQuizStats();
        setStats(data);
      } catch (error) {
        console.error(error);

        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Failed to fetch performance statistics.");
        }
      }
    };

    fetchStats();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>My Performance</h2>

      {message && <p>{message}</p>}

      {!stats ? (
        <p>Loading performance...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Attempts</span>
            <strong>{stats.totalAttempts}</strong>
          </div>

          <div className="stat-card">
            <span>Best Score</span>
            <strong>{stats.bestPercentage}%</strong>
          </div>

          <div className="stat-card">
            <span>Average Score</span>
            <strong>{stats.averagePercentage}%</strong>
          </div>

          <div className="stat-card">
            <span>Latest Score</span>
            <strong>{stats.latestPercentage}%</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceDashboard;