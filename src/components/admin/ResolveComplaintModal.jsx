import React, { useState } from 'react';
import { X } from 'lucide-react';

const ResolveComplaintModal = ({ isOpen, onClose, complaint, onResolve }) => {
    const [resolutionNote, setResolutionNote] = useState("");

    if (!isOpen || !complaint) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            {/* Modal Box */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-135 overflow-hidden flex flex-col border border-slate-100">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Resolve Complaint</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col gap-5">

                    {/* Complaint Details Card Box */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col gap-1.5">

                        <h4 className="text-xs font-bold text-slate-900">{complaint.title}</h4>
                        <p className="text-[11px] text-slate-500">From: {complaint.from} - {complaint.date}</p>
                        <h4 className="text-xs font-regular text-slate-500">{complaint.message}</h4>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{complaint.description}</p>
                    </div>

                    {/* Resolution Note Textarea */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">
                            Resolution Note <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Describe how this complaint was resolved..."
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                            className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] shadow-2xs transition-all resize-none"
                        />
                    </div>

                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onResolve(complaint.id, resolutionNote);
                            setResolutionNote("");
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#009689] hover:bg-[#007f73] rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                        Mark as Resolved
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ResolveComplaintModal;