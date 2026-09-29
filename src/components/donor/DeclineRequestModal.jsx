import React from 'react';
import { XCircle } from 'lucide-react';

export default function DeclineRequestModal({ isOpen, onClose, onDecline, request }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Box */}
            <div className="bg-white w-[384px] rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">

                {/* Header & Icon Section */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-[#EF4444] flex items-center justify-center shrink-0 border border-red-100">
                        <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Decline Request</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            This person will be notified that their request was not accepted.
                        </p>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onDecline(request.id);
                            onClose();
                        }}
                        style={{ backgroundColor: '#EF4444' }}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                    >
                        Decline
                    </button>
                </div>

            </div>
        </div>
    );
}