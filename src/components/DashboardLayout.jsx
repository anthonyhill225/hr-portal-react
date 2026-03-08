import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/storage";
import { useState, useEffect } from "react";

import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiUserPlus,
  FiLogOut,
  FiMoon,
  FiSun
} from "react-icons/fi";

function DashboardLayout({ children }) {
  const currentUser = getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    window.location.reload();
  };

  const hrLinks = [
    { label: "Dashboard", path: "/hr-dashboard", icon: <FiHome /> },
    { label: "Employees", path: "/employee-profiles", icon: <FiUsers /> },
    { label: "Leave Requests", path: "/leave-requests", icon: <FiCalendar /> },
    { label: "Onboarding", path: "/onboarding", icon: <FiUserPlus /> }
  ];

  const employeeLinks = [
    { label: "Dashboard", path: "/employee-dashboard", icon: <FiHome /> },
    { label: "My Leave", path: "/leave-requests", icon: <FiCalendar /> }
  ];

  const links = currentUser?.role === "hr" ? hrLinks : employeeLinks;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div>
          <div className="sidebar-top">
            <h2>HR Portal</h2>
            <p>{currentUser?.role === "hr" ? "HR Panel" : "Employee Panel"}</p>
          </div>

          <nav className="sidebar-nav">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`sidebar-link ${
                  location.pathname === link.path ? "active-link" : ""
                }`}
              >
                <span className="sidebar-icon">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="logout-btn sidebar-logout" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h3>Welcome, {currentUser?.name}</h3>
            <p className="topbar-subtitle">
              {currentUser?.role === "hr"
                ? "Manage employees and HR services"
                : "Access your employee services"}
            </p>
          </div>
        </header>

        <section className="content-area">{children}</section>
      </main>
    </div>
  );
}

export default DashboardLayout;