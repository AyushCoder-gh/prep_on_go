import { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import RegisterForm from "./components/RegisterForm";
import { getUsers } from "./api/userApi";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import AdminUsers from "./components/AdminUsers";

function App() {
  const [users, setUsers] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
  );

  const [userRole, setUserRole] = useState(
    localStorage.getItem("role")
  );

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setIsLoggedIn(false);
  setUserRole(null);
};

  return (
    <div>
      <h1>PrepOnGo</h1>

      <h2>Registered Users</h2>

      {users.map((user) => (
        <UserCard
        key={user.id}
        user={user}
      />
      ))}
      <hr />

      <RegisterForm refreshUsers={fetchUsers} />

      {isLoggedIn ? (
    <>
    <Profile />

    {userRole === "admin" && <AdminUsers />}

    <button onClick={handleLogout}>
      Logout
    </button>
  </>
  ) : (
    <LoginForm
      onLogin={(role) => {
        setIsLoggedIn(true);
        setUserRole(role);
      }}
    />
  )}
    </div>
  );
}

export default App;