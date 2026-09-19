import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import Login from "../pages/auth/Login";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
      <Route path="*" element={<Navigate to={"/login"} replace/>}>
      </Route>
    </Routes>
  );
}