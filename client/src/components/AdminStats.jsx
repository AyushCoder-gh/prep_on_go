import { useEffect, useState, useContext } from "react";
import { getAdminStats } from "../api/userApi";
import AuthContext from "../context/AuthContext";

function AdminStats() {
    const [stats, setStats] = useState(null);
    const [message, setMessage] = useState("");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if(!user || user.role !== "admin"){
            return ;
        }

        const fetchStats = async () => {
            try{
                const data = await getAdminStats();
                setStats(data);
            }catch(error){
                console.error(error);

                if(error.response){
                    setMessage(error.response.data.message);
                }else{
                    setMessage("Failed to fetch admin statistics.");
                }
            }
        };

        fetchStats();
    }, [user]);

    if(!user || user.role !== "admin"){
        return null;
    }

    if(!stats){
        return (
            <section className="admin-stats-section">
                <p>{message || "Loading dashboard statistics..."}</p>
            </section>
        );
    }

    return (
        <section className="admin-stats-section">
            <div className="stats-grid">
                <div className="stat-card">
                    <span>Total Users</span>
                    <strong>{stats.totalUsers}</strong>
                </div>

                <div className="stat-card">
                    <span>Total Questions</span>
                    <strong>{stats.totalQuestions}</strong>
                </div>

                <div className="stat-card">
                    <span>Total Quiz Attempts</span>
                    <strong>{stats.totalAttempts}</strong>
                </div>
            </div>

            {message && <p>{message}</p>}
        </section>
    );
}

export default AdminStats;