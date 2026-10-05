import React from 'react';
import { X } from 'lucide-react';

const DonorDetailsModal = ({ isOpen, onClose, donor }) => {
  if (!isOpen || !donor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-135 overflow-hidden flex flex-col border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Donor Details</h2>
          <button 
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-6">
          
          {/* Top Profile Summary Section */}
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
            {/* Avatar */}
            <div className={`w-14 h-14 ${donor.color || 'bg-[#009689]'} text-white font-bold text-lg rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
              {donor.initials || "AK"}
            </div>
            
            {/* Name & Email & Status */}
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">{donor.name}</h3>
              <p className="text-xs text-slate-500">{donor.email}</p>
              
              <div className="mt-1">
                {donor.status === "Approved" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Approved
                  </span>
                )}
                {donor.status === "Pending" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Pending
                  </span>
                )}
                {donor.status === "Blocked" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    Blocked
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="flex flex-col divide-y divide-slate-100 text-[13px]">
            
            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Phone</span>
              <span className="text-slate-900 font-semibold">{donor.phone || "+92 300 123 4567"}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Location</span>
              <span className="text-slate-900 font-semibold">{donor.location}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">ID Type</span>
              <span className="text-slate-900 font-semibold">CNIC</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">ID Number</span>
              <span className="text-slate-900 font-semibold">35202-1234567-1</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Member Since</span>
              <span className="text-slate-900 font-semibold">{donor.joined}</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Total Donations</span>
              <span className="text-slate-900 font-semibold">{donor.donations} donations made</span>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-slate-50/50 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default DonorDetailsModal;