
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { hardeningGuides, HardeningItem } from '../data/hardening';
import { Shield, CheckCircle, Circle, Monitor, Smartphone, Globe, Lock, Cpu, Command } from 'lucide-react';
import { Language } from '../types';
import { FadeIn, SlideUp } from '../components/ui/MotionWrappers';

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <FadeIn className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4 text-glow">{t.hardeningTitle || "Hardening Guides"}</h1>
        <p className="text-xl text-slate-400">{t.hardeningDesc || "Secure your environment"}</p>
      </FadeIn>

      <SlideUp className="grid gap-8">
        {Object.entries(grouped).map(([platform, items]) => (
          <div key={platform} className="glass-panel rounded-[2rem] p-8 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] transition-all duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-2 bg-white/10 rounded-lg text-slate-300">
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
                     className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                       isDone
                       ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]'
                       : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                     }`}
                   >
                     <div className={`mt-1 transition-colors ${isDone ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                       {isDone ? <CheckCircle size={24} /> : <Circle size={24} />}
                     </div>
                     <div>
                       <h3 className={`font-bold text-lg transition-colors ${isDone ? 'text-emerald-400' : 'text-slate-200'}`}>
                         {title}
                       </h3>
                       <p className="text-slate-400 text-sm mt-1">{desc}</p>
                       <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-black/40 border border-white/10 text-slate-400">
                         {item.level}
                       </div>
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        ))}
      </SlideUp>
    </div>
  );
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { hardeningGuides } from '../data/hardening';
import { Shield, Check, RotateCcw, Smartphone, Monitor, Cpu, Laptop, CheckCircle2 } from 'lucide-react';

export const Hardening: React.FC = () => {
    const { t } = useApp();
    const [activeTab, setActiveTab] = useState('windows');
    const [progress, setProgress] = useState<Record<string, boolean>>({});

    // Load progress
    useEffect(() => {
        const saved = localStorage.getItem('hardening_progress');
        if (saved) setProgress(JSON.parse(saved));
    }, []);

    // Save progress
    useEffect(() => {
        localStorage.setItem('hardening_progress', JSON.stringify(progress));
    }, [progress]);

    const toggleItem = (id: string) => {
        setProgress(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const resetTab = () => {
        if (confirm("Reset progress for this section?")) {
            const newProgress = { ...progress };
            hardeningGuides[activeTab].forEach(item => delete newProgress[item.id]);
            setProgress(newProgress);
        }
    };

    const currentItems = hardeningGuides[activeTab] || [];
    const completedCount = currentItems.filter(i => progress[i.id]).length;
    const totalCount = currentItems.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const tabs = [
        { id: 'windows', icon: <Monitor size={18} />, label: t.hardening.windows },
        { id: 'linux', icon: <Cpu size={18} />, label: t.hardening.linux },
        { id: 'macos', icon: <Laptop size={18} />, label: t.hardening.macos },
        { id: 'android', icon: <Smartphone size={18} />, label: t.hardening.android },
        { id: 'ios', icon: <Smartphone size={18} />, label: t.hardening.ios }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 animate-fade-in">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-3xl mb-4 shadow-sm">
                    <Shield size={40} strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.hardening.title}</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 mt-4 font-light max-w-2xl mx-auto">
                    {t.hardening.subtitle}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all duration-300 ${
                            activeTab === tab.id
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl mb-8 relative overflow-hidden">
                <div className="flex justify-between items-end mb-4 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.hardening.progress}</h2>
                        <div className="text-slate-500 dark:text-slate-400 font-mono text-sm mt-1">
                            {completedCount} / {totalCount} {t.hardening.completed}
                        </div>
                    </div>
                    <div className="text-4xl font-black text-emerald-500">{percentage}%</div>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative z-10">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                {percentage === 100 && (
                    <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center z-0 animate-pulse-soft"></div>
                )}
            </div>

            {/* Checklist */}
            <div className="space-y-4">
                {currentItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`group p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                            progress[item.id]
                            ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/50 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start gap-5 relative z-10">
                            <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                progress[item.id]
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
                            }`}>
                                {progress[item.id] && <Check size={14} strokeWidth={3} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-bold text-lg mb-1 transition-colors ${progress[item.id] ? 'text-emerald-700 dark:text-emerald-400 line-through decoration-2 decoration-emerald-500/30' : 'text-slate-800 dark:text-white'}`}>
                                        {item.title}
                                    </h3>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${
                                        item.impact === 'High' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' :
                                        item.impact === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' :
                                        'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30'
                                    }`}>
                                        {item.impact}
                                    </span>
                                </div>
                                <p className={`text-sm leading-relaxed transition-colors ${progress[item.id] ? 'text-emerald-600/70 dark:text-emerald-400/60' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={resetTab}
                    className="inline-flex items-center text-slate-400 hover:text-red-500 transition-colors text-sm font-bold gap-2"
                >
                    <RotateCcw size={14} /> {t.hardening.reset}
                </button>
            </div>
        </div>
    );
};
