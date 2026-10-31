import React, { useState, useEffect } from "react";
import DonationDetailsModal from "../../components/admin/DonationDetailsModal";
import { getAllDonations } from "../../services/adminService";
import {
    Search,
    CheckCircle2,
    FileText,
    ShieldCheck,
    Truck,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from "lucide-react";

export default function MonitorDonations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getAllDonations();
                if (result.status === "success") {
                    const mapped = (result.data || []).map((item) => ({
                        id: item.DonationID,
                        donor: item.DonorName || "—",
                        type: item.TypeName || "—",
                        description: item.Title || item.Description || "—",
                        quantity: item.Quantity || "—",
                        location: item.Location || "—",
                        date: item.CreatedAt
                            ? String(item.CreatedAt).split(" ")[0]
                            : "",
                        status: item.Status || "Available",
                    }));
                    setDonations(mapped);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const countAvailable = donations.filter((d) => d.status === "Available").length;
    const countRequested = donations.filter((d) => d.status === "Requested").length;
    const countApproved = donations.filter((d) => d.status === "Approved").length;
    const countDelivered = donations.filter((d) => d.status === "Delivered").length;

    // Filter logic
    const filteredDonations = donations.filter(item => {
        const matchesSearch = item.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Monitor Donations
                </h1>
                <p className="text-[13px] text-slate-500">
                    Platform-wide donation activity
                </p>
            </div>

            {/* Stats Cards Row (4 Cards) */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-slate-500 text-[12px] font-semibold">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        AVAILABLE
                    </div>
                    <div className="text-[24px] font-bold text-slate-900">{loading ? "…" : countAvailable}</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-slate-500 text-[12px] font-semibold">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <FileText className="w-4 h-4" />
                        </div>
                        REQUESTED
                    </div>
                    <div className="text-[24px] font-bold text-slate-900">{countRequested}</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-slate-500 text-[12px] font-semibold">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        APPROVED
                    </div>
                    <div className="text-[24px] font-bold text-slate-900">{countApproved}</div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 text-slate-500 text-[12px] font-semibold">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Truck className="w-4 h-4" />
                        </div>
                        DELIVERED
                    </div>
                    <div className="text-[24px] font-bold text-slate-900">{countDelivered}</div>
                </div>
            </div>

            {/* Search and Filter Tabs Bar */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search donations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] shadow-2xs transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {["All", "Available", "Requested", "Approved", "Delivered"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer border ${statusFilter === tab
                                ? "bg-[#009689] text-white border-[#009689] shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Donations Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                <th className="py-3.5 px-6">Donor</th>
                                <th className="py-3.5 px-4">Type</th>
                                <th className="py-3.5 px-4">Description</th>
                                <th className="py-3.5 px-4">Quantity</th>
                                <th className="py-3.5 px-4">Location</th>
                                <th className="py-3.5 px-4">Date</th>
                                <th className="py-3.5 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {filteredDonations.map((item) => (
                                <tr
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedDonation(item);
                                        setIsDonationModalOpen(true);
                                    }}
                                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                >

                                    {/* Donor */}
                                    <td className="py-4 px-6 font-semibold text-slate-900">
                                        {item.donor}
                                    </td>

                                    {/* Type Badge */}
                                    <td className="py-4 px-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                                            {item.type}
                                        </span>
                                    </td>

                                    {/* Description */}
                                    <td className="py-4 px-4 text-slate-700 font-medium">
                                        {item.description}
                                    </td>

                                    {/* Quantity */}
                                    <td className="py-4 px-4 font-semibold text-slate-800">
                                        {item.quantity}
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-4 text-slate-600">
                                        {item.location}
                                    </td>

                                    {/* Date */}
                                    <td className="py-4 px-4 text-slate-500">
                                        {item.date}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-6">
                                        {item.status === "Available" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Available
                                            </span>
                                        )}
                                        {item.status === "Requested" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                Requested
                                            </span>
                                        )}
                                        {item.status === "Approved" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                Approved
                                            </span>
                                        )}
                                        {item.status === "Delivered" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-600 border border-teal-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                                                Delivered
                                            </span>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <span className="text-[12px] text-slate-500 font-medium">
                        Showing <span className="font-semibold text-slate-700">{filteredDonations.length}</span> results
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

            <DonationDetailsModal
                isOpen={isDonationModalOpen}
                onClose={() => {
                    setIsDonationModalOpen(false);
                    setSelectedDonation(null);
                }}
                donation={selectedDonation}
            />

        </div>
    );
}