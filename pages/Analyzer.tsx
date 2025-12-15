
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Eye, EyeOff, Globe, Network, AlertOctagon, BarChart2, ArrowRight, Battery, Cpu, HardDrive, Monitor, MapPin, Type, Hash, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- HELPERS ---

async function sha256(str: string) {
  const buffer = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const detectAdBlocker = async () => {
    const bait = document.createElement('div');
    bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
    bait.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');
    document.body.appendChild(bait);
    await new Promise(r => setTimeout(r, 100));
    const detected = bait.offsetParent === null || bait.offsetHeight === 0 || bait.offsetLeft === 0 || bait.offsetTop === 0 || bait.clientWidth === 0 || bait.clientHeight === 0 || window.getComputedStyle(bait).getPropertyValue('display') === 'none' || window.getComputedStyle(bait).getPropertyValue('visibility') === 'hidden';
    document.body.removeChild(bait);
    return detected;
};

const getCanvasFingerprint = () => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'not_supported';
        canvas.width = 280;
        canvas.height = 60;
        ctx.textBaseline = "alphabetic";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText("Beethoven <canvas> 1.0", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("Beethoven <canvas> 1.0", 4, 17);
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(0,255,255)";
        ctx.beginPath();
        ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.beginPath();
        ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
        ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
        ctx.fill("evenodd");
        return canvas.toDataURL();
    } catch (e) {
        return 'error';
    }
};

const getAudioFingerprint = async (): Promise<string> => {
    try {
        // @ts-ignore
        const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (!AudioContext) return 'not_supported';
        const context = new AudioContext(1, 44100, 44100);
        const oscillator = context.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 10000;
        const compressor = context.createDynamicsCompressor();
        compressor.threshold.value = -50;
        compressor.knee.value = 40;
        compressor.ratio.value = 12;
        compressor.attack.value = 0;
        compressor.release.value = 0.25;
        oscillator.connect(compressor);
        compressor.connect(context.destination);
        oscillator.start(0);
        const buffer = await context.startRendering();
        const data = buffer.getChannelData(0).slice(0, 4500);
        let str = '';
        for (let i = 0; i < data.length; i++) {
             str += data[i].toString();
        }
        return await sha256(str);
    } catch (e) {
        return 'error';
    }
}

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

