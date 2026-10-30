import React, { useState, useEffect } from "react";
import { getAllRequests, updateRequestStatus } from "../../services/adminService";
import RequestDetailsModal from "../../components/admin/RequestDetailsModal";
import ApproveRequestModal from "../../components/admin/ApproveRequestModal";
import RejectRequestModal from "../../components/admin/RejectRequestModal";
import {
    Check,
    X,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
} from "lucide-react";

export default function DonationRequests() {
    const [activeTab, setActiveTab] = useState("All");
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [requestToApprove, setRequestToApprove] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getAllRequests();
                if (result.status === "success") {
                    const mapped = (result.data || []).map((item) => {
                        let status = item.Status || "Pending";
                        if (status === "Accepted") status = "Approved";

                        return {
                            id: item.RequestID,
                            displayId: `#${String(item.RequestID).padStart(3, "0")}`,
                            donor: item.DonorName || "—",
                            needyPerson: item.NeedyName || "—",
                            type: item.Type || item.TypeName || "—",
                            item: item.Item || item.Title || "—",
                            date: item.RequestDate
                                ? String(item.RequestDate).split(" ")[0]
                                : "",
                            status,
                        };
                    });
                    setRequests(mapped);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleApprove = async (id) => {
        try {
            const result = await updateRequestStatus(id, "Accepted");
            if (result.status === "success") {
                setRequests((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
                );
            } else {
                alert(result.message || "Failed");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleReject = async (id) => {
        try {
            const result = await updateRequestStatus(id, "Rejected");
            if (result.status === "success") {
                setRequests((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
                );
            } else {
                alert(result.message || "Failed");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const filteredRequests = requests.filter((req) => {
        if (activeTab === "All") return true;
        return req.status === activeTab;
    });

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Donation Requests
                </h1>
                <p className="text-[13px] text-slate-500">
                    Review and manage all donation requests
                </p>
            </div>

            <div className="flex items-center gap-2">
                {["All", "Pending", "Approved", "Rejected", "Delivered"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer border ${activeTab === tab
                                ? "bg-[#009689] text-white border-[#009689] shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                <th className="py-3.5 px-6">#</th>
                                <th className="py-3.5 px-4">Donor</th>
                                <th className="py-3.5 px-4">Needy Person</th>
                                <th className="py-3.5 px-4">Type</th>
                                <th className="py-3.5 px-4">Item</th>
                                <th className="py-3.5 px-4">Date</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {loading && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-slate-400">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {!loading && filteredRequests.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-slate-400">
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                            {filteredRequests.map((req) => (
                                <tr
                                    key={req.id}
                                    onClick={() => {
                                        setSelectedRequest(req);
                                        setIsDetailModalOpen(true);
                                    }}
                                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                >
                                    <td className="py-4 px-6 font-semibold text-slate-500">
                                        {req.displayId}
                                    </td>
                                    <td className="py-4 px-4 font-semibold text-slate-900">
                                        {req.donor}
                                    </td>
                                    <td className="py-4 px-4 text-slate-700">{req.needyPerson}</td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                                            {req.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-600 font-medium">
                                        {req.item}
                                    </td>
                                    <td className="py-4 px-4 text-slate-500">{req.date}</td>
                                    <td className="py-4 px-4">
                                        {req.status === "Approved" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Approved
                                            </span>
                                        )}
                                        {req.status === "Pending" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                Pending
                                            </span>
                                        )}
                                        {req.status === "Rejected" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                Rejected
                                            </span>
                                        )}
                                        {req.status === "Delivered" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-600 border border-teal-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                                                Delivered
                                            </span>
                                        )}
                                    </td>
                                    <td
                                        className="py-4 px-6 text-right"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-end gap-2">
                                            {req.status === "Pending" ? (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setRequestToApprove(req.id);
                                                            setIsApproveModalOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setRequestToReject(req.id);
                                                            setIsRejectModalOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <X className="w-3 h-3" />
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-slate-400 font-medium text-[12px]">
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <span className="text-[12px] text-slate-500 font-medium">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                            {filteredRequests.length}
                        </span>{" "}
                        results
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs">
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Previous
                        </button>
                        <button className="px-3 py-1.5 bg-[#009689] text-white rounded-lg text-[12px] font-medium shadow-2xs">
                            1
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs">
                            Next
                            <ChevronRightIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            <RequestDetailsModal
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedRequest(null);
                }}
                request={selectedRequest}
            />

            <ApproveRequestModal
                isOpen={isApproveModalOpen}
                onClose={() => {
                    setIsApproveModalOpen(false);
                    setRequestToApprove(null);
                }}
                onConfirm={() => {
                    handleApprove(requestToApprove);
                    setIsApproveModalOpen(false);
                    setRequestToApprove(null);
                }}
            />

            <RejectRequestModal
                isOpen={isRejectModalOpen}
                onClose={() => {
                    setIsRejectModalOpen(false);
                    setRequestToReject(null);
                }}
                onConfirm={() => {
                    handleReject(requestToReject);
                    setIsRejectModalOpen(false);
                    setRequestToReject(null);
                }}
            />
        </div>
    );
}