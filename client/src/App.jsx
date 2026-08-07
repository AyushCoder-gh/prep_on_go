import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    </div>
  );
}

export default App;