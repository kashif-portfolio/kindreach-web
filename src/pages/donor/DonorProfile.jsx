import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Edit3, 
  Camera, 
  Save, 
  X,
  Lock,
  CheckCircle2
} from "lucide-react";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Profile Data State
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Khan",
    email: "ahmed@email.com",
    phone: "+92 300 123 4567",
    physicalAddress: "Gulberg III, Lahore",
    idType: "CNIC",
    idNumber: "35202-1234567-1",
    totalDonations: 12,
    memberSince: "Jan 2024"
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    alert("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="flex flex-col gap-4 pb-4 max-w-7xl mx-auto">
      {/* Page Header / Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-slate-900">My Profile</h1>
          <p className="text-[12px] text-slate-500">Manage your personal information</p>
        </div>
      </div>

      {/* Main Grid Layout (2 Columns like Figma) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: Profile Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-[#009689] flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md relative group">
            AK
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

        {/* RIGHT COLUMN: Personal Info & Password Section */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Personal Information Card */}
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

            {/* Details View or Form Inputs */}
            {isEditing ? (
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
                  <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold text-slate-600">Email Address</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleChange} className="p-2 rounded-lg border border-slate-200 text-[12px] focus:outline-none focus:border-[#009689]" />
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

          {/* Change Password Card */}
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