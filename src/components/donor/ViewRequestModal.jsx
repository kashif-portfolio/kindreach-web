import React from 'react';
import { X } from 'lucide-react';

export default function ViewRequestModal({ isOpen, onClose, request, onAccept, onDecline }) {
    if (!isOpen || !request) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Box */}
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-800">Request Details</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Details Body */}
                <div className="py-4 space-y-4 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-medium">Requester</span>
                        <span className="text-slate-800 font-semibold">{request.requesterName || request.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-medium">Donation</span>
                        <span className="text-slate-800 font-semibold">{request.donationTitle || request.itemRequested || request.donation || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-medium">Type</span>
                        <span className="text-slate-800 font-semibold">{request.type || request.category || 'General Request'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-medium">Date</span>
                        <span className="text-slate-800 font-semibold">{request.date || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col gap-1 py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-medium">Message</span>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {request.message || 'No message provided.'}
                        </p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 font-medium">Status</span>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${request.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                                request.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                    'bg-red-50 text-red-600 border border-red-200'
                            }`}>
                            ● {request.status}
                        </span>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onDecline(request.id);
                            onClose();
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onAccept(request.id);
                            onClose();
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                        Accept
                    </button>
                </div>

            </div>
        </div>
    );
}