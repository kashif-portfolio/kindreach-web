import React, { useState, useEffect } from "react";
import { submitFeedback, getFeedbackList } from "../../services/feedbackService";
import {
    Monitor,
    Package,
    MessageSquare,
    Lightbulb,
    FileText,
    Star,
    Target,
    ThumbsUp,
    Send
} from "lucide-react";

export default function Feedback() {
    const [rating, setRating] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Customer Support");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [recentReviews, setRecentReviews] = useState([]);

    const categories = [
        { name: "Platform Experience", icon: Monitor },
        { name: "Donation Process", icon: Package },
        { name: "Customer Support", icon: MessageSquare },
        { name: "Feature Suggestion", icon: Lightbulb },
        { name: "Other", icon: FileText },
    ];

    const handleSubmit = async () => {
        setError("");

        if (rating < 1) {
            setError("Please select a rating");
            return;
        }
        if (!message.trim()) {
            setError("Please write your feedback message");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.userID) {
            setError("Please login again");
            return;
        }

        setLoading(true);

        try {
            // Category text comments ke sath bhej rahe hain (table mein category column nahi)
            const commentsText = `[${selectedCategory}] ${message.trim()}`;

            const result = await submitFeedback({
                userID: user.userID,
                rating: rating,
                comments: commentsText,
                requestID: null,
            });

            if (result.status === "success") {
                alert("Feedback submitted successfully!");
                setRating(0);
                setMessage("");

                // List refresh
                const list = await getFeedbackList();
                if (list.status === "success") {
                    const mapped = list.data.map((item) => {
                        const name = item.Name || "User";
                        const initials = name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase();
                        return {
                            id: item.FeedbackID,
                            name,
                            initials,
                            color: "bg-emerald-600",
                            rating: item.Rating,
                            comment: item.Comments,
                        };
                    });
                    setRecentReviews(mapped);
                }
            } else {
                setError(result.message || "Failed to submit");
            }
        } catch (err) {
            const msg =
                err.response?.data?.message || "Something went wrong. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col gap-6 p-2">
            {/* Page Header / Breadcrumb */}
            <div>
                <h1 className="text-[20px] font-bold text-slate-900">Feedback</h1>
                <p className="text-[13px] text-slate-500">Home / Feedback</p>
            </div>

            {/* Top Hero Banner */}
            <div className="bg-linear-to-r from-[#009689] to-[#007b70] rounded-2xl p-6 text-white flex items-center justify-between shadow-sm relative overflow-hidden">
                <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-200">
                        CHARITYHUB &bull; DONOR PORTAL
                    </span>
                    <h2 className="text-[22px] font-bold mt-1 text-white">Share Your Experience</h2>
                    <p className="text-[13px] text-emerald-100 mt-0.5">
                        Your voice shapes how we serve our community.
                    </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/50 flex items-center justify-center shrink-0 border border-emerald-500">
                    <MessageSquare className="w-8 h-8 text-white" />
                </div>
            </div>

            {/* Main Grid Layout (Left Form, Right Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Side: Feedback Form (Takes 2 columns) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Overall Rating Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Overall Rating
                        </h3>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                                >
                                    <Star
                                        className={`w-7 h-7 ${star <= rating
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Category Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Feedback Category
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {categories.map((cat) => {
                                const isSelected = selectedCategory === cat.name;
                                return (
                                    <button
                                        key={cat.name}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all border cursor-pointer ${isSelected
                                            ? "bg-[#009689] text-white border-[#009689] shadow-sm"
                                            : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50"
                                            }`}
                                    >
                                        <cat.icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} />
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Your Message Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Your Message
                        </h3>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <textarea
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us what worked well, what could be improved, or share a suggestion..."
                                className="w-full rounded-xl border border-slate-200/80 p-4 text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009689] resize-none transition-colors"
                            />
                            <span className="absolute bottom-3 right-3 text-[11px] text-slate-400">
                                {message.length} characters
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#009689] text-[13px] font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                                {loading ? "Submitting..." : "Submit Feedback"}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Side: Sidebar (Tips & What Others Said) */}
                <div className="flex flex-col gap-6">

                    {/* Tips for Great Feedback */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Tips for Great Feedback
                        </h3>

                        <div className="flex items-center gap-3.5 text-[12px] text-slate-600">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                <Target className="w-5 h-5 text-emerald-600" />
                            </div>
                            <p className="font-medium">Be specific — mention the donation or interaction.</p>
                        </div>

                        <div className="flex items-center gap-3.5 text-[12px] text-slate-600">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                <ThumbsUp className="w-5 h-5 text-emerald-600" />
                            </div>
                            <p className="font-medium">Share both positives and areas to improve.</p>
                        </div>

                        <div className="flex items-center gap-3.5 text-[12px] text-slate-600">
                            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                                <Lightbulb className="w-5 h-5 text-amber-600" />
                            </div>
                            <p className="font-medium">Suggest features you wish existed.</p>
                        </div>

                        <div className="flex items-center gap-3.5 text-[12px] text-slate-600">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                <Star className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="font-medium">Your rating helps us prioritize improvements.</p>
                        </div>
                    </div>

                    {/* What Others Said */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col gap-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            What Others Said
                        </h3>

                        <div className="flex flex-col gap-3.5">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-7 h-7 rounded-full ${review.color} text-white flex items-center justify-center text-[11px] font-bold`}>
                                                {review.initials}
                                            </div>
                                            <span className="text-[12px] font-bold text-slate-900">{review.name}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-600 italic">
                                        "{review.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}