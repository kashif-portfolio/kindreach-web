import React, { useState } from "react";
import { User, Shield, Bell, Edit3, Lock, CheckCircle2, LogOut, Camera } from "lucide-react";

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'security' | 'notifications'
    const [isEditing, setIsEditing] = useState(false);

    // Profile Form State
    const [profileData, setProfileData] = useState({
        fullName: "Admin User",
        designation: "System Administrator",
        email: "admin@jindreach.pk",
        phone: "+92 300 000 0000",
        organization: "KindReach Pakistan",
        officeAddress: "Gulberg III, Lahore, Punjab",
        role: "Administrator",
        status: "Active",
        memberSince: "January 2024"
    });

    // Security State (Password)
    const [securityData, setSecurityData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Notification Toggles State
    const [notifications, setNotifications] = useState({
        newDonorReg: true,
        newNeedyApp: true,
        newDonationReq: true,
        complaintReceived: true,
        donationDelivered: false,
        weeklySummary: true
    });

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (securityData.newPassword !== securityData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
        setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Profile & Settings
                </h1>
                <p className="text-[13px] text-slate-500">
                    Manage your account, security, and alert preferences
                </p>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-12 gap-6 items-start">

                {/* Left Column: Fixed Profile Card */}
                <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col items-center text-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-[#009689] flex items-center justify-center text-white text-[28px] font-bold shadow-md">
                            AU
                        </div>
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

                    <button className="w-full mt-2 h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[12px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <LogOut className="w-3.5 h-3.5 text-slate-400" />
                        Logout
                    </button>
                </div>

                {/* Right Column: Dynamic Tabs Content */}
                <div className="col-span-8 flex flex-col gap-6">

                    {/* Navigation Tabs Header */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 flex items-center gap-2 shadow-xs">
                        <button
                            onClick={() => { setActiveTab("profile"); setIsEditing(false); }}
                            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "profile" ? "bg-emerald-50/70 text-emerald-700 border border-emerald-200/50 shadow-2xs" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("security")}
                            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "security" ? "bg-emerald-50/70 text-emerald-700 border border-emerald-200/50 shadow-2xs" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Shield className="w-4 h-4" />
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "notifications" ? "bg-emerald-50/70 text-emerald-700 border border-emerald-200/50 shadow-2xs" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Bell className="w-4 h-4" />
                            Notifications
                        </button>
                    </div>

                    {/* TAB 1: PROFILE / EDIT PROFILE */}
                    {activeTab === "profile" && (
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[15px] font-bold text-slate-900">Account Information</h3>
                                        <p className="text-[12px] text-slate-500">Basic contact details used for your admin account</p>
                                    </div>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[12px] font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[12px] font-semibold text-slate-600 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveProfile}
                                                className="px-4 py-2 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[12px] font-semibold shadow-2xs cursor-pointer"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            disabled={!isEditing}
                                            value={profileData.fullName}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            disabled={!isEditing}
                                            value={profileData.designation}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            disabled={!isEditing}
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            disabled={!isEditing}
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Organization</label>
                                        <input
                                            type="text"
                                            name="organization"
                                            disabled={!isEditing}
                                            value={profileData.organization}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Office Address</label>
                                        <input
                                            type="text"
                                            name="officeAddress"
                                            disabled={!isEditing}
                                            value={profileData.officeAddress}
                                            onChange={handleProfileChange}
                                            className={`w-full h-11 px-3.5 rounded-xl text-[13px] border ${isEditing ? "bg-white border-slate-200 focus:border-[#009689] outline-none" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Account Overview Box */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
                                <div>
                                    <h3 className="text-[15px] font-bold text-slate-900">Account Overview</h3>
                                    <p className="text-[12px] text-slate-500">Administrator role and account status</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                        <span className="text-[11px] text-slate-400 font-medium">Role</span>
                                        <span className="text-[13px] font-bold text-slate-800">{profileData.role}</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                        <span className="text-[11px] text-slate-400 font-medium">Account Status</span>
                                        <span className="text-[13px] font-bold text-emerald-600">{profileData.status}</span>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                        <span className="text-[11px] text-slate-400 font-medium">Member Since</span>
                                        <span className="text-[13px] font-bold text-slate-800">{profileData.memberSince}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: SECURITY */}
                    {activeTab === "security" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-6">
                            <div>
                                <h3 className="text-[15px] font-bold text-slate-900">Change Password</h3>
                                <p className="text-[12px] text-slate-500">Use at least 8 characters for account security</p>
                            </div>

                            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[12px] font-semibold text-slate-700">Current Password *</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••••••"
                                        value={securityData.currentPassword}
                                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                        className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">New Password *</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••"
                                            value={securityData.newPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                            className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-semibold text-slate-700">Confirm New Password *</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••"
                                            value={securityData.confirmPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                            className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-[#009689]"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-fit px-5 h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer mt-2"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    )}

                    {/* TAB 3: NOTIFICATIONS PREFERENCES (Simple Version) */}
                    {activeTab === "notifications" && (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-6">
                            <div>
                                <h3 className="text-[15px] font-bold text-slate-900">Notification Preferences</h3>
                                <p className="text-[12px] text-slate-500">Choose which alerts you want to receive</p>
                            </div>

                            <div className="flex flex-col divide-y divide-slate-100">

                                {/* Helper function / reusable look for each toggle item */}
                                {[
                                    { key: "newDonorReg", title: "New Donor Registration", desc: "Alert when a donor creates an account" },
                                    { key: "newNeedyApp", title: "New Needy Person Application", desc: "Alert when someone applies for support" },
                                    { key: "newDonationReq", title: "New Donation Request", desc: "Alert when a needy person sends a request" },
                                    { key: "complaintReceived", title: "Complaint Received", desc: "Alert when a complaint is filed" },
                                    { key: "donationDelivered", title: "Donation Delivered", desc: "Alert when a donation is marked delivered" },
                                    { key: "weeklySummary", title: "Weekly Summary Report", desc: "Receive a weekly digest every Monday" },
                                ].map((item) => (
                                    <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                                        <div className="flex flex-col gap-0.5">
                                            <h4 className="text-[13px] font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-[12px] text-slate-500">{item.desc}</p>
                                        </div>

                                        {/* Simple Custom Toggle Switch */}
                                        <div
                                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${notifications[item.key] ? 'bg-[#009689]' : 'bg-slate-200'}`}
                                        >
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${notifications[item.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <button
                                onClick={() => alert("Preferences saved successfully!")}
                                className="w-fit px-5 h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer mt-2"
                            >
                                Save Preferences
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}