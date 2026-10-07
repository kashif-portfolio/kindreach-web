import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Ahmed Khan',
      text: 'Your food request has been accepted. Are you available for pickup tomorrow?',
      time: '10:30 AM',
      type: 'received'
    },
    {
      id: 2,
      sender: 'You',
      text: 'Yes, I am available after 11 AM. Thank you.',
      time: '10:32 AM',
      type: 'sent'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageObj = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: 'Just now',
      type: 'sent'
    };

    setMessages([...messages, messageObj]);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <p className="text-xs text-slate-400 mb-1">Home / Messages</p>
        <h1 className="text-xl font-bold text-slate-800">Messages</h1>
        <p className="text-sm text-slate-500">Communicate with donors about accepted requests</p>
      </div>

      {/* Main Chat Container Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col h-130 max-w-4xl">
        
        {/* Chat Header Info */}
        <div className="p-4 px-6 border-b border-slate-200/80 bg-white">
          <h3 className="text-sm font-bold text-slate-800">Ahmed Khan</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Atta (25 kg bags) - Accepted request
          </p>
        </div>

        {/* Chat Messages Body Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                  msg.type === 'sent'
                    ? 'bg-[#009689] text-white rounded-tr-none'
                    : 'bg-white border border-slate-200/80 text-slate-700 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Footer Area */}
        <div className="p-4 px-6 border-t border-slate-200/80 bg-white rounded-b-xl">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#009689]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#009689] hover:bg-[#00796b] text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all shadow-sm cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}