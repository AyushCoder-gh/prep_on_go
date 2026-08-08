import { useState } from "react";
import axios from "axios";

function RegisterForm({ refreshUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  if(!name || !email || !password || !college || !year){
    setError("All fields are required.");
    return;
  }

  if(!email.includes("@")){
    setError("Please enter a valid email.");
    return;
  }

  if(password.length < 6){
    setError("Password must be at least 6 characters.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users",
      {
        name,
        email,
        password,
        college,
        year,
      }
    );

    console.log("User Created:", response.data);

    alert("User Registered Successfully!");

    refreshUsers();

    setName("");
    setEmail("");
    setPassword("");
    setCollege("");
    setYear("");
  } catch (error) {
    console.error(error);

    alert("Failed to register user.");
  }
};

  return (
    <div>
      <h2>Register User</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="College"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;