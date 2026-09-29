import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Plus, Package } from 'lucide-react';
import DonationDetails from '../../components/donor/DonationDetailsModal';
import EditDonationModal from '../../components/donor/EditDonationModal';

export default function MyDonations() {
    // Dummy state for donations
    const [donations, setDonations] = useState([
        {
            id: 1,
            title: 'Winter Warm Jackets',
            category: 'Clothing',
            quantity: 15,
            status: 'Available',
            date: '2026-08-15',
            description: 'High-quality winter warm jackets.',
            location: 'Lahore',
        },
        {
            id: 2,
            title: 'Rice & Flour Packets',
            category: 'Food',
            quantity: 30,
            status: 'Delivered',
            date: '2026-08-10',
            description: 'Atta (25 kg bags) and rice packets.',
            location: 'Shakargarh',
        },
        {
            id: 3,
            title: 'Notebooks & Stationery',
            category: 'Education',
            quantity: 50,
            status: 'Requested',
            date: '2026-08-05',
            description: 'School notebooks and ballpoints.',
            location: 'Islamabad',
        },
    ]);

    const navigate = useNavigate();
    // Modal States
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);

    // Open View Modal Handler
    const handleViewClick = (item) => {
        setSelectedDonation(item);
        setIsViewModalOpen(true);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (item) => {
        setSelectedDonation(item);
        setIsEditModalOpen(true);
    };

    const handleSaveDonation = (updatedItem) => {
        setDonations(donations.map(d => d.id === updatedItem.id ? updatedItem : d));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Donations</h1>
                    <p className="text-sm text-slate-500">Manage and track all your generous contributions.</p>
                </div>
                <button
                    onClick={() => navigate('/donor/add-donation')}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Donation</span>
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-4 px-5">Item Title</th>
                                <th className="py-4 px-5">Category</th>
                                <th className="py-4 px-5">Quantity</th>
                                <th className="py-4 px-5">Status</th>
                                <th className="py-4 px-5">Date</th>
                                <th className="py-4 px-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {donations.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-5 font-medium text-slate-900 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        {item.title}
                                    </td>
                                    <td className="py-4 px-5 text-slate-600">{item.category}</td>
                                    <td className="py-4 px-5 font-semibold text-slate-800">{item.quantity}</td>
                                    <td className="py-4 px-5">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'Available'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : item.status === 'Delivered'
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-slate-500">{item.date}</td>

                                    {/* Actions Section */}
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {/* View Button - Yahan onClick add kar diya hai */}
                                            <button
                                                onClick={() => handleViewClick(item)}
                                                title="View Details"
                                                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>

                                            {item.status === "Available" && (
                                                <>
                                                    <button
                                                        onClick={() => handleEditClick(item)}
                                                        title="Edit"
                                                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        title="Delete"
                                                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render Donation Details Modal Component */}
            <DonationDetails
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                donation={selectedDonation}
                onEdit={() => {
                    setIsViewModalOpen(false);
                }}
            />

            <EditDonationModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                donation={selectedDonation}
                onSave={handleSaveDonation}
            />



        </div>
    );
}