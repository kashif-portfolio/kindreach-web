import React, { useState } from "react";
import RequestDetailsModal from "../../components/admin/RequestDetailsModal";
import {
    Check,
    X,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from "lucide-react";

export default function DonationRequests() {
    const [activeTab, setActiveTab] = useState("All");

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Dummy donation requests data matching the screenshot
    const [requests, setRequests] = useState([
        {
            id: "#001",
            donor: "Ahmed Khan",
            needyPerson: "Fatima Bibi",
            type: "Food",
            item: "Atta and Rice (10 kg each)",
            date: "2024-03-10",
            status: "Pending"
        },
        {
            id: "#002",
            donor: "Usman Ali",
            needyPerson: "Amina Begum",
            type: "Clothes",
            item: "Winter Clothing Set",
            date: "2024-03-08",
            status: "Approved"
        },
        {
            id: "#003",
            donor: "Ahmed Khan",
            needyPerson: "Muhammad Ramzan",
            type: "Financial Aid",
            item: "PKR 5,000 Emergency Fund",
            date: "2024-03-05",
            status: "Pending"
        },
        {
            id: "#004",
            donor: "Sara Malik",
            needyPerson: "Fatima Bibi",
            type: "Household Items",
            item: "Mattress and Bedding",
            date: "2024-03-01",
            status: "Delivered"
        },
        {
            id: "#005",
            donor: "Usman Ali",
            needyPerson: "Ghulam Hassan",
            type: "Food",
            item: "Cooking Oil and Sugar (5 kg)",
            date: "2024-02-28",
            status: "Rejected"
        },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setRequests(requests.map(req => {
            if (req.id === id) {
                return { ...req, status: newStatus };
            }
            return req;
        }));
    };

    // Filter logic based on tabs
    const filteredRequests = requests.filter(req => {
        if (activeTab === "All") return true;
        return req.status === activeTab;
    });

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Donation Requests
                </h1>
                <p className="text-[13px] text-slate-500">
                    Review and manage all donation requests
                </p>
            </div>

            {/* Filter Tabs */}
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

            {/* Requests Table Card */}
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
                            {filteredRequests.map((req) => (
                                <tr
                                    key={req.id}
                                    onClick={() => {
                                        setSelectedRequest(req);
                                        setIsDetailModalOpen(true);
                                    }}
                                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                >

                                    {/* Request ID */}
                                    <td className="py-4 px-6 font-semibold text-slate-500">
                                        {req.id}
                                    </td>

                                    {/* Donor */}
                                    <td className="py-4 px-4 font-semibold text-slate-900">
                                        {req.donor}
                                    </td>

                                    {/* Needy Person */}
                                    <td className="py-4 px-4 text-slate-700">
                                        {req.needyPerson}
                                    </td>

                                    {/* Type Badge */}
                                    <td className="py-4 px-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                                            {req.type}
                                        </span>
                                    </td>

                                    {/* Item */}
                                    <td className="py-4 px-4 text-slate-600 font-medium">
                                        {req.item}
                                    </td>

                                    {/* Date */}
                                    <td className="py-4 px-4 text-slate-500">
                                        {req.date}
                                    </td>

                                    {/* Status Badge */}
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

                                    {/* Actions */}
                                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            {req.status === "Pending" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(req.id, "Approved")}
                                                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(req.id, "Rejected")}
                                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <X className="w-3 h-3" />
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-slate-400 font-medium text-[12px]">-</span>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <span className="text-[12px] text-slate-500 font-medium">
                        Showing <span className="font-semibold text-slate-700">{filteredRequests.length}</span> results
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

            {/* Request Details Modal */}
            <RequestDetailsModal
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedRequest(null);
                }}
                request={selectedRequest}
            />
        </div>
    );
}