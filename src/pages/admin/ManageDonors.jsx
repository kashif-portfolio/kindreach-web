import React, { useState } from "react";
import BlockDonorModal from "../../components/admin/BlockDonorModal";
import ApproveDonorModal from "../../components/admin/ApproveDonorModal";
import UnblockDonorModal from "../../components/admin/UnblockDonorModal";
import DonorDetailsModal from "../../components/admin/DonorDetailsModal";
import EditDonorModal from "../../components/admin/EditDonorModal";
import {
    Search,
    Phone,
    Ban,
    Check,
    Edit,
    Trash2,
    ChevronDown,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Eye,
} from "lucide-react";

export default function ManageDonors() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Dummy data matching the screenshot
    const [donors, setDonors] = useState([
        { id: 1, name: "Ahmed Khan", email: "ahmed@email.com", phone: "+92 300 123 4567", location: "Lahore", donations: 12, joined: "2024-01-15", status: "Approved", initials: "AK", color: "bg-[#009689]" },
        { id: 2, name: "Sara Malik", email: "sara@email.com", phone: "+92 301 234 5678", location: "Karachi", donations: 0, joined: "2024-02-20", status: "Pending", initials: "SM", color: "bg-emerald-600" },
        { id: 3, name: "Usman Ali", email: "usman@email.com", phone: "+92 302 345 6789", location: "Islamabad", donations: 7, joined: "2024-01-08", status: "Approved", initials: "UA", color: "bg-[#009689]" },
        { id: 4, name: "Hina Baig", email: "hina@email.com", phone: "+92 303 456 7890", location: "Faisalabad", donations: 3, joined: "2023-12-05", status: "Blocked", initials: "HB", color: "bg-emerald-700" },
        { id: 5, name: "Tariq Mehmood", email: "tariq@email.com", phone: "+92 304 567 8901", location: "Rawalpindi", donations: 0, joined: "2024-03-01", status: "Pending", initials: "TM", color: "bg-emerald-800" },
    ]);

    const handleStatusToggle = (id) => {
        setDonors(donors.map(donor => {
            if (donor.id === id) {
                const newStatus = donor.status === "Approved" ? "Blocked" : donor.status === "Blocked" ? "Approved" : "Approved";
                return { ...donor, status: newStatus };
            }
            return donor;
        }));
    };

    // Filter logic
    const filteredDonors = donors.filter(donor => {
        const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || donor.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonorId, setSelectedDonorId] = useState(null);

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [selectedApproveId, setSelectedApproveId] = useState(null);

    const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
    const [selectedUnblockId, setSelectedUnblockId] = useState(null);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedDonorDetails, setSelectedDonorDetails] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDonorToEdit, setSelectedDonorToEdit] = useState(null);

    const handleBlock = (id) => {
        setDonors(donors.map(donor =>
            donor.id === id ? { ...donor, status: "Blocked" } : donor
        ));
    };

    const handleApprove = (id) => {
        setDonors(donors.map(donor =>
            donor.id === id ? { ...donor, status: "Approved" } : donor
        ));
    };

    const handleUnblock = (id) => {
        setDonors(donors.map(donor =>
            donor.id === id ? { ...donor, status: "Approved" } : donor // ya "Active" jo bhi status aap dena chahein
        ));
    };

    const handleEditSave = (updatedDonor) => {
        setDonors(donors.map(donor =>
            donor.id === updatedDonor.id ? updatedDonor : donor
        ));
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Manage Donors
                </h1>
                <p className="text-[13px] text-slate-500">
                    {donors.length} registered donors
                </p>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] shadow-2xs transition-all"
                    />
                </div>

                <div className="relative shrink-0">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-11 px-4 pr-10 bg-white border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer transition-all"
                    >
                        <option value="All">Select...</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Donors Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                <th className="py-3.5 px-6">Donor</th>
                                <th className="py-3.5 px-4">Phone</th>
                                <th className="py-3.5 px-4">Location</th>
                                <th className="py-3.5 px-4">Donations</th>
                                <th className="py-3.5 px-4">Joined</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {filteredDonors.map((donor) => (
                                <tr key={donor.id} className="hover:bg-slate-50/60 transition-colors">

                                    {/* Donor Info */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 ${donor.color} text-white font-bold text-[12px] rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                                                {donor.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">{donor.name}</span>
                                                <span className="text-[12px] text-slate-400">{donor.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Phone */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{donor.phone}</span>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-4 text-slate-600 font-medium">
                                        {donor.location}
                                    </td>

                                    {/* Donations Count */}
                                    <td className="py-4 px-4 font-semibold text-slate-800">
                                        {donor.donations}
                                    </td>

                                    {/* Joined Date */}
                                    <td className="py-4 px-4 text-slate-500 font-medium">
                                        {donor.joined}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-4 px-4">
                                        {donor.status === "Approved" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Approved
                                            </span>
                                        )}
                                        {donor.status === "Pending" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                Pending
                                            </span>
                                        )}
                                        {donor.status === "Blocked" && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                Blocked
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {donor.status === "Approved" && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedDonorId(donor.id);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                >
                                                    <Ban className="w-3 h-3" />
                                                    Block
                                                </button>
                                            )}
                                            {donor.status === "Blocked" && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedUnblockId(donor.id);
                                                        setIsUnblockModalOpen(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                >
                                                    <Check className="w-3 h-3" />
                                                    Unblock
                                                </button>
                                            )}
                                            {donor.status === "Pending" && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedApproveId(donor.id); // Donor ki ID save karein
                                                        setIsApproveModalOpen(true);    // Modal ko kholen
                                                    }}
                                                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                                >
                                                    <Check className="w-3 h-3" />
                                                    Approve
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setSelectedDonorDetails(donor);
                                                    setIsDetailsModalOpen(true);
                                                }}
                                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors cursor-pointer border border-slate-200">
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>


                                            <button
                                                onClick={() => {
                                                    setSelectedDonorToEdit(donor);
                                                    setIsEditModalOpen(true);
                                                }}
                                                clas
                                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition-colors cursor-pointer border border-slate-200">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer border border-slate-200">
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
                        Showing <span className="font-semibold text-slate-700">{filteredDonors.length}</span> results
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

            <BlockDonorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    // Yahan par aap apni block hone wali logic ya state update likhein ge
                    handleBlock(selectedDonorId);
                    setIsModalOpen(false); // Modal band kar dein
                }}
            />

            <ApproveDonorModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={() => {
                    handleApprove(selectedApproveId);
                    setIsApproveModalOpen(false);
                }}
            />

            <UnblockDonorModal
                isOpen={isUnblockModalOpen}
                onClose={() => setIsUnblockModalOpen(false)}
                onConfirm={() => {
                    handleUnblock(selectedUnblockId);
                    setIsUnblockModalOpen(false);
                }}
            />

            <DonorDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                donor={selectedDonorDetails}
            />

            <EditDonorModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                donor={selectedDonorToEdit}
                onSave={handleEditSave}
            />

        </div>

    );
}