import { getCurrentUser, getEmployees, getLeaveRequests } from "../utils/storage";

function EmployeeDashboard() {
  const currentUser = getCurrentUser();
  const employees = getEmployees();
  const leaveRequests = getLeaveRequests();

  const profile = employees.find(
    (employee) => employee.email === currentUser?.email
  );

  const myRequests = leaveRequests.filter(
    (request) => request.employeeEmail === currentUser?.email
  );

  const approvedCount = myRequests.filter(
    (request) => request.status === "Approved"
  ).length;

  const pendingCount = myRequests.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Employee Dashboard</h1>
        <p>Manage your profile and track leave requests.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <span className="stat-label">My Requests</span>
          <p>{myRequests.length}</p>
        </div>

        <div className="card stat-card">
          <span className="stat-label">Approved</span>
          <p>{approvedCount}</p>
        </div>

        <div className="card stat-card">
          <span className="stat-label">Pending</span>
          <p>{pendingCount}</p>
        </div>
      </div>

      <div className="profile-card-grid">
        <div className="card">
          <h3>My Profile</h3>
          <div className="info-list">
            <p><strong>Name:</strong> {profile?.fullName || currentUser?.name}</p>
            <p><strong>Email:</strong> {profile?.email || currentUser?.email}</p>
            <p><strong>Department:</strong> {profile?.department || "Not set"}</p>
            <p><strong>Position:</strong> {profile?.position || "Not set"}</p>
            <p><strong>Phone:</strong> {profile?.phone || "Not set"}</p>
            <p><strong>Address:</strong> {profile?.address || "Not set"}</p>
          </div>
        </div>

        <div className="card">
          <h3>Quick Summary</h3>
          <div className="info-list">
            <p>You can submit new leave requests from the leave page.</p>
            <p>Track approvals and rejections in real time.</p>
            <p>Your HR details are stored in the portal for easy access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;