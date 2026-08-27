import { useContext } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";


function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if(loading){
    return <p>Checking authentication...</p>;
  }

  return (
    <div>
      <Navbar />

      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;