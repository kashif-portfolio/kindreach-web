import React, { useState } from "react";
import {
    Package,
    CheckCircle2,
    Clock,
    Truck,
    Plus,
    Pencil,
    Trash2,
    Eye
} from "lucide-react";
import { Link } from "react-router-dom"; // Agar react-router use kar rahe hain

export default function MyDonations() {
    // Sample data - ap isay apni API/Backend se replace kar lena
    const [donations, setDonations] = useState([
        {
            id: 1,
            type: "Food",
            typeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
            description: "Atta (25 kg bags)",
            quantity: "5 bags",
            location: "Lahore",
            datePosted: "2024-03-10",
            status: "Available",
            statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dot-emerald",
        },
        {
            id: 2,
            type: "Clothes",
            typeColor: "bg-sky-50 text-sky-600 border-sky-200",
            description: "Children's Clothing (ages 5–10)",
            quantity: "20 items",
            location: "Lahore",
            datePosted: "2024-03-05",
            status: "Requested",
            statusColor: "bg-amber-50 text-amber-700 border-amber-200",
        },
        {
            id: 3,
            type: "Financial Aid",
            typeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
            description: "Monthly Support Fund",
            quantity: "PKR 5,000",
            location: "Lahore",
            datePosted: "2024-02-28",
            status: "Approved",
            statusColor: "bg-amber-50 text-amber-700 border-amber-200",
        },
        {
            id: 4,
            type: "Household Items",
            typeColor: "bg-purple-50 text-purple-600 border-purple-200",
            description: "Sofa Set (3-seater)",
            quantity: "1 set",
            location: "Lahore",
            datePosted: "2024-02-15",
            status: "Delivered",
            statusColor: "bg-slate-100 text-slate-700 border-slate-200",
        },
    ]);

    return (
        <div className="flex flex-col gap-6 p-2">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[20px] font-bold text-slate-900">My Donations</h1>
                    <p className="text-[13px] text-slate-500">All donations you have posted</p>
                </div>
                <Link
                    to="/donor/add-donation"
                    className="px-4 py-2.5 bg-[#009689] hover:bg-[#007b70] text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Donation</span>
                </Link>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total</span>
                        <h3 className="text-[24px] font-extrabold text-slate-900 mt-1">4</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Package className="w-6 h-6" />
                    </div>
                </div>

                {/* Available Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Available</span>
                        <h3 className="text-[24px] font-extrabold text-slate-900 mt-1">1</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>

                {/* Requested Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Requested</span>
                        <h3 className="text-[24px] font-extrabold text-slate-900 mt-1">1</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>

                {/* Delivered Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">Delivered</span>
                        <h3 className="text-[24px] font-extrabold text-slate-900 mt-1">1</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                        <Truck className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Donations Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-5">Type</th>
                                <th className="py-3.5 px-5">Description</th>
                                <th className="py-3.5 px-5">Quantity</th>
                                <th className="py-3.5 px-5">Location</th>
                                <th className="py-3.5 px-5">Date Posted</th>
                                <th className="py-3.5 px-5">Status</th>
                                <th className="py-3.5 px-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[14px] text-slate-700">
                            {donations.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    {/* Type */}
                                    <td className="py-4 px-5">
                                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-semibold border ${item.typeColor}`}>
                                            {item.type}
                                        </span>
                                    </td>

                                    {/* Description */}
                                    <td className="py-4 px-5 font-semibold text-slate-900">
                                        {item.description}
                                    </td>

                                    {/* Quantity */}
                                    <td className="py-4 px-5 text-slate-600">
                                        {item.quantity}
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-5 text-slate-600">
                                        {item.location}
                                    </td>

                                    {/* Date Posted */}
                                    <td className="py-4 px-5 text-slate-500 text-[12px]">
                                        {item.datePosted}
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${item.statusColor}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions (Conditional logic: Requested items cannot be edited/deleted easily) */}
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {item.status === "Available" ? (
                                                <>
                                                    <button
                                                        title="Edit"
                                                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        title="Delete"
                                                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </>
                                            ) : (
                                                // Requested / Approved / Delivered items get restricted or view-only action
                                                <button
                                                    title="View Details"
                                                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
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