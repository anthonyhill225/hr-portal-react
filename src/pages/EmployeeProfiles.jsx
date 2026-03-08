import { useState } from "react";
import { getEmployees, setEmployees } from "../utils/storage";

function EmployeeProfiles() {

  const [employees, setEmployeeState] = useState(getEmployees());

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const deleteEmployee = (id) => {

    const updated = employees.filter(emp => emp.id !== id);

    setEmployeeState(updated);
    setEmployees(updated);

  };

  const startEdit = (employee) => {

    setEditingId(employee.id);
    setEditData(employee);

  };

  const saveEdit = () => {

    const updated = employees.map(emp =>
      emp.id === editingId ? editData : emp
    );

    setEmployeeState(updated);
    setEmployees(updated);
    setEditingId(null);

  };

  const cancelEdit = () => {

    setEditingId(null);
    setEditData({});

  };

  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });

  };

  const filteredEmployees = employees.filter(emp => {

    const searchMatch =
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const departmentMatch =
      departmentFilter === "" || emp.department === departmentFilter;

    const positionMatch =
      positionFilter === "" || emp.position === positionFilter;

    return searchMatch && departmentMatch && positionMatch;

  });

  const departments = [...new Set(employees.map(emp => emp.department))];
  const positions = [...new Set(employees.map(emp => emp.position))];

  return (

    <div className="dashboard-page">

      <div className="page-header">
        <h1>Employee Profiles</h1>
        <p>Search and manage employee records.</p>
      </div>

      <div className="card filter-card">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep}>{dep}</option>
          ))}
        </select>

        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        >
          <option value="">All Positions</option>
          {positions.map(pos => (
            <option key={pos}>{pos}</option>
          ))}
        </select>

      </div>

      <div className="table-wrapper">

        <table className="data-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredEmployees.map(employee => (

              <tr key={employee.id}>

                {editingId === employee.id ? (

                  <>
                    <td>
                      <input
                        name="fullName"
                        value={editData.fullName}
                        onChange={handleChange}
                      />
                    </td>

                    <td>{employee.email}</td>

                    <td>
                      <input
                        name="department"
                        value={editData.department}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        name="position"
                        value={editData.position}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                      />
                    </td>

                    <td>
                      <input
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                      />
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button className="approve-btn" onClick={saveEdit}>
                          Save
                        </button>

                        <button className="secondary-btn" onClick={cancelEdit}>
                          Cancel
                        </button>

                      </div>

                    </td>
                  </>

                ) : (

                  <>
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.address}</td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="primary-btn small-btn"
                          onClick={() => startEdit(employee)}
                        >
                          Edit
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </td>
                  </>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default EmployeeProfiles;