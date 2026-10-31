import React, { useState, useEffect } from "react";
import {
  getAllDonations,
  getAllNeedy,
  assignDonation,
} from "../../services/adminService";
import { UserCheck, ChevronDown } from "lucide-react";

export default function AssignDonations() {
  const [selectedDonationId, setSelectedDonationId] = useState("");
  const [selectedNeedyId, setSelectedNeedyId] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [availableDonations, setAvailableDonations] = useState([]);
  const [needyList, setNeedyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [donRes, needyRes] = await Promise.all([
          getAllDonations(),
          getAllNeedy(),
        ]);

        if (donRes.status === "success") {
          const available = (donRes.data || [])
            .filter((d) => (d.Status || "") === "Available")
            .map((d) => ({
              id: d.DonationID,
              title: d.Title || "Donation",
              postedDate: d.CreatedAt
                ? `Posted ${String(d.CreatedAt).split(" ")[0]}`
                : "",
              donor: d.DonorName || "—",
              category: d.TypeName || "—",
              quantity: d.Quantity || "—",
              location: d.Location || "—",
              status: d.Status || "Available",
            }));
          setAvailableDonations(available);
        }

        if (needyRes.status === "success") {
          const all = needyRes.data || [];
          const verified = all.filter((n) => {
            const s = n.Status || n.status || "";
            return s === "Approved" || s === "Verified" || s === "Active";
          });
          const source = verified.length ? verified : all;
          setNeedyList(
            source.map((n) => ({
              id: n.NeedyID || n.needyID,
              label: `${n.Name || n.name || "Needy"}${
                n.City || n.Address ? ` (${n.City || n.Address})` : ""
              }`,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRowClick = (item) => {
    setSelectedRowId(item.id);
    setSelectedDonationId(String(item.id));
  };

  const handleAssign = async () => {
    if (!selectedDonationId) {
      alert("Please select a donation first!");
      return;
    }
    if (!selectedNeedyId) {
      alert("Please select a verified recipient!");
      return;
    }

    setAssigning(true);
    try {
      const result = await assignDonation(
        Number(selectedDonationId),
        Number(selectedNeedyId)
      );
      if (result.status === "success") {
        alert("Donation assigned successfully!");
        setAvailableDonations((prev) =>
          prev.filter((d) => d.id !== Number(selectedDonationId))
        );
        setSelectedDonationId("");
        setSelectedNeedyId("");
        setSelectedRowId(null);
      } else {
        alert(result.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
          Assign Donations
        </h1>
        <p className="text-[13px] text-slate-500">
          Match available donations with verified needy persons
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-slate-900">
              Create Assignment
            </h3>
            <p className="text-[12px] text-slate-500">
              Select a donation and a verified recipient, then confirm the
              assignment.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {availableDonations.length} available
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4 flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-700">
              Available donation
            </label>
            <div className="relative">
              <select
                value={selectedDonationId}
                onChange={(e) => {
                  setSelectedDonationId(e.target.value);
                  setSelectedRowId(
                    e.target.value ? Number(e.target.value) : null
                  );
                }}
                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
              >
                <option value="">Select...</option>
                {availableDonations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.quantity})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="col-span-5 flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-700">
              Verified recipient
            </label>
            <div className="relative">
              <select
                value={selectedNeedyId}
                onChange={(e) => setSelectedNeedyId(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
              >
                <option value="">Select...</option>
                {needyList.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="col-span-3">
            <button
              type="button"
              onClick={handleAssign}
              disabled={assigning}
              className="w-full h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <UserCheck className="w-4 h-4" />
              {assigning ? "Assigning..." : "Assign Donation"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col gap-0.5 bg-slate-50/40">
          <h3 className="text-[14px] font-bold text-slate-900">
            Available Donations
          </h3>
          <p className="text-[12px] text-slate-500">
            Click a row to select it for assignment.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3.5 px-6 w-12"></th>
                <th className="py-3.5 px-4">Donation</th>
                <th className="py-3.5 px-4">Donor</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {loading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && availableDonations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No available donations.
                  </td>
                </tr>
              )}
              {availableDonations.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                    selectedRowId === item.id ? "bg-teal-50/40" : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="radio"
                      name="donationSelection"
                      checked={selectedRowId === item.id}
                      onChange={() => handleRowClick(item)}
                      className="w-4 h-4 accent-[#009689] cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.postedDate}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    {item.donor}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{item.category}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{item.location}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}