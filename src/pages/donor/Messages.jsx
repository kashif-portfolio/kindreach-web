import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Fatima Bibi',
      text: 'Thank you for accepting my request. I am available for pickup tomorrow.',
      time: '10:30 AM',
      type: 'received'
    },
    {
      id: 2,
      sender: 'You',
      text: 'Tomorrow works. I will confirm the pickup time shortly.',
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
    <div className="w-full pb-4">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900">Messages</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Communicate about accepted donation requests
        </p>
      </div>

      {/* Main Chat Container Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl">
        
        {/* Chat Header Info */}
        <div className="p-3.5 border-b border-slate-200 bg-white">
          <h2 className="text-xs font-bold text-slate-900">Fatima Bibi</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Atta (25 kg bags) - Accepted request
          </p>
        </div>

        {/* Chat Messages Body Area */}
        <div className="p-4 h-65 overflow-y-auto space-y-3 bg-white flex flex-col">
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
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
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
              className="px-4 py-2 bg-[#009689] hover:bg-[#007f73] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}