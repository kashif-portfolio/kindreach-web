import React, { useState, useEffect } from "react";
import { updateProfile, changePassword } from "../../services/authService";
import {
  Edit3,
  Camera,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    physicalAddress: "",
    idType: "CNIC",
    idNumber: "—",
    totalDonations: 0,
    memberSince: "—",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load profile from localStorage (set at login)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.userID) return;

    setProfileData({
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      physicalAddress: user.address || "",
      idType: "CNIC",
      idNumber: "—",
      totalDonations: 0,
      memberSince: "—",
    });
  }, []);

  const initials = (profileData.fullName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile to database + localStorage
  const handleSave = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.userID) {
      alert("Please login again");
      return;
    }

    try {
      const result = await updateProfile({
        userID: user.userID,
        name: profileData.fullName,
        phone: profileData.phone,
        address: profileData.physicalAddress,
      });

      if (result.status === "success") {
        const updated = {
          ...user,
          name: profileData.fullName,
          phone: profileData.phone,
          address: profileData.physicalAddress,
        };
        localStorage.setItem("user", JSON.stringify(updated));
        setIsEditing(false);
        alert("Profile updated successfully");
      } else {
        alert(result.message || "Failed to update");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Change password in database
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!passwords.currentPassword || !passwords.newPassword) {
      alert("Please fill current and new password");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.userID) {
      alert("Please login again");
      return;
    }

    try {
      const result = await changePassword({
        userID: user.userID,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      if (result.status === "success") {
        alert("Password changed successfully");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(result.message || "Failed to change password");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-slate-900">My Profile</h1>
          <p className="text-[12px] text-slate-500">Manage your personal information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT: Summary */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-[#009689] flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md relative group">
            {initials}
            {isEditing && (
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-5 h-5" />
              </label>
            )}
          </div>

          <h2 className="text-[16px] font-bold text-slate-900">{profileData.fullName}</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{profileData.email}</p>

          <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-semibold text-[#009689]">
            <CheckCircle2 className="w-3 h-3" />
            Approved Donor
          </div>

          <div className="w-full border-t border-slate-100 mt-4 pt-4 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">Total donations</span>
              <span className="font-bold text-slate-900">{profileData.totalDonations}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">Member since</span>
              <span className="font-bold text-slate-900">{profileData.memberSince}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-[14px] font-bold text-slate-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#009689] text-[11px] font-semibold text-white hover:bg-[#007d72] cursor-pointer shadow-sm"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
                  <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Email Address</label>
                  <input type="email" name="email" value={profileData.email} disabled className="p-2 rounded-lg border border-slate-200 text-[12px] bg-slate-50 text-slate-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Phone Number</label>
                  <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Physical Address</label>
                  <input type="text" name="physicalAddress" value={profileData.physicalAddress} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">ID Type</label>
                  <input type="text" name="idType" value={profileData.idType} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">ID Number</label>
                  <input type="text" name="idNumber" value={profileData.idNumber} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
              </form>
            ) : (
              <div className="flex flex-col divide-y divide-slate-100 text-[12px]">
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">Full Name</span><span className="font-semibold text-slate-800">{profileData.fullName}</span></div>
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">Email Address</span><span className="font-semibold text-slate-800">{profileData.email}</span></div>
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">Phone Number</span><span className="font-semibold text-slate-800">{profileData.phone}</span></div>
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">Physical Address</span><span className="font-semibold text-slate-800">{profileData.physicalAddress}</span></div>
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">ID Type</span><span className="font-semibold text-slate-800">{profileData.idType}</span></div>
                <div className="py-2.5 flex justify-between items-center"><span className="text-slate-500">ID Number</span><span className="font-semibold text-slate-800">{profileData.idNumber}</span></div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="text-[14px] font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Change Password</h3>

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-600">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-slate-200 p-2 text-[12px] text-slate-800 focus:outline-none focus:border-[#009689]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Min. 6 characters"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-slate-200 p-2 text-[12px] text-slate-800 focus:outline-none focus:border-[#009689]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-slate-200 p-2 text-[12px] text-slate-800 focus:outline-none focus:border-[#009689]"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#009689] text-[12px] font-semibold text-white hover:bg-[#007d72] shadow-sm cursor-pointer transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}