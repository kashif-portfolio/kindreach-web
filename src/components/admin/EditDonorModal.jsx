import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditDonorModal = ({ isOpen, onClose, donor, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: ''
    });

    // Jab bhi donor change ho ya modal khule, fields mein purana data bhar jaye
    useEffect(() => {
        if (donor) {
            setFormData({
                name: donor.name || '',
                email: donor.email || '',
                phone: donor.phone || '',
                location: donor.location || ''
            });
        }
    }, [donor]);

    if (!isOpen || !donor) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...donor,
            ...formData
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            {/* Modal Box */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-135 overflow-hidden flex flex-col border border-slate-100 relative">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-900">Edit Donor Profile</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Modal Form */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 flex flex-col gap-4 text-[13px]">

                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-slate-700">Full Name<span className='text-rose-500'>*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#009689] transition-all shadow-2xs"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-slate-700">Email Address <span className='text-rose-500'>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#009689] transition-all shadow-2xs"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-slate-700">Phone Number <span className='text-rose-500'>*</span></label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#009689] transition-all shadow-2xs"
                            />
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-slate-700">Location <span className='text-rose-500'>*</span></label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#009689] transition-all shadow-2xs"
                            />
                        </div>

                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-xs font-semibold text-white bg-[#009689] hover:bg-[#007d72] rounded-lg transition-colors shadow-xs cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditDonorModal;