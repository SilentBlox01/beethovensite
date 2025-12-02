

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { 
  Smartphone, Laptop, Globe, Wifi, Check, ChevronRight, ChevronLeft, ShieldCheck, 
  Monitor, Facebook, Twitter, Linkedin, Instagram, Lock, MapPin, Bluetooth, Play, 
  Clock, Shield, MessageCircle, Cloud, Mic, Clapperboard, KeyRound, EyeOff, Hash,
  Search, Mail, RefreshCw, HardDrive, AlertTriangle, Zap, Server, Chrome, Compass, Flame
} from 'lucide-react';
import { 
  Platform, Browser, Social, Risk, MessagingApp, CloudService, DefenseTool,
  SearchEngine, EmailProvider, UpdateHabit, BackupHabit, TwoFactorMethod, PhishingHabit, IotDevice
} from '../types';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
  centered?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ 
  selected, 
  onClick, 
  icon, 
  label,
  subLabel,
  centered = false 
}) => (
  <button
    onClick={onClick}
    className={`relative group p-5 rounded-[1.25rem] border-2 transition-all duration-200 w-full outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 ${
      selected
        ? 'border-primary-500 bg-primary-50/80 dark:bg-primary-900/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none translate-y-[1px]'
        : 'border-transparent bg-white dark:bg-slate-900 hover:border-primary-200 dark:hover:border-primary-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1'
    } ${centered ? 'flex flex-col items-center text-center gap-4 py-8' : 'flex items-center text-left gap-5'}`}
  >
    <div className={`p-3.5 rounded-2xl transition-all duration-300 flex-shrink-0 ${
      selected 
      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 scale-110' 
      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400'
    }`}>
      {icon}
    </div>
    <div className="flex flex-col">
        <span className={`font-bold text-lg leading-tight transition-colors ${selected ? 'text-primary-900 dark:text-primary-100' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
        {label}
        </span>
        {subLabel && (
            <span className={`text-xs mt-1.5 font-semibold tracking-wide ${selected ? 'text-primary-700 dark:text-primary-300' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary-600/70 dark:group-hover:text-primary-400/70'}`}>
                {subLabel}
            </span>
        )}
    </div>
    {selected && (
      <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full p-1 shadow-sm animate-scale-in">
        <Check size={12} strokeWidth={4} />
      </div>
    )}
  </button>
);

const SingleChoiceCard = ({
    value,
    currentValue,
    setValue,
    icon,
    label,
    subLabel
}: { value: string, currentValue: string, setValue: (v: any) => void, icon: React.ReactNode, label: string, subLabel?: string }) => (
    <OptionCard 
        selected={currentValue === value}
        onClick={() => setValue(value)}
        icon={icon}
        label={label}
        subLabel={subLabel}
    />
);

