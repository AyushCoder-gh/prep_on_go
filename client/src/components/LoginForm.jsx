import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");

  try {
    const response = await loginUser({
  email,
  password,
});

console.log(response);

login(response.user, response.token);

onLogin(response.user.role);

setMessage("Login successful!");
  } catch (error) {
    console.error(error);

    if (error.response) {
      setMessage(error.response.data.message);
    } else {
      setMessage("Something went wrong.");
    }
  }
};

  return (
    <div>
      <h2>Login</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;