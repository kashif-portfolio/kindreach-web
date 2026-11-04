import React, { useState, useRef } from "react";
import { submitHelpRequest } from "../../services/needyService";

export default function RequestHelp() {
  // Page ki states
  const [formData, setFormData] = useState({
    helpType: "",
    description: "",
    quantity: "",
    location: "",
    urgency: "",
    preferredDonor: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Supporting document
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Input ki value update karo.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.helpType || formData.helpType === "Select...") {
      setError("Please select help type");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please describe what you need");
      return;
    }
    if (!formData.quantity.trim()) {
      setError("Please enter quantity / amount");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.needyID) {
      setError("Please login as Needy again");
      return;
    }

    // Urgency ko database ki value mein badlo.
    let urgency = "Normal";
    if (formData.urgency.includes("Priority")) urgency = "Priority";
    else if (formData.urgency.includes("Urgent")) urgency = "Urgent";

    // Location aur donor preference description mein rakho.
    let fullDescription = formData.description.trim();
    if (formData.location.trim()) {
      fullDescription += `\nLocation: ${formData.location.trim()}`;
    }
    if (formData.preferredDonor && formData.preferredDonor !== "Select...") {
      fullDescription += `\nPreferred: ${formData.preferredDonor}`;
    }
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("needyID", user.needyID);
      payload.append("helpType", formData.helpType);
      payload.append("description", fullDescription);
      payload.append("quantity", formData.quantity.trim());
      payload.append("urgency", urgency);
      if (selectedFile) payload.append("document", selectedFile);
      const result = await submitHelpRequest(payload);

      if (result.status === "success") {
        setSuccess("Help request submitted successfully!");
        setFormData({
          helpType: "",
          description: "",
          quantity: "",
          location: "",
          urgency: "",
          preferredDonor: "",
        });
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(result.message || "Failed to submit");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      helpType: "",
      description: "",
      quantity: "",
      location: "",
      urgency: "",
      preferredDonor: "",
    });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setError("");
    setSuccess("");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <p className="text-xs text-slate-400 mb-1">Home / Request Help</p>
        <h1 className="text-xl font-bold text-slate-800">Request Help</h1>
        <p className="text-sm text-slate-500">Request a specific item or financial assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Help Type *</label>
            <select
              name="helpType"
              value={formData.helpType}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-[#009689]"
            >
              <option value="">Select...</option>
              <option value="Financial Aid">Financial Aid</option>
              <option value="Food Items">Food Items</option>
              <option value="Clothes">Clothes</option>
              <option value="Old Household Items">Old Household Items</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What do you need? *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain what is needed and how it will support your household."
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity / Requested Amount *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. PKR 5,000 or 2 food packs"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Karachi"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency *</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-[#009689]"
              >
                <option value="">Select...</option>
                <option value="Normal - within 7 days">Normal - within 7 days</option>
                <option value="Priority - within 3 days">Priority - within 3 days</option>
                <option value="Urgent - within 24 Hours">Urgent - within 24 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Donor (Optional)
              </label>
              <select
                name="preferredDonor"
                value={formData.preferredDonor}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-[#009689]"
              >
                <option value="">Select...</option>
                <option value="Any Suitable Donor">Any Suitable Donor</option>
              </select>
            </div>
          </div>

          {/* Selected document ka naam */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supporting Document (Optional)
            </label>
            <div className="flex flex-col w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                <div className="flex flex-col items-center justify-center pt-3 pb-3 px-4 text-center">
                  <svg
                    className="w-6 h-6 mb-1 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-xs text-slate-500 font-medium">
                    <span className="text-[#009689]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    PDF, PNG or JPG (MAX. 10MB) — optional
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedFile(file);
                  }}
                />
              </label>

              {/* Upload ke liye select hui file ka naam dikhao. */}
              {selectedFile && (
                <p className="mt-2 text-xs text-[#009689] font-medium">
                  Selected: {selectedFile.name}
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="ml-2 text-slate-500 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg">
              {success}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#009689] text-white rounded-lg text-sm font-medium hover:bg-[#00796b] transition-all cursor-pointer disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Help Request"}
            </button>
          </div>
        </form>

        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm h-fit space-y-4">
          <h3 className="text-sm font-bold text-slate-800">How matching works</h3>
          <ol className="space-y-3.5 text-xs text-slate-600">
            <li className="flex gap-3 items-start">
              <span className="font-semibold text-slate-700">1</span>
              <span>Your verified profile is attached securely.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="font-semibold text-slate-700">2</span>
              <span>System stores type, city, urgency for matching.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="font-semibold text-slate-700">3</span>
              <span>Admin or a suitable donor can review the request.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="font-semibold text-slate-700">4</span>
              <span>You can track related updates on My Requests / Chat.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
