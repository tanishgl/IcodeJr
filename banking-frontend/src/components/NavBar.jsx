import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Banking App</Link>
      </div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/newuser")}>New User</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="avatar-button"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile Avatar"
                className="avatar"
              />
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
