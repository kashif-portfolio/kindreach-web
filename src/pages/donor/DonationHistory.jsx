import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

export default function DonationHistory() {
    const [historyData] = useState([
        {
            id: 1,
            type: "Food",
            typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
            description: "Rice (10 kg)",
            recipient: "Fatima Bibi",
            location: "Karachi",
            date: "2024-02-10",
            status: "Delivered",
            statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
            id: 2,
            type: "Clothes",
            typeColor: "bg-sky-50 text-sky-700 border-sky-200",
            description: "Adult Clothing Set",
            recipient: "Muhammad Ramzan",
            location: "Multan",
            date: "2024-01-25",
            status: "Delivered",
            statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
            id: 3,
            type: "Household Items",
            typeColor: "bg-amber-50 text-amber-700 border-amber-200",
            description: "Kitchen Utensils Set",
            recipient: "Amina Begum",
            location: "Lahore",
            date: "2024-01-10",
            status: "Delivered",
            statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
    ]);

    return (
        <div className="flex flex-col gap-6 p-2">
            {/* Page Header */}
            <div>
                <h1 className="text-[20px] font-bold text-slate-900">Donation History</h1>
                <p className="text-[13px] text-slate-500">Your completed donations</p>
            </div>

            {/* Table Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Type</th>
                                <th className="py-3.5 px-6">Description</th>
                                <th className="py-3.5 px-6">Recipient</th>
                                <th className="py-3.5 px-6">Location</th>
                                <th className="py-3.5 px-6">Date</th>
                                <th className="py-3.5 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                            {historyData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    {/* Type Badge */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${item.typeColor}`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    {/* Description */}
                                    <td className="py-4 px-6 font-medium text-slate-900">{item.description}</td>
                                    {/* Recipient */}
                                    <td className="py-4 px-6 text-slate-600">{item.recipient}</td>
                                    {/* Location */}
                                    <td className="py-4 px-6 text-slate-600">{item.location}</td>
                                    {/* Date */}
                                    <td className="py-4 px-6 text-slate-500">{item.date}</td>
                                    {/* Status Badge */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${item.statusColor}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Impact Banner */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                    <h4 className="text-[13px] font-bold text-emerald-900">Your Impact</h4>
                    <p className="text-[12px] text-emerald-700">
                        Thank you for being an essential part of our community and making a real difference through your generous contributions!
                    </p>
                </div>
            </div>
        </div>
    );
}