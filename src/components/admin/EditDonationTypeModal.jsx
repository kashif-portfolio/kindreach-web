import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditDonationTypeModal = ({ isOpen, onClose, onSave, donationData }) => {
  const [formData, setFormData] = useState({
    typeName: '',
    description: '',
  });

  // Jab bhi modal khule ya donationData change ho, fields ko pre-fill kar dein
  useEffect(() => {
    if (donationData) {
      setFormData({
        typeName: donationData.title || '',
        description: donationData.description || '',
      });
    }
  }, [donationData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...donationData,
      title: formData.typeName,
      description: formData.description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-125 overflow-hidden flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Edit Donation Type</h2>
          <button 
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          {/* Type Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Type Name <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              required
              value={formData.typeName}
              onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
              className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] transition-all shadow-2xs"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009689] transition-all shadow-2xs resize-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#009689] hover:bg-[#007f73] rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditDonationTypeModal;