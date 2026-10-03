import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts imports
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from "../layouts/DashboardLayout";

// Authentication screens
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOTP";
import PasswordSuccess from "../pages/auth/PasswordSuccess";
import ResetPassword from "../pages/auth/ResetPassword";
import SignUp from "../pages/auth/SignUp";

// Donor portal screens
import DonorDashboard from "../pages/donor/DonorDashboard";
import PostDonation from "../pages/donor/AddDonation";
import MyDonations from "../pages/donor/MyDonations";
import DonationRequests from "../pages/donor/DonationRequests";
import DonationHistory from "../pages/donor/DonationHistory";
import Feedback from "../pages/donor/Feedback";
import MyProfile from "../pages/donor/DonorProfile";

// Needy person portal screens
import NeedyDashboard from "../pages/needy/NeedyDashboard";
import BrowseDonations from "../pages/needy/BrowseDonations";
import NeedyRequests from "../pages/needy/MyRequests";
import NeedyFeedback from "../pages/needy/NeedyFeedback";
import NeedyProfile from "../pages/needy/NeedyProfile";

// Admin portal screens
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageDonors from "../pages/admin/ManageDonors";
import ManageNeedy from "../pages/admin/ManageNeedy";
import DonationTypes from "../pages/admin/DonationTypes";
// import AdminDonationRequests from "../pages/admin/AdminDonationRequests";
// import MonitorDonations from "../pages/admin/MonitorDonations";
// import GenerateReports from "../pages/admin/GenerateReports";
// import SendNotifications from "../pages/admin/SendNotifications";
// import ResolveComplaints from "../pages/admin/ResolveComplaints";
// import AdminProfileSettings from "../pages/admin/AdminProfileSettings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root URL to donor dashboard by default */}
      <Route path="/" element={<Navigate to="/donor" replace />} />

      {/* 1. Authentication routes group wrapped inside AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="password-success" element={<PasswordSuccess />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* 2. Donor portal routes group wrapped inside DashboardLayout */}
      <Route path="/donor" element={<DashboardLayout />}>
        <Route index element={<DonorDashboard />} />
        <Route path="add-donation" element={<PostDonation />} />
        <Route path="my-donations" element={<MyDonations />} />
        <Route path="donation-requests" element={<DonationRequests />} />
        <Route path="history" element={<DonationHistory />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<MyProfile />} />
      </Route>

      {/* 3. Needy person portal routes group wrapped inside DashboardLayout */}
      <Route path="/needy" element={<DashboardLayout />}>
        <Route index element={<NeedyDashboard />} />
        <Route path="browse-donations" element={<BrowseDonations />} />
        <Route path="requests" element={<NeedyRequests />} />
        <Route path="feedback" element={<NeedyFeedback />} />
        <Route path="profile" element={<NeedyProfile />} />
      </Route>

      {/* 4. Admin portal routes group wrapped inside DashboardLayout */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="manage-donors" element={<ManageDonors />} />
        <Route path="manage-needy" element={<ManageNeedy />} />
        <Route path="donation-types" element={<DonationTypes />} />
        {/* <Route path="donation-requests" element={<AdminDonationRequests />} />
        <Route path="monitor-donations" element={<MonitorDonations />} />
        <Route path="generate-reports" element={<GenerateReports />} />
        <Route path="send-notifications" element={<SendNotifications />} />
        <Route path="resolve-complaints" element={<ResolveComplaints />} />
        <Route path="profile" element={<AdminProfileSettings />} /> */}
      </Route>

      {/* Fallback route for any unknown URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}