const getWebGLInfo = () => {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { vendor: 'N/A', renderer: 'N/A' };
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return { vendor: 'Generic', renderer: 'Generic' };
        const vendor = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return { vendor, renderer };
    } catch (e) {
        return { vendor: 'Error', renderer: 'Error' };
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

    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        const runAnalysis = async () => {
            setAnalyzing(true);
            const nav = window.navigator as any;
            
            // 1. HTTPS Check
            const isHttps = window.location.protocol === 'https:';
            
            // 2. Do Not Track / GPC
            const gpc = nav.globalPrivacyControl;
            const dnt = nav.doNotTrack;
            const hasDnt = gpc === true || dnt === "1" || dnt === "yes";

            // 3. AdBlock
            const hasAdBlock = await detectAdBlocker();

            // 4. WebRTC
            const isLeaking = await checkWebRTCLeak();

            // 5. Fingerprint (Canvas Hash)
            const canvasData = getCanvasFingerprint();
            const canvasHash = await sha256(canvasData);
            const audioHash = await getAudioFingerprint();

            // Heuristic for resistance: if known randomization or blocked
            // For now, we assume simple check. If canvas works, it's trackable.
            // Real resistance means it returns noise or is blocked.
            // Detecting noise is hard without a reference.
            // We'll mark as "Vulnerable" if we can get a stable hash easily.
            // But nearly all browsers return a hash.
            // Better check: Is it a known privacy browser?
            // Brave has `navigator.brave`.
            const isBrave = nav.brave && await nav.brave.isBrave();
            const isResistant = isBrave || nav.userAgent.includes('Tor');

            // 6. Battery API
            const isBatteryExposed = await checkBatteryAPI();

            // 7. Hardware
            const cores = nav.hardwareConcurrency || 0;
            const memory = nav.deviceMemory || 0;

            // 8. Details
            const gpu = getWebGLInfo();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            setMetrics({
                https: isHttps,
                dnt: hasDnt,
                webrtcLeaking: isLeaking,
                fingerprintResistant: isResistant, // This is strict
                adblock: hasAdBlock,
                batteryLeaking: isBatteryExposed,
                hardwareConcurrency: cores,
                deviceMemory: memory
            });

            setDetails({
                userAgent: nav.userAgent,
                screen: `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`,
                timezone: timezone,
                language: nav.language,
                platform: nav.platform,
                webgl: gpu.renderer,
                canvas: canvasHash.substring(0, 16) + '...',
                audio: audioHash.substring(0, 16) + '...',
                fonts: 'Standard Set' // Avoiding heavy font check here for speed
            });

            // Calculate Score (Total 100)
            let calculatedScore = 0;
            if (isHttps) calculatedScore += 15;
            if (hasDnt) calculatedScore += 10;
            if (!isLeaking) calculatedScore += 20;
            if (isResistant) calculatedScore += 20; // Hard to get
            if (hasAdBlock) calculatedScore += 10;
            if (!isBatteryExposed) calculatedScore += 10;
            if (!cores) calculatedScore += 7.5;
            if (!memory) calculatedScore += 7.5;

            // Adjust score mostly for educational purposes (don't discourage too much)
            if (!isResistant && calculatedScore > 40) calculatedScore += 10; // Bump slightly if everything else is good

            setScore(Math.min(100, Math.round(calculatedScore)));
            setAnalyzing(false);
        };

        setTimeout(runAnalysis, 1500);
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
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
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
                <div className="flex flex-col items-center justify-center py-20 gap-8">
                    <div className="relative w-32 h-32">
                        <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                        <FingerprintIcon className="absolute inset-0 m-auto text-indigo-500 animate-pulse" size={48} />
                    </div>
                    <div className="font-mono text-sm text-slate-400">Analyzing browser fingerprint...</div>
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
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-10 ${grade.c.replace('text-', 'bg-')}`}></div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MetricCard icon={<Lock />} label={t.analyzer.metrics.https} desc={t.analyzer.metrics.httpsDesc} status={metrics.https} t={t} />
                        <MetricCard icon={<EyeOff />} label={t.analyzer.metrics.tracking} desc={t.analyzer.metrics.trackingDesc} status={metrics.dnt} warningIfFalse t={t} />
                        <MetricCard icon={<Network />} label={t.analyzer.metrics.webrtc} desc={t.analyzer.metrics.webrtcDesc} status={!metrics.webrtcLeaking} t={t} />
                        <MetricCard icon={<ShieldCheck />} label={t.analyzer.metrics.adblock} desc={t.analyzer.metrics.adblockDesc} status={metrics.adblock} warningIfFalse t={t} />
                        <MetricCard icon={<AlertOctagon />} label={t.analyzer.metrics.fingerprint} desc={t.analyzer.metrics.fingerprintDesc} status={metrics.fingerprintResistant} warningIfFalse t={t} />
                        <MetricCard icon={<Battery />} label={t.analyzer.metrics.battery} desc={t.analyzer.metrics.batteryDesc} status={!metrics.batteryLeaking} t={t} />
                        <MetricCard icon={<Cpu />} label={t.analyzer.metrics.hardware} desc={t.analyzer.metrics.hardwareDesc} status={!metrics.hardwareConcurrency} val={metrics.hardwareConcurrency ? `${metrics.hardwareConcurrency} Cores` : 'Hidden'} t={t} />
                        <MetricCard icon={<HardDrive />} label={t.analyzer.metrics.memory} desc={t.analyzer.metrics.memoryDesc} status={!metrics.deviceMemory} val={metrics.deviceMemory ? `~${metrics.deviceMemory} GB` : 'Hidden'} t={t} />
                    </div>

                    {/* Detailed Fingerprint Report */}
                    {details && (
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-inner">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-2xl text-blue-600 dark:text-blue-400"><Hash size={24} /></div>
                                {t.analyzer.details.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <DetailRow label={t.analyzer.details.userAgent} value={details.userAgent} icon={<Globe size={16} />} />
                                <DetailRow label={t.analyzer.details.screen} value={details.screen} icon={<Monitor size={16} />} />
                                <DetailRow label={t.analyzer.details.timezone} value={details.timezone} icon={<MapPin size={16} />} />
                                <DetailRow label={t.analyzer.details.language} value={details.language} icon={<Type size={16} />} />
                                <DetailRow label={t.analyzer.details.platform} value={details.platform} icon={<Cpu size={16} />} />
                                <DetailRow label={t.analyzer.details.webgl} value={details.webgl} icon={<Monitor size={16} />} />
                                <DetailRow label={t.analyzer.details.canvas} value={details.canvas} icon={<Hash size={16} />} mono />
                                <DetailRow label={t.analyzer.details.audio} value={details.audio} icon={<Hash size={16} />} mono />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center pt-8">
                        <Button size="lg" onClick={() => navigate('/hub')} className="px-12 py-5 rounded-2xl text-lg shadow-xl shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700">
                            {t.analyzer.cta} <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const MetricCard = ({ icon, label, desc, status, t, warningIfFalse, val }: any) => (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow">
        <div className={`p-3.5 rounded-2xl ${status ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : (warningIfFalse ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400')}`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex justify-between">
                {label}
                {val && <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 font-mono">{val}</span>}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
            <div className={`mt-3 text-xs font-black uppercase tracking-wider ${status ? 'text-green-600 dark:text-green-400' : (warningIfFalse ? 'text-amber-600 dark:text-amber-400' : 'text-red-500')}`}>
                {status ? t.analyzer.status.protected : (warningIfFalse ? t.analyzer.status.warning : t.analyzer.status.vulnerable)}
            </div>
        </div>
    </div>
);

const DetailRow = ({ label, value, icon, mono }: any) => (
    <div className="group">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            {icon} {label}
        </div>
        <div className={`text-slate-700 dark:text-slate-200 break-all bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 ${mono ? 'font-mono text-xs' : 'font-medium'}`}>
            {value || 'Unknown'}
        </div>
    </div>
);

const FingerprintIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6" />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .5-2.5" />
        <path d="M12 21a9 9 0 0 1-9-9c0-2 1-3.5 2-5" />
        <path d="M12.5 21a7 7 0 0 0 7-7c0-2-1-3.5-2-5" />
        <path d="M2 12h2" />
        <path d="M19 12h2" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
    </svg>
);
