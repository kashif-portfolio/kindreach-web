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
import NeedyDashboard from "../pages/needy/NeedyDashboard";
import BrowseDonations from "../pages/needy/BrowseDonations";
import NeedyRequests from "../pages/needy/MyRequests";
import NeedyFeedback from "../pages/needy/NeedyFeedback";

// Main layout for dashboard sidebar and topbar
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root URL (/) to the login page by default */}
      <Route path="/" element={<Navigate to="/donor" replace />} />

      {/* 1. Authentication Routes Group (Login, Signup, Recovery screens) wrapped inside AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="password-success" element={<PasswordSuccess />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* 2. Donor Dashboard Routes Group wrapped inside DashboardLayout (Sidebar/Topbar shell) */}
      <Route path="/donor" element={<DashboardLayout />}>
        {/* Default index route rendering the main donor dashboard */}
        <Route index element={<DonorDashboard />} />
        {/* Route for adding a new donation */}
        <Route path="add-donation" element={<PostDonation />} />
        {/* Route for viewing user's submitted donations */}
        <Route path="my-donations" element={<MyDonations />} />
        {/* Route for checking active donation requests */}
        <Route path="donation-requests" element={<DonationRequests />} />
        {/* Route for past donation history records */}
        <Route path="history" element={<DonationHistory />} />
        {/* Route for submitting and viewing feedback */}
        <Route path="feedback" element={<Feedback />} />
        {/* Route for managing donor profile details */}
        <Route path="profile" element={<MyProfile />} />
      </Route>



      {/* Needy Person Dashboard Routes Group */}
      <Route path="/needy" element={<DashboardLayout />}>
        <Route index element={<NeedyDashboard />} />
        <Route path="browse-donations" element={<BrowseDonations />} />
        <Route path="requests" element={<NeedyRequests />} />
        <Route path="feedback" element={<NeedyFeedback />} />
        {/* <Route path="profile" element={<NeedyProfile />} /> */}
      </Route>

      {/* Standalone route for add-donation outside nested dashboard if accessed directly */}
      <Route path="/add-donation" element={<PostDonation />} />

      {/* Catch-all route: redirects any invalid or unknown URL back to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}