
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Eye, EyeOff, Globe, Network, AlertOctagon, BarChart2, ArrowRight, Battery, Cpu, HardDrive } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Helper to check for adblockers by trying to load a bait element
const detectAdBlocker = async () => {
    const bait = document.createElement('div');
    bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
    bait.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');
    document.body.appendChild(bait);
    
    // Add a small delay to let the blocker act
    await new Promise(r => setTimeout(r, 100));
    
    const detected = bait.offsetParent === null || bait.offsetHeight === 0 || bait.offsetLeft === 0 || bait.offsetTop === 0 || bait.clientWidth === 0 || bait.clientHeight === 0 || window.getComputedStyle(bait).getPropertyValue('display') === 'none' || window.getComputedStyle(bait).getPropertyValue('visibility') === 'hidden';
    
    document.body.removeChild(bait);
    return detected;
};

// Simplified fingerprint check (reuse logic concepts)
const checkFingerprintResistance = async () => {
    // Check if Canvas readback is noisy (good) or consistent (bad for privacy, good for tracking)
    // Most privacy tools (like Brave) add noise.
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        ctx.textBaseline = "alphabetic";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText("PrivCheck", 2, 15);
        const data1 = canvas.toDataURL();
        
        // Check for Brave
        // @ts-ignore
        if (navigator.brave && await navigator.brave.isBrave()) return true;
        
        // Check for Tor (roughly)
        const isTor = navigator.userAgent.includes('Tor');
        if (isTor) return true;

        return false; // Default assumption: vulnerable if not known protected browser
    } catch(e) {
        return true; // If blocked, it's protected
    }
};

const checkWebRTCLeak = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        pc.createDataChannel('');
        pc.createOffer().then(o => pc.setLocalDescription(o));
        let leaked = false;
        
        pc.onicecandidate = (ice) => {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                const match = ice.candidate.candidate.match(ipRegex);
                if (match) {
                    leaked = true;
                    pc.close();
                    resolve(true);
                }
            }
        };
        
        setTimeout(() => {
            if (!leaked) {
                pc.close();
                resolve(false);
            }
        }, 1500);
    });
};

