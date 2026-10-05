import React from 'react';
import { XCircle } from 'lucide-react';

const DeleteDonorModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between relative border border-slate-100 w-full max-w-97.5">
        
        {/* Content Section */}
        <div className="flex items-start gap-4">
          {/* Red/Rose Icon Box */}
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-full shrink-0">
            <XCircle size={22} />
          </div>
          
          {/* Text Details */}
          <div>
            <h3 className="text-base font-bold text-slate-800">Delete Donor Account</h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              This action is permanent. All donor data will be removed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button 
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

export default DeleteDonorModal;