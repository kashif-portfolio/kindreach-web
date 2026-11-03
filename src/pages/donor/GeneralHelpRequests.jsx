import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listHelpRequests, fulfillHelpRequest } from '../../services/helpRequestService';
import { getMyDonations } from '../../services/donorService';
import { FileText, Package, Shirt, Utensils, Banknote, Clock3, MapPin, CalendarDays, UserRound, ShieldCheck, ChevronDown, Plus, HandHeart, Truck } from 'lucide-react';

export default function DonorHelpRequests() {

  // 1. Donor page ka data aur loading/error states.
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  // Har help request ke dropdown ki selected donation yahan save hoti hai.
  const [selectedDonations, setSelectedDonations] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 2. Approved help requests aur donor ki available donations load karo.
  useEffect(() => {
    let cancelled = false;
    async function loadPage() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const requestList = await listHelpRequests();
        const donationList = await getMyDonations(user.donorID);
        if (cancelled) return;
        if (requestList.status !== 'success') throw new Error(requestList.message);
        if (donationList.status !== 'success') throw new Error(donationList.message);

        setRequests(requestList.data || []);
        const available = (donationList.data || []).filter((item) => item.Status === 'Available');
        setDonations(available);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Could not load requests and donations');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPage();
    return () => { cancelled = true; };
  }, []);

  // 3. Dropdown change hone par us request ki donation ID update karo.
  function handleSelectDonation(helpRequestID, donationID) {
    setSelectedDonations({ ...selectedDonations, [helpRequestID]: donationID });
  }

  // 4. Selected donation offer karo, phir dono lists refresh karo.
  async function handleOffer(helpRequestID) {
    if (saving) return;
    const donationID = selectedDonations[helpRequestID];
    if (!donationID) {
      setError('Please select an available donation');
      return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const result = await fulfillHelpRequest(helpRequestID, Number(donationID));
      if (result.status !== 'success') throw new Error(result.message);
      setSuccess(result.message || 'Donation offered successfully');

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const requestList = await listHelpRequests();
      const donationList = await getMyDonations(user.donorID);
      if (requestList.status !== 'success') throw new Error(requestList.message);
      if (donationList.status !== 'success') throw new Error(donationList.message);
      setRequests(requestList.data || []);
      setDonations((donationList.data || []).filter((item) => item.Status === 'Available'));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not offer donation');
    } finally {
      setSaving(false);
    }
  }

  // Description mein save ki gayi location aur preference ko alag dikhao.
  function getDetails(description) {
    let text = '';
    let location = '';
    let preferred = '';
    const lines = String(description || '').split('\n');

    for (const line of lines) {
      if (line.startsWith('Location:')) {
        location = line.substring(9).trim();
      } else if (line.startsWith('Preferred:')) {
        preferred = line.substring(10).trim();
      } else {
        text = text + line + '\n';
      }
    }
    return { description: text.trim(), location: location, preferred: preferred };
  }

  // Ye functions sirf card ke colors aur icons select karte hain.
  function getStatusColor(status) {
    if (status === 'Approved' || status === 'Delivered') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Assigned') return 'bg-sky-50 text-sky-700 border-sky-200';
    if (status === 'Rejected') return 'bg-rose-50 text-rose-600 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }

  function getUrgencyColor(urgency) {
    if (urgency === 'Urgent') return 'bg-rose-50 text-rose-600 border-rose-200';
    if (urgency === 'Priority') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-600 border-slate-200';
  }

  function getTypeIcon(helpType) {
    const type = String(helpType || '').toLowerCase();
    if (type.includes('food')) return <Utensils className="w-5 h-5" />;
    if (type.includes('cloth')) return <Shirt className="w-5 h-5" />;
    if (type.includes('financ')) return <Banknote className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  }

  function getTypeColor(helpType) {
    const type = String(helpType || '').toLowerCase();
    if (type.includes('food')) return 'bg-amber-50 text-amber-600';
    if (type.includes('cloth')) return 'bg-sky-50 text-sky-600';
    return 'bg-emerald-50 text-[#009689]';
  }

  return (
    <section className="flex flex-col gap-6 p-2">
      <div>
        <h1 className="text-[20px] font-bold text-slate-900">General Help Requests</h1>
        <p className="text-[13px] text-slate-500 mt-1">Support verified applicants with an available donation.</p>
      </div>
      {loading && <p className="text-center text-[13px] text-slate-500 py-8">Loading help requests...</p>}
      {error && <p role="alert" className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
      {success && <p role="status" className="text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">{success}</p>}

      {!loading && !error && requests.length === 0 && <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center"><FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" /><p className="text-[13px] text-slate-500">No help requests found.</p></div>}

      {requests.map((item) => {
        const details = getDetails(item.Description);
        const status = item.DisplayStatus || item.Status || 'Pending';
        const urgency = item.Urgency || 'Normal';

        return (
          <article key={item.HelpRequestID} className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(item.HelpType)}`}>{getTypeIcon(item.HelpType)}</div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">{item.HelpType}</h3>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">Request #{String(item.HelpRequestID).padStart(3, '0')}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getUrgencyColor(urgency)}`}><Clock3 className="w-3 h-3" />{urgency}</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusColor(status)}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{status}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-slate-500">
              <span className="flex items-center gap-1.5"><UserRound className="w-3.5 h-3.5 text-slate-400" /><span className="font-medium text-slate-700">{item.NeedyName}</span></span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.VerificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                <ShieldCheck className="w-3 h-3" />{item.VerificationStatus || 'Pending'}
              </span>
            </div>

            {details.description && <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-600 bg-slate-50/60 border border-slate-100 rounded-xl px-4 py-3">{details.description}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px]">
              <div><p className="text-[11px] text-slate-400 mb-1">Quantity / amount</p><p className="font-semibold text-slate-800">{item.Quantity || '—'}</p></div>
              {details.location && <div><p className="text-[11px] text-slate-400 mb-1">Location</p><p className="flex items-start gap-1.5 font-medium text-slate-600"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{details.location}</p></div>}
              {item.CreatedAt && <div><p className="text-[11px] text-slate-400 mb-1">Submitted</p><p className="flex items-center gap-1.5 font-medium text-slate-600"><CalendarDays className="w-3.5 h-3.5" />{String(item.CreatedAt).split(' ')[0]}</p></div>}
            </div>
            {details.preferred && <p className="text-[11px] text-slate-400">Preferred donor: <span className="text-slate-500">{details.preferred}</span></p>}
            {item.DonationTitle && <p className="flex items-center gap-2 text-[12px] font-medium text-[#007f73] bg-emerald-50/60 px-3 py-2.5 rounded-xl"><Package className="w-4 h-4 shrink-0" />Allocated donation: {item.DonationTitle}</p>}

            {item.Status === 'Approved' && !item.DonationRequestID && (
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                <label htmlFor={`offer-${item.HelpRequestID}`} className="text-[11px] font-semibold text-slate-500">Offer an available donation</label>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-full sm:w-auto sm:min-w-72 sm:max-w-md flex-1">
                    <select id={`offer-${item.HelpRequestID}`} aria-label="Your available donation" className="w-full h-10 pl-3.5 pr-9 bg-white border border-slate-200 rounded-xl text-[12px] text-slate-600 appearance-none outline-none focus:border-[#009689] transition-colors cursor-pointer" value={selectedDonations[item.HelpRequestID] || ''} onChange={(event) => handleSelectDonation(item.HelpRequestID, event.target.value)}>
                      <option value="">Select a matching donation...</option>
                      {donations.map((donation) => <option key={donation.DonationID} value={donation.DonationID}>{donation.Title} — {donation.TypeName} — Qty {donation.Quantity}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <button type="button" disabled={saving || !selectedDonations[item.HelpRequestID]} className="h-10 inline-flex items-center justify-center gap-1.5 px-4 text-[12px] font-semibold text-white bg-[#009689] hover:bg-[#007b70] rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleOffer(item.HelpRequestID)}><HandHeart className="w-3.5 h-3.5" />Offer donation</button>
                  <Link className="h-10 inline-flex items-center justify-center gap-1.5 px-3.5 text-[12px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors" to="/donor/add-donation"><Plus className="w-3.5 h-3.5" />Post a donation</Link>
                </div>
                {donations.length === 0 && <p className="text-[11px] text-slate-400">No available donations yet. Post a donation to offer your support.</p>}
              </div>
            )}
            {(item.DisplayStatus || item.Status) === 'Assigned' && (
              <div className="border-t border-slate-100 pt-4">
                <Link className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#009689] hover:bg-[#007b70] text-white text-[12px] font-semibold rounded-xl transition-colors" to="/donor/schedule-delivery"><Truck className="w-3.5 h-3.5" />Schedule delivery</Link>
              </div>
            )}

          </article>
        );
      })}

    </section>
  );
}
