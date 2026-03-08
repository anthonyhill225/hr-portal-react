import { getEmployees, getLeaveRequests, getOnboarding } from "../utils/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function HRDashboard() {
  const employees = getEmployees();
  const leaveRequests = getLeaveRequests();
  const onboarding = getOnboarding();

  const departments = {};

  employees.forEach((employee) => {
    departments[employee.department] = (departments[employee.department] || 0) + 1;
  });

  const chartData = Object.keys(departments).map((department) => ({
    department,
    employees: departments[department]
  }));

  const pendingLeaves = leaveRequests.filter(
    (request) => request.status === "Pending"
  ).length;

  const pendingOnboarding = onboarding.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>HR Dashboard</h1>
        <p>Overview of workforce activity and HR operations.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <span className="stat-label">Total Employees</span>
          <p>{employees.length}</p>
        </div>

        <div className="card stat-card">
          <span className="stat-label">Leave Requests</span>
          <p>{leaveRequests.length}</p>
        </div>

        <div className="card stat-card">
          <span className="stat-label">Pending Leave</span>
          <p>{pendingLeaves}</p>
        </div>

        <div className="card stat-card">
          <span className="stat-label">Pending Onboarding</span>
          <p>{pendingOnboarding}</p>
        </div>
      </div>

      <div className="card chart-card">
        <h3>Employees by Department</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="employees" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HRDashboard;