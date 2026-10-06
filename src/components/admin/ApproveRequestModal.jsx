import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ApproveRequestModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-105 overflow-hidden flex flex-col border border-slate-100 p-6 gap-6">
        
        {/* Content Section */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-slate-900">Approve Request</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Both the donor and needy person will be notified.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#009689] hover:bg-[#007f73] rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Approve
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApproveRequestModal;