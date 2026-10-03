import React, { useState } from "react";
import {
    UserCheck,
    ChevronDown
} from "lucide-react";

export default function AssignDonations() {
    const [selectedDonation, setSelectedDonation] = useState("");
    const [selectedRecipient, setSelectedRecipient] = useState("");
    const [selectedRowId, setSelectedRowId] = useState(null);

    // Available donations data matching screenshot
    const [availableDonations, setAvailableDonations] = useState([
        {
            id: 1,
            title: "Atta (25 kg bags)",
            postedDate: "Posted 2024-03-10",
            donor: "Ahmed Khan",
            category: "Food",
            quantity: "5 bags",
            location: "Lahore",
            status: "Available"
        },
        {
            id: 2,
            title: "Cooking Oil and Sugar",
            postedDate: "Posted 2024-03-02",
            donor: "Ahmed Khan",
            category: "Food",
            quantity: "10 items",
            location: "Lahore",
            status: "Available"
        }
    ]);

    // Dummy verified recipients for dropdown
    const verifiedRecipients = [
        "Fatima Bibi (Karachi - Unemployment)",
        "Amina Begum (Lahore - Disability)",
        "Muhammad Ramzan (Multan - Natural Disaster)"
    ];

    const handleRowClick = (item) => {
        setSelectedRowId(item.id);
        setSelectedDonation(item.title);
    };

    const handleAssign = () => {
        if (!selectedDonation) {
            alert("Please select a donation first!");
            return;
        }
        if (!selectedRecipient) {
            alert("Please select a verified recipient!");
            return;
        }
        alert("Donation successfully assigned!");
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Assign Donations
                </h1>
                <p className="text-[13px] text-slate-500">
                    Match available donations with verified needy persons
                </p>
            </div>

            {/* Create Assignment Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-[15px] font-bold text-slate-900">
                            Create Assignment
                        </h3>
                        <p className="text-[12px] text-slate-500">
                            Select a donation and a verified recipient, then confirm the assignment.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        2 available
                    </span>
                </div>

                {/* Dropdowns & Button Row */}
                <div className="grid grid-cols-12 gap-4 items-end">

                    {/* Available Donation Select */}
                    <div className="col-span-4 flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">Available donation</label>
                        <div className="relative">
                            <select
                                value={selectedDonation}
                                onChange={(e) => setSelectedDonation(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
                            >
                                <option value="">Select...</option>
                                {availableDonations.map(d => (
                                    <option key={d.id} value={d.title}>{d.title} ({d.quantity})</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Verified Recipient Select */}
                    <div className="col-span-5 flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">Verified recipient</label>
                        <div className="relative">
                            <select
                                value={selectedRecipient}
                                onChange={(e) => setSelectedRecipient(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
                            >
                                <option value="">Select...</option>
                                {verifiedRecipients.map((rec, idx) => (
                                    <option key={idx} value={rec}>{rec}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Assign Button */}
                    <div className="col-span-3">
                        <button
                            onClick={handleAssign}
                            className="w-full h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <UserCheck className="w-4 h-4" />
                            Assign Donation
                        </button>
                    </div>

                </div>
            </div>

            {/* Available Donations Table Section */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col gap-0.5 bg-slate-50/40">
                    <h3 className="text-[14px] font-bold text-slate-900">Available Donations</h3>
                    <p className="text-[12px] text-slate-500">Click a row to select it for assignment.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                <th className="py-3.5 px-6 w-12"></th>
                                <th className="py-3.5 px-4">Donation</th>
                                <th className="py-3.5 px-4">Donor</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Quantity</th>
                                <th className="py-3.5 px-4">Location</th>
                                <th className="py-3.5 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px]">
                            {availableDonations.map((item) => (
                                <tr
                                    key={item.id}
                                    onClick={() => handleRowClick(item)}
                                    className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${selectedRowId === item.id ? "bg-teal-50/40" : ""
                                        }`}
                                >

                                    {/* Radio / Checkbox */}
                                    <td className="py-4 px-6">
                                        <input
                                            type="radio"
                                            name="donationSelection"
                                            checked={selectedRowId === item.id}
                                            onChange={() => handleRowClick(item)}
                                            className="w-4 h-4 accent-[#009689] cursor-pointer"
                                        />
                                    </td>

                                    {/* Donation title & date */}
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{item.title}</span>
                                            <span className="text-[11px] text-slate-400">{item.postedDate}</span>
                                        </div>
                                    </td>

                                    {/* Donor */}
                                    <td className="py-4 px-4 text-slate-700 font-medium">
                                        {item.donor}
                                    </td>

                                    {/* Category */}
                                    <td className="py-4 px-4 text-slate-600">
                                        {item.category}
                                    </td>

                                    {/* Quantity */}
                                    <td className="py-4 px-4 font-semibold text-slate-800">
                                        {item.quantity}
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-4 text-slate-600">
                                        {item.location}
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {item.status}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}