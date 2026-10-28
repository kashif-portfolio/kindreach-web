import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import {
    getAcceptedRequests,
    scheduleDelivery,
    getSchedules,
} from '../../services/donorService';

export default function ScheduleDelivery() {
    const [formData, setFormData] = useState({
        acceptedRequest: '',
        deliveryMethod: '',
        date: '',
        time: '',
        address: '',
        contactPerson: '',
        deliveryNotes: '',
    });

    const [acceptedList, setAcceptedList] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.donorID) return;

        const load = async () => {
            try {
                const reqRes = await getAcceptedRequests(user.donorID);
                if (reqRes.status === 'success') {
                    setAcceptedList(reqRes.data);
                }

                const schRes = await getSchedules(user.donorID);
                if (schRes.status === 'success') {
                    setSchedules(schRes.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.acceptedRequest) {
            setError('Please select an accepted request');
            return;
        }
        if (!formData.deliveryMethod) {
            setError('Please select delivery method');
            return;
        }
        if (!formData.date) {
            setError('Please select date');
            return;
        }
        if (!formData.address.trim()) {
            setError('Please enter address');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.donorID) {
            setError('Please login again');
            return;
        }

        setLoading(true);

        try {
            const result = await scheduleDelivery({
                requestID: Number(formData.acceptedRequest),
                donorID: user.donorID,
                deliveryMethod: formData.deliveryMethod,
                deliveryDate: formData.date,
                deliveryTime: formData.time || null,
                address: formData.address.trim(),
                contactPerson: formData.contactPerson || null,
                notes: formData.deliveryNotes || null,
            });

            if (result.status === 'success') {
                alert('Delivery scheduled successfully!');
                setFormData({
                    acceptedRequest: '',
                    deliveryMethod: '',
                    date: '',
                    time: '',
                    address: '',
                    contactPerson: '',
                    deliveryNotes: '',
                });

                // refresh list
                const schRes = await getSchedules(user.donorID);
                if (schRes.status === 'success') setSchedules(schRes.data);
            } else {
                setError(result.message || 'Failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
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
                                {acceptedList.map((item) => (
                                    <option key={item.RequestID} value={item.RequestID}>
                                        {item.DonationTitle} — {item.NeedyName}
                                    </option>
                                ))}
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
                                <option value="Pickup">Pickup</option>
                                <option value="Home Delivery">Home Delivery</option>
                                <option value="Donor Delivery">Donor Delivery</option>
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

                        {error && (
                            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                                {error}
                            </p>
                        )}

                        {/* Confirm Schedule Button */}
                        <div className="pt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-10 bg-[#009689] hover:bg-[#007f73] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {loading ? 'Scheduling...' : 'Confirm Schedule'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Upcoming Deliveries Card (Span 5) */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm h-fit">
                    <h2 className="text-sm font-bold text-slate-900 mb-3">Upcoming Deliveries</h2>

                    {schedules.length === 0 && (
                        <p className="text-xs text-slate-400">No schedules yet.</p>
                    )}

                    {schedules.map((s) => (
                        <div
                            key={s.ScheduleID}
                            className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl flex items-start gap-3 mb-2"
                        >
                            <div className="p-2 bg-emerald-50 text-[#009689] rounded-lg mt-0.5">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-900">
                                    {s.DonationTitle}
                                </h3>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    Recipient: {s.NeedyName}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                                    {s.DeliveryMethod} - {s.DeliveryDate}
                                    {s.DeliveryTime ? ` at ${s.DeliveryTime}` : ''}
                                </p>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                    Status: {s.Status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}