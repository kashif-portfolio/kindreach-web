import React, { useState } from "react";
import {
    FileText,
    ChevronDown,
    Download
} from "lucide-react";

export default function GenerateReports() {
    const [reportType, setReportType] = useState("");
    const [fromDate, setFromDate] = useState("2024-01-01");
    const [toDate, setToDate] = useState("2024-03-31");
    const [isGenerated, setIsGenerated] = useState(false);
    const [reportData, setReportData] = useState([]);

    const handleGenerate = () => {
        if (!reportType) {
            alert("Please select a report type!");
            return;
        }
        setIsGenerated(true);
        // Dummy data based on selected report type
        if (reportType === "Total Donations") {
            setReportData([
                { id: 1, title: "Atta (25 kg bags)", donor: "Ahmed Khan", amount: "5 bags", date: "2024-03-10", status: "Completed" },
                { id: 2, title: "Cooking Oil and Sugar", donor: "Ahmed Khan", amount: "10 items", date: "2024-03-02", status: "Completed" }
            ]);
        } else if (reportType === "Active Donors") {
            setReportData([
                { id: 1, name: "Ahmed Khan", totalDonations: "15 items", email: "ahmed@example.com", status: "Active" }
            ]);
        } else if (reportType === "Completed Charity Requests") {
            setReportData([
                { id: 1, title: "Medical Support Request", requester: "Fatima Bibi", category: "Medical", date: "2024-02-15", status: "Resolved" }
            ]);
        }
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Generate Reports
                </h1>
                <p className="text-[13px] text-slate-500">
                    Generate the three reports defined in the project requirements
                </p>
            </div>

            {/* Filter & Controls Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-3">
                <div className="grid grid-cols-12 gap-4 items-end">

                    {/* Report Type Select */}
                    <div className="col-span-4 flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">Report type</label>
                        <div className="relative">
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
                            >
                                <option value="">Select...</option>
                                <option value="Total Donations">Total Donations</option>
                                <option value="Active Donors">Active Donors</option>
                                <option value="Completed Charity Requests">Completed Charity Requests</option>
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* From Date Input */}
                    <div className="col-span-3 flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">From date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* To Date Input */}
                    <div className="col-span-3 flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">To date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="col-span-2">
                        <button
                            onClick={handleGenerate}
                            className="w-full h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            Generate report
                        </button>
                    </div>

                </div>

                {/* Subtitle helper description */}
                <p className="text-[12px] text-slate-400 mt-1">
                    Available reports: total donations, active donors, and completed charity requests.
                </p>
            </div>

            {/* Results / Empty State Card */}
            {!isGenerated ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-16 shadow-xs flex flex-col items-center justify-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                        <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium">
                        Choose a report type and date range, then generate the report.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-[14px] font-bold text-slate-900">{reportType} Report</h3>
                            <p className="text-[12px] text-slate-500">Showing results from {fromDate} to {toDate}</p>
                        </div>
                        <button
                            onClick={() => alert("Report downloaded successfully!")}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[12px] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export PDF
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                                    <th className="py-3.5 px-6">ID</th>
                                    <th className="py-3.5 px-4">Title / Name</th>
                                    <th className="py-3.5 px-4">Details</th>
                                    <th className="py-3.5 px-4">Date</th>
                                    <th className="py-3.5 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-[13px]">
                                {reportData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-4 px-6 text-slate-500 font-medium">#{index + 1}</td>
                                        <td className="py-4 px-4 font-semibold text-slate-900">{item.title || item.name}</td>
                                        <td className="py-4 px-4 text-slate-600">{item.donor || item.email || item.requester}</td>
                                        <td className="py-4 px-4 text-slate-500">{item.date || "N/A"}</td>
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
            )}

        </div>
    );
}