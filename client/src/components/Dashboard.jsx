import AuthContext from "../context/AuthContext";
import { useContext } from "react";

import Profile from "./Profile";
import AdminUsers from "./AdminUsers";
import AdminQuestions from "./AdminQuestions";
import Quiz from "./Quiz";
import QuizHistory from "./QuizHistory";
import PerformanceDashboard from "./PerformanceDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">
            {user?.role === "admin" ? "ADMIN DASHBOARD" : "STUDENT DASHBOARD"}
          </p>

          <h1>
            Welcome back, {user?.name} 👋
          </h1>

          <p>
            {user?.role === "admin"
              ? "Manage users, questions and your preparation platform."
              : "Track your preparation, attempt quizzes and improve your performance."}
          </p>
        </div>
      </section>

      <section className="profile-section">
        <Profile />
      </section>

      {user?.role === "admin" ? (
        <section className="dashboard-section">
          <AdminUsers />
          <AdminQuestions />
        </section>
      ) : (
        <section className="dashboard-section">
          <Quiz />
          <QuizHistory />
          <PerformanceDashboard />
        </section>
      )}
    </main>
  );
}

export default Dashboard;