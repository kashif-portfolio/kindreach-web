import React, { useState } from "react";
import { X } from "lucide-react";

const RegisterDonorModal = ({ onClose, onRegister }) => {
  // Form ki values isi donor modal mein rakhi hain.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    cnic: "",
    organization: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Jis input mein likhein, uski value formData mein update hoti hai.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      // Save successful hone par hi modal close hoga.
      await onRegister(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not register donor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-donor-title"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-125 overflow-hidden flex flex-col border border-slate-100"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 id="register-donor-title" className="text-base font-bold text-slate-900">
            Register Donor
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={saving}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto"
        >
          {error && (
            <p
              role="alert"
              className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2"
            >
              {error}
            </p>
          )}
          <fieldset disabled={saving} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="donor-name" className="text-xs font-semibold text-slate-700">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="donor-email" className="text-xs font-semibold text-slate-700">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-email"
                name="email"
                type="email"
                required
                maxLength={100}
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="donor-phone" className="text-xs font-semibold text-slate-700">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="donor-location" className="text-xs font-semibold text-slate-700">
                Location / Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-location"
                name="location"
                type="text"
                required
                maxLength={255}
                value={formData.location}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="donor-cnic" className="text-xs font-semibold text-slate-700">
                CNIC <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-cnic"
                name="cnic"
                type="text"
                required
                maxLength={20}
                value={formData.cnic}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="donor-organization" className="text-xs font-semibold text-slate-700">
                Organization (optional)
              </label>
              <input
                id="donor-organization"
                name="organization"
                type="text"
                maxLength={100}
                value={formData.organization}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="donor-password" className="text-xs font-semibold text-slate-700">
                Initial Password <span className="text-rose-500">*</span>
              </label>
              <input
                id="donor-password"
                name="password"
                type="password"
                required
                maxLength={128}
                minLength={6}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#009689]"
              />
            </div>
          </fieldset>
          <p className="text-xs text-slate-500">
            The donor account will be active. Share the initial password privately; the donor can
            change it in My Profile.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#009689] hover:bg-[#007f73] rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {saving ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDonorModal;
