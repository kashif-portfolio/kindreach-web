import React, { useState } from "react";
import { X, Utensils, Send } from "lucide-react";

export default function SendRequestModal({ isOpen, onClose, donation }) {
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Yahan aap apni request submit ki API ya logic likhein ge
        alert("Donation request submitted successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-[16px] font-bold text-slate-900">Send Donation Request</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

                    {/* Selected Donation Info Preview Box */}
                    {donation && (
                        <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#E17100] flex items-center justify-center shrink-0">
                                <Utensils className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-[14px] font-bold text-slate-900">{donation.title}</h4>
                                <p className="text-[12px] text-slate-500 mt-0.5">
                                    {donation.qty} · {donation.location} · By {donation.donor}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Textarea for Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-semibold text-slate-700">
                            Your Message to the Donor <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                                rows={4}
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Explain why you need this donation and how it will help your family..."
                                className="w-full rounded-xl border border-slate-200/80 p-3.5 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009689] resize-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Modal Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#009689] text-[13px] font-semibold text-white hover:bg-[#007d72] transition-colors shadow-sm cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                            Send Request
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}