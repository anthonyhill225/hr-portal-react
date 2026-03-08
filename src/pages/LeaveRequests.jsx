import { useState } from "react";
import {
  getCurrentUser,
  getLeaveRequests,
  setLeaveRequests
} from "../utils/storage";

function LeaveRequests() {
  const currentUser = getCurrentUser();
  const isHR = currentUser?.role === "hr";

  const [requests, setRequests] = useState(getLeaveRequests());
  const [formData, setFormData] = useState({
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      employeeName: currentUser.name,
      employeeEmail: currentUser.email,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: "Pending"
    };

    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    setLeaveRequests(updatedRequests);

    setFormData({
      leaveType: "Annual Leave",
      startDate: "",
      endDate: "",
      reason: ""
    });
  };

  const updateStatus = (id, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );

    setRequests(updatedRequests);
    setLeaveRequests(updatedRequests);
  };

  const displayedRequests = isHR
    ? requests
    : requests.filter((request) => request.employeeEmail === currentUser.email);

  return (
    <div className="page">
      <h1>Leave Requests</h1>

      {!isHR && (
        <div className="card form-card">
          <h3>Submit Leave Request</h3>
          <form onSubmit={handleSubmit} className="form">
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Emergency Leave</option>
              <option>Unpaid Leave</option>
            </select>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />

            <textarea
              name="reason"
              placeholder="Reason for leave"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <button type="submit" className="primary-btn">
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
              {isHR && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayedRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employeeName}</td>
                <td>{request.leaveType}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                {isHR && (
                  <td>
                    <div className="action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => updateStatus(request.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequests;