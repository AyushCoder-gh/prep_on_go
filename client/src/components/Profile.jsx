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
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>My Profile</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>College:</strong> {user.college}
      </p>

      <p>
        <strong>Year:</strong> {user.year}
      </p>
    </div>
  );
}

export default Profile;