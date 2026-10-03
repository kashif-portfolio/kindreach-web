import React, { useState } from "react";
import { Send, ChevronDown, CheckCircle2 } from "lucide-react";

export default function SendNotifications() {
    const [sendTo, setSendTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    
    // Sent history ki state
    const [history, setHistory] = useState([
        { id: 1, title: "New donation categories added", target: "All Donors", date: "2024-03-08" },
        { id: 2, title: "System maintenance scheduled", target: "All Needy Persons", date: "2024-03-05" },
        { id: 3, title: "Welcome to CharityHub!", target: "All Users", date: "2024-01-01" },
    ]);
    
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col gap-4">
    <h3 className="text-[15px] font-bold text-slate-900">Compose Notification</h3>
    
    {/* Send To Dropdown */}
    <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold text-slate-700">Send To *</label>
        <div className="relative">
            <select 
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 outline-none focus:border-teal-600 appearance-none cursor-pointer"
            >
                <option value="">Select...</option>
                <option value="All Users">All Users</option>
                <option value="All Donors">All Donors</option>
                <option value="All Needy Persons">All Needy Persons</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
    </div>



}