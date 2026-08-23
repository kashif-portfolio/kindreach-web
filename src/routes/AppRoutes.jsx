import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AuthLayout from '../layouts/AuthLayout';

// Placeholder Auth Components (Jab hum Login.jsx vagaira banayein ge toh inko real components se replace kar dein ge)
const Login = () => <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-2xl font-bold mb-4">Login Page</h2></div>;
const SignUp = () => <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"><h2 className="text-2xl font-bold mb-4">SignUp Page</h2></div>;

export default function AppRoutes() {
  return (
    <Routes>
      {/* Direct root path to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Wrapper Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}