import { useState } from "react";
import { getEmployees, setEmployees, getUsers, setUsers } from "../utils/storage";

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    address: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employees = getEmployees();
    const users = getUsers();

    const emailExists = users.some((user) => user.email === formData.email);

    if (emailExists) {
      setMessage("An account with this email already exists.");
      return;
    }

    const newEmployee = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      department: formData.department,
      position: formData.position,
      phone: formData.phone,
      address: formData.address
    };

    const newUser = {
      id: Date.now() + 1,
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "employee"
    };

    setEmployees([...employees, newEmployee]);
    setUsers([...users, newUser]);

    setMessage("Employee registered successfully.");

    setFormData({
      fullName: "",
      email: "",
      department: "",
      position: "",
      phone: "",
      address: "",
      password: ""
    });
  };

  return (
    <div className="page auth-page">
      <div className="card form-card large-card">
        <h1>Employee Registration</h1>
        <p>Register a new employee with personal details.</p>

        <form onSubmit={handleSubmit} className="form grid-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
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
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {message && <p className="success-text full-width">{message}</p>}

          <button type="submit" className="primary-btn full-width">
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterEmployee;