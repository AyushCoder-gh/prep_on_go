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
        <div>
          <p>
            <strong>Total Attempts:</strong>{" "}
            {stats.totalAttempts}
          </p>

          <p>
            <strong>Best Percentage:</strong>{" "}
            {stats.bestPercentage}%
          </p>

          <p>
            <strong>Average Percentage:</strong>{" "}
            {stats.averagePercentage}%
          </p>

          <p>
            <strong>Latest Percentage:</strong>{" "}
            {stats.latestPercentage}%
          </p>
        </div>
      )}
    </div>
  );
}

export default PerformanceDashboard;