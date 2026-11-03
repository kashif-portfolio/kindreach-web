import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, MessageSquare, LockKeyhole, Package, LoaderCircle } from 'lucide-react';
import { getConversations, getMessages, sendMessage } from '../../services/messageService';

export default function NeedyMessages() {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // 1. Screen par dikhne wala data.
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesRequestID, setMessagesRequestID] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');

  // 2. Loading aur error messages.
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);
  const [listError, setListError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [refreshNumber, setRefreshNumber] = useState(0);
  const bottomRef = useRef(null);

  const selectedRequestID = selectedConversation ? selectedConversation.RequestID : null;

  // 3. Page khulne par conversations lao. Har 5 seconds baad list refresh karo.
  useEffect(() => {
    let cancelled = false;

    async function loadConversations() {
      try {
        const result = await getConversations();
        if (cancelled) return;
        if (result.status !== 'success') throw new Error(result.message);

        const list = result.data || [];
        setConversations(list);
        setListError('');
        setSelectedConversation((previous) => {
          if (!previous) return list[0] || null;
          const updated = list.find((item) => item.RequestID === previous.RequestID);
          // Conversation remove ho to doosri chat khud se select na karo.
          return updated || { ...previous, CanSend: false };
        });
      } catch (err) {
        if (!cancelled) setListError(err.response?.data?.message || err.message || 'Could not load conversations');
      } finally {
        if (!cancelled) setLoadingConversations(false);
      }
    }

    loadConversations();
    const timer = setInterval(loadConversations, 5000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);

  // 4. Sirf selected request ke messages lao. Backend bhi ownership check karta hai.
  useEffect(() => {
    if (!selectedRequestID) return;
    let cancelled = false;

    async function loadMessages() {
      try {
        const result = await getMessages(selectedRequestID);
        // Chat change hone ke baad purani request ka response ignore karo.
        if (cancelled) return;
        if (result.status !== 'success') throw new Error(result.message);
        setMessages(result.data || []);
        setMessagesRequestID(selectedRequestID);
        setMessageError('');
      } catch (err) {
        if (!cancelled) setMessageError(err.response?.data?.message || err.message || 'Could not load messages');
      } finally {
        if (!cancelled) setLoadingMessages(false);
      }
    }

    loadMessages();
    const timer = setInterval(loadMessages, 5000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [selectedRequestID, refreshNumber]);

  // Safety: purani chat ka late response doosri conversation mein na dikhao.
  const displayedMessages = messagesRequestID === selectedRequestID ? messages : [];

  // 5. Naya message aaye to us tak scroll karo.
  const lastMessage = displayedMessages[displayedMessages.length - 1];
  const lastMessageID = lastMessage ? lastMessage.MessageID : null;
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lastMessageID]);

  // 6. Doosri conversation kholte waqt purane messages aur typed text clear karo.
  function selectConversation(conversation) {
    if (sending || conversation.RequestID === selectedRequestID) return;
    setMessages([]);
    setNewMessage('');
    setMessageError('');
    setLoadingMessages(true);
    setSelectedConversation(conversation);
  }

  // 7. Message save karo. Sender ki identity PHP session se milti hai.
  async function handleSend(event) {
    event.preventDefault();
    if (!selectedConversation || !selectedConversation.CanSend || !newMessage.trim() || sending || loadingMessages) return;
    setSending(true);
    setMessageError('');
    try {
      const result = await sendMessage(selectedRequestID, newMessage.trim());
      if (result.status !== 'success') throw new Error(result.message);
      setNewMessage('');
      // Number change hone se upar wala effect fresh messages load karega.
      setRefreshNumber((previous) => previous + 1);
    } catch (err) {
      setMessageError(err.response?.data?.message || err.message || 'Could not send message');
    } finally { setSending(false); }
  }

  const filteredConversations = conversations.filter((item) =>
    `${item.OtherName} ${item.DonationTitle} ${item.RequestID}`.toLowerCase().includes(search.trim().toLowerCase()));

  function getInitials(name) {
    return String(name || 'User').split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase();
  }

  function getStatusColor(status) {
    if (status === 'Accepted' || status === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (status === 'Delivered') return 'bg-sky-50 text-sky-700 border-sky-200';
    return 'bg-slate-50 text-slate-500 border-slate-200';
  }

  return (
    <div className="flex flex-col gap-5 p-2">
      <div>
        <h1 className="text-[20px] font-bold text-slate-900">Messages</h1>
        <p className="text-[13px] text-slate-500 mt-1">Private conversations with your donor about donation requests, pickup and delivery.</p>
      </div>
      {listError && <p role="alert" className="text-[12px] text-red-600">{listError}</p>}

      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <aside aria-label="Conversations" className="border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col min-w-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-[13px] font-bold text-slate-800 mb-3">Conversations <span className="text-slate-400 font-medium">({conversations.length})</span></h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input aria-label="Search conversations" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or donation..." className="w-full h-9 pl-9 pr-3 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-[#009689]" />
            </div>
          </div>

          <div className="overflow-y-auto max-h-52 lg:max-h-[540px] py-2 px-2 space-y-1">
            {loadingConversations && <p className="p-4 text-[12px] text-slate-400">Loading conversations...</p>}
            {!loadingConversations && !listError && filteredConversations.length === 0 && <p className="p-4 text-[12px] text-slate-500">{search ? 'No matching conversations.' : 'Conversations appear when a donation request connects you with a donor.'}</p>}
            {filteredConversations.map((conversation) => (
              <button type="button" key={conversation.RequestID} disabled={sending} onClick={() => selectConversation(conversation)}
                className={`w-full p-3 rounded-xl flex gap-2.5 text-left transition-colors cursor-pointer disabled:cursor-wait ${conversation.RequestID === selectedRequestID ? 'bg-emerald-50 border border-emerald-200/60' : 'border border-transparent hover:bg-slate-50'}`}>
                <span className="w-9 h-9 rounded-full bg-[#009689] text-white flex items-center justify-center text-[11px] font-bold shrink-0">{getInitials(conversation.OtherName)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-semibold text-slate-800 truncate">{conversation.OtherName}</span>
                  <span className="block text-[11px] text-slate-500 truncate mt-0.5">#{conversation.RequestID} · {conversation.DonationTitle}</span>
                  <span className="block text-[11px] text-slate-400 truncate mt-1">{conversation.LastMessage || 'Start a conversation'}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section aria-label="Private conversation" className="flex flex-col min-w-0 h-[620px] max-h-[75vh] min-h-[420px]">
          {!selectedConversation ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <MessageSquare className="w-9 h-9 text-slate-300 mb-3" />
              <h2 className="text-[14px] font-semibold text-slate-700">Your private messages</h2>
              <p className="text-[12px] text-slate-400 mt-2 max-w-xs">Choose a donation conversation to discuss pickup, delivery or your request.</p>
            </div>
          ) : (
            <>
              <header className="flex items-center justify-between gap-3 p-4 border-b border-slate-100">
                <div className="min-w-0">
                  <h2 className="text-[14px] font-bold text-slate-900 truncate">{selectedConversation.OtherName} <span className="text-[11px] font-normal text-slate-400">· {selectedConversation.OtherRole}</span></h2>
                  <p className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1"><Package className="w-3.5 h-3.5 shrink-0" /><span className="truncate">#{selectedRequestID} · {selectedConversation.DonationTitle}</span></p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[10px] font-semibold shrink-0 ${getStatusColor(selectedConversation.RequestStatus)}`}><span className="w-1 h-1 rounded-full bg-current" />{selectedConversation.RequestStatus}</span>
              </header>
              <p className="flex items-center justify-center gap-1.5 py-2 text-[10px] text-slate-400 bg-slate-50/50"><LockKeyhole className="w-3 h-3" />Only you and this donor can access this conversation.</p>

              <div role="log" aria-label="Conversation messages" aria-live="polite" className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {loadingMessages && <p className="text-center text-[12px] text-slate-400 py-6">Loading messages...</p>}
                {!loadingMessages && !displayedMessages.length && !messageError && <p className="text-center text-[12px] text-slate-400 py-6">No messages yet. Start the conversation.</p>}
                {displayedMessages.map((message) => {
                  const isMyMessage = String(message.UserID) === String(currentUser.userID);
                  return (
                    <div key={message.MessageID} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${isMyMessage ? 'bg-[#009689] text-white rounded-br-sm' : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-bl-sm'}`}>
                        <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{message.Message}</p>
                        <p className={`text-[9px] text-right mt-1 ${isMyMessage ? 'text-emerald-100' : 'text-slate-400'}`}>{String(message.CreatedAt || '').slice(0, 16)}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {messageError && <p role="alert" className="px-4 pb-2 text-[12px] text-red-600">{messageError}</p>}
              <div className="p-4 border-t border-slate-100">
                {!selectedConversation.CanSend ? (
                  <p className="text-[12px] text-slate-500">Messaging is unavailable for a closed request, inactive account or unverified recipient. Existing messages remain visible.</p>
                ) : (
                  <form onSubmit={handleSend} className="flex items-end gap-2.5">
                    <textarea aria-label="Message" rows={2} maxLength={2000} value={newMessage} onChange={(event) => setNewMessage(event.target.value)} placeholder="Write a message..." disabled={sending || loadingMessages} className="flex-1 min-w-0 resize-none px-3.5 py-2.5 border border-slate-200 rounded-xl text-[12px] focus:outline-none focus:border-[#009689] disabled:bg-slate-50" />
                    <button type="submit" disabled={sending || !newMessage.trim() || loadingMessages} className="h-10 px-4 rounded-xl bg-[#009689] hover:bg-[#007f73] text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      {sending ? <LoaderCircle className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}{sending ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
