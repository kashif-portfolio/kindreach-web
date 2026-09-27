import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Utensils,
    Shirt,
    CreditCard,
    Home,
    Heart,
    Lightbulb
} from "lucide-react";

export default function PostDonation() {
    // 1. State for selected category (Default: Food)
    const [selectedCategory, setSelectedCategory] = useState("Food");

    // 2. State for form input fields
    const [formData, setFormData] = useState({
        description: "",
        quantity: "",
        location: "",
        notes: ""
    });

    // Handle input changes dynamically
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", { selectedCategory, ...formData });
        alert("Donation posted successfully!");
    };

    // Categories data array
    const categories = [
        { id: "Food", name: "Food", desc: "Groceries & non-perishables", icon: <Utensils className="w-6 h-6 text-amber-500" /> },
        { id: "Clothes", name: "Clothes", desc: "Clothing for all ages", icon: <Shirt className="w-6 h-6 text-blue-500" /> },
        { id: "Financial Aid", name: "Financial Aid", desc: "Monetary support", icon: <CreditCard className="w-6 h-6 text-emerald-500" /> },
        { id: "Household Items", name: "Household Items", desc: "Furniture & appliances", icon: <Home className="w-6 h-6 text-purple-500" /> }
    ];

    return (
        <div className="w-full flex flex-col gap-6">

            {/* Banner Section */}
            <div className="w-full bg-linear-to-r from-[#009689] to-[#007b70] rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-[20px] font-bold">Post a New Donation</h1>
                    <p className="text-[13px] text-emerald-100 mt-1">Your generosity can change a life — fill in the details below.</p>
                </div>
                <Link to="/donor" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-semibold transition-colors flex items-center gap-1.5 border border-white/25">
                    <span>← Back</span>
                </Link>
            </div>

            {/* Step 1: Choose a Category */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#009689] text-white flex items-center justify-center text-[12px] font-bold">1</span>
                    <h2 className="text-[15px] font-bold text-slate-900">Choose a Category</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.name;
                        return (
                            <div
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`cursor-pointer bg-white p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-2 relative hover:-translate-y-1 hover:shadow-md ${isSelected
                                    ? "border-2 border-[#E17100] bg-[#FFFBEB]/40 shadow-sm"
                                    : "border-slate-200"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-1">
                                    {cat.icon}
                                </div>
                                <h4 className="text-[14px] font-bold text-slate-900">{cat.name}</h4>
                                <p className="text-[12px] text-slate-500">{cat.desc}</p>

                                {isSelected && (
                                    <span className="text-[11px] font-semibold text-[#E17100] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full mt-2 border border-amber-200">
                                        ✓ Selected
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Split Layout: Form & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SIDE (2 Columns): Donation Details Form */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#009689] text-white flex items-center justify-center text-[12px] font-bold">2</span>
                        <h2 className="text-[15px] font-bold text-slate-900">Donation Details</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-slate-800">
                                Description<span className="text-red-500"> *</span>
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="e.g. Atta 25 kg bags, Basmati rice, cooking oil..."
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-[#009689] transition-colors"
                                required
                            />
                        </div>

                        {/* Quantity and Location Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-slate-800">
                                    Quantity / Amount <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 5 bags, 20 items"
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-[#009689] transition-colors"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-slate-800">
                                    Collection Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Gulberg III, Lahore"
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-[#009689] transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-slate-800">Additional Notes (Optional)</label>
                            <textarea
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Pickup instructions, contact preference, or any special conditions..."
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:border-[#009689] transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Buttons Row */}
                        <div className="flex items-center justify-end gap-3 mt-4">
                            <button
                                type="button"
                                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-[14px] font-semibold rounded-xl hover:bg-slate-50 transition-colors "
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className=" w-full px-6 py-2.5 bg-[#009689] hover:bg-[#007b70] text-white text-[14px] font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                                <Heart className="w-4 h-4 fill-white text-white" />
                                <span>Post Donation</span>
                            </button>
                        </div>

                    </form>
                </div>

                {/* RIGHT SIDE (1 Column): Preview & How It Works */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#009689] text-white flex items-center justify-center text-[12px] font-bold">3</span>
                        <h2 className="text-[15px] font-bold text-slate-900">Preview</h2>
                    </div>

                    {/* Live Preview Card with Yellow Border */}
                    <div className="bg-white p-5 rounded-2xl  border-t-4 border-amber-400  shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-500" />
                                Live Preview
                            </span>
                            <span className="text-[11px] font-semibold text-[#E17100] bg-[#FFFBEB] px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1.5">
                                {selectedCategory}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-[13px] text-slate-700 font-medium min-h-9">
                                {formData.description ? formData.description : <span className="text-slate-400 italic">Your description will appear here...</span>}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Quantity</span>
                                    <span className="text-[12px] font-semibold text-slate-800">{formData.quantity || "—"}</span>
                                </div>
                                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Location</span>
                                    <span className="text-[12px] font-semibold text-slate-800 truncate block">{formData.location || "—"}</span>
                                </div>
                            </div>

                            <div className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#009689]"></span>
                                <span>Available · Posted by Ahmad</span>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
                        <h3 className="text-[14px] font-bold text-slate-900 tracking-wide uppercase">How It Works</h3>

                        <div className="flex flex-col gap-3.5 mt-1">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#00BC7D] text-white flex items-center justify-center text-[12px] font-bold shrink-0">1</span>
                                <span className="text-[13px] text-slate-700 font-medium">Post your donation</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#00BBA7] text-white flex items-center justify-center text-[12px] font-bold shrink-0">2</span>
                                <span className="text-[13px] text-slate-700 font-medium">Needy persons request it</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center text-[12px] font-bold shrink-0">3</span>
                                <span className="text-[13px] text-slate-700 font-medium">You accept or decline</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#AD46FF] text-white flex items-center justify-center text-[12px] font-bold shrink-0">4</span>
                                <span className="text-[13px] text-slate-700 font-medium">Admin approves delivery</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}