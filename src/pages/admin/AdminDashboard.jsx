import React from "react";
import { Link } from "react-router-dom";
import { 
    AlertTriangle, 
    Users, 
    Heart, 
    Package, 
    Clock, 
    ChevronRight, 
    FileText, 
    Send 
} from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">
            
            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-[13px] text-slate-500">
                    Platform overview and activity summary
                </p>
            </div>

            {/* Action Required Banner */}
            <div className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#FEF3C7] rounded-xl flex items-center justify-center text-urgent shrink-0 border border-[#FCD34D]/40">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-[14px] font-bold text-slate-900">Action Required</h3>
                        <p className="text-[13px] text-slate-600 mt-0.5">
                            2 donor accounts and 2 needy person applications are awaiting approval.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <Link 
                        to="/admin/manage-donors" 
                        className="px-4 py-2.5 bg-urgent  hover:bg-[#B45309] text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                        Review Donors
                    </Link>
                    <Link 
                        to="/admin/manage-needy" 
                        className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[13px] font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                        Review Needy
                    </Link>
                </div>
            </div>

            {/* 4 Summary Stat Cards */}
            <div className="grid grid-cols-4 gap-5">
                
                {/* Total Donors */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Donors</span>
                        <div className="w-10 h-10 bg-[#EFF6FF] text-[#155DFC] rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[28px] font-bold text-slate-900 leading-none">124</h2>
                        <span className="text-[12px] text-emerald-600 font-medium mt-2">+5 this month</span>
                    </div>
                </div>

                {/* Needy Persons */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Needy Persons</span>
                        <div className="w-10 h-10 bg-[#FFF1F2] text-[#E11D48] rounded-xl flex items-center justify-center">
                            <Heart className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[28px] font-bold text-slate-900 leading-none">87</h2>
                        <span className="text-[12px] text-emerald-600 font-medium mt-2">+3 this week</span>
                    </div>
                </div>

                {/* Active Donations */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Donations</span>
                        <div className="w-10 h-10 bg-[#ECFDF5] text-[#009966] rounded-xl flex items-center justify-center">
                            <Package className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[28px] font-bold text-slate-900 leading-none">56</h2>
                        <span className="text-[12px] text-slate-400 font-medium mt-2">~ 23 available</span>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Requests</span>
                        <div className="w-10 h-10 bg-[#FEF3C7] text-urgent rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h2 className="text-[28px] font-bold text-slate-900 leading-none">18</h2>
                        <span className="text-[12px] text-amber-600 font-medium mt-2">Needs attention</span>
                    </div>
                </div>

            </div>

            {/* Bottom Section: Recent Activity & Quick Actions */}
            <div className="grid grid-cols-3 gap-6">
                
                {/* Left: Recent Activity Feed (Takes 2 columns) */}
                <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h3 className="text-[15px] font-bold text-slate-900">Recent Activity</h3>
                        <span className="text-[12px] text-slate-400 font-medium">Live feed</span>
                    </div>

                    <div className="flex flex-col divide-y divide-slate-100">
                        
                        {/* Activity 1 */}
                        <div className="py-3.5 flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold text-slate-800">New donor registered</span>
                                    <span className="text-[12px] text-slate-500 mt-0.5">Sara Malik</span>
                                </div>
                            </div>
                            <span className="text-[12px] text-slate-400">5 min ago</span>
                        </div>

                        {/* Activity 2 */}
                        <div className="py-3.5 flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold text-slate-800">Donation request approved</span>
                                    <span className="text-[12px] text-slate-500 mt-0.5">Fatima Bibi → Ahmed Khan</span>
                                </div>
                            </div>
                            <span className="text-[12px] text-slate-400">23 min ago</span>
                        </div>

                        {/* Activity 3 */}
                        <div className="py-3.5 flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold text-slate-800">Needy person verified</span>
                                    <span className="text-[12px] text-slate-500 mt-0.5">Amina Begum</span>
                                </div>
                            </div>
                            <span className="text-[12px] text-slate-400">1 hr ago</span>
                        </div>

                        {/* Activity 4 */}
                        <div className="py-3.5 flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold text-slate-800">Complaint received</span>
                                    <span className="text-[12px] text-slate-500 mt-0.5">Ahmed Khan</span>
                                </div>
                            </div>
                            <span className="text-[12px] text-slate-400">2 hrs ago</span>
                        </div>

                        {/* Activity 5 */}
                        <div className="py-3.5 flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-semibold text-slate-800">Donation delivered</span>
                                    <span className="text-[12px] text-slate-500 mt-0.5">Atta and Rice — Lahore</span>
                                </div>
                            </div>
                            <span className="text-[12px] text-slate-400">3 hrs ago</span>
                        </div>

                    </div>
                </div>

                {/* Right: Quick Actions (Takes 1 column) */}
                <div className="col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
                    <div className="pb-3 border-b border-slate-100">
                        <h3 className="text-[15px] font-bold text-slate-900">Quick Actions</h3>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        
                        <Link to="/admin/manage-donors" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-[#009689]" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Manage Donors</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                        <Link to="/admin/manage-needy" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Heart className="w-4 h-4 text-[#009689]" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Manage Needy Persons</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                        <Link to="/admin/donation-requests" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#009689]" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Donation Requests</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                        <Link to="/admin/generate-reports" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-[#009689]" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Generate Report</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                        <Link to="/admin/send-notifications" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Send className="w-4 h-4 text-[#009689]" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Send Notification</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                        <Link to="/admin/resolve-complaints" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Resolve Complaints</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
}