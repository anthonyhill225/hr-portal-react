import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/storage";

function Navbar() {

  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {

    logoutUser();
    navigate("/");
    window.location.reload();

  };

  return (

    <nav className="navbar">

      <h2>HR Portal</h2>

      <div className="nav-links">

        {!currentUser && (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/register-employee">Register</Link>
          </>
        )}

        {currentUser?.role === "hr" && (
          <>
            <Link to="/hr-dashboard">HR Dashboard</Link>
            <Link to="/employee-profiles">Employee Profiles</Link>
            <Link to="/leave-requests">Leave Requests</Link>
            <Link to="/onboarding">Onboarding</Link>
          </>
        )}

        {currentUser?.role === "employee" && (
          <>
            <Link to="/employee-dashboard">Employee Dashboard</Link>
            <Link to="/leave-requests">My Leave</Link>
          </>
        )}

        {currentUser && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>

  );

}

export default Navbar;