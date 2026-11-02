import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allow }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = String(user.role || "").toLowerCase();

  if (allow && allow.length > 0 && !allow.includes(role)) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "donor") return <Navigate to="/donor" replace />;
    if (role === "needy") return <Navigate to="/needy" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}