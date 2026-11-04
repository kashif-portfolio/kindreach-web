import React, { useState } from "react";
import { XCircle } from "lucide-react";

export default function DeleteDonationModal({ isOpen, onClose, donation, onDelete }) {
  // Page ki states
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !donation) return null;

  // Page ke action handlers
  function handleClose() {
    setError("");
    onClose();
  }

  async function handleConfirm() {
    if (deleting) return;
    setDeleting(true);
    setError("");
    try {
      await onDelete(donation.id);
      handleClose(); // Delete hone ke baad modal band karo.
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not delete donation");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="DeleteDonationModal-title"
        className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 w-full max-w-md"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-full shrink-0 bg-rose-50 text-rose-600">
            <XCircle size={22} />
          </div>
          <div>
            <h3 id="DeleteDonationModal-title" className="text-base font-bold text-slate-800">
              Delete Donation
            </h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              Permanently delete this donation? Only available donations without requests can be
              deleted.
            </p>
          </div>
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-600 mt-3">
            {error}
          </p>
        )}
        <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClose}
            disabled={deleting}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50 bg-rose-600 hover:bg-rose-700"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
