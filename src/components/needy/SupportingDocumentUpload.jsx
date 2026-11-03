import { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Download, CheckCircle2, LoaderCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { downloadDocument } from '../../services/helpRequestService';

export default function SupportingDocumentUpload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let active = true;
    api.get('/documents/status.php').then((res) => {
      if (active) setDocumentInfo(res.data.data.hasDocument ? res.data.data : null);
    }).catch(() => {
      if (active) setError('Could not check your saved document. Refresh to try again.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const selectFile = (event) => {
    const selected = event.target.files?.[0] || null;
    setError(''); setSuccess(''); setFile(null);
    if (selected && selected.size > 10 * 1024 * 1024) {
      setError('Please choose a document smaller than 10 MB.');
      event.target.value = '';
      return;
    }
    setFile(selected);
  };

  const upload = async () => {
    if (!file || busy) return;
    setBusy(true); setError(''); setSuccess('');
    try {
      const data = new FormData();
      data.append('document', file);
      const result = (await api.post('/documents/upload.php', data, { headers: { 'Content-Type': undefined } })).data;
      if (result.status !== 'success') throw new Error(result.message);
      setDocumentInfo(result.data);
      setSuccess('Document uploaded successfully. Your admin can now review it.');
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) { setError(err.response?.data?.message || err.message || 'Upload failed. Please try again.'); }
    finally { setBusy(false); }
  };

  const download = async () => {
    setDownloading(true); setError('');
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await downloadDocument({ needyID: user.needyID });
    } catch (err) { setError(err.message || 'Could not download your document.'); }
    finally { setDownloading(false); }
  };

  const sizeLabel = (bytes) => bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round((bytes || 0) / 1024))} KB`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900">Supporting Document</h2>
          <p className="text-[12px] text-slate-500 mt-1">Upload a document for admin verification. Only you and admin can download it.</p>
        </div>
        <FileText className="w-5 h-5 text-[#009689] shrink-0 mt-0.5" />
      </div>
      {loading && <p className="flex items-center gap-2 text-[13px] text-slate-500"><LoaderCircle className="w-4 h-4 animate-spin" />Checking uploaded document...</p>}
      {!loading && documentInfo && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[13px] font-semibold text-slate-900">Supporting document uploaded</p>
              <p className="text-[12px] text-slate-500 mt-0.5">{documentInfo.fileType?.toUpperCase()} · {sizeLabel(documentInfo.fileSize)} · Saved</p>
            </div>
          </div>
          <button type="button" disabled={downloading} onClick={download} className="flex items-center justify-center gap-2 px-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-[12px] font-semibold text-[#007f73] hover:bg-emerald-50 cursor-pointer disabled:opacity-60 disabled:cursor-wait">
            {downloading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? 'Downloading...' : 'Download document'}
          </button>
        </div>
      )}
      {!loading && !documentInfo && <p className="text-[13px] text-slate-500 mb-4">No supporting document uploaded yet.</p>}
      <input ref={inputRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" disabled={busy || loading} onChange={selectFile} aria-label="Choose supporting document" />
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" disabled={busy || loading} onClick={() => inputRef.current?.click()} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-60 disabled:cursor-wait">
          <FileText className="w-4 h-4" />{documentInfo ? 'Choose replacement' : 'Choose document'}
        </button>
        {file && <button type="button" disabled={busy} onClick={upload} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#009689] hover:bg-[#007f73] text-white text-[13px] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-wait">
          {busy ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {busy ? 'Uploading...' : documentInfo ? 'Upload replacement' : 'Upload document'}
        </button>}
      </div>
      {file && <p className="text-[12px] text-slate-600 mt-3 break-words">Selected: <span className="font-semibold">{file.name}</span> · {sizeLabel(file.size)}</p>}
      <p className="text-[11px] text-slate-400 mt-3">PDF, PNG or JPG · Maximum 10 MB{documentInfo ? ' · A replacement will become your current document.' : ''}</p>
      {success && <p role="status" className="flex items-start gap-2 text-[12px] text-emerald-700 mt-4"><CheckCircle2 className="w-4 h-4 shrink-0" />{success}</p>}
      {error && <p role="alert" className="flex items-start gap-2 text-[12px] text-red-600 mt-4"><AlertCircle className="w-4 h-4 shrink-0" />{error}</p>}
    </section>
  );
}
