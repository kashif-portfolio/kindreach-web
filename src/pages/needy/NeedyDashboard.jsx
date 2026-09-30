import React from "react";
import { Link } from "react-router-dom";
import {
    Package,
    ClipboardList,
    TrendingUp,
    ChevronRight,
    Utensils,
    Shirt,
    CheckCircle,
    Clock,
    MessageSquare,
    Search,
    User
} from 'lucide-react';

export default function NeedyDashboard() {
    return (
        <div className="w-full px-8 py-4 flex flex-col gap-6">

            {/* Header & Title */}
            <div className="flex flex-col">
                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    Dashboard
                </h1>
                <p className="text-[14px] text-text-muted">
                    Welcome back, Fatima Bibi
                </p>
            </div>

            {/* Account Verification Banner */}
            <div className="w-full bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                <div className="w-9 h-9 bg-[#D1FAE5] rounded-xl flex items-center justify-center text-[#009966] shrink-0">
                    <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-900">Account Verified</span>
                    <span className="text-[13px] text-slate-600">Your account is verified. You can browse and request available donations.</span>
                </div>
            </div>

            {/* Top 4 Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Card-1: My Requests */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            My Requests
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#009966]">
                            <ClipboardList className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            3
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] mt-1">
                            <span>- All time</span>
                        </div>
                    </div>
                </div>

                {/* Card-2: Pending */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            Pending
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#FFFBEB] rounded-xl flex items-center justify-center text-[#E17100]">
                            <Clock className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            1
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#E17100] mt-1">
                            <span>- Awaiting response</span>
                        </div>
                    </div>
                </div>

                {/* Card-3: Accepted */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            Accepted
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#009966]">
                            <CheckCircle className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            1
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#009966] mt-1">
                            <span>- In progress</span>
                        </div>
                    </div>
                </div>

                {/* Card-4: Received */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            Received
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#155DFC]">
                            <TrendingUp className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            1
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] mt-1">
                            <span>- Delivered</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Grid: Left & Right sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">

                {/* LEFT SIDE: My Recent Requests & New Donations Available */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Box 1: My Recent Requests */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">My Recent Requests</h3>
                            <Link
                                to="/needy/requests"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] transition-colors"
                            >
                                <span>View all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex flex-col">
                            {/* Request Row 1 */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-[#E17100]">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Atta (25 kg bags)</h4>
                                        <p className="text-[12px] text-text-muted">From: Ahmed Khan · 2024-03-11</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#FFFBEB] border border-[#FEF3C7] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#FE9A00]"></span>
                                    <span className="text-[12px] font-semibold text-[#BB4D00]">Pending</span>
                                </div>
                            </div>

                            {/* Request Row 2 */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-[#E17100]">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Cooking Oil and Sugar</h4>
                                        <p className="text-[12px] text-text-muted">From: Sara Malik · 2024-03-09</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#009966]"></span>
                                    <span className="text-[12px] font-medium text-[#009966]">Accepted</span>
                                </div>
                            </div>

                            {/* Request Row 3 */}
                            <div className="px-6 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#EFF6FF] rounded-[12px] flex items-center justify-center text-[#155DFC]">
                                        <Shirt className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Adult Clothing Set</h4>
                                        <p className="text-[12px] text-text-muted">From: Ahmed Khan · 2024-03-01</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#009966]"></span>
                                    <span className="text-[12px] font-medium text-[#009966]">Delivered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Box 2: New Donations Available */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">New Donations Available</h3>
                            <Link
                                to="/needy/browse-donations"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] transition-colors"
                            >
                                <span>Browse all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex flex-col">
                            {/* Available Item 1 */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-[#E17100]">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Atta (25 kg bags)</h4>
                                        <p className="text-[12px] text-text-muted">5 bags · Lahore, Gulberg</p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-[#009689] hover:bg-[#007b70] text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer">
                                    Request
                                </button>
                            </div>

                            {/* Available Item 2 */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#EFF6FF] rounded-[12px] flex items-center justify-center text-[#155DFC]">
                                        <Shirt className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Children's Clothing (ages 5–10)</h4>
                                        <p className="text-[12px] text-text-muted">20 items · Islamabad, F-7</p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-[#009689] hover:bg-[#007b70] text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer">
                                    Request
                                </button>
                            </div>

                            {/* Available Item 3 */}
                            <div className="px-6 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-[#E17100]">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Cooking Oil and Sugar (5 kg each)</h4>
                                        <p className="text-[12px] text-text-muted">10 items · Karachi, Clifton</p>
                                    </div>
                                </div>
                                <button className="px-4 py-1.5 bg-[#009689] hover:bg-[#007b70] text-white text-[13px] font-semibold rounded-lg transition-colors cursor-pointer">
                                    Request
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE: Quick Actions Panel */}
                <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-5 flex flex-col gap-3 h-fit">
                    <h3 className="text-[15px] font-bold text-slate-900 mb-1">Quick Actions</h3>

                    {/* Button 1: Browse Donations (Primary Filled) */}
                    <Link
                        to="/needy/browse-donations"
                        className="w-full px-4 py-3 bg-[#009689] hover:bg-[#007b70] text-white text-[14px] font-semibold rounded-xl flex items-center justify-between transition-colors shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Search className="w-5 h-5" />
                            <span>Browse Donations</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                    </Link>

                    {/* Button 2: My Profile */}
                    <Link
                        to="/needy/profile"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#009689]">
                            <User className="w-5 h-5" />
                            <span className="text-slate-800">My Profile</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    {/* Button 3: Track Requests */}
                    <Link
                        to="/needy/requests"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#E17100]">
                            <ClipboardList className="w-5 h-5" />
                            <span className="text-slate-800">Track Requests</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    {/* Button 4: Give Feedback */}
                    <Link
                        to="/needy/feedback"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#155DFC]">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-slate-800">Give Feedback</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                </div>

            </div>
        </div>
    );
}