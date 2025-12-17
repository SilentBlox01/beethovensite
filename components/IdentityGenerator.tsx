
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  UserCheck,
  Globe,
  Copy,
  RefreshCw,
  Hash,
  Download
} from 'lucide-react';
import { generateIdentity } from '../utils/generators';

export const IdentityGenerator: React.FC = () => {
  const { t } = useApp();
  const { toast } = useToast();
  const [identity, setIdentity] = useState<any>(null);
  const [gender, setGender] = useState<'random' | 'male' | 'female'>('random');

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    setIdentity(generateIdentity(gender));
    if (identity) toast.success("New identity generated");
  };

  const copyToClipboard = () => {
    if (!identity) return;
    const text = `
Name: ${identity.fullName}
Gender: ${identity.gender}
Email: ${identity.email}
Address: ${identity.address}
City: ${identity.city}, ${identity.state} ${identity.zip}
Phone: ${identity.phone}
DOB: ${identity.birthDate}
Username: ${identity.username}
    `.trim();
    navigator.clipboard.writeText(text);
    toast.success("Identity copied to clipboard");
  };

  if (!identity) return null;

  return (
    <div className="glass-panel rounded-[2rem] overflow-hidden p-8 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] transition-shadow duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 text-glow">
            <UserCheck className="text-primary-400" />
            {t.tools.idGenTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">{t.tools.idGenDesc}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          {(['random', 'male', 'female'] as const).map(g => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                gender === g
                ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {g === 'random' ? t.tools.idGenGenderRandom : g === 'male' ? t.tools.idGenGenderMale : t.tools.idGenGenderFemale}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">{t.tools.gdprName}</label>
            <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User size={18} className="text-slate-400" />
              {identity.fullName}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
             <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Email</label>
             <div className="text-lg font-mono text-slate-900 dark:text-white flex items-center gap-2">
               <Mail size={18} className="text-slate-400" />
               {identity.email}
             </div>
          </div>
           <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
             <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Username</label>
             <div className="text-lg font-mono text-slate-900 dark:text-white flex items-center gap-2">
               <Hash size={18} className="text-slate-400" />
               {identity.username}
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
             <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">{t.tools.deviceInfo.location}</label>
             <div className="text-lg text-slate-900 dark:text-white flex items-start gap-2">
               <MapPin size={18} className="text-slate-400 mt-1 shrink-0" />
               <div>
                 <div>{identity.address}</div>
               </div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
               <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Phone</label>
               <div className="text-base font-mono text-slate-900 dark:text-white flex items-center gap-2">
                 <Phone size={16} className="text-slate-400" />
                 {identity.phone}
               </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
               <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Birthday</label>
               <div className="text-base font-mono text-slate-900 dark:text-white flex items-center gap-2">
                 <Calendar size={16} className="text-slate-400" />
                 {identity.birthDate}
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleGenerate} className="flex-1 py-4 text-lg rounded-2xl bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/20">
          <RefreshCw className="mr-2" />
          {t.tools.idGenBtn}
        </Button>
        <Button onClick={copyToClipboard} variant="outline" className="px-8 rounded-2xl border-slate-200 dark:border-slate-700">
          <Copy className="mr-2" />
          {t.tools.idGenCopy}
        </Button>
      </div>
    </div>
  );
};
