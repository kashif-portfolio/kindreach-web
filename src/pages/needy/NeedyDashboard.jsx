import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyRequests, getAvailableDonations } from "../../services/needyService";
import {
    ClipboardList,
    TrendingUp,
    ChevronRight,
    Utensils,
    Shirt,
    CheckCircle,
    Clock,
    MessageSquare,
    Search,
    User,
} from "lucide-react";

export default function NeedyDashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [stats, setStats] = useState({
        totalRequests: 0,
        pending: 0,
        accepted: 0,
        received: 0,
    });
    const [loading, setLoading] = useState(true);
    const [recentRequests, setRecentRequests] = useState([]);
    const [availableDonations, setAvailableDonations] = useState([]);
    const [showVerifiedBanner, setShowVerifiedBanner] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!user.needyID) {
                setLoading(false);
                return;
            }
            try {
                const result = await getMyRequests(user.needyID);
                if (result.status === "success") {
                    const list = result.data || [];
                    setStats({
                        totalRequests: list.length,
                        pending: list.filter((r) => r.Status === "Pending").length,
                        accepted: list.filter(
                            (r) => r.Status === "Accepted" || r.Status === "Approved"
                        ).length,
                        received: list.filter((r) => r.Status === "Delivered").length,
                    });
                    setRecentRequests(list.slice(0, 3));
                }

                const donRes = await getAvailableDonations();
                if (donRes.status === "success") {
                    setAvailableDonations((donRes.data || []).slice(0, 3));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        // Hide banner after 5 seconds
        const timer = setTimeout(() => {
            setShowVerifiedBanner(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="w-full px-8 py-4 flex flex-col gap-6">
            <div className="flex flex-col">
                <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">
                    Dashboard
                </h1>
                <p className="text-[14px] text-text-muted">
                    Welcome back, {user.name || "User"}
                </p>
            </div>

            {showVerifiedBanner && (
                <div className="w-full bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                    <div className="w-9 h-9 bg-[#D1FAE5] rounded-xl flex items-center justify-center text-[#009966] shrink-0">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-900">
                            Account Verified
                        </span>
                        <span className="text-[13px] text-slate-600">
                            Your account is verified. You can browse and request available
                            donations.
                        </span>
                    </div>
                </div>
            )}

            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
                            {loading ? "…" : stats.totalRequests}
                        </h2>
                        <span className="text-[11px] font-medium text-[#94A3B8] mt-1">
                            - All time
                        </span>
                    </div>
                </div>

                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
                            {loading ? "…" : stats.pending}
                        </h2>
                        <span className="text-[11px] font-medium text-[#E17100] mt-1">
                            - Awaiting response
                        </span>
                    </div>
                </div>

                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
                            {loading ? "…" : stats.accepted}
                        </h2>
                        <span className="text-[11px] font-medium text-[#009966] mt-1">
                            - In progress
                        </span>
                    </div>
                </div>

                <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
                            {loading ? "…" : stats.received}
                        </h2>
                        <span className="text-[11px] font-medium text-[#94A3B8] mt-1">
                            - Delivered
                        </span>
                    </div>
                </div>
            </div>

            {/* Main grid: left 2 cols + right Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Recent Requests */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">
                                My Recent Requests
                            </h3>
                            <Link
                                to="/needy/requests"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70]"
                            >
                                <span>View all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            {recentRequests.length === 0 && (
                                <p className="px-6 py-6 text-[13px] text-slate-400 text-center">
                                    No requests yet.
                                </p>
                            )}
                            {recentRequests.map((item, index) => {
                                const title =
                                    item.Title || item.DonationTitle || "Donation";
                                const donor = item.DonorName || "Donor";
                                const date = item.RequestDate
                                    ? String(item.RequestDate).split(" ")[0]
                                    : "";
                                const status = item.Status || "Pending";

                                let statusBg = "bg-[#FFFBEB] border-[#FEF3C7]";
                                let statusDot = "bg-[#FE9A00]";
                                let statusText = "text-[#BB4D00] font-semibold";

                                if (
                                    status === "Accepted" ||
                                    status === "Approved"
                                ) {
                                    statusBg = "bg-[#ECFDF5] border-[#A7F3D0]";
                                    statusDot = "bg-[#009966]";
                                    statusText = "text-[#009966] font-medium";
                                } else if (status === "Delivered") {
                                    statusBg = "bg-[#ECFDF5] border-[#A7F3D0]";
                                    statusDot = "bg-[#009966]";
                                    statusText = "text-[#009966] font-medium";
                                } else if (status === "Rejected") {
                                    statusBg = "bg-rose-50 border-rose-200";
                                    statusDot = "bg-rose-500";
                                    statusText = "text-rose-600 font-medium";
                                }

                                return (
                                    <div
                                        key={item.RequestID || index}
                                        className={`px-6 py-3.5 flex items-center justify-between ${index < recentRequests.length - 1
                                            ? "border-b border-slate-100"
                                            : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10.5 h-10.5 bg-[#FEF3C7] rounded-[12px] flex items-center justify-center text-[#E17100]">
                                                <Utensils className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <h4 className="text-[14px] font-bold text-slate-900">
                                                    {title}
                                                </h4>
                                                <p className="text-[12px] text-text-muted">
                                                    From: {donor}
                                                    {date ? ` · ${date}` : ""}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`px-3 py-1 border rounded-full flex items-center gap-1.5 ${statusBg}`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${statusDot}`}
                                            ></span>
                                            <span className={`text-[12px] ${statusText}`}>
                                                {status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* New Donations */}
                    <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-[15px] font-bold text-slate-900">
                                New Donations Available
                            </h3>
                            <Link
                                to="/needy/browse-donations"
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70]"
                            >
                                <span>Browse all</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            {availableDonations.length === 0 && (
                                <p className="px-6 py-6 text-[13px] text-slate-400 text-center">
                                    No donations available right now.
                                </p>
                            )}
                            {availableDonations.map((item, index) => {
                                const title = item.Title || "Donation";
                                const qty = item.Quantity || "";
                                const location = item.Location || "";
                                const typeName = item.TypeName || "";
                                const isClothes = typeName === "Clothes";
                                const iconWrap = isClothes
                                    ? "bg-[#EFF6FF] text-[#155DFC]"
                                    : "bg-[#FEF3C7] text-[#E17100]";

                                return (
                                    <div
                                        key={item.DonationID || index}
                                        className={`px-6 py-3.5 flex items-center justify-between ${index < availableDonations.length - 1
                                            ? "border-b border-slate-100"
                                            : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div
                                                className={`w-10.5 h-10.5 rounded-[12px] flex items-center justify-center ${iconWrap}`}
                                            >
                                                {isClothes ? (
                                                    <Shirt className="w-5 h-5" />
                                                ) : (
                                                    <Utensils className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <h4 className="text-[14px] font-bold text-slate-900">
                                                    {title}
                                                </h4>
                                                <p className="text-[12px] text-text-muted">
                                                    {[qty, location]
                                                        .filter(Boolean)
                                                        .join(" · ") || "Available"}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/needy/browse-donations"
                                            className="px-4 py-1.5 bg-[#009689] hover:bg-[#007b70] text-white text-[13px] font-semibold rounded-lg"
                                        >
                                            Request
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Quick Actions — same grid row */}
                <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-5 flex flex-col gap-3 h-fit">
                    <h3 className="text-[15px] font-bold text-slate-900 mb-1">
                        Quick Actions
                    </h3>
                    <Link
                        to="/needy/browse-donations"
                        className="w-full px-4 py-3 bg-[#009689] hover:bg-[#007b70] text-white text-[14px] font-semibold rounded-xl flex items-center justify-between shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Search className="w-5 h-5" />
                            <span>Browse Donations</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/needy/profile"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-[#009689]" />
                            <span>My Profile</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                    <Link
                        to="/needy/requests"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-5 h-5 text-[#E17100]" />
                            <span>Track Requests</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                    <Link
                        to="/needy/feedback"
                        className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-[#155DFC]" />
                            <span>Give Feedback</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                </div>
            </div>
        </div>
    );
}