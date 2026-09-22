import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOTP";
import PasswordSuccess from "../pages/auth/PasswordSuccess";
import ResetPassword from "../pages/auth/ResetPassword";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<Navigate to={"/login"} replace />}>
      </Route>
    </Routes>
  );
}