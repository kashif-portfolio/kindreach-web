import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditDonationModal({ isOpen, onClose, donation, onSave }) {
    // Local state for form fields
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    // Jab bhi modal khule aur donation data aaye, state ko pre-fill kar do
    useEffect(() => {
        if (donation) {
            setDescription(donation.description || '');
            setQuantity(donation.quantity || '');
            setLocation(donation.location || '');
            setCategory(donation.category || '');
        }
    }, [donation]);

    if (!isOpen || !donation) return null;

    const categories = ['Food', 'Clothes', 'Financial Aid', 'Household Items'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Updated donation object parent ko wapas bhejna
        const updatedData = {
            ...donation,
            description,
            quantity,
            location,
            category,
        };
        onSave(updatedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Edit Donation</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">

                    {/* Category Selection Chips */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Type / Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${category === cat
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                        <textarea
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter donation description..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                        ></textarea>
                    </div>

                    {/* Quantity Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity *</label>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="e.g. 5 bags"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                        />
                    </div>

                    {/* Location Field */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Location *</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Lahore"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                        />
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}