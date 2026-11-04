import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  // Page ki states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Input ki value update karo.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-110 mx-auto px-6 py-12 flex flex-col">
      {/* Page ka title */}
      <h2 className="text-[24px] font-bold text-slate-900 text-center mt-6">Set New Password</h2>

      {/* Title ke neeche ka text */}
      <p className="text-[14px] text-text-muted text-center mt-1.5 mb-7">
        Choose a strong password to secure your KindReach account.
      </p>

      {/* Form ka container */}
      <div className="w-full flex flex-col gap-5">
        {/* Naya password */}
        <div className="flex flex-col">
          <label className="text-[14px] font-medium text-slate-900 mb-1.5">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className="w-full h-12 px-4 pr-12 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-slate-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Password dobara likhein. */}
        <div className="flex flex-col">
          <label className="text-[14px] font-medium text-slate-900 mb-1.5">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="w-full h-12 px-4 pr-12 bg-white border border-[#CBD5E1] rounded-xl text-[14px] text-slate-900 placeholder:text-[#94A3B8] focus:outline-none focus:border-[#009689] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-slate-700"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Password reset ka button */}
        <div className="mt-2">
          <Link
            to="/password-success"
            className="w-full h-12 bg-[#009689] hover:bg-[#007F75] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center"
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
}