const checkBatteryAPI = async (): Promise<boolean> => {
    // Returns true if battery API is exposed (Bad for privacy)
    try {
        // @ts-ignore
        if (navigator.getBattery) {
            // @ts-ignore
            await navigator.getBattery();
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};

export const Analyzer: React.FC = () => {
    const { t } = useApp();
    const navigate = useNavigate();
    const [analyzing, setAnalyzing] = useState(true);
    const [score, setScore] = useState(0);
    
    const [metrics, setMetrics] = useState({
        https: false,
        dnt: false,
        webrtcLeaking: false,
        fingerprintResistant: false,
        adblock: false,
        batteryLeaking: false,
        hardwareConcurrency: 0,
        deviceMemory: 0
    });

    useEffect(() => {
        const runAnalysis = async () => {
            setAnalyzing(true);
            
            // 1. HTTPS Check
            const isHttps = window.location.protocol === 'https:';
            
            // 2. Do Not Track / GPC
            // @ts-ignore
            const gpc = navigator.globalPrivacyControl;
            const dnt = navigator.doNotTrack;
            const hasDnt = gpc === true || dnt === "1" || dnt === "yes";

            // 3. AdBlock
            const hasAdBlock = await detectAdBlocker();

            // 4. WebRTC
            const isLeaking = await checkWebRTCLeak();

            // 5. Fingerprint
            const isResistant = await checkFingerprintResistance();

            // 6. Battery API (Hardware fingerprinting)
            const isBatteryExposed = await checkBatteryAPI();

            // 7. Hardware Concurrency
            const cores = navigator.hardwareConcurrency || 0;

            // 8. Device Memory
            // @ts-ignore
            const memory = navigator.deviceMemory || 0;

            setMetrics({
                https: isHttps,
                dnt: hasDnt,
                webrtcLeaking: isLeaking,
                fingerprintResistant: isResistant,
                adblock: hasAdBlock,
                batteryLeaking: isBatteryExposed,
                hardwareConcurrency: cores,
                deviceMemory: memory
            });

            // Calculate Score (Total 100)
            let calculatedScore = 0;
            if (isHttps) calculatedScore += 15;
            if (hasDnt) calculatedScore += 10;
            if (!isLeaking) calculatedScore += 20;
            if (isResistant) calculatedScore += 20;
            if (hasAdBlock) calculatedScore += 10;
            if (!isBatteryExposed) calculatedScore += 10; // Bonus for hiding battery
            if (cores === 0 || cores === undefined) calculatedScore += 7.5; // Bonus for hiding cores
            if (memory === 0 || memory === undefined) calculatedScore += 7.5; // Bonus for hiding memory

            setScore(Math.min(100, Math.round(calculatedScore)));
            setAnalyzing(false);
        };

        // Small delay for animation effect
        setTimeout(runAnalysis, 1000);
    }, []);

    const getGrade = (s: number) => {
        if (s >= 90) return { l: 'A', t: t.analyzer.grade.a, c: 'text-green-500' };
        if (s >= 75) return { l: 'B', t: t.analyzer.grade.b, c: 'text-blue-500' };
        if (s >= 50) return { l: 'C', t: t.analyzer.grade.c, c: 'text-amber-500' };
        if (s >= 30) return { l: 'D', t: t.analyzer.grade.d, c: 'text-orange-500' };
        return { l: 'F', t: t.analyzer.grade.f, c: 'text-red-500' };
    };

    const grade = getGrade(score);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-3xl mb-4 shadow-sm">
                    <BarChart2 size={40} strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.analyzer.title}</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 mt-4 font-light">
                    {analyzing ? t.analyzer.analyzing : t.analyzer.subtitle}
                </p>
            </div>

            {analyzing ? (
                <div className="flex justify-center py-20">
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in space-y-12">
                    {/* Score Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-xl text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className={`text-9xl font-black ${grade.c} mb-2 tracking-tighter`}>{score}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{t.analyzer.score}</div>
                            <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg border-2 ${grade.c} bg-opacity-10 border-opacity-20`}>
                                {grade.t}
                            </div>
                        </div>
                        {/* Background Decor */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-10 ${grade.c.replace('text-', 'bg-')}`}></div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* HTTPS */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.https ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {metrics.https ? <Lock size={24} /> : <Unlock size={24} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.https}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.httpsDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.https ? 'text-green-600' : 'text-red-500'}`}>
                                    {metrics.https ? t.analyzer.status.protected : t.analyzer.status.vulnerable}
                                </div>
                            </div>
                        </div>

                        {/* Tracking / DNT */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.dnt ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                {metrics.dnt ? <EyeOff size={24} /> : <Eye size={24} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.tracking}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.trackingDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.dnt ? 'text-green-600' : 'text-amber-500'}`}>
                                    {metrics.dnt ? t.analyzer.status.detected : t.analyzer.status.warning}
                                </div>
                            </div>
                        </div>

                        {/* WebRTC */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${!metrics.webrtcLeaking ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <Network size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.webrtc}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.webrtcDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${!metrics.webrtcLeaking ? 'text-green-600' : 'text-red-500'}`}>
                                    {!metrics.webrtcLeaking ? t.analyzer.status.protected : t.analyzer.status.detected}
                                </div>
                            </div>
                        </div>

                        {/* AdBlock */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.adblock ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.adblock}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.adblockDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.adblock ? 'text-green-600' : 'text-amber-500'}`}>
                                    {metrics.adblock ? t.analyzer.status.detected : t.analyzer.status.warning}
                                </div>
                            </div>
                        </div>

                        {/* Fingerprint */}
                        <div className="md:col-span-2 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.fingerprintResistant ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <AlertOctagon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.fingerprint}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.fingerprintDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.fingerprintResistant ? 'text-green-600' : 'text-red-500'}`}>
                                    {metrics.fingerprintResistant ? t.analyzer.status.protected : t.analyzer.status.vulnerable}
                                </div>
                            </div>
                        </div>

                        {/* HARDWARE LEAKS SECTION */}
                        
                        {/* Battery API */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${!metrics.batteryLeaking ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                <Battery size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.battery}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.batteryDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${!metrics.batteryLeaking ? 'text-green-600' : 'text-amber-500'}`}>
                                    {metrics.batteryLeaking ? t.analyzer.status.vulnerable : t.analyzer.status.protected}
                                </div>
                            </div>
                        </div>

                        {/* Hardware Concurrency */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.hardwareConcurrency === 0 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                <Cpu size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.hardware}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.hardwareDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.hardwareConcurrency === 0 ? 'text-green-600' : 'text-amber-500'}`}>
                                    {metrics.hardwareConcurrency > 0 ? `${metrics.hardwareConcurrency} Cores Exposed` : t.analyzer.status.hidden}
                                </div>
                            </div>
                        </div>

                        {/* Device Memory */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${metrics.deviceMemory === 0 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                <HardDrive size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.analyzer.metrics.memory}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.analyzer.metrics.memoryDesc}</p>
                                <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${metrics.deviceMemory === 0 ? 'text-green-600' : 'text-amber-500'}`}>
                                    {metrics.deviceMemory > 0 ? `~${metrics.deviceMemory} GB Exposed` : t.analyzer.status.hidden}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center">
                        <Button size="lg" onClick={() => navigate('/hub')} className="px-10 rounded-2xl text-lg shadow-xl shadow-primary-600/20">
                            {t.analyzer.cta} <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
