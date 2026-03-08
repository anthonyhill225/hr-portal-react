import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, setCurrentUser } from "../utils/storage";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = getUsers();

    const foundUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    setCurrentUser(foundUser);

    if (foundUser.role === "hr") {
      navigate("/hr-dashboard");
    } else {
      navigate("/employee-dashboard");
    }

    window.location.reload();
  };

  return (
    <div className="page auth-page">
      <div className="card form-card">
        <h1>Login</h1>
        <p>Sign in to access your HR portal account.</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <div className="demo-box">
          <p><strong>HR Demo:</strong> hr@company.com / 123456</p>
          <p><strong>Employee Demo:</strong> employee@company.com / 123456</p>
        </div>
      </div>
    </div>
  );
}

export default Login;