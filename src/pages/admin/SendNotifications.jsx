import React, { useState, useEffect } from "react";
import { sendNotification, getNotifications } from "../../services/adminService";
import { Send, ChevronDown } from "lucide-react";

// UI label → API sendTo value
const mapSendTo = (value) => {
  if (value === "All Donors") return "Donors";
  if (value === "All Needy Persons") return "Needy";
  return "All"; // All Users
};

export default function SendNotifications() {
  const [sendTo, setSendTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadHistory = async () => {
  try {
    const result = await getNotifications(); // no userID
    if (result.status === "success") {
      const rows = result.data || [];

      // Same title + same date → ek hi entry (broadcast)
      const seen = new Map();
      rows.forEach((item) => {
        const date = item.CreatedAt
          ? String(item.CreatedAt).split(" ")[0]
          : "";
        const key = `${item.Title}|${date}`;
        if (!seen.has(key)) {
          seen.set(key, {
            id: item.NotificationID,
            title: item.Title,
            target: "Users",
            date,
            status: "Sent",
          });
        }
      });

      setHistory(Array.from(seen.values()));
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!sendTo || !subject || !message) {
      alert("Please fill in all required fields!");
      return;
    }

    setSending(true);
    try {
      const result = await sendNotification(
        subject,
        message,
        mapSendTo(sendTo)
      );
      if (result.status === "success") {
        alert(
          result.count
            ? `Notification sent to ${result.count} user(s)!`
            : "Notification sent successfully!"
        );
        setSubject("");
        setMessage("");
        setSendTo("");
        await loadHistory();
      } else {
        alert(result.message || "Failed to send");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
          Send Notifications
        </h1>
        <p className="text-[13px] text-slate-500">
          Broadcast messages to platform users
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Compose */}
        <div className="col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
          <h3 className="text-[15px] font-bold text-slate-900">
            Compose Notification
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-700">
                Send To <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="All Users">All Users</option>
                  <option value="All Donors">All Donors</option>
                  <option value="All Needy Persons">All Needy Persons</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-700">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Notification subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:border-[#009689] shadow-2xs resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="w-full h-11 bg-[#009689] hover:bg-teal-700 text-white rounded-xl text-[13px] font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>

        {/* History */}
        <div className="col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col gap-5">
          <h3 className="text-[15px] font-bold text-slate-900">Sent History</h3>

          <div className="flex flex-col divide-y divide-slate-100">
            {loading && (
              <p className="text-[13px] text-slate-400">Loading...</p>
            )}
            {!loading && history.length === 0 && (
              <p className="text-[13px] text-slate-400">No notifications yet.</p>
            )}
            {history.map((item) => (
              <div
                key={item.id}
                className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-[13px] font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <span className="text-[12px] text-slate-500">
                    To: {item.target}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {item.status}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}