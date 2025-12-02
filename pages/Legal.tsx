
import React from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LegalContent } from '../types';

const LegalLayout: React.FC<{ title: string, content: LegalContent }> = ({ title, content }) => (
  <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
    <div className="flex justify-center mb-8">
      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl">
        <Shield size={48} strokeWidth={1.5} />
      </div>
    </div>
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 dark:text-white mb-16 tracking-tight">{title}</h1>
    <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-none">
      {content.sections.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{section.heading}</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {section.content}
          </p>
          {section.list && (
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const Terms: React.FC = () => {
  const { t } = useApp();
  return <LegalLayout title={t.legal.terms.title} content={t.legal.terms} />;
};

export const Privacy: React.FC = () => {
  const { t } = useApp();
  return <LegalLayout title={t.legal.privacy.title} content={t.legal.privacy} />;
};
