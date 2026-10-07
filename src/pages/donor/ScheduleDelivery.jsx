import React, { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function ScheduleDelivery() {
    const [formData, setFormData] = useState({
        acceptedRequest: '',
        deliveryMethod: '',
        date: '',
        time: '',
        address: '',
        contactPerson: '',
        deliveryNotes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Schedule submitted:', formData);
        alert('Delivery scheduled successfully!');
    };

    return (
        <div className="w-full pb-4">
            {/* Page Header */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-slate-900">Schedule Delivery</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    Arrange pickup or delivery for accepted donation requests
                </p>
            </div>

            {/* Main Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* Left Column: New Schedule Form (Span 7) */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h2 className="text-sm font-bold text-slate-900 mb-4">New Schedule</h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Accepted Request */}
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Accepted Request <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="acceptedRequest"
                                value={formData.acceptedRequest}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                            >
                                <option value="">Select...</option>
                                <option value="monthly-support">Monthly Support Fund</option>
                                <option value="food-ration">Food Ration Pack</option>
                            </select>
                        </div>

                        {/* Delivery Method */}
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Delivery Method <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="deliveryMethod"
                                value={formData.deliveryMethod}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                            >
                                <option value="">Select...</option>
                                <option value="pickup">Recipent Pickup</option>
                                <option value="delivery">Donor Delivery</option>
                            </select>
                        </div>

                        {/* Date and Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                    Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                                />
                            </div>
                        </div>

                        {/* Pickup / Delivery Address */}
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Pickup / Delivery Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                            />
                        </div>

                        {/* Contact Person */}
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Contact Person <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="contactPerson"
                                placeholder="+92 300 000 0000"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
                            />
                        </div>

                        {/* Delivery Notes */}
                        <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Delivery Notes
                            </label>
                            <textarea
                                name="deliveryNotes"
                                rows="2"
                                value={formData.deliveryNotes}
                                onChange={handleChange}
                                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#009689]"
                            ></textarea>
                        </div>

                        {/* Confirm Schedule Button */}
                        <div className="pt-1">
                            <button
                                type="submit"
                                className="w-full h-10 bg-[#009689] hover:bg-[#007f73] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Confirm Schedule</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Upcoming Deliveries Card (Span 5) */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm h-fit">
                    <h2 className="text-sm font-bold text-slate-900 mb-3">Upcoming Deliveries</h2>

                    {/* Delivery Card Item */}
                    <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-[#009689] rounded-lg mt-0.5">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-900">Monthly Support Fund</h3>
                            <p className="text-[11px] text-slate-500 mt-0.5">Recipient: Amina Begum</p>
                            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                                Donor delivery - 2025-03-14 at 11:00 AM
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}