import React from 'react';
import { AlertTriangle } from 'lucide-react';

const BlockDonorModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box with flexible height and proper padding */}
      <div 
        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between relative border border-slate-100 w-full max-w-[390px]"
      >
        {/* Content Section */}
        <div className="flex items-start gap-4">
          {/* Warning Icon */}
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-full shrink-0">
            <AlertTriangle size={22} />
          </div>
          
          {/* Text Details */}
          <div>
            <h3 className="text-base font-bold text-slate-800">Block Donor Account</h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              This donor will no longer be able to access the platform.
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
            className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors shadow-sm cursor-pointer"
            style={{ backgroundColor: '#D97706' }}
          >
            Block Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockDonorModal;