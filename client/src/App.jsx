import { useState, useEffect } from "react";
import "./App.css";
import UserCard from "./components/UserCard";
import RegisterForm from "./components/RegisterForm";
import { getUsers } from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);

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
    </div>
  );
}

export default App;