import React from 'react';
import { X } from 'lucide-react';

const DonationDetailsModal = ({ isOpen, onClose, donation }) => {
  if (!isOpen || !donation) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-135 overflow-hidden flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Donation Details</h2>
          <button 
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 flex flex-col gap-5 text-xs">
          
          {/* Donor */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Donor</span>
            <span className="col-span-2 font-bold text-slate-900">{donation.donor}</span>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Category</span>
            <div className="col-span-2">
              <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                {donation.category || donation.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Description</span>
            <span className="col-span-2 font-semibold text-slate-800">{donation.description || donation.item}</span>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Quantity</span>
            <span className="col-span-2 font-semibold text-slate-700">{donation.quantity || '5 bags'}</span>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Location</span>
            <span className="col-span-2 font-medium text-slate-700">{donation.location || 'Lahore'}</span>
          </div>

          {/* Date Posted */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-600">Date Posted</span>
            <span className="col-span-2 font-medium text-slate-700">{donation.date}</span>
          </div>

          {/* Status */}
          <div className="grid grid-cols-3 items-center">
            <span className="font-medium text-slate-600S">Status</span>
            <div className="col-span-2">
              {donation.status === "Available" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Available
                </span>
              )}
              {donation.status === "Requested" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-600 border border-cyan-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  Requested
                </span>
              )}
              {donation.status === "Approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Approved
                </span>
              )}
              {donation.status === "Delivered" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-600 border border-teal-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Delivered
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default DonationDetailsModal;