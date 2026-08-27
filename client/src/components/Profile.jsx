import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token required");
        return;
      }

      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error(error);

        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Failed to load profile.");
        }
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="profile-error">{error}</p>;
  }

  if (!user) {
    return <p className="profile-loading">Loading profile...</p>;
  }

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <div className="profile-info">
        <div className="profile-heading">
          <div>
            <p className="card-label">MY PROFILE</p>
            <h2>{user.name}</h2>
            <p className="profile-subtitle">
              Your PrepOnGo account information
            </p>
          </div>

          <span className="role-badge">
            {user.role}
          </span>
        </div>

        <div className="profile-details">
          <div className="profile-detail">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-detail">
            <span>College</span>
            <strong>{user.college}</strong>
          </div>

          <div className="profile-detail">
            <span>Year</span>
            <strong>{user.year}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;