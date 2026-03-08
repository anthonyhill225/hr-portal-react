import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, setUsers } from "../utils/storage";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });
  const [message, setMessage] = useState("");
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

    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setMessage("User already exists with this email.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...formData
    };

    setUsers([...users, newUser]);
    setMessage("Account created successfully.");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="page auth-page">
      <div className="card form-card">
        <h1>Signup</h1>
        <p>Create a new portal account.</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
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

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>

          {message && <p className="success-text">{message}</p>}

          <button type="submit" className="primary-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;