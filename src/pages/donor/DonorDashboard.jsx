import React from "react";
import { Link } from "react-router-dom";
import {
    Package,
    ArrowUpRight,
    ClipboardList,
    TrendingUp,
    Heart,
    TrendingDown,
    ChevronRight,
    Utensils,
    Shirt,
    CreditCard,
    CheckCircle,
    XCircle,
    Clock,
    MessageSquare,
    Plus
} from 'lucide-react';

export default function DonorDashboard() {
    return (
        <div className="w-full px-8 py-4 flex flex-col gap-6">
            <div className="flex flex-col">
                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    Donor Dashboard
                </h1>
                <p className="text-[14px] text-text-muted">
                    Welcome back, Ahmed Khan
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Card-1 */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            My Donations
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#009966]">
                            <Package className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            12
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#009966] mt-1">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            <span>+4 this month</span>
                        </div>
                    </div>
                </div>

                {/* Card-2 */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            Pending Requests
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#FFFBEB] rounded-xl flex items-center justify-center text-[#E17100]">
                            <ClipboardList className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            8
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#FB2C36] mt-1">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>Needs your action</span>
                        </div>
                    </div>
                </div>

                {/* Card-3 */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            Delivered
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#009966]">
                            <TrendingUp className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            9
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] mt-1">
                            <span>- All the time</span>
                        </div>
                    </div>
                </div>

                {/* Card-4 */}
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wide">
                            People Helped
                        </span>
                        <div className="w-8.5 h-8.5 bg-[#FFF1F2] rounded-xl flex items-center justify-center text-[#FF2056]">
                            <Heart className="w-4.5 h-4.5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[26px] font-bold text-slate-900 leading-none">
                            7
                        </h2>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] mt-1">
                            <span>- Unique recipients</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Grid: Left aur Right sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">

                {/* LEFT SIDE: Recent Donations & Incoming Requests */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Box 1: Recent Donations */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">Recent Donations</h3>
                            <Link
                                to="/all-donations"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] transition-colors cursor-pointer"
                            >
                                <span>View all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Items Container */}
                        <div className="flex flex-col">
                            {/* Item Row 1: Atta */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-urgent">
                                        <Utensils className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Atta (25 kg bags)</h4>
                                        <p className="text-[12px] text-text-muted">5 bags · Lahore · 2024-03-10</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-[12px] font-medium text-primary">Available</span>
                                </div>
                            </div>

                            {/* Item Row 2: Clothes */}
                            <div className="px-6 py-3.5 flex items-center justify-between border-b border-slate-100">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#EFF6FF] rounded-[12px] flex items-center justify-center text-[#155DFC]">
                                        <Shirt className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Children's Clothing (ages 5-10)</h4>
                                        <p className="text-[12px] text-text-muted">20 items · Lahore · 2024-03-05</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                                    <span className="text-[12px] font-medium text-primary">Available</span>
                                </div>
                            </div>

                            {/* Item Row 3: Fund */}
                            <div className="px-6 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10.5 h-10.5 bg-[#ECFDF5] rounded-[12px] flex items-center justify-center text-[#009966]">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="text-[14px] font-bold text-slate-900">Monthly Support Fund</h4>
                                        <p className="text-[12px] text-text-muted">PKR 5,000 · Lahore · 2024-02-28</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-[#FFFBEB] border border-[#FEF3C7] rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#FE9A00]"></span>
                                    <span className="text-[12px] font-semibold text-[#BB4D00]">Approved</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Box 2: Incoming Requests */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">Incoming Requests</h3>
                            <Link
                                to="/all-requests"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] transition-colors cursor-pointer"
                            >
                                <span>View all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Requests Container */}
                        <div className="flex flex-col">
                            {/* Row-1: Fatima Bibi */}
                            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-[14px] text-slate-800">
                                        <span className="font-bold text-slate-900">Fatima Bibi</span> is requesting <span className="font-semibold text-[#009689]">Atta (25 kg bags)</span>
                                    </p>
                                    <span className="text-[12px] text-slate-400">2024-03-11</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3.5 py-1.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#009966] text-[13px] font-semibold rounded-lg border border-[#A7F3D0] transition-colors flex items-center gap-1.5">
                                        <CheckCircle className="w-4 h-4 text-[#009966]" />
                                        <span>Accept</span>
                                    </button>
                                    <button className="px-3.5 py-1.5 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#FF2056] text-[13px] font-semibold rounded-lg border border-[#FECDD3] transition-colors flex items-center gap-1.5">
                                        <XCircle className="w-4 h-4 text-[#FF2056]" />
                                        <span>Decline</span>
                                    </button>
                                </div>
                            </div>

                            {/* Row-2: Muhammad Ramzan */}
                            <div className="px-6 py-4 flex items-center justify-between">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-[14px] text-slate-800">
                                        <span className="font-bold text-slate-900">Muhammad Ramzan</span> is requesting <span className="font-semibold text-[#009689]">Children's Clothing</span>
                                    </p>
                                    <span className="text-[12px] text-slate-400">2024-03-11</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3.5 py-1.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#009966] text-[13px] font-semibold rounded-lg border border-[#A7F3D0] transition-colors flex items-center gap-1.5">
                                        <CheckCircle className="w-4 h-4 text-[#009966]" />
                                        <span>Accept</span>
                                    </button>
                                    <button className="px-3.5 py-1.5 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#FF2056] text-[13px] font-semibold rounded-lg border border-[#FECDD3] transition-colors flex items-center gap-1.5">
                                        <XCircle className="w-4 h-4 text-[#FF2056]" />
                                        <span>Decline</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE: Quick Actions Panel */}
                <div className="bg-white rounded-2xl border border-border-subtle shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md p-5 flex flex-col gap-3">
                    <h3 className="text-[15px] font-bold text-slate-900 mb-1">Quick Actions</h3>
                    {/* Button 1: Add New Donation (Primary Green Filled) */}
                    <Link
                        to="/add-donation"
                        className="w-full px-4 py-3 bg-[#009689] hover:bg-[#007b70] text-white text-[14px] font-semibold rounded-xl flex items-center justify-between transition-colors shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Plus className="w-5 h-5" />
                            <span>Add New Donation</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                    </Link>

                    {/* Button 2: View My Donations */}
                    <Link
                        to="/my-donations"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#009689]">
                            <Package className="w-5 h-5" />
                            <span className="text-slate-800">View My Donations</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    {/* Button 3: Check Requests */}
                    <Link
                        to="/requests"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#E17100]">
                            <ClipboardList className="w-5 h-5" />
                            <span className="text-slate-800">Check Requests</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    {/* Button 4: Donation History */}
                    <Link
                        to="/history"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                    >
                        <div className="flex items-center gap-3 text-[#009689]">
                            <Clock className="w-5 h-5" />
                            <span className="text-slate-800">Donation History</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    {/* Button 5: Give Feedback */}
                    <Link
                        to="/feedback"
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