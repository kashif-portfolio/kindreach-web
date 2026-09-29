import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DeleteDonationModal({ isOpen, onClose, onConfirm, donation }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Box with width 384px (w-96) */}
            <div className="bg-white w-[384px] min-h-46 rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Top Content (Icon, Title & Description) */}
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-[#EF4444] flex items-center justify-center shrink-0">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Delete Donation</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            This donation will be removed and any pending requests cancelled.
                        </p>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        style={{ backgroundColor: '#EF4444' }}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}