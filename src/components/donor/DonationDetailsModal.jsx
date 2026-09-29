import React from 'react';
import { X, Pencil, Tag, FileText, Hash, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function DonationDetails({ isOpen, onClose, donation, onEdit }) {
    if (!isOpen || !donation) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-lg">Donation Details</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4 text-sm">
                    {/* Type / Category */}
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <Tag className="w-4 h-4 text-slate-400" /> Type
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-200">
                            {donation.category}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" /> Description
                        </span>
                        <span className="text-slate-800 font-medium">{donation.description || 'N/A'}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <Hash className="w-4 h-4 text-slate-400" /> Quantity
                        </span>
                        <span className="text-slate-800 font-medium">{donation.quantity}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" /> Location
                        </span>
                        <span className="text-slate-800 font-medium">{donation.location}</span>
                    </div>

                    {/* Date Posted */}
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" /> Date Posted
                        </span>
                        <span className="text-slate-800 font-medium">{donation.date}</span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between py-2.5">
                        <span className="text-slate-500 font-medium flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-slate-400" /> Status
                        </span>
                        <span className={`px-3 py-1 rounded-full font-medium text-xs ${donation.status === 'Available'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : donation.status === 'Delivered'
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                            {donation.status}
                        </span>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-3.5 bg-slate-50 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                    {donation.status === 'Available' && (
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                        >
                            <Pencil className="w-4 h-4" /> Edit
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}