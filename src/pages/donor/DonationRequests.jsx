import React, { useState, useEffect } from "react";
import { Check, X, Eye } from "lucide-react";
import AcceptRequestModal from "../../components/donor/AcceptRequestModal";
import DeclineRequestModal from "../../components/donor/DeclineRequestModal";
import ViewRequestModal from "../../components/donor/ViewRequestModal";
import { getDonationRequests, acceptRequest, declineRequest } from "../../services/donorService";


export default function DonationRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user.donorID) {
                setLoading(false);
                return;
            }

            try {
                const result = await getDonationRequests(user.donorID);
                if (result.status === "success") {
                    const mapped = result.data.map((item) => {
                        const name = item.NeedyName || "Needy";
                        const initials = name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase();

                        const status = item.Status || "Pending";
                        let statusColor = "bg-amber-50 text-amber-700 border-amber-200";
                        if (status === "Accepted") {
                            statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                        } else if (status === "Declined") {
                            statusColor = "bg-red-50 text-red-700 border-red-200";
                        }

                        return {
                            id: item.RequestID,
                            name,
                            initials,
                            avatarBg: "bg-emerald-100 text-emerald-700",
                            itemRequested: item.DonationTitle,
                            date: item.RequestDate ? item.RequestDate.split(" ")[0] : "",
                            message: item.Message || "",
                            status,
                            statusColor,
                        };
                    });
                    setRequests(mapped);
                }
            } catch (err) {
                console.error("Failed to load requests:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);



    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);


    const handleAcceptClick = (req) => {
        setSelectedRequest(req);
        setIsAcceptModalOpen(true);
    };

    const handleAcceptConfirm = async (id) => {
        try {
            const result = await acceptRequest(id);
            if (result.status === "success") {
                setRequests((prev) =>
                    prev.map((r) =>
                        r.id === id
                            ? { ...r, status: "Accepted", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200" }
                            : r
                    )
                );
            } else {
                alert(result.message || "Failed to accept");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    const handleDeclineClick = (req) => {
        setSelectedRequest(req);
        setIsDeclineModalOpen(true);
    };

    const handleDeclineConfirm = async (id) => {
        try {
            const result = await declineRequest(id);
            if (result.status === "success") {
                setRequests((prev) =>
                    prev.map((r) =>
                        r.id === id
                            ? { ...r, status: "Declined", statusColor: "bg-red-50 text-red-700 border-red-200" }
                            : r
                    )
                );
            } else {
                alert(result.message || "Failed to decline");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewClick = (req) => {
        setSelectedRequest(req);
        setIsViewModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 p-2">
            {/* Page Header */}
            <div>
                <h1 className="text-[20px] font-bold text-slate-900">Donation Requests</h1>
                <p className="text-[13px] text-slate-500">Manage incoming requests for your donations</p>
            </div>

            {loading && (
                <p className="text-center text-slate-500 text-sm py-8">Loading requests...</p>
            )}

            {!loading && requests.length === 0 && (
                <p className="text-center text-slate-500 text-sm py-8">No requests yet.</p>
            )}

            {/* Requests List Container */}
            <div className="flex flex-col gap-4">
                {requests.map((req) => (
                    <div
                        key={req.id}
                        className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4"
                    >
                        {/* Top Row: Avatar, Name, and Status */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {/* Initials Avatar */}
                                <div className={`w-10 h-10 rounded-full font-bold text-[13px] flex items-center justify-center ${req.avatarBg}`}>
                                    {req.initials}
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900">{req.name}</h3>
                                    <p className="text-[12px] text-slate-500">
                                        Requesting: <span className="font-semibold text-slate-700">{req.itemRequested}</span> - {req.date}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${req.statusColor}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                {req.status}
                            </span>
                        </div>

                        {/* Message */}
                        <p className="text-[13px] text-slate-600 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                            "{req.message}"
                        </p>

                        {/* Action Buttons (Visible only if Pending) */}
                        {req.status === "Pending" && (
                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    onClick={() => handleAcceptClick(req)}
                                    className="px-4 py-2 bg-[#009689] hover:bg-[#007b70] text-white text-[12px] font-semibold rounded-xl transition-colors  cursor-pointer shadow-sm flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Accept Request</span>
                                </button>
                                <button
                                    onClick={() => handleDeclineClick(req)}
                                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-semibold rounded-xl border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5">
                                    <X className="w-3.5 h-3.5" />
                                    <span>Decline</span>
                                </button>
                                <button
                                    onClick={() => handleViewClick(req)}
                                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[12px] font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>View Details</span>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <AcceptRequestModal
                isOpen={isAcceptModalOpen}
                onClose={() => setIsAcceptModalOpen(false)}
                onAccept={handleAcceptConfirm}
                request={selectedRequest}
            />

            <DeclineRequestModal
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onDecline={handleDeclineConfirm}
                request={selectedRequest}
            />

            <ViewRequestModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                request={selectedRequest}
                onAccept={handleAcceptConfirm}
                onDecline={handleDeclineConfirm}
            />

        </div>
    );
}