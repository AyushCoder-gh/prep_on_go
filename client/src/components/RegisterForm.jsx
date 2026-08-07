import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();

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