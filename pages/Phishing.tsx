
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertOctagon, Mail, ThumbsUp, ThumbsDown, ArrowRight, RefreshCw, CheckCircle, XCircle, Smartphone, Wifi, Lock, ShieldAlert, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PhishingScenario } from '../types';

export const Phishing: React.FC = () => {
  const { t } = useApp();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const scenarios = t.phishing.scenarios;
  const currentScenario: PhishingScenario = scenarios[currentIndex];
  const ui = t.phishing.ui;

  const handleAnswer = (userSaysSafe: boolean) => {
      // Logic: User is correct if they say "Safe" and it IS safe, OR "Unsafe" and it IS unsafe.
      const correct = userSaysSafe === currentScenario.isSafe;
      setLastAnswerCorrect(correct);
      if (correct) setScore(score + 1);
      setAnswered(true);
  };

  const nextScenario = () => {
      if (currentIndex < scenarios.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setAnswered(false);
      } else {
          setCompleted(true);
      }
  };

  const resetGame = () => {
      setStarted(false);
      setCurrentIndex(0);
      setScore(0);
      setAnswered(false);
      setCompleted(false);
  };

  // --- RENDERERS FOR DIFFERENT SCENARIO TYPES ---

  const EmailView = ({ scenario }: { scenario: PhishingScenario }) => (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
         <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
             <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="ml-4 flex-grow bg-white dark:bg-slate-900 rounded-lg px-3 py-1 text-xs text-slate-400 font-mono text-center opacity-50">
                 mail.client.app
             </div>
         </div>
         <div className="p-8 md:p-12">
             <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{scenario.subject}</h2>
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500">
                         <Mail size={20} />
                     </div>
                     <div>
                         <div className="font-bold text-slate-800 dark:text-slate-200">Sender Name</div>
                         <div className="text-sm text-slate-500 font-mono bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700 inline-block">
                             &lt;{scenario.sender}&gt;
                         </div>
                     </div>
                 </div>
             </div>
             <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                 <p>{scenario.body}</p>
             </div>
             <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm opacity-50 cursor-not-allowed">
                    {ui.viewDetails}
                </button>
            </div>
        </div>
   </div>
  );

  const SMSView = ({ scenario }: { scenario: PhishingScenario }) => (
    <div className="max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-[3rem] border-8 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative min-h-[500px]">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 text-center font-bold text-slate-700 dark:text-slate-300">
            {ui.messages}
        </div>
        <div className="p-4 flex flex-col gap-4">
             <div className="text-center text-xs text-slate-400 font-medium my-2">{ui.today} 9:41 AM</div>
             <div className="self-start bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] text-sm leading-relaxed relative">
                 <div className="font-bold text-xs text-slate-500 mb-1">{scenario.sender}</div>
                 {scenario.body}
             </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
             <div className="h-10 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"></div>
        </div>
    </div>
  );

  const WifiView = ({ scenario }: { scenario: PhishingScenario }) => (
      <div className="max-w-sm mx-auto bg-slate-50 dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[400px]">
          <div className="bg-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{ui.networks}</span>
                  <Wifi size={24} />
              </div>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 flex justify-between items-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                  <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{scenario.networkName}</span>
                      <span className="text-xs text-slate-500">{scenario.security === 'Open' ? ui.unsecured : ui.encrypted}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      {scenario.security !== 'Open' && <Lock size={16} className="text-slate-400" />}
                      <Wifi size={20} className="text-blue-600" />
                  </div>
              </div>
              {/* Dummy networks for realism */}
              <div className="p-4 opacity-50 flex justify-between items-center">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Office_Guest</span>
                  <Lock size={16} className="text-slate-400" />
              </div>
               <div className="p-4 opacity-50 flex justify-between items-center">
                  <span className="font-bold text-slate-600 dark:text-slate-400">HP-Printer-Connect</span>
                  <Lock size={16} className="text-slate-400" />
              </div>
          </div>
      </div>
  );

  const PasswordView = ({ scenario }: { scenario: PhishingScenario }) => (
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-hidden">
               <div className="flex gap-1.5 shrink-0">
                 <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-300"></div>
             </div>
             <div className="flex-grow bg-white dark:bg-slate-950 rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm flex items-center gap-2 text-slate-600 dark:text-slate-300">
                 {scenario.url?.startsWith('https') ? <Lock size={12} className="text-green-600" /> : <ShieldAlert size={14} className="text-red-500" />}
                 <span className="truncate font-mono">{scenario.url}</span>
             </div>
          </div>
          <div className="p-12 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-2">
                  <Globe size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{ui.signin}</h2>
              <input type="text" disabled placeholder={ui.username} className="w-full max-w-xs px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-70" />
              <input type="password" disabled placeholder={ui.password} className="w-full max-w-xs px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-70" />
              <button className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg font-bold opacity-80">{ui.login}</button>
          </div>
      </div>
  );

  const renderScenario = (scenario: PhishingScenario) => {
      switch(scenario.type) {
          case 'email': return <EmailView scenario={scenario} />;
          case 'sms': return <SMSView scenario={scenario} />;
          case 'wifi': return <WifiView scenario={scenario} />;
          case 'password': return <PasswordView scenario={scenario} />;
          default: return <EmailView scenario={scenario} />;
      }
  };

  const getScenarioIcon = (type: string) => {
      switch(type) {
          case 'email': return <Mail size={24} />;
          case 'sms': return <Smartphone size={24} />;
          case 'wifi': return <Wifi size={24} />;
          case 'password': return <Lock size={24} />;
          default: return <AlertOctagon size={24} />;
      }
  };

  // --- GAME START ---

  if (!started) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
             <div className="inline-flex items-center justify-center p-6 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-[2rem] mb-8 shadow-sm">
                <AlertOctagon size={64} strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">{t.phishing.title}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
                {t.phishing.subtitle}
            </p>
            <Button size="lg" onClick={() => setStarted(true)} className="px-12 py-4 text-xl rounded-2xl bg-amber-600 hover:bg-amber-700 shadow-xl shadow-amber-600/20">
                {t.phishing.startGame}
            </Button>
        </div>
      );
  }

  if (completed) {
       return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
             <div className="inline-flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-[2rem] mb-8 shadow-sm">
                <CheckCircle size={64} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">{t.phishing.completed}</h1>
            <div className="text-6xl font-black text-amber-500 mb-4">{score} / {scenarios.length}</div>
            <p className="text-slate-500 dark:text-slate-400 mb-12">
                {t.phishing.score}
            </p>
            <Button size="lg" onClick={resetGame} variant="outline" className="px-8 py-3 rounded-2xl">
                <RefreshCw size={20} className="mr-2" /> {t.results.retest}
            </Button>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
        {/* Progress */}
        <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                    {getScenarioIcon(currentScenario.type)}
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{`${t.phishing.case} ${currentIndex + 1} ${t.phishing.of} ${scenarios.length}`}</span>
            </div>
            <div className="flex gap-1">
                {scenarios.map((_, i) => (
                    <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i === currentIndex ? 'bg-amber-500' : i < currentIndex ? 'bg-slate-300 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                ))}
            </div>
        </div>

        {/* Dynamic Scenario View */}
        <div className="relative mb-12">
            {renderScenario(currentScenario)}

             {/* Feedback Overlay */}
             {answered && (
                 <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center animate-fade-in rounded-[2rem]">
                     <div className={`p-4 rounded-full mb-4 ${lastAnswerCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                         {lastAnswerCorrect ? <CheckCircle size={48} /> : <XCircle size={48} />}
                     </div>
                     <h3 className={`text-3xl font-bold mb-4 ${lastAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                         {lastAnswerCorrect ? t.phishing.correct : t.phishing.wrong}
                     </h3>
                     <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mb-8 leading-relaxed">
                         {currentScenario.explanation}
                     </p>
                     <Button onClick={nextScenario} size="lg" className="rounded-2xl px-8">
                         {t.common.next} <ArrowRight size={20} className="ml-2" />
                     </Button>
                 </div>
             )}
        </div>

        {/* Controls */}
        {!answered && (
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => handleAnswer(true)}
                    className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-3xl hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400 transition-all group flex flex-col items-center gap-2"
                >
                    <ThumbsUp size={32} />
                    <span className="font-bold text-lg">{t.phishing.safe}</span>
                </button>
                <button 
                    onClick={() => handleAnswer(false)}
                    className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-3xl hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 transition-all group flex flex-col items-center gap-2"
                >
                    <ThumbsDown size={32} />
                    <span className="font-bold text-lg">{t.phishing.unsafe}</span>
                </button>
            </div>
        )}
    </div>
  );
};
