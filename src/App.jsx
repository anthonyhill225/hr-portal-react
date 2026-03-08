import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterEmployee from "./pages/RegisterEmployee";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProfiles from "./pages/EmployeeProfiles";
import LeaveRequests from "./pages/LeaveRequests";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register-employee" element={<RegisterEmployee />} />

      <Route
        path="/hr-dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="hr">
              <DashboardLayout>
                <HRDashboard />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <DashboardLayout>
                <EmployeeDashboard />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee-profiles"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="hr">
              <DashboardLayout>
                <EmployeeProfiles />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave-requests"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <LeaveRequests />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="hr">
              <DashboardLayout>
                <Onboarding />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;