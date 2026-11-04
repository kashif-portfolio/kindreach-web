import React, { useState, useEffect } from "react";
import { User, Shield, Edit3 } from "lucide-react";
import { updateProfile, changePassword } from "../../services/authService";

export default function ProfileSettings() {
  // Page ki states
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [profileData, setProfileData] = useState({
    fullName: storedUser.name || "Admin User",
    designation: "System Administrator",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    organization: "KindReach Pakistan",
    officeAddress: storedUser.address || "",
    role: "Administrator",
    status: storedUser.status || "Active",
    memberSince: "January 2026",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Page ka data load aur update karo.
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    if (u.name || u.email) {
      setProfileData((prev) => ({
        ...prev,
        fullName: u.name || prev.fullName,
        email: u.email || prev.email,
        phone: u.phone || prev.phone,
        officeAddress: u.address || prev.officeAddress,
        status: u.status || prev.status,
      }));
    }
  }, []);

  // Page ke action handlers
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const userID = storedUser.userID || storedUser.id || storedUser.UserID;
    if (!userID) {
      alert("User ID not found. Please login again.");
      return;
    }

    setSaving(true);
    try {
      const result = await updateProfile({
        userID,
        name: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.officeAddress,
      });

      if (result.status === "success") {
        const updated = {
          ...storedUser,
          name: profileData.fullName,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.officeAddress,
        };
        localStorage.setItem("user", JSON.stringify(updated));
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (securityData.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const userID = storedUser.userID || storedUser.id || storedUser.UserID;
    if (!userID) {
      alert("User ID not found. Please login again.");
      return;
    }

    setPwdLoading(true);
    try {
      const result = await changePassword({
        userID,
        currentPassword: securityData.currentPassword,
        newPassword: securityData.newPassword,
      });

      if (result.status === "success") {
        alert("Password updated successfully!");
        setSecurityData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(result.message || "Failed to update password");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Profile & Settings</h1>
        <p className="text-[13px] text-slate-500">Manage your account and security</p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col items-center text-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#009689] flex items-center justify-center text-white text-[28px] font-bold shadow-md">
            {(profileData.fullName || "AU")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-bold text-slate-900">{profileData.fullName}</h3>
            <p className="text-[12px] text-slate-500">{profileData.designation}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Active Account
          </span>
          <div className="w-full border-t border-slate-100 pt-4 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">Organization</span>
              <span className="font-semibold text-slate-800">{profileData.organization}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">Member since</span>
              <span className="font-semibold text-slate-800">{profileData.memberSince}</span>
            </div>
          </div>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 flex items-center gap-2 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                setIsEditing(false);
              }}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-emerald-50/70 text-emerald-700 border border-emerald-200/50 shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "security"
                  ? "bg-emerald-50/70 text-emerald-700 border border-emerald-200/50 shadow-2xs"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Shield className="w-4 h-4" />
              Security
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900">Account Information</h3>
                    <p className="text-[12px] text-slate-500">
                      Basic contact details used for your admin account
                    </p>
                  </div>
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[12px] font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[12px] font-semibold text-slate-600 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-4 py-2 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[12px] font-semibold shadow-2xs cursor-pointer disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["fullName", "Full Name"],
                    ["designation", "Designation"],
                    ["email", "Email Address"],
                    ["phone", "Phone Number"],
                    ["organization", "Organization"],
                    ["officeAddress", "Office Address"],
                  ].map(([name, label]) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-semibold text-slate-700">{label}</label>
                      <input
                        type={name === "email" ? "email" : "text"}
                        name={name}
                        disabled={!isEditing}
                        value={profileData[name]}
                        onChange={handleProfileChange}
                        className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${
                          isEditing
                            ? "bg-white border-slate-200 focus:border-[#009689] outline-none"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">Account Overview</h3>
                  <p className="text-[12px] text-slate-500">
                    Administrator role and account status
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                    <span className="text-[11px] text-slate-400 font-medium">Role</span>
                    <span className="text-[13px] font-bold text-slate-800">{profileData.role}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                    <span className="text-[11px] text-slate-400 font-medium">Account Status</span>
                    <span className="text-[13px] font-bold text-emerald-600">
                      {profileData.status}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                    <span className="text-[11px] text-slate-400 font-medium">Member Since</span>
                    <span className="text-[13px] font-bold text-slate-800">
                      {profileData.memberSince}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-6">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">Change Password</h3>
                <p className="text-[12px] text-slate-500">
                  Use at least 6 characters for account security
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-slate-700">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-semibold text-slate-700">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-semibold text-slate-700">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="w-fit px-5 h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer mt-2 disabled:opacity-60"
                >
                  {pwdLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
