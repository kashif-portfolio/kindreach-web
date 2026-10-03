import React, { useState } from "react";
import {
    Plus,
    CreditCard,
    Utensils,
    Shirt,
    Home,
    Edit3,
    Trash2
} from "lucide-react";

export default function DonationTypes() {
    const [donationTypes, setDonationTypes] = useState([
        {
            id: 1,
            title: "Financial Aid",
            donations: "45 donations",
            description: "Monetary donations and financial support for families in need",
            icon: <CreditCard className="w-5 h-5 text-teal-600" />,
            bgColor: "bg-teal-50"
        },
        {
            id: 2,
            title: "Food",
            donations: "78 donations",
            description: "Non-perishable food items, groceries and nutritional supplies",
            icon: <Utensils className="w-5 h-5 text-teal-600" />,
            bgColor: "bg-teal-50"
        },
        {
            id: 3,
            title: "Clothes",
            donations: "34 donations",
            description: "Clothing items for all ages, genders and seasons",
            icon: <Shirt className="w-5 h-5 text-teal-600" />,
            bgColor: "bg-teal-50"
        },
        {
            id: 4,
            title: "Old Household Items",
            donations: "23 donations",
            description: "Furniture, appliances and household goods in good condition",
            icon: <Home className="w-5 h-5 text-purple-600" />,
            bgColor: "bg-purple-50"
        },
    ]);

    const handleDelete = (id) => {
        setDonationTypes(donationTypes.filter(item => item.id !== id));
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header & Add Button */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                        Donation Types
                    </h1>
                    <p className="text-[13px] text-slate-500">
                        Manage available categories for donations
                    </p>
                </div>
                <button className="px-4 py-2.5 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Type
                </button>
            </div>

            {/* Grid of Donation Type Cards */}
            <div className="grid grid-cols-2 gap-6">
                {donationTypes.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between gap-5"
                    >
                        {/* Top Info Section */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[15px] font-bold text-slate-900">
                                        {item.title}
                                    </h3>
                                </div>
                                <span className="text-[13px] font-medium text-teal-600">
                                    {item.donations}
                                </span>
                            </div>
                            <p className="text-[13px] text-slate-500 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-1 bg-slate-100"></div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs">
                                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="w-full py-2 bg-white border border-slate-200 hover:bg-rose-50 text-rose-600 rounded-xl text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}