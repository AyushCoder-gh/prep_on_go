import { useState, useEffect, useContext } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import RegisterForm from "./components/RegisterForm";
import { getUsers } from "./api/userApi";
import LoginForm from "./components/LoginForm";
import AuthContext from "./context/AuthContext";
import QuizHistory from "./components/QuizHistory";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";


function App() {
  const [users, setUsers] = useState([]);

  const { isAuthenticated, loading } = useContext(AuthContext);

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
      <Navbar />

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
    <Dashboard />
  ) : (
    <LoginForm />
  )}
    </div>
  );
}

export default App;