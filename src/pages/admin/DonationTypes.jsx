import React, { useState } from "react";
import AddDonationTypeModal from "../../components/admin/AddDonationTypeModal";
import {
    Plus,
    Edit3,
    Trash2,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

export default function DonationTypes() {
    // 1. STATE MANAGEMENT: Donation types ki initial list
    const [donationTypes, setDonationTypes] = useState([
        {
            id: 1,
            title: "Financial Aid",
            donations: "45 donations",
            description: "Monetary donations and financial support for families in need",
        },
        {
            id: 2,
            title: "Food",
            donations: "78 donations",
            description: "Non-perishable food items, groceries and nutritional supplies",
        },
        {
            id: 3,
            title: "Clothes",
            donations: "34 donations",
            description: "Clothing items for all ages, genders and seasons",
        },
        {
            id: 4,
            title: "Old Household Items",
            donations: "23 donations",
            description: "Furniture, appliances and household goods in good condition",
        },
    ]);

    // 2. MODAL STATE: Add Donation Type modal ko open/close karne ke liye
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);

    // 3. PAGINATION STATES: Current page aur items per page track karne ke liye
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // 4. ADD HANDLER: Naye donation type ko form se lekar state mein top par add karne ka function
    const handleAddDonationType = (newType) => {
        const formattedType = {
            id: Date.now(),
            title: newType.typeName,
            description: newType.description,
            donations: "0 donations",
        };
        setDonationTypes([formattedType, ...donationTypes]);
        setCurrentPage(1);
    };

    // 5. DELETE HANDLER: Specific ID ki buniyad par row ko delete karne ka function
    const handleDelete = (id) => {
        setDonationTypes(donationTypes.filter(item => item.id !== id));
    };

    // --- PAGINATION LOGIC ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = donationTypes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(donationTypes.length / itemsPerPage);

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* PAGE HEADER & ADD BUTTON SECTION */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                        Donation Types
                    </h1>
                    <p className="text-[13px] text-slate-500">
                        Manage available categories for donations
                    </p>
                </div>
                <button
                    onClick={() => setIsAddTypeModalOpen(true)}
                    className="px-4 py-2.5 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Type
                </button>
            </div>

            {/* TABLE CONTAINER SECTION */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                <table className="w-full text-left border-collapse">

                    {/* Table Headers */}
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/70 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                            <th className="py-3.5 px-6">Type Name</th>
                            <th className="py-3.5 px-6">Description</th>
                            <th className="py-3.5 px-6">Total Donations</th>
                            <th className="py-3.5 px-6 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                        {currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">

                                    {/* Column 1: Type Name */}
                                    <td className="py-4 px-6 font-semibold text-slate-900">
                                        {item.title}
                                    </td>

                                    {/* Column 2: Description */}
                                    <td className="py-4 px-6 text-slate-500 max-w-md truncate">
                                        {item.description}
                                    </td>

                                    {/* Column 3: Total Donations Badge */}
                                    <td className="py-4 px-6 font-medium text-slate-800">
                                        <span className="px-2.5 py-1 bg-emerald-50 text-[#009689] rounded-full text-xs font-semibold">
                                            {item.donations}
                                        </span>
                                    </td>

                                    {/* Column 4: Action Buttons (Edit & Delete) */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Edit Button */}
                                            <button className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200" title="Edit">
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer border border-slate-200"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-slate-400 text-xs">
                                    No donation types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* PAGINATION FOOTER - EXACTLY MATCHING YOUR SCREENSHOT STYLE */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
                    <span className="text-[13px] text-slate-500">
                        Showing {donationTypes.length} results
                    </span>

                    <div className="flex items-center gap-1.5">
                        {/* Previous Button */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" /> Previous
                        </button>

                        {/* Page Number Button */}
                        <button
                            className="w-8 h-8 rounded-lg text-xs font-semibold bg-[#009689] text-white shadow-xs flex items-center justify-center cursor-pointer"
                        >
                            {currentPage}
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                        >
                            Next <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>

            {/* ADD DONATION TYPE MODAL COMPONENT */}
            <AddDonationTypeModal
                isOpen={isAddTypeModalOpen}
                onClose={() => setIsAddTypeModalOpen(false)}
                onAdd={handleAddDonationType}
            />

        </div>
    );
}