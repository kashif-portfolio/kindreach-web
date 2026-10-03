import React, { useState } from "react";
import { Send, ChevronDown } from "lucide-react";

export default function SendNotifications() {
    const [sendTo, setSendTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // Sent history state matching screenshot
    const [history, setHistory] = useState([
        {
            id: 1,
            title: "New donation categories added",
            target: "All Donors",
            date: "2024-03-08",
            status: "Sent"
        },
        {
            id: 2,
            title: "System maintenance scheduled",
            target: "All Needy Persons",
            date: "2024-03-05",
            status: "Sent"
        },
        {
            id: 3,
            title: "Welcome to CharityHub!",
            target: "All Users",
            date: "2024-01-01",
            status: "Sent"
        },
    ]);

    const handleSend = () => {
        if (!sendTo || !subject || !message) {
            alert("Please fill in all required fields!");
            return;
        }

        const newNotification = {
            id: Date.now(),
            title: subject,
            target: sendTo,
            date: new Date().toISOString().split('T')[0],
            status: "Sent"
        };

        setHistory([newNotification, ...history]);
        setSubject("");
        setMessage("");
        setSendTo("");
        alert("Notification sent successfully!");
    };

    return (
        <div className="w-full px-8 py-6 flex flex-col gap-6">

            {/* Page Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                    Send Notifications
                </h1>
                <p className="text-[13px] text-slate-500">
                    Broadcast messages to platform users
                </p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-6 items-start">

                {/* Left Side: Compose Notification Card */}
                <div className="col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-[15px] font-bold text-slate-900">
                            Compose Notification
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4">

                        {/* Send To Dropdown */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-semibold text-slate-700">
                                Send To <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={sendTo}
                                    onChange={(e) => setSendTo(e.target.value)}
                                    className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
                                >
                                    <option value="">Select...</option>
                                    <option value="All Users">All Users</option>
                                    <option value="All Donors">All Donors</option>
                                    <option value="All Needy Persons">All Needy Persons</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Subject Input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-semibold text-slate-700">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Notification subject..."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs"
                            />
                        </div>

                        {/* Message Textarea */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-semibold text-slate-700">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Write your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs resize-none"
                            />
                        </div>

                        {/* Send Notification Button */}
                        <button
                            onClick={handleSend}
                            className="w-full h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
                        >
                            <Send className="w-4 h-4" />
                            Send Notification
                        </button>

                    </div>
                </div>

                {/* Right Side: Sent History Card */}
                <div className="col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-[15px] font-bold text-slate-900">
                            Sent History
                        </h3>
                    </div>

                    <div className="flex flex-col divide-y divide-slate-100">
                        {history.map((item) => (
                            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-[13px] font-bold text-slate-900">{item.title}</h4>
                                    <span className="text-[12px] text-slate-500">To: {item.target}</span>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        {item.status}
                                    </span>
                                    <span className="text-[11px] text-slate-400">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}