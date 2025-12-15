
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, RefreshCw, Copy, Trash2, Inbox, ChevronRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Message {
    id: string;
    from: { address: string; name: string };
    subject: string;
    createdAt: string;
    intro?: string;
    seen: boolean;
}

interface FullMessage extends Message {
    text?: string;
    html?: string;
}

export const TempMail: React.FC = () => {
    const { t } = useApp();
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<FullMessage | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('temp_mail_address');
        const savedToken = localStorage.getItem('temp_mail_token');
        if (savedEmail && savedToken) {
            setEmail(savedEmail);
            setToken(savedToken);
        } else {
            generateEmail();
        }
    }, []);

    const generateEmail = async () => {
        setLoading(true);
        setError(null);
        try {
            // 1. Get Domain
            const domainsRes = await fetch('https://api.mail.tm/domains');
            if (!domainsRes.ok) throw new Error('Domains API Error');
            const domainsData = await domainsRes.json();
            const domain = domainsData['hydra:member']?.[0]?.domain;
            if (!domain) throw new Error('No domains available');

            // 2. Create Account
            const username = `user${Math.random().toString(36).substring(2, 10)}`;
            const password = `pwd${Math.random().toString(36).substring(2, 12)}`;
            const address = `${username}@${domain}`;

            const accRes = await fetch('https://api.mail.tm/accounts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, password })
            });
            if (!accRes.ok) throw new Error('Account Creation Error');

            // 3. Get Token
            const tokenRes = await fetch('https://api.mail.tm/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, password })
            });
            if (!tokenRes.ok) throw new Error('Login Error');
            const tokenData = await tokenRes.json();

            setEmail(address);
            setToken(tokenData.token);
            setMessages([]);
            setSelectedMessage(null);

            // Persist
            localStorage.setItem('temp_mail_address', address);
            localStorage.setItem('temp_mail_token', tokenData.token);

        } catch (e: any) {
            console.error(e);
            setError(t.tempMail.error + ` (${e.message || 'API'})`);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!token) return;
        try {
            const res = await fetch('https://api.mail.tm/messages?page=1', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const msgs = data['hydra:member'] || [];
                // Simple equality check by ID list
                const currentIds = messages.map(m => m.id).join(',');
                const newIds = msgs.map((m: Message) => m.id).join(',');
                if (currentIds !== newIds) {
                    setMessages(msgs);
                }
            } else if (res.status === 401) {
                // Token expired
                generateEmail();
            }
        } catch (e) {
            // Silent fail
        }
    };

    const fetchMessageBody = async (id: string) => {
        if (!token) return;
        setLoadingMsg(true);
        try {
            const res = await fetch(`https://api.mail.tm/messages/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedMessage(data);

                // Mark as seen (optional, API usually handles it)
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMsg(false);
        }
    };

    useEffect(() => {
        if (!token || !autoRefresh) return;
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [token, autoRefresh]);

    const logout = () => {
        localStorage.removeItem('temp_mail_address');
        localStorage.removeItem('temp_mail_token');
        setEmail('');
        setToken('');
        setMessages([]);
        setSelectedMessage(null);
        generateEmail();
    }

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
                    <Button onClick={logout} disabled={loading} variant="outline" className="flex-1 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
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
                                            <span className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2 w-2/3">{msg.from.name || msg.from.address}</span>
                                            <span className="text-xs text-slate-400 whitespace-nowrap">{new Date(msg.createdAt).toLocaleTimeString()}</span>
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
                                        <span className="block font-bold text-slate-800 dark:text-slate-300 mb-1">{selectedMessage.from.address}</span>
                                        <span className="text-xs opacity-70">to {email}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
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
                                        dangerouslySetInnerHTML={{ __html: selectedMessage.html ? selectedMessage.html : `<pre>${selectedMessage.text}</pre>` }}
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
