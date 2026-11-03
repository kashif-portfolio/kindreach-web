import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listHelpRequests, reviewHelpRequest, fulfillHelpRequest, downloadDocument } from '../../services/helpRequestService';
import { getMyDonations } from '../../services/donorService';
import { FileText, Package, Shirt, Utensils, Banknote, UserRound, ShieldCheck, Clock3, MapPin, CalendarDays, Download, ChevronDown, Plus, HandHeart, Check, X, Truck } from 'lucide-react';

const statusColors = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Assigned: 'bg-sky-50 text-sky-700 border-sky-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-200',
};

// Location and preference were saved as separate lines in the description.
function requestDetails(description) {
  const details = { description: [], location: '', preferred: '' };
  String(description || '').split('\n').forEach((line) => {
    if (/^Location:/i.test(line)) details.location = line.replace(/^Location:\s*/i, '');
    else if (/^Preferred:/i.test(line)) details.preferred = line.replace(/^Preferred:\s*/i, '');
    else details.description.push(line);
  });
  return { ...details, description: details.description.join('\n').trim() };
}

export default function GeneralHelpRequests() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [rows, setRows] = useState([]);
  const [donations, setDonations] = useState([]);
  const [selection, setSelection] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const load = useCallback(async () => {
    const result = await listHelpRequests();
    if (result.status !== 'success') throw new Error(result.message || 'Could not load help requests');
    setRows(result.data || []);
    if (user.role === 'Donor') {
      const list = await getMyDonations(user.donorID);
      if (list.status !== 'success') throw new Error(list.message || 'Could not load donations');
      setDonations((list.data || []).filter((item) => item.Status === 'Available'));
    }
  }, [user.role, user.donorID]);
  useEffect(() => {
    Promise.resolve().then(load).catch((err) => setError(err.response?.data?.message || err.message)).finally(() => setLoading(false));
  }, [load]);
  const act = async (request) => {
    setBusy(true); setError(''); setSuccess('');
    try {
      const result = await request();
      if (result.status !== 'success') throw new Error(result.message || 'Action failed');
      setSuccess(result.message || 'Saved successfully');
      await load();
    } catch (err) { setError(err.response?.data?.message || err.message); }
    finally { setBusy(false); }
  };
  return (
    <section className="flex flex-col gap-6 p-2">
      <div>
        <h1 className="text-[20px] font-bold text-slate-900">General Help Requests</h1>
        <p className="text-[13px] text-slate-500 mt-1">{user.role === 'Needy' ? 'Track your help requests and donation updates.' : user.role === 'Admin' ? 'Review applicants’ needs and approve requests for donor support.' : 'Support verified applicants with an available donation.'}</p>
      </div>
      {loading && <p className="text-center text-[13px] text-slate-500 py-8">Loading help requests...</p>}
      {error && <p role="alert" className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
      {success && <p role="status" className="text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">{success}</p>}
      {!loading && !error && rows.length === 0 && <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center"><FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" /><p className="text-[13px] text-slate-500">No help requests found.</p></div>}
      {rows.map((item) => {
        const details = requestDetails(item.Description);
        const status = item.DisplayStatus || item.Status || 'Pending';
        const urgency = item.Urgency || 'Normal';
        const urgentColor = urgency === 'Urgent' ? 'bg-rose-50 text-rose-600 border-rose-200' : urgency === 'Priority' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200';
        const type = String(item.HelpType || '').toLowerCase();
        const TypeIcon = type.includes('food') ? Utensils : type.includes('cloth') ? Shirt : type.includes('financ') ? Banknote : Package;
        const typeColor = type.includes('food') ? 'bg-amber-50 text-amber-600' : type.includes('cloth') ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-[#009689]';
        return (
        <article key={item.HelpRequestID} className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${typeColor}`}><TypeIcon className="w-5 h-5" /></div>
              <div><h3 className="text-[14px] font-bold text-slate-900">{item.HelpType}</h3><p className="text-[11px] font-medium text-slate-400 mt-1">Request #{String(item.HelpRequestID).padStart(3, '0')}</p></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${urgentColor}`}><Clock3 className="w-3 h-3" />{urgency}</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${statusColors[status] || statusColors.Pending}`}><span className="w-1.5 h-1.5 rounded-full bg-current" />{status}</span>
            </div>
          </div>
          {user.role !== 'Needy' && <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-slate-500"><span className="flex items-center gap-1.5"><UserRound className="w-3.5 h-3.5 text-slate-400" /><span className="font-medium text-slate-700">{item.NeedyName}</span></span><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.VerificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}><ShieldCheck className="w-3 h-3" />{item.VerificationStatus || 'Pending'}</span></div>}
          {details.description && <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-600 bg-slate-50/60 border border-slate-100 rounded-xl px-4 py-3">{details.description}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px]">
            <div><p className="text-[11px] text-slate-400 mb-1">Quantity / amount</p><p className="font-semibold text-slate-800">{item.Quantity || '—'}</p></div>
            {details.location && <div><p className="text-[11px] text-slate-400 mb-1">Location</p><p className="flex items-start gap-1.5 font-medium text-slate-600"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{details.location}</p></div>}
            {item.CreatedAt && <div><p className="text-[11px] text-slate-400 mb-1">Submitted</p><p className="flex items-center gap-1.5 font-medium text-slate-600"><CalendarDays className="w-3.5 h-3.5" />{String(item.CreatedAt).split(' ')[0]}</p></div>}
          </div>
          {details.preferred && <p className="text-[11px] text-slate-400">Preferred donor: <span className="text-slate-500">{details.preferred}</span></p>}
          {item.DonationTitle && <p className="flex items-center gap-2 text-[12px] font-medium text-[#007f73] bg-emerald-50/60 px-3 py-2.5 rounded-xl"><Package className="w-4 h-4 shrink-0" />Allocated donation: {item.DonationTitle}</p>}
          {(item.SupportingDocument && ['Admin', 'Needy'].includes(user.role) || user.role === 'Admin' && item.Status === 'Pending' || user.role === 'Donor' && ['Approved', 'Assigned'].includes(item.DisplayStatus || item.Status)) && <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
          {item.SupportingDocument && ['Admin', 'Needy'].includes(user.role) && (
            <button type="button" className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer" onClick={() => downloadDocument({ helpRequestID: item.HelpRequestID }).catch((err) => setError(err.message))}><Download className="w-3.5 h-3.5" />Supporting document</button>
          )}
          {user.role === 'Admin' && item.Status === 'Pending' && <div className="flex gap-3">
            <button disabled={busy} type="button" className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-[#009689] hover:bg-[#007b70] rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => act(() => reviewHelpRequest(item.HelpRequestID, 'Approved'))}><Check className="w-3.5 h-3.5" />Approve request</button>
            <button disabled={busy} type="button" className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => act(() => reviewHelpRequest(item.HelpRequestID, 'Rejected'))}><X className="w-3.5 h-3.5" />Reject</button>
          </div>}
          {user.role === 'Donor' && item.Status === 'Approved' && !item.DonationRequestID && <div className="flex flex-col gap-2">
            <label htmlFor={`offer-${item.HelpRequestID}`} className="text-[11px] font-semibold text-slate-500">Offer an available donation</label>
            <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-auto sm:min-w-72 sm:max-w-md flex-1">
            <select id={`offer-${item.HelpRequestID}`} aria-label="Your available donation" className="w-full h-10 pl-3.5 pr-9 bg-white border border-slate-200 rounded-xl text-[12px] text-slate-600 appearance-none outline-none focus:border-[#009689] transition-colors cursor-pointer" value={selection[item.HelpRequestID] || ''} onChange={(e) => setSelection({ ...selection, [item.HelpRequestID]: e.target.value })}>
              <option value="">Select a matching donation...</option>
              {donations.map((donation) => <option key={donation.DonationID} value={donation.DonationID}>{donation.Title} — {donation.TypeName} — Qty {donation.Quantity}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <button type="button" disabled={busy || !selection[item.HelpRequestID]} className="h-10 inline-flex items-center justify-center gap-1.5 px-4 text-[12px] font-semibold text-white bg-[#009689] hover:bg-[#007b70] rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => act(() => fulfillHelpRequest(item.HelpRequestID, Number(selection[item.HelpRequestID])))}><HandHeart className="w-3.5 h-3.5" />Offer donation</button>
            <Link className="h-10 inline-flex items-center justify-center gap-1.5 px-3.5 text-[12px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors" to="/donor/add-donation"><Plus className="w-3.5 h-3.5" />Post a donation</Link>
            </div>
            {donations.length === 0 && <p className="text-[11px] text-slate-400">No available donations yet. Post a donation to offer your support.</p>}
          </div>}
          {user.role === 'Donor' && item.DisplayStatus === 'Assigned' && <Link className="self-start inline-flex items-center gap-1.5 px-4 py-2 bg-[#009689] hover:bg-[#007b70] text-white text-[12px] font-semibold rounded-xl transition-colors" to="/donor/schedule-delivery"><Truck className="w-3.5 h-3.5" />Schedule delivery</Link>}
          </div>}
        </article>
      );})}
    </section>
  );
}
