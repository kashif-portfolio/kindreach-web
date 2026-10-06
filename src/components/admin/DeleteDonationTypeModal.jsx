import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteDonationTypeModal = ({ isOpen, onClose, onConfirm, donationTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-105 overflow-hidden flex flex-col border border-slate-100 p-6">
        
        {/* Top Warning Icon & Title Row */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 text-rose-500">
            <AlertTriangle size={20} />
          </div>
          
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-slate-900">Delete Donation Type</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              All donations in this category (<span className="font-semibold text-slate-700">{donationTitle}</span>) will lose their type label.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-2">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteDonationTypeModal;