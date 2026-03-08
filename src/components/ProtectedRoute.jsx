import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

function ProtectedRoute({ children }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;