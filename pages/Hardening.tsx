
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { hardeningGuides, HardeningItem } from '../data/hardening';
import { Shield, CheckCircle, Circle, Monitor, Smartphone, Globe, Lock, Cpu, Command } from 'lucide-react';
import { Language } from '../types';

export const Hardening: React.FC = () => {
  const { t, language } = useApp();

  const [completed, setCompleted] = useState<string[]>(() => {
    const saved = localStorage.getItem('hardening_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleItem = (id: string) => {
    setCompleted(prev => {
      const newSet = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('hardening_progress', JSON.stringify(newSet));
      return newSet;
    });
  };

  const getIcon = (platform: string) => {
    switch(platform) {
      case 'Windows': return <Monitor size={20} />;
      case 'macOS': return <Command size={20} />;
      case 'Linux': return <Cpu size={20} />;
      case 'Android': return <Smartphone size={20} />;
      case 'Browser': return <Globe size={20} />;
      default: return <Shield size={20} />;
    }
  };

  // Group by platform
  const grouped = hardeningGuides.reduce((acc, item) => {
    if (!acc[item.platform]) acc[item.platform] = [];
    acc[item.platform].push(item);
    return acc;
  }, {} as Record<string, HardeningItem[]>);

  // Helper to get translated content safely
  const getContent = (item: HardeningItem, field: 'title' | 'desc') => {
      // Check if language is 'es' or 'en', otherwise fallback to 'en'
      // Since Language type can include other languages, we need to be safe.
      const langKey = (language === 'es' ? 'es' : 'en') as 'es' | 'en';
      return item[field][langKey];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.hardeningTitle || "Hardening Guides"}</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">{t.hardeningDesc || "Secure your environment"}</p>
      </div>

      <div className="grid gap-8">
        {Object.entries(grouped).map(([platform, items]) => (
          <div key={platform} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                {getIcon(platform)}
              </div>
              {platform}
            </h2>

            <div className="space-y-4">
              {items.map(item => {
                 const title = getContent(item, 'title');
                 const desc = getContent(item, 'desc');
                 const isDone = completed.includes(item.id);

                 return (
                   <div
                     key={item.id}
                     onClick={() => toggleItem(item.id)}
                     className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                       isDone
                       ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
                       : 'border-slate-100 dark:border-slate-800'
                     }`}
                   >
                     <div className={`mt-1 ${isDone ? 'text-emerald-500' : 'text-slate-300'}`}>
                       {isDone ? <CheckCircle size={24} /> : <Circle size={24} />}
                     </div>
                     <div>
                       <h3 className={`font-bold text-lg ${isDone ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                         {title}
                       </h3>
                       <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{desc}</p>
                       <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500">
                         {item.level}
                       </div>
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
