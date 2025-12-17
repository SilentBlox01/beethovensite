
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, RefreshCw, Copy, Trash2, Inbox, ChevronRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Message {
    id: number;
    from: string;
    subject: string;
    date: string;
}

interface FullMessage extends Message {
    body: string;
    textBody: string;
    htmlBody: string;
}

export const TempMail: React.FC = () => {
    const { t } = useApp();
    const [email, setEmail] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<FullMessage | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const generateEmail = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            setEmail(data[0]);
            setMessages([]);
            setSelectedMessage(null);
        } catch (e) {
            setError(t.tempMail.error + " (API)");
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!email) return;
        const [login, domain] = email.split('@');
        try {
            const res = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
            if (res.ok) {
                const data = await res.json();
                // Avoid infinite re-renders/flickers, check diff
                if (JSON.stringify(data) !== JSON.stringify(messages)) {
                    setMessages(data);
                }
            }
        } catch (e) {
            // Silent fail on polling
        }
    };

    const fetchMessageBody = async (id: number) => {
        if (!email) return;
        setLoadingMsg(true);
        const [login, domain] = email.split('@');
        try {
            const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`);
            if (res.ok) {
                const data = await res.json();
                setSelectedMessage(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMsg(false);
        }
    };

    useEffect(() => {
        if (!email) generateEmail();
    }, []);

    useEffect(() => {
        if (!email || !autoRefresh) return;
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [email, autoRefresh]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 animate-fade-in h-[calc(100vh-80px)] flex flex-col">
            <div className="text-center mb-8 flex-shrink-0">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-3xl mb-4 shadow-sm">
                    <Mail size={40} strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.tempMail.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{t.tempMail.subtitle}</p>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between mb-8 flex-shrink-0 relative z-10">
                <div className="flex-1 w-full relative group">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl animate-pulse-soft pointer-events-none"></div>
                    <input
                        type="text"
                        readOnly
                        value={email}
                        className="w-full bg-transparent text-center md:text-left font-mono text-xl md:text-2xl font-bold text-slate-800 dark:text-white py-4 px-6 outline-none cursor-pointer"
                        onClick={(e) => e.currentTarget.select()}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <button onClick={() => navigator.clipboard.writeText(email)} className="p-2 bg-white dark:bg-slate-800 rounded-xl hover:text-indigo-500 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors" title={t.tempMail.copy}><Copy size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button onClick={generateEmail} disabled={loading} variant="outline" className="flex-1 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />} <span className="ml-2 hidden sm:inline">{t.tempMail.generate}</span>
                    </Button>
                    <Button onClick={fetchMessages} variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <RefreshCw size={20} />
                    </Button>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2 flex-shrink-0">
                    <AlertCircle size={20} /> {error}
                </div>
            )}

            {/* Main Area */}
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row relative">

                {/* Inbox List */}
                <div className={`w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex justify-between items-center">
                        <span className="font-bold text-slate-500 text-sm uppercase tracking-wider flex items-center gap-2">
                            <Inbox size={16} /> {t.tempMail.inbox} ({messages.length})
                        </span>
                        {messages.length > 0 && (
                            <button onClick={() => setMessages([])} className="text-xs text-red-500 hover:underline">{t.tempMail.empty}</button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                <Inbox size={48} className="mb-4 opacity-20" />
                                <p>{t.tempMail.empty}</p>
                                <p className="text-xs mt-2 opacity-60">Waiting for emails...</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                {messages.map(msg => (
                                    <li
                                        key={msg.id}
                                        onClick={() => fetchMessageBody(msg.id)}
                                        className={`p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group ${selectedMessage?.id === msg.id ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2 w-2/3">{msg.from}</span>
                                            <span className="text-xs text-slate-400 whitespace-nowrap">{msg.date.split(' ')[1]}</span>
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {msg.subject || '(No Subject)'}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Message View */}
                <div className={`flex-1 flex flex-col bg-slate-50/30 dark:bg-black/20 ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                    {selectedMessage ? (
                        <div className="flex-1 flex flex-col h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
                                <button onClick={() => setSelectedMessage(null)} className="md:hidden mb-4 flex items-center text-slate-500 gap-1 text-sm font-bold">
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{selectedMessage.subject}</h2>
                                <div className="flex justify-between items-start text-sm text-slate-500">
                                    <div>
                                        <span className="block font-bold text-slate-800 dark:text-slate-300 mb-1">{selectedMessage.from}</span>
                                        <span className="text-xs opacity-70">to {email}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block">{selectedMessage.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                {loadingMsg ? (
                                    <div className="flex justify-center p-10"><Loader2 className="animate-spin text-slate-400" /></div>
                                ) : (
                                    <div
                                        className="prose dark:prose-invert max-w-none font-sans text-slate-800 dark:text-slate-200"
                                        dangerouslySetInnerHTML={{ __html: selectedMessage.htmlBody || selectedMessage.textBody }}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                            <Mail size={64} className="mb-6 opacity-10" />
                            <p className="text-lg">Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
