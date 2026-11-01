import React, { useState } from "react";
import { submitComplaint } from "../../services/complaintService";
import { Send } from "lucide-react";

export default function NeedySubmitComplaint() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userID = user.userID || user.id || user.UserID;

    if (!userID) {
      setError("Please login again");
      return;
    }
    if (!subject.trim() || !description.trim()) {
      setError("Subject and description are required");
      return;
    }

    setLoading(true);
    try {
      const result = await submitComplaint(
        userID,
        subject.trim(),
        description.trim()
      );
      if (result.status === "success") {
        setSuccess("Complaint submitted. Admin will review it.");
        setSubject("");
        setDescription("");
      } else {
        setError(result.message || "Failed to submit");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Submit a Complaint</h1>
        <p className="text-sm text-slate-500">
          Report an issue with a donation, request, or account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Donation not received"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#009689]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the issue..."
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#009689] resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#009689] hover:bg-[#007f73] text-white text-sm font-semibold rounded-xl disabled:opacity-60 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}