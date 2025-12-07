
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Lock, Wifi, Code, Zap, Database, AlertTriangle, Fingerprint, Key, Heart, Smartphone, Trash2, Layers, Download, GitBranch, Cpu, UserX, Globe, Moon, Gift, Briefcase, Wrench, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Helper to map string icon names to components
const getIcon = (name: string) => {
  const props = { size: 20 };
  switch (name) {
    case 'zap': return <Zap {...props} />;
    case 'database': return <Database {...props} />;
    case 'alert-triangle': return <AlertTriangle {...props} />;
    case 'lock': return <Lock {...props} />;
    case 'key': return <Key {...props} />;
    case 'fingerprint': return <Fingerprint {...props} />;
    case 'shield': return <Shield {...props} />;
    case 'wifi': return <Wifi {...props} />;
    case 'code': return <Code {...props} />;
    case 'heart': return <Heart {...props} />;
    case 'smartphone': return <Smartphone {...props} />;
    case 'trash': return <Trash2 {...props} />;
    case 'layers': return <Layers {...props} />;
    case 'download': return <Download {...props} />;
    case 'git-branch': return <GitBranch {...props} />;
    case 'cpu': return <Cpu {...props} />;
    case 'user-x': return <UserX {...props} />;
    case 'globe': return <Globe {...props} />;
    case 'moon': return <Moon {...props} />;
    case 'gift': return <Gift {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'tool': return <Wrench {...props} />;
    case 'shield-alert': return <ShieldAlert {...props} />;
    default: return <HelpCircle {...props} />;
  }
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useApp();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-16 space-y-4 animate-fade-in-up">
        <div className="flex justify-center">
          <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl mb-4 shadow-sm">
            <HelpCircle size={40} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.faq.title}</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          {t.faq.subtitle}
        </p>
      </div>

      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {t.faq.items.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`bg-white dark:bg-slate-900 rounded-2xl transition-all duration-300 border ${isOpen
                ? 'border-primary-200 dark:border-primary-800 shadow-lg shadow-primary-900/5'
                : 'border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary-100 dark:hover:border-primary-900/50'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}>
                    {getIcon(faq.icon)}
                  </div>
                  <span className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-primary-700 dark:text-primary-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : ''}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-6 pl-[4.5rem] text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <p className="text-slate-500 dark:text-slate-400 mb-4">{t.faq.contactTitle}</p>
        <a
          href="https://github.com/SilentBlox01/beethovensite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {t.faq.contactBtn}
        </a>
      </div>
    </div>
  );
};
