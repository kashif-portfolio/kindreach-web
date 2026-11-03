import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../services/authService";

export default function ProtectedRoute({ children, allow }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const checkLogin = async () => {
      try {
        // localStorage is only a display cache. PHP decides who is logged in.
        const result = await getSession();
        if (active && result.status === "success") {
          localStorage.setItem("user", JSON.stringify(result.data));
          setUser(result.data);
        }
      } catch (err) {
        if (active) {
          if (err.response?.status === 401) {
            localStorage.removeItem("user");
          } else {
            setError("Unable to check login. Please refresh and try again.");
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    checkLogin();
    return () => { active = false; };
  }, []);

  if (loading) return <p>Checking login...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <Navigate to="/login" replace />;

  const role = String(user.role || "").toLowerCase();
  if (allow && !allow.includes(role)) {
    if (["admin", "donor", "needy"].includes(role)) {
      return <Navigate to={`/${role}`} replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}
