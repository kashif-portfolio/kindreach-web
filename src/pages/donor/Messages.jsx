import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { sendMessage, getMessages } from '../../services/messageService';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const loadMessages = async () => {
    try {
      const result = await getMessages();
      if (result.status === 'success') {
        const mapped = result.data.map((item) => ({
          id: item.MessageID,
          sender: item.Name,
          text: item.Message,
          time: item.CreatedAt
            ? new Date(item.CreatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : '',
          type: String(item.UserID) === String(currentUser.userID) ? 'sent' : 'received',
          role: item.RoleName,
        }));
        setMessages(mapped);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    const timer = setInterval(loadMessages, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser.userID) return;

    setSending(true);
    try {
      const result = await sendMessage(currentUser.userID, newMessage.trim());
      if (result.status === 'success') {
        setNewMessage('');
        await loadMessages();
      } else {
        alert(result.message || 'Failed to send');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full pb-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Messages</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Shared chat — address, pickup time and updates
        </p>
      </div>

      {/* Main Chat Container Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl">

        {/* Chat Header Info */}
        <div className="p-3.5 border-b border-slate-200 bg-white">
          <h2 className="text-xs font-bold text-slate-900">Community Chat</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            All donors and needy can see messages here
          </p>
        </div>

        {/* Chat Messages Body Area */}
        <div className="p-4 h-65 overflow-y-auto space-y-3 bg-white flex flex-col">
          {loading && (
            <p className="text-center text-slate-400 text-xs py-6">Loading...</p>
          )}

          {!loading && messages.length === 0 && (
            <p className="text-center text-slate-400 text-xs py-6">
              No messages yet. Start the conversation!
            </p>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed shadow-sm ${
                  msg.type === 'sent'
                    ? 'bg-[#009689] text-white rounded-br-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-bl-none'
                }`}
              >
                {/* Show name on received messages */}
                {msg.type === 'received' && (
                  <p className="text-[10px] font-bold text-[#009689] mb-1">
                    {msg.sender}
                    {msg.role ? ` · ${msg.role}` : ''}
                  </p>
                )}
                <p>{msg.text}</p>
                {msg.time && (
                  <p
                    className={`text-[9px] mt-1 ${
                      msg.type === 'sent' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Message Input Footer Area */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-4 py-2 bg-[#009689] hover:bg-[#007f73] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sending ? '...' : 'Send'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}