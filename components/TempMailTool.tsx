
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Mail, RefreshCw, Copy, Inbox, ExternalLink, Trash2 } from 'lucide-react';
import DOMPurify from 'dompurify';

interface MailMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
  body?: string;
}

export const TempMailTool: React.FC = () => {
  const { t } = useApp();
  const [email, setEmail] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<MailMessage | null>(null);

  const generateEmail = async () => {
    setLoading(true);
    try {
      // 1secmail API to get domains
      const domainsRes = await fetch('https://www.1secmail.com/api/v1/?action=getDomainList');
      const domains = await domainsRes.json();
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const randomLogin = Math.random().toString(36).substring(2, 12);

      setLogin(randomLogin);
      setDomain(randomDomain);
      setEmail(`${randomLogin}@${randomDomain}`);
      setMessages([]);
      setSelectedMsg(null);
    } catch (e) {
      console.error("Failed to generate email", e);
    } finally {
      setLoading(false);
    }
  };

  const checkInbox = async () => {
    if (!login || !domain) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error("Failed to check inbox", e);
    } finally {
      setLoading(false);
    }
  };

  const readMessage = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`);
      const data = await res.json();
      setSelectedMsg(data);
    } catch (e) {
      console.error("Failed to read message", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateEmail();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8">
       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="text-rose-500" />
            {t.tempMailTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">{t.tempMailDesc}</p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200 break-all text-center md:text-left">
          {email || "Generating..."}
        </div>
        <div className="flex gap-2 shrink-0">
          <Button onClick={() => navigator.clipboard.writeText(email)} variant="outline" size="sm">
            <Copy size={18} />
          </Button>
          <Button onClick={generateEmail} variant="outline" size="sm">
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[400px]">
        {/* Inbox List */}
        <div className="lg:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-0 lg:pr-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider">{t.tempMailInbox}</h3>
            <button onClick={checkInbox} className="text-primary-500 hover:text-primary-600 text-sm font-bold flex items-center gap-1">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> {t.tempMailRefresh}
            </button>
          </div>

          <div className="space-y-2">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 italic">
                <Inbox size={32} className="mx-auto mb-2 opacity-50" />
                {t.tempMailEmpty}
              </div>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => readMessage(msg.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    selectedMsg?.id === msg.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary-300'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-1">{msg.date}</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{msg.from}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm truncate">{msg.subject}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
           {selectedMsg ? (
             <div className="h-full flex flex-col">
               <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{selectedMsg.subject}</h3>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500">From: <strong className="text-slate-700 dark:text-slate-300">{selectedMsg.from}</strong></span>
                   <span className="text-slate-400">{selectedMsg.date}</span>
                 </div>
               </div>
               <div
                 className="prose dark:prose-invert max-w-none flex-grow overflow-auto"
                 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedMsg.body || '') }}
               />
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
               <Mail size={48} className="mb-4 opacity-20" />
               <p>Select a message to read</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
