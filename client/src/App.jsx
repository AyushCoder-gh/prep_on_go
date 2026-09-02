import { useContext } from "react";
import "./App.css";

import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="app-loading">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />

      <main className="app-content">
        {isAuthenticated ? <Dashboard /> : <LoginForm />}
      </main>
    </div>
  );
}

export default App;