export const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile, t } = useApp();
  const [step, setStep] = useState(0); 
  const totalSteps = 15; 

  // --- STATE ---
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [updateHabit, setUpdateHabit] = useState<UpdateHabit>('manual-soon');
  const [backup, setBackup] = useState<BackupHabit>('none');
  
  const [browsers, setBrowsers] = useState<Browser[]>([]);
  const [searchEngines, setSearchEngines] = useState<SearchEngine[]>([]);
  const [emailProviders, setEmailProviders] = useState<EmailProvider[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  
  const [messaging, setMessaging] = useState<MessagingApp[]>([]);
  const [cloud, setCloud] = useState<CloudService[]>([]);
  const [iot, setIot] = useState<IotDevice[]>([]);

  const [passwordHabit, setPasswordHabit] = useState<'unique'|'mostly-unique'|'reused'>('reused');
  const [twoFactor, setTwoFactor] = useState<TwoFactorMethod>('none');
  const [risks, setRisks] = useState<Risk[]>([]); 
  const [phishing, setPhishing] = useState<PhishingHabit>('open-everything');

  const [defense, setDefense] = useState<DefenseTool[]>([]);

  const handleToggle = <T extends string>(
    item: T, 
    list: T[], 
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    noneValue?: T
  ) => {
    if (noneValue && item === noneValue) {
        if (list.includes(noneValue)) {
             setList([]); 
        } else {
             setList([noneValue]);
        }
        return;
    }

    let newList = [...list];
    if (noneValue && newList.includes(noneValue)) {
        newList = newList.filter(i => i !== noneValue);
    }

    if (newList.includes(item)) {
        newList = newList.filter(i => i !== item);
    } else {
        newList.push(item);
    }
    setList(newList);
  };

  const canProceed = () => {
      switch(step) {
          case 1: return platforms.length > 0;
          case 2: return !!updateHabit;
          case 3: return !!backup;
          case 4: return browsers.length > 0;
          case 5: return searchEngines.length > 0;
          case 6: return emailProviders.length > 0;
          case 7: return socials.length > 0; 
          case 8: return messaging.length > 0;
          case 9: return cloud.length > 0;
          case 10: return iot.length > 0;
          case 11: return !!passwordHabit;
          case 12: return !!twoFactor;
          case 13: return !!phishing;
          case 14: return risks.length > 0;
          case 15: return defense.length > 0;
          default: return true;
      }
  };

  const calculateScore = () => {
    let score = 50; 

    if (passwordHabit === 'reused') score -= 30; 
    if (twoFactor === 'none') score -= 20; 
    if (updateHabit === 'never' || updateHabit === 'manual-late') score -= 15;
    if (backup === 'none') score -= 10;
    if (phishing === 'open-everything') score -= 15;
    
    if (risks.includes('wifi') && !defense.includes('vpn')) score -= 15;
    if (risks.includes('password-reuse')) score -= 10;
    if (risks.includes('public-charging')) score -= 5;
    
    const realRisks = risks.filter(r => r !== 'none');
    const goodDefense = defense.filter(d => ['vpn', '2fa-app', 'password-manager'].includes(d));
    if (realRisks.length >= 2 && goodDefense.length === 0) {
        score -= 20;
    }
    
    if (searchEngines.includes('google') || searchEngines.includes('bing')) score -= 5;
    if (browsers.includes('chrome')) score -= 5;
    if (socials.includes('tiktok') || socials.includes('facebook')) score -= 5;
    if (platforms.includes('windows')) score -= 5;

    if (defense.includes('password-manager')) score += 20; 
    if (defense.includes('2fa-app')) score += 10;
    if (defense.includes('vpn')) score += 5;
    if (defense.includes('adblocker')) score += 5;
    
    if (searchEngines.includes('duckduckgo') || searchEngines.includes('startpage')) score += 5;
    if (browsers.includes('firefox') || browsers.includes('brave')) score += 10; 
    if (messaging.includes('signal')) score += 5;
    if (emailProviders.includes('proton') || emailProviders.includes('tutanota')) score += 10;
    if (platforms.includes('linux')) score += 10;
    if (backup === 'both') score += 5;

    return Math.max(0, Math.min(100, score));
  };

  const finishAssessment = () => {
    const finalScore = calculateScore();
    updateUserProfile({
      platforms, updateHabit, backup,
      browsers, searchEngines, emailProviders, socials,
      messaging, cloud, iot,
      passwordHabit, twoFactor, risks, phishing,
      defense,
      score: finalScore,
      completed: true
    });
    navigate('/results');
  };

  const nextStep = () => {
      if (canProceed()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(prev => Math.min(totalSteps, prev + 1));
      }
  };
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));

  const phases = [
      { start: 1, end: 3, label: t.assessment.phase1 },
      { start: 4, end: 7, label: t.assessment.phase2 },
      { start: 8, end: 10, label: t.assessment.phase3 },
      { start: 11, end: 14, label: t.assessment.phase4 },
      { start: 15, end: 15, label: t.assessment.phase5 },
  ];

  const currentPhase = phases.find(p => step >= p.start && step <= p.end);

  const Title = ({ t, s }: { t: string, s: string }) => (
      <div className="text-center space-y-4 mb-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{t}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">{s}</p>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      
      {step === 0 && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
              <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <ShieldCheck size={48} strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                  {t.assessment.title}
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  {t.home.featDiagnosisDesc}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
                      <Monitor className="text-blue-500" size={24} />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t.assessment.deviceStep}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
                      <Globe className="text-emerald-500" size={24} />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t.assessment.identityStep}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
                      <Lock className="text-orange-500" size={24} />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t.assessment.securityStep}</span>
                  </div>
                   <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-2">
                      <Shield className="text-purple-500" size={24} />
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{t.assessment.defenseStep}</span>
                  </div>
              </div>

              <Button size="lg" onClick={nextStep} className="px-12 py-4 text-lg rounded-2xl shadow-xl shadow-primary-600/20 hover:shadow-2xl hover:shadow-primary-600/30 group">
                  {t.assessment.startBtn} <Play size={20} className="ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" />
              </Button>
          </div>
      )}

      {step > 0 && (
        <div className="animate-fade-in">
            <div className="max-w-2xl mx-auto mb-12">
                <div className="flex justify-between items-end mb-4 px-1">
                    <div>
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest block mb-1">
                            {currentPhase?.label}
                        </span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white">{step}</span>
                        <span className="text-slate-400 dark:text-slate-600 font-medium text-lg"> / {totalSteps}</span>
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex gap-1 overflow-hidden">
                    <div 
                        className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--color-primary-500),0.4)]"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <div className="min-h-[400px]">
                
                {step === 1 && (
                <>
                    <Title t={t.assessment.questions.os} s={t.assessment.questions.osDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <OptionCard selected={platforms.includes('android')} onClick={() => handleToggle('android', platforms, setPlatforms)} icon={<Smartphone />} label="Android" />
                        <OptionCard selected={platforms.includes('ios')} onClick={() => handleToggle('ios', platforms, setPlatforms)} icon={<Smartphone />} label="iPhone / iOS" />
                        <OptionCard selected={platforms.includes('windows')} onClick={() => handleToggle('windows', platforms, setPlatforms)} icon={<Monitor />} label="Windows" />
                        <OptionCard selected={platforms.includes('macos')} onClick={() => handleToggle('macos', platforms, setPlatforms)} icon={<Laptop />} label="macOS" />
                        <OptionCard selected={platforms.includes('linux')} onClick={() => handleToggle('linux', platforms, setPlatforms)} icon={<Laptop />} label={t.assessment.choices.linuxOther} />
                    </div>
                </>
                )}

                {step === 2 && (
                <>
                    <Title t={t.assessment.questions.updates} s={t.assessment.questions.updatesDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        <SingleChoiceCard value="automatic" currentValue={updateHabit} setValue={setUpdateHabit} icon={<RefreshCw />} label={t.assessment.options.auto} />
                        <SingleChoiceCard value="manual-soon" currentValue={updateHabit} setValue={setUpdateHabit} icon={<Check />} label={t.assessment.options.manual} />
                        <SingleChoiceCard value="manual-late" currentValue={updateHabit} setValue={setUpdateHabit} icon={<Clock />} label={t.assessment.choices.manualLate} />
                        <SingleChoiceCard value="never" currentValue={updateHabit} setValue={setUpdateHabit} icon={<AlertTriangle />} label={t.assessment.options.never} />
                    </div>
                </>
                )}

                {step === 3 && (
                <>
                    <Title t={t.assessment.questions.backups} s={t.assessment.questions.backupsDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        <SingleChoiceCard value="both" currentValue={backup} setValue={setBackup} icon={<Server />} label={t.assessment.choices.backupBoth} />
                        <SingleChoiceCard value="cloud-auto" currentValue={backup} setValue={setBackup} icon={<Cloud />} label={t.assessment.choices.backupCloud} />
                        <SingleChoiceCard value="external-drive" currentValue={backup} setValue={setBackup} icon={<HardDrive />} label={t.assessment.choices.backupDisk} />
                        <SingleChoiceCard value="none" currentValue={backup} setValue={setBackup} icon={<AlertTriangle />} label={t.assessment.options.none} />
                    </div>
                </>
                )}

                {step === 4 && (
                <>
                    <Title t={t.assessment.questions.browsers} s={t.assessment.questions.browsersDesc} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <OptionCard selected={browsers.includes('chrome')} onClick={() => handleToggle('chrome', browsers, setBrowsers)} icon={<Chrome />} label="Chrome" centered />
                        <OptionCard selected={browsers.includes('safari')} onClick={() => handleToggle('safari', browsers, setBrowsers)} icon={<Compass />} label="Safari" centered />
                        <OptionCard selected={browsers.includes('edge')} onClick={() => handleToggle('edge', browsers, setBrowsers)} icon={<Globe />} label="Edge" centered />
                        <OptionCard selected={browsers.includes('firefox')} onClick={() => handleToggle('firefox', browsers, setBrowsers)} icon={<Flame />} label="Firefox" centered />
                        <OptionCard selected={browsers.includes('brave')} onClick={() => handleToggle('brave', browsers, setBrowsers)} icon={<Shield />} label="Brave" centered />
                        <OptionCard selected={browsers.includes('other')} onClick={() => handleToggle('other', browsers, setBrowsers)} icon={<Globe />} label={t.assessment.choices.browserOther} centered />
                    </div>
                </>
                )}

                {step === 5 && (
                <>
                    <Title t={t.assessment.questions.search} s={t.assessment.questions.searchDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <OptionCard selected={searchEngines.includes('google')} onClick={() => handleToggle('google', searchEngines, setSearchEngines)} icon={<Search />} label="Google" />
                        <OptionCard selected={searchEngines.includes('bing')} onClick={() => handleToggle('bing', searchEngines, setSearchEngines)} icon={<Search />} label={t.assessment.choices.searchBing} />
                        <OptionCard selected={searchEngines.includes('duckduckgo')} onClick={() => handleToggle('duckduckgo', searchEngines, setSearchEngines)} icon={<Shield />} label="DuckDuckGo" />
                        <OptionCard selected={searchEngines.includes('startpage')} onClick={() => handleToggle('startpage', searchEngines, setSearchEngines)} icon={<Shield />} label="Startpage" />
                    </div>
                </>
                )}

                {step === 6 && (
                <>
                    <Title t={t.assessment.questions.email} s={t.assessment.questions.emailDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <OptionCard selected={emailProviders.includes('gmail')} onClick={() => handleToggle('gmail', emailProviders, setEmailProviders)} icon={<Mail />} label={t.assessment.choices.emailGmail} />
                        <OptionCard selected={emailProviders.includes('outlook')} onClick={() => handleToggle('outlook', emailProviders, setEmailProviders)} icon={<Mail />} label={t.assessment.choices.emailOutlook} />
                        <OptionCard selected={emailProviders.includes('icloud')} onClick={() => handleToggle('icloud', emailProviders, setEmailProviders)} icon={<Cloud />} label={t.assessment.choices.emailIcloud} />
                        <OptionCard selected={emailProviders.includes('proton')} onClick={() => handleToggle('proton', emailProviders, setEmailProviders)} icon={<ShieldCheck />} label={t.assessment.choices.emailProton} />
                        <OptionCard selected={emailProviders.includes('yahoo')} onClick={() => handleToggle('yahoo', emailProviders, setEmailProviders)} icon={<Mail />} label={t.assessment.choices.emailYahoo} />
                    </div>
                </>
                )}

                {step === 7 && (
                <>
                    <Title t={t.assessment.questions.social} s={t.assessment.questions.socialDesc} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                         <OptionCard selected={socials.includes('facebook')} onClick={() => handleToggle('facebook', socials, setSocials, 'none')} icon={<Facebook />} label="Facebook" centered />
                         <OptionCard selected={socials.includes('instagram')} onClick={() => handleToggle('instagram', socials, setSocials, 'none')} icon={<Instagram />} label="Instagram" centered />
                         
                         <button
                            onClick={() => handleToggle('tiktok', socials, setSocials, 'none')}
                            className={`relative group p-5 rounded-[1.25rem] border-2 transition-all duration-200 w-full outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 flex flex-col items-center text-center gap-4 py-8 ${
                            socials.includes('tiktok')
                                ? 'border-primary-500 bg-primary-50/80 dark:bg-primary-900/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] translate-y-[1px]'
                                : 'border-transparent bg-white dark:bg-slate-900 hover:border-primary-200 dark:hover:border-primary-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1'
                            }`}
                        >
                            <div className={`p-3.5 rounded-2xl transition-all duration-300 ${socials.includes('tiktok') ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30 scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                            </div>
                            <span className={`font-bold text-lg leading-tight ${socials.includes('tiktok') ? 'text-primary-900 dark:text-primary-100' : 'text-slate-700 dark:text-slate-300'}`}>TikTok</span>
                            {socials.includes('tiktok') && <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full p-1 shadow-sm animate-scale-in"><Check size={12} strokeWidth={4} /></div>}
                        </button>

                         <OptionCard selected={socials.includes('twitter')} onClick={() => handleToggle('twitter', socials, setSocials, 'none')} icon={<Twitter />} label="X (Twitter)" centered />
                         <OptionCard selected={socials.includes('linkedin')} onClick={() => handleToggle('linkedin', socials, setSocials, 'none')} icon={<Linkedin />} label="LinkedIn" centered />
                         <OptionCard selected={socials.includes('none')} onClick={() => handleToggle('none', socials, setSocials, 'none')} icon={<AlertTriangle />} label={t.assessment.options.none} centered />
                    </div>
                </>
                )}

                {step === 8 && (
                <>
                    <Title t={t.assessment.questions.messaging} s={t.assessment.questions.messagingDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <OptionCard selected={messaging.includes('whatsapp')} onClick={() => handleToggle('whatsapp', messaging, setMessaging, 'none')} icon={<MessageCircle />} label="WhatsApp" />
                        <OptionCard selected={messaging.includes('telegram')} onClick={() => handleToggle('telegram', messaging, setMessaging, 'none')} icon={<MessageCircle />} label="Telegram" />
                        <OptionCard selected={messaging.includes('signal')} onClick={() => handleToggle('signal', messaging, setMessaging, 'none')} icon={<Shield />} label="Signal" />
                        <OptionCard selected={messaging.includes('messenger')} onClick={() => handleToggle('messenger', messaging, setMessaging, 'none')} icon={<Facebook />} label="Messenger" />
                        <OptionCard selected={messaging.includes('sms')} onClick={() => handleToggle('sms', messaging, setMessaging, 'none')} icon={<Smartphone />} label={t.assessment.choices.msgSms} />
                    </div>
                </>
                )}

                {step === 9 && (
                <>
                    <Title t={t.assessment.questions.cloud} s={t.assessment.questions.cloudDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <OptionCard selected={cloud.includes('google-drive')} onClick={() => handleToggle('google-drive', cloud, setCloud, 'none')} icon={<Cloud />} label={t.assessment.choices.cloudDrive} />
                        <OptionCard selected={cloud.includes('icloud')} onClick={() => handleToggle('icloud', cloud, setCloud, 'none')} icon={<Cloud />} label="iCloud" />
                        <OptionCard selected={cloud.includes('dropbox')} onClick={() => handleToggle('dropbox', cloud, setCloud, 'none')} icon={<Cloud />} label="Dropbox" />
                        <OptionCard selected={cloud.includes('onedrive')} onClick={() => handleToggle('onedrive', cloud, setCloud, 'none')} icon={<Cloud />} label="OneDrive" />
                        <OptionCard selected={cloud.includes('none')} onClick={() => handleToggle('none', cloud, setCloud, 'none')} icon={<AlertTriangle />} label={t.assessment.options.none} />
                    </div>
                </>
                )}

                {step === 10 && (
                <>
                    <Title t={t.assessment.questions.iot} s={t.assessment.questions.iotDesc} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <OptionCard selected={iot.includes('alexa')} onClick={() => handleToggle('alexa', iot, setIot, 'none')} icon={<Mic />} label={t.assessment.choices.iotAlexa} />
                        <OptionCard selected={iot.includes('google-home')} onClick={() => handleToggle('google-home', iot, setIot, 'none')} icon={<Mic />} label={t.assessment.choices.iotGoogle} />
                        <OptionCard selected={iot.includes('ring')} onClick={() => handleToggle('ring', iot, setIot, 'none')} icon={<Clapperboard />} label={t.assessment.choices.iotRing} />
                        <OptionCard selected={iot.includes('smart-tv')} onClick={() => handleToggle('smart-tv', iot, setIot, 'none')} icon={<Monitor />} label={t.assessment.choices.iotTv} />
                        <OptionCard selected={iot.includes('none')} onClick={() => handleToggle('none', iot, setIot, 'none')} icon={<AlertTriangle />} label={t.assessment.options.none} />
                    </div>
                </>
                )}

                {step === 11 && (
                <>
                    <Title t={t.assessment.questions.passwords} s={t.assessment.questions.passwordsDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        <SingleChoiceCard value="unique" currentValue={passwordHabit} setValue={setPasswordHabit} icon={<KeyRound />} label={t.assessment.choices.passUnique} subLabel={t.assessment.choices.passUniqueDesc} />
                        <SingleChoiceCard value="mostly-unique" currentValue={passwordHabit} setValue={setPasswordHabit} icon={<KeyRound />} label={t.assessment.choices.passMostly} subLabel={t.assessment.choices.passMostlyDesc} />
                        <SingleChoiceCard value="reused" currentValue={passwordHabit} setValue={setPasswordHabit} icon={<AlertTriangle />} label={t.assessment.choices.passReused} subLabel={t.assessment.choices.passReusedDesc} />
                    </div>
                </>
                )}

                {step === 12 && (
                <>
                    <Title t={t.assessment.questions.twoFactor} s={t.assessment.questions.twoFactorDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        <SingleChoiceCard value="app" currentValue={twoFactor} setValue={setTwoFactor} icon={<Hash />} label={t.assessment.choices.twoFaApp} subLabel={t.assessment.choices.twoFaAppDesc} />
                        <SingleChoiceCard value="hardware-key" currentValue={twoFactor} setValue={setTwoFactor} icon={<ShieldCheck />} label={t.assessment.choices.twoFaKey} subLabel={t.assessment.choices.twoFaKeyDesc} />
                        <SingleChoiceCard value="sms" currentValue={twoFactor} setValue={setTwoFactor} icon={<Smartphone />} label={t.assessment.choices.twoFaSms} subLabel={t.assessment.choices.twoFaSmsDesc} />
                        <SingleChoiceCard value="none" currentValue={twoFactor} setValue={setTwoFactor} icon={<AlertTriangle />} label={t.assessment.options.none} subLabel={t.assessment.choices.twoFaNoneDesc} />
                    </div>
                </>
                )}

                {step === 13 && (
                <>
                    <Title t={t.assessment.questions.phishing} s={t.assessment.questions.phishingDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                        <SingleChoiceCard value="check-sender" currentValue={phishing} setValue={setPhishing} icon={<Search />} label={t.assessment.choices.phishCheck} subLabel={t.assessment.choices.phishCheckDesc} />
                        <SingleChoiceCard value="check-url" currentValue={phishing} setValue={setPhishing} icon={<EyeOff />} label={t.assessment.choices.phishLook} subLabel={t.assessment.choices.phishLookDesc} />
                        <SingleChoiceCard value="open-everything" currentValue={phishing} setValue={setPhishing} icon={<AlertTriangle />} label={t.assessment.choices.phishOpen} subLabel={t.assessment.choices.phishOpenDesc} />
                    </div>
                </>
                )}

                {step === 14 && (
                <>
                    <Title t={t.assessment.questions.risks} s={t.assessment.questions.risksDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                         <OptionCard selected={risks.includes('wifi')} onClick={() => handleToggle('wifi', risks, setRisks, 'none')} icon={<Wifi />} label={t.assessment.choices.riskWifi} subLabel={t.assessment.choices.riskWifiDesc} />
                         <OptionCard selected={risks.includes('bluetooth')} onClick={() => handleToggle('bluetooth', risks, setRisks, 'none')} icon={<Bluetooth />} label={t.assessment.choices.riskBlue} subLabel={t.assessment.choices.riskBlueDesc} />
                         <OptionCard selected={risks.includes('location')} onClick={() => handleToggle('location', risks, setRisks, 'none')} icon={<MapPin />} label={t.assessment.choices.riskLoc} subLabel={t.assessment.choices.riskLocDesc} />
                         <OptionCard selected={risks.includes('public-charging')} onClick={() => handleToggle('public-charging', risks, setRisks, 'none')} icon={<Zap />} label={t.assessment.choices.riskUsb} subLabel={t.assessment.choices.riskUsbDesc} />
                         <OptionCard selected={risks.includes('none')} onClick={() => handleToggle('none', risks, setRisks, 'none')} icon={<Check />} label={t.assessment.options.none} />
                    </div>
                </>
                )}

                {step === 15 && (
                <>
                    <Title t={t.assessment.questions.defense} s={t.assessment.questions.defenseDesc} />
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                         <OptionCard selected={defense.includes('password-manager')} onClick={() => handleToggle('password-manager', defense, setDefense, 'none')} icon={<KeyRound />} label={t.assessment.choices.defPass} />
                         <OptionCard selected={defense.includes('2fa-app')} onClick={() => handleToggle('2fa-app', defense, setDefense, 'none')} icon={<Hash />} label={t.assessment.choices.def2fa} />
                         <OptionCard selected={defense.includes('vpn')} onClick={() => handleToggle('vpn', defense, setDefense, 'none')} icon={<Shield />} label={t.assessment.choices.defVpn} />
                         <OptionCard selected={defense.includes('adblocker')} onClick={() => handleToggle('adblocker', defense, setDefense, 'none')} icon={<EyeOff />} label={t.assessment.choices.defAd} />
                         <OptionCard selected={defense.includes('privacy-screen')} onClick={() => handleToggle('privacy-screen', defense, setDefense, 'none')} icon={<Smartphone />} label={t.assessment.choices.defScreen} />
                         <OptionCard selected={defense.includes('none')} onClick={() => handleToggle('none', defense, setDefense, 'none')} icon={<AlertTriangle />} label={t.assessment.options.none} />
                    </div>
                </>
                )}

                <div className="flex justify-between mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
                <Button 
                    variant="ghost" 
                    onClick={prevStep} 
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <ChevronLeft size={20} className="mr-2" /> {t.common.back}
                </Button>
                
                {step < totalSteps ? (
                    <Button 
                        onClick={nextStep} 
                        size="lg" 
                        disabled={!canProceed()}
                        className="px-10 shadow-xl shadow-primary-600/20 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {t.common.next} <ChevronRight size={20} className="ml-2" />
                    </Button>
                ) : (
                    <Button 
                        onClick={finishAssessment} 
                        size="lg" 
                        disabled={!canProceed()}
                        className="px-10 bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-xl shadow-slate-900/20 dark:shadow-white/10 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                    {t.assessment.viewReport} <ShieldCheck size={20} className="ml-2" />
                    </Button>
                )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
