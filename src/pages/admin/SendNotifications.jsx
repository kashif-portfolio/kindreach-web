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
    
    // ... baqi code yahan aayega
}