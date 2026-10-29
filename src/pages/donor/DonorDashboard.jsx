import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getMyDonations,
  getDonationRequests,
  acceptRequest,
  declineRequest,
} from "../../services/donorService";
import {
  Package,
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
  Plus,
} from "lucide-react";

export default function DonorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // KPI counts
  const [stats, setStats] = useState({
    donations: 0,
    pendingRequests: 0,
    delivered: 0,
    peopleHelped: 0,
  });

  // Lists for boxes
  const [recentDonations, setRecentDonations] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load donations + requests from API
  useEffect(() => {
    const load = async () => {
      if (!user.donorID) {
        setLoading(false);
        return;
      }

      try {
        const donRes = await getMyDonations(user.donorID);
        const reqRes = await getDonationRequests(user.donorID);

        const donations =
          donRes.status === "success" ? donRes.data || [] : [];
        const requests =
          reqRes.status === "success" ? reqRes.data || [] : [];

        const pending = requests.filter((r) => r.Status === "Pending");
        const accepted = requests.filter(
          (r) => r.Status === "Accepted" || r.Status === "Approved"
        );
        const delivered = donations.filter(
          (d) => d.Status === "Delivered"
        ).length;

        setStats({
          donations: donations.length,
          pendingRequests: pending.length,
          delivered: delivered,
          peopleHelped: accepted.length,
        });

        // Latest 3 donations
        setRecentDonations(donations.slice(0, 3));
        // Latest 2 pending requests for quick actions
        setIncomingRequests(pending.slice(0, 2));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Accept from dashboard → refresh list
  const handleAccept = async (requestID) => {
    try {
      const result = await acceptRequest(requestID);
      if (result.status === "success") {
        setIncomingRequests((prev) =>
          prev.filter((r) => r.RequestID !== requestID)
        );
        setStats((s) => ({
          ...s,
          pendingRequests: Math.max(0, s.pendingRequests - 1),
          peopleHelped: s.peopleHelped + 1,
        }));
      } else {
        alert(result.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Decline from dashboard
  const handleDecline = async (requestID) => {
    try {
      const result = await declineRequest(requestID);
      if (result.status === "success") {
        setIncomingRequests((prev) =>
          prev.filter((r) => r.RequestID !== requestID)
        );
        setStats((s) => ({
          ...s,
          pendingRequests: Math.max(0, s.pendingRequests - 1),
        }));
      } else {
        alert(result.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Icon by donation type name
  const getTypeIcon = (typeName) => {
    if (typeName === "Clothes") {
      return {
        icon: <Shirt className="w-5 h-5" />,
        wrap: "bg-[#EFF6FF] text-[#155DFC]",
      };
    }
    if (typeName === "Financial Aid") {
      return {
        icon: <CreditCard className="w-5 h-5" />,
        wrap: "bg-[#ECFDF5] text-[#009966]",
      };
    }
    return {
      icon: <Utensils className="w-5 h-5" />,
      wrap: "bg-[#FEF3C7] text-[#E17100]",
    };
  };

  return (
    <div className="w-full px-8 py-4 flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">
          Donor Dashboard
        </h1>
        <p className="text-[14px] text-text-muted">
          Welcome back, {user.name || "Donor"}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
              {loading ? "…" : stats.donations}
            </h2>
            <span className="text-[11px] font-medium text-[#94A3B8] mt-1">
              - All time
            </span>
          </div>
        </div>

        <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
              {loading ? "…" : stats.pendingRequests}
            </h2>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#FB2C36] mt-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Needs your action</span>
            </div>
          </div>
        </div>

        <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
              {loading ? "…" : stats.delivered}
            </h2>
            <span className="text-[11px] font-medium text-[#94A3B8] mt-1">
              - All the time
            </span>
          </div>
        </div>

        <div className="bg-white px-5 py-4 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
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
              {loading ? "…" : stats.peopleHelped}
            </h2>
            <span className="text-[11px] font-medium text-[#94A3B8] mt-1">
              - Accepted requests
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Recent Donations — live top 3 */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900">
                Recent Donations
              </h3>
              <Link
                to="/donor/my-donations"
                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-col">
              {recentDonations.length === 0 && (
                <p className="px-6 py-6 text-[13px] text-slate-400 text-center">
                  No donations yet.
                </p>
              )}

              {recentDonations.map((item, index) => {
                const title = item.Title || "Donation";
                const qty = item.Quantity || "";
                const location = item.Location || "";
                const date = item.CreatedAt
                  ? String(item.CreatedAt).split(" ")[0]
                  : "";
                const status = item.Status || "Available";
                const { icon, wrap } = getTypeIcon(item.TypeName);

                const isAvailable =
                  status === "Available" || status === "Approved";

                return (
                  <div
                    key={item.DonationID || index}
                    className={`px-6 py-3.5 flex items-center justify-between ${
                      index < recentDonations.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10.5 h-10.5 rounded-[12px] flex items-center justify-center ${wrap}`}
                      >
                        {icon}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-[14px] font-bold text-slate-900">
                          {title}
                        </h4>
                        <p className="text-[12px] text-text-muted">
                          {[qty, location, date].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                        isAvailable
                          ? "bg-[#ECFDF5] border-[#A7F3D0]"
                          : "bg-[#FFFBEB] border-[#FEF3C7]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvailable ? "bg-[#009966]" : "bg-[#FE9A00]"
                        }`}
                      ></span>
                      <span
                        className={`text-[12px] font-medium ${
                          isAvailable ? "text-[#009966]" : "text-[#BB4D00]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incoming Requests — live top 2 pending */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900">
                Incoming Requests
              </h3>
              <Link
                to="/donor/donation-requests"
                className="flex items-center gap-1 text-[13px] font-semibold text-[#009689] hover:text-[#007b70] cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-col">
              {incomingRequests.length === 0 && (
                <p className="px-6 py-6 text-[13px] text-slate-400 text-center">
                  No pending requests.
                </p>
              )}

              {incomingRequests.map((item, index) => {
                const needy = item.NeedyName || "Needy";
                const donation =
                  item.DonationTitle || item.Title || "Donation";
                const date = item.RequestDate
                  ? String(item.RequestDate).split(" ")[0]
                  : "";

                return (
                  <div
                    key={item.RequestID || index}
                    className={`px-6 py-4 flex items-center justify-between ${
                      index < incomingRequests.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[14px] text-slate-800">
                        <span className="font-bold text-slate-900">
                          {needy}
                        </span>{" "}
                        is requesting{" "}
                        <span className="font-semibold text-[#009689]">
                          {donation}
                        </span>
                      </p>
                      <span className="text-[12px] text-slate-400">
                        {date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAccept(item.RequestID)}
                        className="px-3.5 py-1.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#009966] text-[13px] font-semibold rounded-lg border border-[#A7F3D0] flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDecline(item.RequestID)}
                        className="px-3.5 py-1.5 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#FF2056] text-[13px] font-semibold rounded-lg border border-[#FECDD3] flex items-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-5 flex flex-col gap-3 h-fit">
          <h3 className="text-[15px] font-bold text-slate-900 mb-1">
            Quick Actions
          </h3>
          <Link
            to="/donor/add-donation"
            className="w-full px-4 py-3 bg-[#009689] hover:bg-[#007b70] text-white text-[14px] font-semibold rounded-xl flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5" />
              <span>Add New Donation</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/donor/my-donations"
            className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-[#009689]">
              <Package className="w-5 h-5" />
              <span className="text-slate-800">View My Donations</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            to="/donor/donation-requests"
            className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-[#E17100]">
              <ClipboardList className="w-5 h-5" />
              <span className="text-slate-800">Check Requests</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            to="/donor/history"
            className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 text-[#009689]">
              <Clock className="w-5 h-5" />
              <span className="text-slate-800">Donation History</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            to="/donor/feedback"
            className="w-full px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-semibold rounded-xl border border-slate-200 flex items-center justify-between"
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