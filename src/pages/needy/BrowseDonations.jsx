import React, { useState } from "react";
import SendRequestModal from "../../components/needy/SendRequestModal";
import {
    Utensils,
    Shirt,
    DollarSign,
    Package,
    Search,
    MapPin
} from 'lucide-react';

export default function BrowseDonations() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);


    const donations = [
        {
            id: 1,
            title: "Atta (25 kg bags)",
            category: "Food",
            qty: "Qty: 5 bags",
            location: "Lahore, Gulberg",
            donor: "Ahmed Khan · 2024-03-10",
            icon: <Utensils className="w-5 h-5 text-[#E17100]" />,
            iconBg: "bg-[#FEF3C7]",
            badgeBg: "bg-[#FFFBEB] text-[#BB4D00] border-[#FEF3C7]"
        },
        {
            id: 2,
            title: "Children's Clothing (ages 5-10)",
            category: "Clothes",
            qty: "Qty: 20 items",
            location: "Islamabad, F-7",
            donor: "Usman Ali · 2024-03-08",
            icon: <Shirt className="w-5 h-5 text-[#155DFC]" />,
            iconBg: "bg-[#EFF6FF]",
            badgeBg: "bg-[#EFF6FF] text-[#155DFC] border-[#BFDBFE]"
        },
        {
            id: 3,
            title: "Cooking Oil and Sugar (5 kg each)",
            category: "Food",
            qty: "Qty: 10 items",
            location: "Karachi, Clifton",
            donor: "Sara Malik · 2024-03-06",
            icon: <Utensils className="w-5 h-5 text-[#E17100]" />,
            iconBg: "bg-[#FEF3C7]",
            badgeBg: "bg-[#FFFBEB] text-[#BB4D00] border-[#FEF3C7]"
        },
        {
            id: 4,
            title: "Sofa Set (3-seater, good condition)",
            category: "Household Items",
            qty: "Qty: 1 set",
            location: "Rawalpindi, Saddar",
            donor: "Tariq Mehmood · 2024-03-04",
            icon: <Package className="w-5 h-5 text-[#7C3AED]" />,
            iconBg: "bg-[#F3E8FF]",
            badgeBg: "bg-[#F3E8FF] text-[#7C3AED] border-[#E9D5FF]"
        },
        {
            id: 5,
            title: "Monthly Food Allowance",
            category: "Financial Aid",
            qty: "Qty: PKR 3,000",
            location: "Faisalabad, CBD",
            donor: "Hina Baig · 2024-03-02",
            icon: <DollarSign className="w-5 h-5 text-[#009966]" />,
            iconBg: "bg-[#ECFDF5]",
            badgeBg: "bg-[#ECFDF5] text-[#009966] border-[#A7F3D0]"
        },
        {
            id: 6,
            title: "Adult Clothing Set (assorted sizes)",
            category: "Clothes",
            qty: "Qty: 15 items",
            location: "Lahore, Gulberg",
            donor: "Ahmed Khan · 2024-03-01",
            icon: <Shirt className="w-5 h-5 text-[#155DFC]" />,
            iconBg: "bg-[#EFF6FF]",
            badgeBg: "bg-[#EFF6FF] text-[#155DFC] border-[#BFDBFE]"
        }
    ];

    const categories = ["All", "Food", "Clothes", "Financial Aid", "Household Items"];

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">Browse Donations</span>
                </div>
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight mt-1">
                    Browse Donations
                </h1>
                <p className="text-[13px] text-slate-500">
                    Find and request available donations near you
                </p>
            </div>

            {/* Search Bar & Filter Tabs */}
            <div className="flex flex-col gap-4">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by description, donor or location..."
                        className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200/80 rounded-xl text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009689] shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${selectedCategory === cat
                                ? "bg-[#009689] text-white shadow-sm"
                                : "bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Donations Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {donations.map((item) => (
                    <div
                        key={item.id}
                        className="w-[550.03px] h-[221.62px] bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between"
                    >
                        {/* Top Section: Icon, Title, Badge */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 ${item.iconBg} rounded-[14px] flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[15px] font-bold text-slate-900">{item.title}</h3>
                                    <p className="text-[12px] text-slate-500 mt-0.5">{item.qty}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 border rounded-full text-[12px] font-medium ${item.badgeBg}`}>
                                {item.category}
                            </span>
                        </div>

                        {/* Middle Section: Location & Donor Info (Aligned properly) */}
                        <div className="flex flex-col gap-1 text-[12px] text-slate-500">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{item.location}</span>
                            </div>
                            <div className="text-slate-400 pl-5.5">
                                By {item.donor}
                            </div>
                        </div>

                        {/* Bottom Button */}
                        <button
                            onClick={() => {
                                setSelectedDonation(item);
                                setIsModalOpen(true);
                            }}

                            className="w-full h-10 bg-[#009689] hover:bg-[#007A6F] text-white rounded-xl text-[13px] font-semibold transition-all shadow-sm flex items-center justify-center cursor-pointer">
                            Send Request
                        </button>
                    </div>
                ))}
            </div>
            {/* Send Request Modal Component */}
            <SendRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                donation={selectedDonation}
            />

        </div>
    );
}