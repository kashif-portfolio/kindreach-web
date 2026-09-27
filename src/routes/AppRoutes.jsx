import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOTP";
import PasswordSuccess from "../pages/auth/PasswordSuccess";
import ResetPassword from "../pages/auth/ResetPassword";
import SignUp from "../pages/auth/SignUp";
import DonorDashboard from "../pages/donor/DonorDashboard";
import PostDonation from "../pages/donor/AddDonation";
import MyDonations from "../pages/donor/MyDonations";
import DonationRequests from "../pages/donor/DonationRequests";
import DonationHistory from "../pages/donor/DonationHistory";
import Feedback from "../pages/donor/Feedback";
import MyProfile from "../pages/donor/DonorProfile";

// Naya Dashboard Layout import kiya hai
import DashboardLayout from "../layouts/DashboardLayout";
// (Jab aap DonorDashboard ki file banayenge toh usko bhi yahan import karenge)

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root path par user ko login par redirect karne ke liye */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 1. Authentication Routes (Login, Signup, etc.) */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="password-success" element={<PasswordSuccess />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* 2. Dashboard Layout Route (Sidebar aur Topbar wala main shell) */}
      <Route path="/donor" element={<DashboardLayout />}>
        <Route index element={<DonorDashboard />} />
        <Route path="add-donation" element={<PostDonation />} />
        {/* My Donations route */}
        <Route path="my-donations" element={<MyDonations />} />
        {/* Donation Requests route (Yeh wali nayi screen) */}
        <Route path="donation-requests" element={<DonationRequests />} />
        <Route path="history" element={<DonationHistory />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<MyProfile />} />
      </Route>
      <Route path="/add-donation" element={<PostDonation />} />
      {/* Agar koi galat URL enter kare toh wapas login par bhej de */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}