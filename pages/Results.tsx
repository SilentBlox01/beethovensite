

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateRecommendations } from '../data/content';
import { Button } from '../components/ui/Button';
import { AlertTriangle, ShieldCheck, ArrowRight, RefreshCw, CheckCircle, Smartphone, Globe, Wifi, Key, Download, FileJson } from 'lucide-react';

export const Results: React.FC = () => {
  const { userProfile, resetProfile, saveAssessmentToHistory, t } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userProfile.completed) {
        navigate('/assessment');
    } else {
      saveAssessmentToHistory(userProfile.score, `Assessment completed with score ${userProfile.score}`);
    }
  }, [userProfile.completed, navigate, userProfile.score, saveAssessmentToHistory]);

  const recommendations = generateRecommendations(userProfile, t);

  const exportJSON = () => {
    const data = {
      score: userProfile.score,
      timestamp: new Date().toISOString(),
      assessment: userProfile,
      recommendations: recommendations
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beethoven-assessment-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const content = `
${t.results.reportTitle}
${t.results.reportGenerated} ${new Date().toLocaleString()}

${t.results.reportScore} ${userProfile.score}/100

${t.results.reportRecommendations}
${recommendations.map(r => `- ${r.title}: ${r.description}`).join('\n')}
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beethoven-assessment-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary-500 stroke-primary-500';
    if (score >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-red-500 stroke-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t.results.labels.excellent;
    if (score >= 50) return t.results.labels.improvable;
    return t.results.labels.vulnerable;
  };

  const getCategoryIcon = (cat: string) => {
      if(cat === t.results.categoryMobile) return <Smartphone size={18} />;
      if(cat === t.results.categoryBrowser) return <Globe size={18} />;
      if(cat === t.results.categoryNetworks) return <Wifi size={18} />;
      if(cat === t.results.categoryPasswords) return <Key size={18} />;
      return <ShieldCheck size={18} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Sidebar Score Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8 sticky top-32 flex flex-col items-center text-center">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{t.results.securityLevel}</h2>
            
            <div className="relative mb-8">
               {/* Gauge Visualization */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                 {/* Background Circle */}
                 <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="90"
                      cx="112"
                      cy="112"
                      strokeLinecap="round"
                    />
                    {/* Foreground Circle */}
                    <circle
                      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${getScoreColor(userProfile.score)}`}
                      strokeWidth="10"
                      strokeDasharray={565} // 2 * PI * 90
                      strokeDashoffset={565 - (userProfile.score / 100) * 565}
                      strokeLinecap="round"
                      stroke="transparent"
                      fill="transparent"
                      r="90"
                      cx="112"
                      cy="112"
                    />
                 </svg>
                 <div className="absolute flex flex-col items-center animate-scale-in">
                    <span className={`text-7xl font-black tracking-tighter ${getScoreColor(userProfile.score).split(' ')[0]}`}>
                        {userProfile.score}
                    </span>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider mt-1">{t.results.score}</span>
                 </div>
              </div>
            </div>

            <div className={`mb-8 py-2 px-6 rounded-full text-lg font-bold border ${
                  userProfile.score >= 80 ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-800' : 
                  userProfile.score >= 50 ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800' : 
                  'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800'
              }`}>
                {getScoreLabel(userProfile.score)}
            </div>

            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed px-4">
              <strong className="text-slate-900 dark:text-white">{recommendations.length} {t.results.areasToImprove}</strong>
            </p>

            <div className="space-y-3">
              <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={() => { resetProfile(); navigate('/assessment'); }}
                  className="gap-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 rounded-xl"
              >
                  <RefreshCw size={16} /> {t.results.retest}
              </Button>
              <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={exportJSON}
                  className="gap-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 rounded-xl text-xs"
              >
                  <FileJson size={14} /> {t.results.exportJsonBtn}
              </Button>
              <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={exportPDF}
                  className="gap-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 rounded-xl text-xs"
              >
                  <Download size={14} /> {t.results.exportReportBtn}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t.results.actionPlan}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{t.results.personalizedRecs}</p>
            </div>
          </div>

          {recommendations.length === 0 ? (
             <div className="bg-primary-50 dark:bg-primary-900/20 p-16 rounded-[3rem] border border-primary-100 dark:border-primary-800/50 text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-white dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-500 mx-auto mb-8 shadow-sm">
                    <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-bold text-primary-900 dark:text-primary-200 mb-4">{t.results.perfectTitle}</h3>
                <p className="text-primary-700 dark:text-primary-300 max-w-lg mx-auto text-lg leading-relaxed">
                    {t.results.perfectDesc}
                </p>
             </div>
          ) : (
            <div className="grid gap-6">
                {recommendations.map((rec, idx) => (
                    <div 
                        key={rec.id} 
                        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-slate-900/50 transition-all duration-300 group flex flex-col md:flex-row gap-8 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Icon Box */}
                        <div className="flex-shrink-0">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                                rec.impact === 'Crítico' || rec.impact === 'Alto'
                                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500' 
                                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500'
                            }`}>
                                {rec.impact === 'Crítico' || rec.impact === 'Alto' ? <AlertTriangle size={32} /> : <ShieldCheck size={32} />}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg ${
                                    rec.impact === 'Crítico' || rec.impact === 'Alto' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                }`}>
                                    {rec.impact === 'Crítico' || rec.impact === 'Alto' ? t.results.critical : t.results.suggestion}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 py-1.5 px-3 rounded-lg">
                                    {getCategoryIcon(rec.category)} {rec.category}
                                </span>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{rec.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    {rec.description}
                                </p>
                            </div>
                            
                            {rec.actionUrl && (
                                <div className="pt-2">
                                    <Link to={rec.actionUrl}>
                                        <Button variant="secondary" className="group/btn gap-2 pl-6 pr-6 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-700 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-700/50 font-bold">
                                            {t.common.seeMore} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
          )}
          
          {/* Promo Card */}
          <div className="mt-12 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl shadow-slate-900/20 dark:shadow-black/40 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/tools')}>
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                 <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{t.tools.title}</h3>
                    <p className="text-slate-300 dark:text-slate-400 max-w-lg text-lg leading-relaxed">
                        {t.tools.subtitle}
                    </p>
                 </div>
                 <div className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 hover:scale-105 transition-all shadow-lg whitespace-nowrap">
                    {t.nav.tools}
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};