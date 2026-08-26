import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>PrepOnGo</h1>
        <span>Learn. Practice. Improve.</span>
      </div>

      {isAuthenticated && user && (
        <div className="navbar-user">
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;