import { useEffect, useState, useContext } from "react";
import { getUsers, deleteUser } from "../api/userApi";
import AuthContext from "../context/AuthContext";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to fetch users.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      return;
    }

    fetchUsers();
  }, [user]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingUserId(userId);
      setMessage("");

      await deleteUser(userId);

      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== userId)
      );

      setMessage("User deleted successfully.");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to delete user.");
      }
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <section className="admin-users-section">

      <div className="section-heading">
        <div>
          <p className="card-label">USER MANAGEMENT</p>

          <h2>Manage Users</h2>

          <p>
            View and manage registered users on PrepOnGo.
          </p>
        </div>

        <span className="question-count">
          {users.length} {users.length === 1 ? "User" : "Users"}
        </span>
      </div>

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      {loading ? (
        <div className="admin-empty-state">
          <p>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="admin-empty-state">
          <h3>No users found</h3>
          <p>
            There are currently no registered users on PrepOnGo.
          </p>
        </div>
      ) : (
        <div className="users-table-wrapper">
          <table className="users-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Year</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((currentUser) => {

                const isCurrentUser =
                  currentUser.id === user.id;

                const isDeleting =
                  deletingUserId === currentUser.id;

                return (
                  <tr key={currentUser.id}>

                    <td>
                      <div className="user-name-cell">

                        <div className="user-avatar">
                          {currentUser.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {currentUser.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {currentUser.email}
                    </td>

                    <td>
                      {currentUser.college || "—"}
                    </td>

                    <td>
                      {currentUser.year || "—"}
                    </td>

                    <td>
                      <span className="user-role-badge">
                        {currentUser.role || "student"}
                      </span>
                    </td>

                    <td>
                      {isCurrentUser ? (
                        <span className="current-user-label">
                          You
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="delete-user-button"
                          onClick={() =>
                            handleDelete(currentUser.id)
                          }
                          disabled={isDeleting}
                        >
                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

    </section>
  );
}

export default AdminUsers;