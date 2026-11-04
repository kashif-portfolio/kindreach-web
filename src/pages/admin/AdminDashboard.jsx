import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/adminService";
import {
  AlertTriangle,
  Users,
  Heart,
  Package,
  Clock,
  ChevronRight,
  FileText,
  Send,
} from "lucide-react";

export default function AdminDashboard() {
  // Page ki states
  const [stats, setStats] = useState({});
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Page ka data load aur update karo.
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await getDashboard();
        if (result.status !== "success")
          throw new Error(result.message || "Could not load dashboard");
        if (active) {
          setStats(result.data.stats);
          setActivity(result.data.activity || []);
        }
      } catch (err) {
        if (active)
          setError(err.response?.data?.message || err.message || "Could not load dashboard");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);
  const count = (value) => (loading ? "…" : error ? "—" : value);

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-6">
      {/* Page ka title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-[13px] text-slate-500">Platform overview and activity summary</p>
      </div>

      {error && (
        <p role="alert" className="text-[13px] text-red-600">
          {error}
        </p>
      )}

      {/* Summary ke cards */}
      <div className="grid grid-cols-4 gap-5">
        {/* Donors ki tadaad */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Donors
            </span>
            <div className="w-10 h-10 bg-[#EFF6FF] text-[#155DFC] rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-[28px] font-bold text-slate-900 leading-none">
              {count(stats.totalDonors)}
            </h2>
            <span className="text-[12px] text-emerald-600 font-medium mt-2">
              {loading
                ? "Loading..."
                : error
                  ? "Unavailable"
                  : `+${stats.donorsThisMonth} this month`}
            </span>
          </div>
        </div>

        {/* Needy users ki tadaad */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Needy Persons
            </span>
            <div className="w-10 h-10 bg-[#FFF1F2] text-[#E11D48] rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-[28px] font-bold text-slate-900 leading-none">
              {count(stats.totalNeedy)}
            </h2>
            <span className="text-[12px] text-emerald-600 font-medium mt-2">
              {loading ? "Loading..." : error ? "Unavailable" : `+${stats.needyThisWeek} this week`}
            </span>
          </div>
        </div>

        {/* Available donations */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Donations
            </span>
            <div className="w-10 h-10 bg-[#ECFDF5] text-[#009966] rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-[28px] font-bold text-slate-900 leading-none">
              {count(stats.activeDonations)}
            </h2>
            <span className="text-[12px] text-slate-400 font-medium mt-2">
              {loading
                ? "Loading..."
                : error
                  ? "Unavailable"
                  : `${stats.availableDonations} available`}
            </span>
          </div>
        </div>

        {/* Pending requests */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Requests
            </span>
            <div className="w-10 h-10 bg-[#FEF3C7] text-urgent rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <h2 className="text-[28px] font-bold text-slate-900 leading-none">
              {count(stats.pendingRequests)}
            </h2>
            <span className="text-[12px] text-amber-600 font-medium mt-2">
              {loading
                ? "Loading..."
                : error
                  ? "Unavailable"
                  : `${stats.pendingDonationRequests} donation · ${stats.pendingHelpRequests} help`}
            </span>
          </div>
        </div>
      </div>

      {/* Recent activity aur shortcuts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-[15px] font-bold text-slate-900">Recent Activity</h3>
            <span className="text-[12px] text-slate-400 font-medium">Latest records</span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {loading && (
              <p className="text-[13px] text-slate-500 py-5">Loading recent activity...</p>
            )}
            {!loading && !error && activity.length === 0 && (
              <p className="text-[13px] text-slate-500 py-5">No recent activity yet.</p>
            )}
            {activity.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.tone === "warning" ? "bg-amber-500" : item.tone === "info" ? "bg-sky-500" : "bg-emerald-500"}`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-semibold text-slate-800">{item.title}</span>
                    <span className="text-[12px] text-slate-500 mt-0.5 break-words">
                      {item.detail}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">
                  {String(item.occurredAt || "").slice(0, 16)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Jaldi kholne wale links */}
        <div className="col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-[15px] font-bold text-slate-900">Quick Actions</h3>
          </div>

          <div className="flex flex-col gap-1.5">
            <Link
              to="/admin/manage-donors"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#009689]" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Manage Donors
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/manage-needy"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#009689]" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Manage Needy Persons
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/donation-requests"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#009689]" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Donation Requests
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/generate-reports"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#009689]" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Generate Report
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/send-notifications"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4 text-[#009689]" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Send Notification
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/resolve-complaints"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
                  Resolve Complaints
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
