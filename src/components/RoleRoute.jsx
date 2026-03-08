import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

function RoleRoute({ children, allowedRole }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;