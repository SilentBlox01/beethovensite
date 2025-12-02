

import React from 'react';
import { Shield, Heart, Users, Code, Lock, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
      {/* Hero Header */}
      <div className="text-center mb-20 space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl mb-4 shadow-sm">
           <Users size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.about.title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          {t.about.subtitle}
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
           <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
              <Globe size={32} />
           </div>
           <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.about.missionTitle}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {t.about.missionP1}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {t.about.missionP2}
              </p>
           </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
           <Lock className="text-primary-500 mb-4" size={32} />
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.pillars.privacy.title}</h3>
           <p className="text-slate-600 dark:text-slate-400">
             {t.about.pillars.privacy.desc}
           </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
           <Code className="text-purple-500 mb-4" size={32} />
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.pillars.opensource.title}</h3>
           <p className="text-slate-600 dark:text-slate-400">
             {t.about.pillars.opensource.desc}
           </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
           <Heart className="text-red-500 mb-4" size={32} />
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.pillars.free.title}</h3>
           <p className="text-slate-600 dark:text-slate-400">
             {t.about.pillars.free.desc}
           </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
           <Shield className="text-emerald-500 mb-4" size={32} />
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.about.pillars.education.title}</h3>
           <p className="text-slate-600 dark:text-slate-400">
             {t.about.pillars.education.desc}
           </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">{t.about.ctaTitle}</h2>
            <p className="text-slate-300 max-w-lg mx-auto mb-8 text-lg">
               {t.about.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button onClick={() => navigate('/')} className="bg-white text-slate-900 hover:bg-slate-100 border-transparent">
                  {t.about.ctaHome}
               </Button>
               <a 
                 href="https://github.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-xl text-white border border-slate-600 hover:bg-slate-800 transition-colors"
               >
                 {t.about.ctaGit}
               </a>
            </div>
         </div>
         {/* Background decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};