import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/hello")
    .then((response) => {
      console.log(response.data);
      setMessage(response.data.message);
    })
    .catch((error) => {
      console.error(error);
    });
    }, []);

  return (
    <div>
      <h1>PrepOnGo</h1>

      <p>Backend Message:</p>

      <h2>{message}</h2>
    </div>
  );
}

export default App;