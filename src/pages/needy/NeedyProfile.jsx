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
    CheckCircle2
} from "lucide-react";

export default function NeedyProfile() {
    const [isEditing, setIsEditing] = useState(false);

    // Profile Data State for Needy Person
    const [profileData, setProfileData] = useState({
        fullName: "Fatima Bibi",
        email: "fatima@email.com",
        phone: "+92 305 678 9012",
        physicalAddress: "DHA Phase 2, Karachi",
        householdSize: "5 members",
        reason: "Unemployment",
        requestsMade: 3,
        memberSince: "Jan 2024"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            {/* Page Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[20px] font-bold text-slate-900">My Profile</h1>
                    <p className="text-[13px] text-slate-500">Manage your personal information</p>
                </div>
            </div>

            {/* Main Grid Layout (2 Columns like Figma) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN: Profile Summary Card */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-[#009689] flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-md relative group">
                        FB
                        {isEditing && (
                            <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6" />
                            </label>
                        )}
                    </div>

                    <h2 className="text-[18px] font-bold text-slate-900">{profileData.fullName}</h2>
                    <p className="text-[13px] text-slate-500 mt-0.5">{profileData.email}</p>

                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-[#009689]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                    </div>

                    <div className="w-full border-t border-slate-100 mt-6 pt-6 flex flex-col gap-4 text-left">
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-slate-500">Household size</span>
                            <span className="font-bold text-slate-900">{profileData.householdSize}</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-slate-500">Reason</span>
                            <span className="font-bold text-slate-900">{profileData.reason}</span>
                        </div>
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="text-slate-500">Requests made</span>
                            <span className="font-bold text-slate-900">{profileData.requestsMade}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Personal Information Section */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Personal Information Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-[15px] font-bold text-slate-900">Personal Information</h3>
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" /> Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#009689] text-[12px] font-semibold text-white hover:bg-[#007d72] cursor-pointer shadow-sm"
                                    >
                                        <Save className="w-3.5 h-3.5" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Details View or Form Inputs */}
                        {isEditing ? (
                            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Full Name *</label>
                                    <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#009689]" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Email Address *</label>
                                    <input type="email" name="email" value={profileData.email} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#009689]" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Phone Number *</label>
                                    <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#009689]" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Physical Address</label>
                                    <input type="text" name="physicalAddress" value={profileData.physicalAddress} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#009689]" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Household Size</label>
                                    <input type="text" name="householdSize" value={profileData.householdSize} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:border-[#009689]" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[12px] font-semibold text-slate-600">Reason for Assistance</label>
                                    <select name="reason" value={profileData.reason} onChange={handleChange} className="p-2.5 rounded-xl border border-slate-200 text-[13px] bg-white focus:outline-none focus:border-[#009689]">
                                        <option value="Unemployment">Unemployment</option>
                                        <option value="Medical Emergency">Medical Emergency</option>
                                        <option value="Education Support">Education Support</option>
                                        <option value="Financial Hardship">Financial Hardship</option>
                                    </select>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col divide-y divide-slate-100 text-[13px]">
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Full Name</span><span className="font-semibold text-slate-800">{profileData.fullName}</span></div>
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Email Address</span><span className="font-semibold text-slate-800">{profileData.email}</span></div>
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Phone Number</span><span className="font-semibold text-slate-800">{profileData.phone}</span></div>
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Physical Address</span><span className="font-semibold text-slate-800">{profileData.physicalAddress}</span></div>
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Household Size</span><span className="font-semibold text-slate-800">{profileData.householdSize}</span></div>
                                <div className="py-3 flex justify-between items-center"><span className="text-slate-500">Reason</span><span className="font-semibold text-slate-800">{profileData.reason}</span></div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}