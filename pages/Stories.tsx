

import React from 'react';
import { useApp } from '../context/AppContext';
import { Dog, Radar, Shield, Heart, Footprints, Code } from 'lucide-react';

export const Stories: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="w-full relative overflow-hidden">
        {/* Background Overlay for a subtle texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5" 
             style={{ 
                 backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-24 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight">
                    {t.stories.heroTitle}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-500 dark:text-slate-400">
                    {t.stories.heroSubtitle}
                </p>
            </div>

            {/* Section 1: The Name (Beethoven) */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-32 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="order-2 md:order-1">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-2xl">
                            <Dog size={32} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-400">{t.common.appName}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        {t.stories.nameTitle}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        {t.stories.nameDesc}
                    </p>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                    <div className="w-64 h-64 bg-gradient-to-tr from-amber-200 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/20 rounded-full blur-3xl opacity-60 absolute"></div>
                    <Dog size={200} className="text-slate-800 dark:text-white relative z-10 drop-shadow-2xl" strokeWidth={1} />
                </div>
            </div>

            {/* Section 2: Values Grid */}
            <div className="mb-32 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">{t.stories.values.title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {t.stories.values.items.map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                                item.icon === 'heart' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-500' :
                                item.icon === 'code' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' :
                                'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500'
                            }`}>
                                {item.icon === 'heart' && <Heart size={28} />}
                                {item.icon === 'code' && <Code size={28} />}
                                {item.icon === 'shield' && <Shield size={28} />}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 3: The Mission */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-10 md:p-20 text-white mb-32 relative overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Radar size={200} className="animate-pulse-soft" />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 mb-6 text-green-400 bg-green-400/10 px-4 py-1.5 rounded-full border border-green-400/20">
                        <Radar size={16} />
                        <span className="font-bold uppercase text-xs tracking-wider">{t.stories.missionTitle}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{t.stories.missionDesc}</h2>
                </div>
            </div>

            {/* Section 4: Vision (Restored) */}
            <div className="text-center max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <div className="flex justify-center mb-8">
                    <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                        <Footprints size={48} />
                    </div>
                </div>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{t.stories.visionTitle}</h2>
                <p className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                    "{t.stories.visionDesc}"
                </p>
            </div>

        </div>
    </div>
  );
};
