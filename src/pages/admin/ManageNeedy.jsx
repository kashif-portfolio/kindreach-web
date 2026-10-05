import React, { useState } from "react";
import NeedyDetailsModal from "../../components/admin/NeedyDetailsModal";
import {
    Search,
    Check,
    X,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Eye
} from "lucide-react";

export default function ManageNeedyPersons() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Details Modal State
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedApplicantDetails, setSelectedApplicantDetails] = useState(null);

    // Initial dummy data matching your design and screenshot
    const [applicants, setApplicants] = useState([
        { id: 1, name: "Fatima Bibi", email: "fatima@email.com", location: "Karachi", reason: "Unemployment", household: 5, requests: 3, status: "Verified", initials: "FB", color: "bg-teal-700" },
        { id: 2, name: "Muhammad Ramzan", email: "ramzan@email.com", location: "Multan", reason: "Natural Disaster", household: 7, requests: 0, status: "Pending", initials: "MR", color: "bg-[#009689]" },
        { id: 3, name: "Amina Begum", email: "amina@email.com", location: "Lahore", reason: "Disability", household: 3, requests: 2, status: "Verified", initials: "AB", color: "bg-teal-600" },
        { id: 4, name: "Ghulam Hassan", email: "ghulam@email.com", location: "Peshawar", reason: "Chronic Illness", household: 6, requests: 0, status: "Pending", initials: "GH", color: "bg-emerald-700" },
        { id: 5, name: "Zainab Khatoon", email: "zainab@email.com", location: "Quetta", reason: "Other", household: 2, requests: 1, status: "Rejected", initials: "ZK", color: "bg-teal-800" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setApplicants(applicants.map(app => {
            if (app.id === id) {
                return { ...app, status: newStatus };
            }
            return app;
        }));
    };

    const handleDelete = (id) => {
        setApplicants(applicants.filter(app => app.id !== id));
    };

    // Filter logic
    const filteredApplicants = applicants.filter(app => {
        return app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.reason.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="w-full px-8 py-0 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Manage Needy Persons
                </h1>
                <p className="text-[13px] text-slate-500">
                    {applicants.length} applicants on record
                </p>
            </div>

            {/* Search Bar Bar (Full Width) */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, location or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] shadow-2xs transition-all"
                    />
                </div>
            </div>

            {/* Applicants Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                <th className="py-3.5 px-6">Person</th>
                                <th className="py-3.5 px-4">Location</th>
                                <th className="py-3.5 px-4">Reason</th>
                                <th className="py-3.5 px-4">Household</th>
                                <th className="py-3.5 px-4">Requests</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {filteredApplicants.map((applicant) => (
                                <tr key={applicant.id} className="hover:bg-slate-50/60 transition-colors">

                                    {/* Person Info */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 ${applicant.color} text-white font-bold text-[12px] rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                                                {applicant.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">{applicant.name}</span>
                                                <span className="text-[12px] text-slate-400">{applicant.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-4 text-slate-600 font-medium">
                                        {applicant.location}
                                    </td>

                                    {/* Reason */}
                                    <td className="py-4 px-4 text-slate-600 font-medium">
                                        {applicant.reason}
                                    </td>

                                    {/* Household */}
                                    <td className="py-4 px-4 font-semibold text-slate-800">
                                        {applicant.household}
                                    </td>

                                    {/* Requests Count */}
                                    <td className="py-4 px-4 font-semibold text-slate-800">
                                        {applicant.requests}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-4">
                                        {applicant.status === "Verified" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Verified
                                            </span>
                                        )}
                                        {applicant.status === "Pending" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                Pending
                                            </span>
                                        )}
                                        {applicant.status === "Rejected" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                Rejected
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Agar status Pending ho toh Verify aur Reject buttons show honge */}
                                            {applicant.status === "Pending" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(applicant.id, "Verified")}
                                                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(applicant.id, "Rejected")}
                                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                    >
                                                        <X className="w-3 h-3" />
                                                        Reject
                                                    </button>
                                                </>
                                            ) : null}

                                            {/* Edit & Delete buttons hamesha available rahenge */}
                                            <button
                                                onClick={() => {
                                                    setSelectedApplicantDetails(applicant);
                                                    setIsDetailsModalOpen(true);
                                                }}
                                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors cursor-pointer border border-slate-200">
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>

                                            <button className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors cursor-pointer border border-slate-200">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(applicant.id)}
                                                className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer border border-slate-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
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
                        Showing <span className="font-semibold text-slate-700">{filteredApplicants.length}</span> results
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Previous
                        </button>
                        <button className="px-3 py-1.5 bg-[#009689] text-white rounded-lg text-[12px] font-medium shadow-2xs">
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                            Next
                            <ChevronRightIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>

            <NeedyDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                applicant={selectedApplicantDetails}
            />

        </div>
    );
}