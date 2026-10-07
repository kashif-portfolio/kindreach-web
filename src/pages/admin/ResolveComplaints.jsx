import React, { useState } from "react";
import ResolveComplaintModal from "../../components/admin/ResolveComplaintModal";
import { AlertTriangle, CheckCircle2, Check } from "lucide-react";

export default function ResolveComplaints() {
    // Complaints state containing both open and resolved items
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            title: "Donation not received",
            from: "Fatima Bibi (Needy Person)",
            date: "2024-03-09",
            message: "I was approved for the clothing donation but it was never delivered despite the status showing delivered.",
            status: "Open",
            resolution: ""
        },
        {
            id: 2,
            title: "Account verification delay",
            from: "Muhammad Ramzan (Needy Person)",
            date: "2024-03-05",
            message: "My account has been pending verification for over 2 weeks with no update or communication.",
            status: "Open",
            resolution: ""
        },
        {
            id: 3,
            title: "Request declined without reason",
            from: "Ahmed Khan (Donor)",
            date: "2024-03-07",
            message: "My recent donation request was declined without any proper feedback or reason provided.",
            status: "Resolved",
            resolution: "Explained the rejection reason to the donor via email."
        }
    ]);

    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Complaint resolve handler jo modal se resolution note lega aur status update karega
    const handleResolveComplaint = (id, resolutionNote) => {
        setComplaints(complaints.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    status: "Resolved",
                    resolution: resolutionNote
                };
            }
            return item;
        }));
        setIsResolveModalOpen(false);
        setSelectedComplaint(null);
    };

    const openCount = complaints.filter(c => c.status === "Open").length;

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-8">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Resolve Complaints
                </h1>
                <p className="text-[13px] text-slate-500">
                    {openCount} open complaints need attention
                </p>
            </div>

            {/* Open Complaints Section */}
            <div className="flex flex-col gap-4">
                <h2 className="text-[15px] font-bold text-slate-900">Open Complaints</h2>

                <div className="flex flex-col gap-4">
                    {complaints.filter(c => c.status === "Open").length === 0 ? (
                        <p className="text-[13px] text-slate-400 italic">No open complaints at the moment.</p>
                    ) : (
                        complaints
                            .filter(c => c.status === "Open")
                            .map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3.5">
                                            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                                                <AlertTriangle className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-[14px] font-bold text-slate-900">{item.title}</h3>
                                                <p className="text-[12px] text-slate-500">From: {item.from} · {item.date}</p>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                            Open
                                        </span>
                                    </div>

                                    <p className="text-[13px] text-slate-600 pl-12">
                                        {item.message}
                                    </p>

                                    <div className="pl-12 pt-1">
                                        <button
                                            onClick={() => {
                                                setSelectedComplaint(item); 
                                                setIsResolveModalOpen(true);
                                            }}
                                            className="px-4 py-2 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[12px] font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                            Resolve Complaint
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>

            {/* Resolved Complaints Section */}
            <div className="flex flex-col gap-4 pt-2">
                <h2 className="text-[15px] font-bold text-slate-900">Resolved Complaints</h2>

                <div className="flex flex-col gap-4">
                    {complaints
                        .filter(c => c.status === "Resolved")
                        .map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <h3 className="text-[14px] font-bold text-slate-900">{item.title}</h3>
                                            <p className="text-[12px] text-slate-500">From: {item.from} · {item.date}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Resolved
                                    </span>
                                </div>

                                <div className="pl-12 flex flex-col gap-1">
                                    <p className="text-[13px] text-slate-600">
                                        {item.message}
                                    </p>
                                    {item.resolution && (
                                        <p className="text-[12px] text-emerald-700 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 mt-1">
                                            Resolution: {item.resolution}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Resolve Complaint Modal */}
            <ResolveComplaintModal
                isOpen={isResolveModalOpen}
                onClose={() => {
                    setIsResolveModalOpen(false);
                    setSelectedComplaint(null);
                }}
                complaint={selectedComplaint}
                onResolve={(id, note) => {
                    handleResolveComplaint(id, note);
                }}
            />

        </div>
    );
}