import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";

import AdminStats from "./AdminStats";
import Profile from "./Profile";
import AdminUsers from "./AdminUsers";
import AdminQuestions from "./AdminQuestions";
import Quiz from "./Quiz";
import QuizHistory from "./QuizHistory";
import PerformanceDashboard from "./PerformanceDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [quizRefreshKey, setQuizRefreshKey] = useState(0);

  if (!user) {
    return null;
  }

  const handleQuizSubmitted = () => {
    setQuizRefreshKey((current) => current + 1);
  };

  const isAdmin = user.role === "admin";

  return (
    <main className="dashboard">

      {/* Dashboard Header */}

      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">
            {isAdmin
              ? "ADMIN DASHBOARD"
              : "STUDENT DASHBOARD"}
          </p>

          <h1>
            Welcome back, {user.name} 👋
          </h1>

          <p>
            {isAdmin
              ? "Manage users, questions and your preparation platform."
              : "Track your preparation, attempt quizzes and improve your performance."}
          </p>
        </div>
      </section>

      {/* Profile */}

      <section className="profile-section">
        <Profile />
      </section>

      {/* Role-specific Dashboard */}

      {isAdmin ? (
        <section className="dashboard-section">

          <AdminStats />

          <AdminUsers />

          <AdminQuestions />

        </section>
      ) : (
        <section className="dashboard-section">

          <Quiz
            onQuizSubmitted={handleQuizSubmitted}
          />

          <QuizHistory
            refreshKey={quizRefreshKey}
          />

          <PerformanceDashboard
            refreshKey={quizRefreshKey}
          />

        </section>
      )}

    </main>
  );
}

export default Dashboard;