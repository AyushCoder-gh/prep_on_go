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

    if(!user){
        return null;
    }

    return(
        <div>
            <Profile />

            {user?.role === "admin" ? (
                <>
                    <AdminUsers />
                    <AdminQuestions />
                </>
            ) : (
                <>
                    <Quiz />
                    <QuizHistory />
                    <PerformanceDashboard />
                </>
            )}
        </div>
    );
}

export default Dashboard;