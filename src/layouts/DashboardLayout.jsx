import React from "react";
import logoGreen from '../assets/logo-green.png';
import { Outlet, useLocation } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";

export default function DashboardLayout() {

    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('/donations')) return 'Donations';
        if (path.includes('/requests')) return 'Requests';
        if (path.includes('settings')) return 'settings';
        return 'Dashboard' //By Defult
    }



    const currentTitle = getPageTitle();



    return (
        // Main screen 
        <div className="flex w-full h-screen bg-white overflow-hidden">

            {/* sidebar */}
            <aside className="w-65 h-full bg-white border-r border-border-subtle flex flex-col shrink-0">

                {/* logo section */}
                <div className="w-65 px-6 py-6 border-b border-border-subtle flex items-center gap-3">
                    <img src={logoGreen} alt="Kind Reach Logo" className="w-auto h-12 object-contain" />
                </div>

                <div className="flex-1"></div>
            </aside>

            {/* Right section header and main content area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">

                {/* Topbar */}
                <header className="w-full h-17.5 bg-white px-8 flex items-center justify-between border-b border-border-subtle shrink-0">

                    {/* Left: Breadcrumb */}
                    <div className="flex items-center text-sm font-medium text-slate-700">
                        <span>Home</span>
                        <span className="mx-2 text-slate-400">/</span>
                        <span className="text-slate-900 font-semibold">{currentTitle}</span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">

                        {/* Notification Bell Box */}
                        <div className="relative w-9 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[8px] flex items-center justify-center cursor-pointer transition-all">
                            <Bell className="w-4 h-4 text-slate-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </div>

                        {/* User Profile Box */}
                        <div className="h-10.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[10px] flex items-center cursor-pointer transition-all px-3">
                            <div className="flex items-center gap-2.5">

                                {/* User Avatar Circle */}
                                <div className="w-6 h-6 bg-[#009689] text-white font-bold text-[11px] rounded-full flex items-center justify-center shrink-0">
                                    AK
                                </div>

                                {/* User Name */}
                                <span className="text-[13px] font-semibold text-slate-800 tracking-tight whitespace-nowrap">
                                    Ahmad
                                </span>

                                {/* Dropdown Icon */}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            </div>
                        </div>

                    </div>

                </header>

                {/* Main content work space */}
                <main className="flex-1 h-full overflow-y-auto p-8 bg-app-bg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}