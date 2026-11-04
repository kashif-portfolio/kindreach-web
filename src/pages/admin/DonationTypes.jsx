import React, { useState, useEffect } from "react";
import {
  getDonationTypes,
  updateDonationType,
  addDonationType,
  deleteDonationType,
} from "../../services/adminService";
import AddDonationTypeModal from "../../components/admin/AddDonationTypeModal";
import EditDonationTypeModal from "../../components/admin/EditDonationTypeModal";
import DeleteDonationTypeModal from "../../components/admin/DeleteDonationTypeModal";
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function DonationTypes() {
  // Page ki states
  const [donationTypes, setDonationTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATE: Add Donation Type modal ko open/close karne ke liye
  const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);

  // Page ka data load aur update karo.
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getDonationTypes();
        if (result.status === "success") {
          const mapped = (result.data || []).map((item) => ({
            id: item.TypeID,
            title: item.TypeName,
            description: item.Description || "",
            donations: `${item.TotalDonations || 0} donations`,
          }));
          mapped.sort((a, b) => b.id - a.id); // Naye records pehle dikhayein.
          setDonationTypes(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // PAGINATION STATES: Current page aur items per page track karne ke liye
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ADD HANDLER: Naye donation type ko form se lekar state mein top par add karne ka function
  const handleAddDonationType = async (newType) => {
    try {
      const result = await addDonationType(newType.typeName, newType.description || "");
      if (result.status === "success") {
        // API se list dobara lao.
        const list = await getDonationTypes();
        if (list.status === "success") {
          const mapped = (list.data || []).map((item) => ({
            id: item.TypeID,
            title: item.TypeName,
            description: item.Description || "",
            donations: `${item.TotalDonations || 0} donations`,
          }));
          mapped.sort((a, b) => b.id - a.id); // Nayi entry upar rakho.
          setDonationTypes(mapped);
          setCurrentPage(1);
        }
        setCurrentPage(1);
      } else {
        alert(result.message || "Failed to add");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // DELETE HANDLER: Specific ID ki buniyad par row ko delete karne ka function
  const handleDelete = (id) => {
    setDonationTypes(donationTypes.filter((item) => item.id !== id));
  };

  const handleUpdateDonationType = async (updatedItem) => {
    const result = await updateDonationType(updatedItem);
    if (result.status !== "success") throw new Error(result.message || "Could not update category");
    setDonationTypes(
      donationTypes.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleConfirmDelete = async () => {
    if (!selectedItemToDelete) return;

    try {
      const result = await deleteDonationType(selectedItemToDelete.id);
      if (result.status === "success") {
        setDonationTypes((prev) => prev.filter((item) => item.id !== selectedItemToDelete.id));
        setIsDeleteModalOpen(false);
        setSelectedItemToDelete(null);
      } else {
        alert(result.message || "Cannot delete");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed (type may be in use)");
    }
  };

  // Current page ki rows
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donationTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donationTypes.length / itemsPerPage);

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-6">
      {/* Page ka title aur add button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Donation Types</h1>
          <p className="text-[13px] text-slate-500">Manage available categories for donations</p>
        </div>
        <button
          onClick={() => setIsAddTypeModalOpen(true)}
          className="px-4 py-2.5 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Type
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading...</p>}

      {/* Types ki table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
        <table className="w-full text-left border-collapse">
          {/* Columns ke naam */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3.5 px-6">Type Name</th>
              <th className="py-3.5 px-6">Description</th>
              <th className="py-3.5 px-6">Total Donations</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table ki rows */}
          <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Type ka naam */}
                  <td className="py-4 px-6 font-semibold text-slate-900">{item.title}</td>

                  {/* Tafseel */}
                  <td className="py-4 px-6 text-slate-500 max-w-md truncate">{item.description}</td>

                  {/* Donations ki tadaad */}
                  <td className="py-4 px-6 font-medium text-slate-800">
                    <span className="px-2.5 py-1 bg-emerald-50 text-[#009689] rounded-full text-xs font-semibold">
                      {item.donations}
                    </span>
                  </td>

                  {/* Edit aur delete buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit button */}
                      <button
                        onClick={() => {
                          setSelectedItemToEdit(item);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {/* Delete button */}
                      <button
                        onClick={() => {
                          setSelectedItemToDelete(item);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer border border-slate-200"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-400 text-xs">
                  No donation types found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pages ke buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-white">
          <span className="text-[13px] text-slate-500">Showing {donationTypes.length} results</span>

          <div className="flex items-center gap-1.5">
            {/* Pichla page */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {/* Current page */}
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-[#009689] text-white shadow-xs flex items-center justify-center cursor-pointer">
              {currentPage}
            </button>

            {/* Agla page */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Nayi type ka modal */}
      <AddDonationTypeModal
        isOpen={isAddTypeModalOpen}
        onClose={() => setIsAddTypeModalOpen(false)}
        onAdd={handleAddDonationType}
      />

      <EditDonationTypeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateDonationType}
        donationData={selectedItemToEdit}
      />
      <DeleteDonationTypeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        donationTitle={selectedItemToDelete?.title}
      />
    </div>
  );
}
