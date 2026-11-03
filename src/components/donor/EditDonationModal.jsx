import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getDonationTypes } from '../../services/adminService';

export default function EditDonationModal({ isOpen, onClose, donation, onSave }) {
    // Local state for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [typeID, setTypeID] = useState('');
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Jab bhi modal khule aur donation data aaye, state ko pre-fill kar do
    useEffect(() => {
        if (donation) {
            setTitle(donation.title || '');
            setDescription(donation.description || '');
            setQuantity(donation.quantity || '');
            setLocation(donation.location || '');
            setTypeID(String(donation.typeID || ''));
            setError('');
        }
    }, [donation, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        let active = true;
        const loadCategories = async () => {
            setLoadingCategories(true);
            try {
                const result = await getDonationTypes();
                if (result.status !== 'success') throw new Error('Could not load categories');
                if (active) setCategories(result.data || []);
            } catch (err) {
                if (active) {
                    setCategories([]);
                    setError(err.response?.data?.message || err.message || 'Could not load categories');
                }
            } finally {
                if (active) setLoadingCategories(false);
            }
        };
        loadCategories();
        return () => { active = false; };
    }, [isOpen]);

    if (!isOpen || !donation) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saving) return;
        setError('');
        if (!title.trim() || !description.trim() || !location.trim() || !typeID) {
            setError('Please fill all required fields and select a category');
            return;
        }
        if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1 || Number(quantity) > 2147483647) {
            setError('Quantity must be a positive whole number');
            return;
        }
        setSaving(true);
        try {
            await onSave({ ...donation, title: title.trim(), description: description.trim(),
                quantity: Number(quantity), location: location.trim(), typeID: Number(typeID) });
            onClose(); // Close only after the database save succeeds.
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Could not update donation');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Edit Donation</h3>
                    <button
                        type="button"
                        disabled={saving}
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
                            {loadingCategories && <p className="text-sm text-slate-500">Loading categories...</p>}
                            {!loadingCategories && categories.length === 0 && <p className="text-sm text-slate-500">No categories available.</p>}
                            {categories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat.TypeID}
                                    disabled={saving || loadingCategories}
                                    onClick={() => setTypeID(String(cat.TypeID))}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${typeID === String(cat.TypeID)
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                        }`}
                                >
                                    {cat.TypeName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Item Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
                            required
                        />
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
                            type="number"
                            min="1"
                            max="2147483647"
                            step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="e.g. 5"
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
                            maxLength={255}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Lahore"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            required
                        />
                    </div>

                    {/* Modal Footer Actions */}
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            disabled={saving}
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving || loadingCategories || categories.length === 0}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}
