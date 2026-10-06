import React from 'react';
import { X } from 'lucide-react';

const RequestDetailsModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-135 overflow-hidden flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Request Details</h2>
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
            <span className="font-medium text-slate-400">Donor</span>
            <span className="col-span-2 font-bold text-slate-900">{request.donor}</span>
          </div>

          {/* Needy Person */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-400">Needy Person</span>
            <span className="col-span-2 font-semibold text-slate-800">{request.needyPerson}</span>
          </div>

          {/* Type */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-400">Type</span>
            <div className="col-span-2">
              <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                {request.type}
              </span>
            </div>
          </div>

          {/* Item */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-400">Item</span>
            <span className="col-span-2 font-semibold text-slate-700">{request.item}</span>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-400">Location</span>
            <span className="col-span-2 font-medium text-slate-700">{request.location || 'Karachi'}</span>
          </div>

          {/* Date Submitted */}
          <div className="grid grid-cols-3 items-center pb-4 border-b border-slate-100">
            <span className="font-medium text-slate-400">Date Submitted</span>
            <span className="col-span-2 font-medium text-slate-700">{request.date}</span>
          </div>

          {/* Status */}
          <div className="grid grid-cols-3 items-center">
            <span className="font-medium text-slate-400">Status</span>
            <div className="col-span-2">
              {request.status === "Pending" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Pending
                </span>
              )}
              {request.status === "Approved" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Approved
                </span>
              )}
              {request.status === "Rejected" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Rejected
                </span>
              )}
              {request.status === "Delivered" && (
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

export default RequestDetailsModal;