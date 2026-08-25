import { useState, useEffect, useContext } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import RegisterForm from "./components/RegisterForm";
import { getUsers } from "./api/userApi";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import AdminUsers from "./components/AdminUsers";
import AuthContext from "./context/AuthContext";
import AdminQuestions from "./components/AdminQuestions";
import Quiz from "./components/Quiz";


function App() {
  const [users, setUsers] = useState([]);

  const { user, isAuthenticated, loading, logout } = useContext(AuthContext);

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

  if(loading){
    return <p>Checking authentication...</p>
  }
  
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

      {isAuthenticated ? (
    <>
    <Profile />

    {user?.role === "admin" && (
  <>
    <AdminUsers />
    <AdminQuestions />
  </>
)}

  {user?.role !== "admin" && <Quiz />}

    <button onClick={logout}>
      Logout
    </button>
  </>
  ) : (
    <LoginForm />
  )}
    </div>
  );
}

export default App;