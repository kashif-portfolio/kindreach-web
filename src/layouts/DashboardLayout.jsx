import React from "react";
import logoGreen from '../assets/logo-green.png';
import { Outlet, useLocation, NavLink } from "react-router-dom";
import {
    Bell,
    ChevronDown,
    LayoutDashboard,
    PlusCircle,
    Package,
    History,
    MessageSquare,
    User,
    Clock,
    LogOut,
    Search,
    Users,
    FileText,
    Send,
    AlertTriangle,
    Heart,
    UserCheck
} from "lucide-react";

export default function DashboardLayout() {

    const location = useLocation();
    const path = location.pathname;

    const isNeedy = path.startsWith('/needy');
    const isDonor = path.startsWith('/donor');
    const isAdmin = path.startsWith('/admin');

    const getPageTitle = () => {
        const path = location.pathname;
        // Donor titles
        if (path.includes('/donor/add-donation')) return 'Add Donation';
        if (path.includes('/donor/my-donations')) return 'My Donations';
        if (path.includes('/donor/donation-requests')) return 'Donation Requests';
        if (path.includes('/donor/history')) return 'Donation History';
        if (path.includes('/donor/feedback')) return 'Feedback';
        if (path.includes('/donor/profile')) return 'My Profile';

        // Needy titles
        if (path.includes('/needy/browse-donations')) return 'Browse Donations';
        if (path.includes('/needy/requests')) return 'My Requests';
        if (path.includes('/needy/feedback')) return 'Feedback';
        if (path.includes('/needy/profile')) return 'My Profile';

        // Admin titles
        if (path.includes('/admin/manage-donors')) return 'Manage Donors';
        if (path.includes('/admin/manage-needy')) return 'Manage Needy Persons';
        if (path.includes('/admin/donation-types')) return 'Donation Types';
        if (path.includes('/admin/donation-requests')) return 'Donation Requests';
        if (path.includes('/admin/monitor-donations')) return 'Monitor Donations';
        if (path.includes('/admin/generate-reports')) return 'Generate Reports';
        if (path.includes('/admin/send-notifications')) return 'Send Notifications';
        if (path.includes('/admin/resolve-complaints')) return 'Resolve Complaints';
        if (path.includes('/admin/profile')) return 'Profile & Settings';

        return 'Dashboard';
    };

    const currentTitle = getPageTitle();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="flex w-full h-screen bg-white overflow-hidden ">

            {/* Sidebar */}
            <aside className="w-65 h-full bg-white border-r border-slate-200/80 flex flex-col shrink-0  ">

                {/* Logo Section */}
                <div className="w-65 px-6 py-6 border-b border-slate-200/80 flex items-center gap-3">
                    <img src={logoGreen} alt="Kind Reach Logo" className="w-auto h-12 object-contain" />
                </div>

                <div className="flex-1 px-3 py-6 flex flex-col  overflow-y-auto">

                    {/* --- DONOR LINKS --- */}
                    {isDonor && (
                        <>
                            <NavLink
                                to="/donor"
                                end
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                                        <span>Dashboard</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/add-donation"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <PlusCircle className="w-4 h-4 shrink-0" />
                                        <span>Add Donation</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/my-donations"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Package className="w-4 h-4 shrink-0" />
                                        <span>My Donations</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/donation-requests"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Clock className="w-4 h-4 shrink-0" />
                                        <span>Donation Requests</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/history"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <History className="w-4 h-4 shrink-0" />
                                        <span>Donation History</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/feedback"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <MessageSquare className="w-4 h-4 shrink-0" />
                                        <span>Feedback</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/donor/profile"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-4 gap-4 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <User className="w-4 h-4 shrink-0" />
                                        <span>My Profile</span>
                                    </>
                                )}
                            </NavLink>
                        </>
                    )}

                    {/* --- NEEDY PERSON LINKS --- */}
                    {isNeedy && (
                        <>
                            <NavLink
                                to="/needy"
                                end
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                                        <span>Dashboard</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/needy/browse-donations"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Search className="w-4 h-4 shrink-0" />
                                        <span>Browse Donations</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/needy/requests"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Package className="w-4 h-4 shrink-0" />
                                        <span>My Requests</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/needy/feedback"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <MessageSquare className="w-4 h-4 shrink-0" />
                                        <span>Feedback</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/needy/profile"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-4 gap-4 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <User className="w-4 h-4 shrink-0" />
                                        <span>My Profile</span>
                                    </>
                                )}
                            </NavLink>
                        </>
                    )}

                    {/* --- ADMIN LINKS --- */}
                    {isAdmin && (
                        <>
                            <NavLink
                                to="/admin"
                                end
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                                        <span>Dashboard</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/manage-donors"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Users className="w-4 h-4 shrink-0" />
                                        <span>Manage Donors</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/manage-needy"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Heart className="w-4 h-4 shrink-0" />
                                        <span>Manage Needy Persons</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/donation-types"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Package className="w-4 h-4 shrink-0" />
                                        <span>Donation Types</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/donation-requests"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Clock className="w-4 h-4 shrink-0" />
                                        <span>Donation Requests</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/monitor-donations"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Search className="w-4 h-4 shrink-0" />
                                        <span>Monitor Donations</span>
                                    </>
                                )}
                            </NavLink>

                            <NavLink
                                to="/admin/assign-donations"
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-colors ${location.pathname === "/admin/assign-donations"
                                        ? "bg-teal-50 text-[#009689] font-semibold"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <UserCheck className="w-4 h-4" />
                                Assign Donations
                            </NavLink>

                            <NavLink
                                to="/admin/generate-reports"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <FileText className="w-4 h-4 shrink-0" />
                                        <span>Generate Reports</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/send-notifications"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <Send className="w-4 h-4 shrink-0" />
                                        <span>Send Notifications</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/resolve-complaints"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-3 gap-3 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <AlertTriangle className="w-4 h-4 shrink-0" />
                                        <span>Resolve Complaints</span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to="/admin/profile"
                                className={({ isActive }) => `relative flex items-center w-full h-[42.24px] py-2.5 px-4 gap-4 text-[14px] font-medium transition-all rounded-r-lg ${isActive ? 'bg-[#ECFDF5] text-[#009689]' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#009689] rounded-r"></span>}
                                        <User className="w-4 h-4 shrink-0" />
                                        <span>Profile & Settings</span>
                                    </>
                                )}
                            </NavLink>
                        </>
                    )}

                </div>

                {/* Bottom Profile & Logout Section */}
                <div className="p-4 border-t border-slate-200/80 flex flex-col gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-3 px-2 py-1.5">
                        <div className="w-9 h-9 bg-[#009689] text-white font-bold text-[13px] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                            {isAdmin ? 'AU' : isNeedy ? 'FB' : 'AK'}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[13px] font-semibold text-slate-800 truncate">
                                {isAdmin ? 'Admin User' : isNeedy ? 'Fatima Bibi' : 'Ahmed Khan'}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium truncate">
                                {isAdmin ? 'Administrator' : isNeedy ? 'Needy Person' : 'Donor Account'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full py-2 px-3 text-[13px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Right Section Header & Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

                {/* Topbar */}
                <header className="w-full h-17.5 bg-white px-8 flex items-center justify-between border-b border-slate-200/80 shrink-0">
                    <div className="flex items-center text-sm font-medium text-slate-700">
                        <span>Home</span>
                        <span className="mx-2 text-slate-400">/</span>
                        <span className="text-slate-900 font-semibold">{currentTitle}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[8px] flex items-center justify-center cursor-pointer transition-all">
                            <Bell className="w-4 h-4 text-slate-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </div>

                        <div className="h-10.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[10px] flex items-center cursor-pointer transition-all px-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 bg-[#009689] text-white font-bold text-[11px] rounded-full flex items-center justify-center shrink-0">
                                    {isAdmin ? 'AU' : isNeedy ? 'FB' : 'AK'}
                                </div>
                                <span className="text-[13px] font-semibold text-slate-800 tracking-tight whitespace-nowrap">
                                    {isAdmin ? 'Admin' : isNeedy ? 'Fatima' : 'Ahmad'}
                                </span>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Workspace */}
                <main className="flex-1 h-full overflow-y-auto p-8 bg-slate-50/30">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}