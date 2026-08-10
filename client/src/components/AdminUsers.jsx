import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userApi";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to fetch users.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);

      setMessage("User deleted successfully.");

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to delete user.");
      }
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>

      {message && <p>{message}</p>}

      {users.map((user) => (
        <div key={user.id}>
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

          <button onClick={() => handleDelete(user.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;