import React, { useState, useEffect } from "react";
import {
    Utensils,
    Shirt,
    Check
} from 'lucide-react';
import { getMyRequests } from "../../services/needyService";

export default function MyRequests() { 
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user.needyID) {
                setLoading(false);
                return;
            }

            try {
                const result = await getMyRequests(user.needyID);
                if (result.status === "success") {
                    const mapped = result.data.map((item) => {
                        const status = item.Status || "Pending";

                        // Step number status se
                        let currentStep = 1;
                        if (status === "Accepted") currentStep = 2;
                        else if (status === "Approved") currentStep = 3;
                        else if (status === "Delivered") currentStep = 4;
                        else if (status === "Declined" || status === "Rejected") currentStep = 1;

                        // Icon
                        let icon = <Utensils className="w-5 h-5" />;
                        let iconBg = "bg-[#FEF3C7]";
                        let iconColor = "text-[#E17100]";
                        if (item.TypeName === "Clothes") {
                            icon = <Shirt className="w-5 h-5" />;
                            iconBg = "bg-[#EFF6FF]";
                            iconColor = "text-[#155DFC]";
                        }

                        // Status colors
                        let statusColor = "text-[#BB4D00]";
                        let statusBg = "bg-[#FFFBEB]";
                        let statusBorder = "border-[#FEF3C7]";
                        if (status === "Accepted" || status === "Delivered") {
                            statusColor = "text-[#009966]";
                            statusBg = "bg-[#ECFDF5]";
                            statusBorder = "border-[#A7F3D0]";
                        } else if (status === "Declined" || status === "Rejected") {
                            statusColor = "text-red-600";
                            statusBg = "bg-red-50";
                            statusBorder = "border-red-200";
                        }

                        return {
                            id: item.RequestID,
                            title: item.DonationTitle,
                            donor: item.DonorName || "Donor",
                            date: item.RequestDate ? item.RequestDate.split(" ")[0] : "",
                            icon,
                            iconBg,
                            iconColor,
                            status,
                            statusColor,
                            statusBg,
                            statusBorder,
                            currentStep,
                        };
                    });
                    setRequests(mapped);
                }
            } catch (err) {
                console.error("Failed to load requests:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const steps = ["Submitted", "Accepted", "Approved", "Delivered"];

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                    <span className="cursor-pointer hover:text-[#009689]">Home</span>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">My Requests</span>
                </div>
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight mt-1">
                    My Requests
                </h1>
                <p className="text-[13px] text-slate-500">
                    Track the status of your donation requests
                </p>
            </div>

            {/* Requests Cards List */}

            {loading && (
                <p className="text-center text-slate-500 text-sm py-8">Loading requests...</p>
            )}

            {!loading && requests.length === 0 && (
                <p className="text-center text-slate-500 text-sm py-8">
                    No requests yet. Browse donations and send a request.
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="w-full h-[221.62px] bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between"
                    >
                        {/* Top Row: Info + Status */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 ${request.iconBg} rounded-[14px] flex items-center justify-center ${request.iconColor}`}>
                                    {request.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[15px] font-bold text-slate-900">{request.title}</h3>
                                    <p className="text-[12px] text-slate-400 mt-0.5">Donor: {request.donor} · {request.date}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 ${request.statusBg} border ${request.statusBorder} rounded-full flex items-center gap-1.5`}>
                                <span className={`w-2 h-2 rounded-full ${request.status === 'Pending' ? 'bg-[#FE9A00]' : 'bg-[#009966]'}`}></span>
                                <span className={`text-[12px] font-semibold ${request.statusColor}`}>{request.status}</span>
                            </div>
                        </div>

                        {/* Progress Stepper (Properly Aligned Inside Circles) */}
                        <div className="flex flex-col items-center px-6 mt-2">
                            <div className="flex items-center w-full justify-between relative">
                                {/* Connecting Background Line */}
                                <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-slate-100 z-0">
                                    {/* Active Progress Line */}
                                    <div
                                        className="absolute left-0 top-0 h-full bg-[#009689] transition-all"
                                        style={{ width: `${((request.currentStep - 1) / 3) * 100}%` }}
                                    ></div>
                                </div>

                                {steps.map((step, index) => {
                                    const stepNumber = index + 1;
                                    const isCompleted = stepNumber <= request.currentStep;

                                    return (
                                        <div key={step} className="flex flex-col items-center z-10">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted
                                                ? 'bg-[#009689] border-[#009689] text-white shadow-sm'
                                                : 'bg-white border-slate-200 text-slate-400'
                                                }`}>
                                                {isCompleted ? (
                                                    <Check className="w-3.5 h-3.5 stroke-3" />
                                                ) : (
                                                    <span className="text-[11px] font-bold">{stepNumber}</span>
                                                )}
                                            </div>
                                            <span className={`text-[11px] font-medium mt-1.5 ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                                                {step}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}