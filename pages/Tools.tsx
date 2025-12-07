

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import {
    Copy,
    RefreshCw,
    Check,
    Lock,
    Shield,
    ShieldCheck,
    Settings,
    Scissors,
    Globe,
    Fingerprint,
    KeyRound,
    ShieldAlert,
    Cpu,
    Wrench,
    UserX,
    Zap,
    HardDrive,
    Terminal,
    Maximize,
    FileLock,
    Mic,
    File as FileIcon,
    Upload,
    Download,
    Facebook,
    Instagram,
    Twitter,
    FileText,
    QrCode,
    Network,
    CheckCircle,
    XCircle,
    Clock,
    Radar,
    Server,
    Activity,
    Tag,
    Laptop,
    Ghost,
    Eye,
    Shuffle,
    Search,
    MapPin,
    Bot,
    Type,
    Sun,
    Palette,
    Contrast,
    EyeOff,
    ChevronDown,
    Wifi
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// --- HELPERS ---

async function sha1(str: string) {
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-1', buffer);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
}

async function sha256(str: string) {
    const buffer = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function hashFile(file: File, algo: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256') {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algo, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const getRandomChar = (source: string) => {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return source[values[0] % source.length];
};

const secureShuffle = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const jValues = new Uint32Array(1);
        window.crypto.getRandomValues(jValues);
        const j = jValues[0] % (i + 1);
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const textToBinary = (text: string) => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
};

const binaryToText = (binary: string) => {
    let text = '';
    for (let i = 0; i < binary.length; i += 8) {
        text += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
    }
    return text;
};

// --- FINGERPRINTING HELPERS ---
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
        ctx.fillRect(125, 1, 62, 20);
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

const detectInstalledFonts = () => {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const fontList = [
        'Arial', 'Arial Black', 'Calibri', 'Cambria', 'Cambria Math', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New',
        'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Microsoft Sans Serif',
        'Segoe UI', 'Tahoma', 'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Roboto', 'Ubuntu', 'Cantarell'
    ];
    const testString = "mmmmmmmmmmlli";
    const testSize = "72px";
    const h = document.getElementsByTagName("body")[0];
    const s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    const defaultWidth: Record<string, number> = {};
    const defaultHeight: Record<string, number> = {};
    for (const index in baseFonts) {
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth;
        defaultHeight[baseFonts[index]] = s.offsetHeight;
        h.removeChild(s);
    }
    const detected: string[] = [];
    for (const font of fontList) {
        let matched = false;
        for (const baseFont of baseFonts) {
            s.style.fontFamily = font + ',' + baseFont;
            h.appendChild(s);
            const w = s.offsetWidth;
            const h_val = s.offsetHeight;
            h.removeChild(s);
            if (w !== defaultWidth[baseFont] || h_val !== defaultHeight[baseFont]) {
                matched = true;
                break;
            }
        }
        if (matched) detected.push(font);
    }
    return detected;
};

// --- UI COMPONENTS ---

const ScoreRing = ({ score, colorClass }: { score: number, colorClass: string }) => {
    const radius = 36;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-24 h-24">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 drop-shadow-sm">
                <circle stroke="currentColor" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} className="text-slate-100 dark:text-slate-800" />
                <circle stroke="currentColor" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }} strokeLinecap="round" fill="transparent" r={normalizedRadius} cx={radius} cy={radius} className={colorClass} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-black ${colorClass}`}>{score}</span>
            </div>
        </div>
    );
};

const Widget = ({ icon, label, value, color }: { icon: any, label: string, value: any, color: string }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
        <div className={`p-3 rounded-xl ${color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <div className="overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
            <p className="text-slate-800 dark:text-slate-200 font-bold truncate text-sm" title={typeof value === 'string' ? value : ''}>{value}</p>
        </div>
    </div>
);

const RadarMetricRow = ({ label, value, score, color }: { label: string, value: string, score: number, color: string }) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            <span>{label}</span>
            <span className={color}>{value}</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500 shadow-[0_0_10px_currentColor]`} style={{ width: `${score}%` }}></div>
        </div>
    </div>
);

// New Input Style
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }>(
    ({ className, icon, ...props }, ref) => (
        <div className="relative group w-full">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors pointer-events-none">
                    {icon}
                </div>
            )}
            <input
                ref={ref}
                {...props}
                className={`w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 focus:border-primary-500 dark:focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:text-white font-medium ${className}`}
            />
        </div>
    ));

// Tool Card Wrapper
const ToolCard = ({ children, title, icon, color = 'primary', className = '' }: { children: React.ReactNode, title: string, icon: React.ReactNode, color?: string, className?: string }) => {
    const colorClasses = {
        primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
        rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
        teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
        indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
    };

    const borderClasses = {
        primary: 'hover:border-primary-500/50',
        rose: 'hover:border-rose-500/50',
        blue: 'hover:border-blue-500/50',
        purple: 'hover:border-purple-500/50',
        amber: 'hover:border-amber-500/50',
        teal: 'hover:border-teal-500/50',
        indigo: 'hover:border-indigo-500/50',
        slate: 'hover:border-slate-500/50'
    }

    return (
        <div className={`bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden group transition-all duration-300 ${borderClasses[color as keyof typeof borderClasses]} hover:shadow-2xl ${className}`}>
            <div className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-4 mb-2">
                    <div className={`p-3 rounded-2xl ${colorClasses[color as keyof typeof colorClasses]} shadow-sm transition-transform group-hover:scale-110 duration-300`}>
                        {icon}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
                </div>
            </div>
            <div className="p-8">
                {children}
            </div>
        </div>
    );
};

export const Tools: React.FC = () => {
    const { t } = useApp();
    const [activeTab, setActiveTab] = useState<'keys' | 'privacy' | 'files' | 'radar' | 'sps' | 'utils'>('keys');

    // --- Password Generator State ---
    const [genLength, setGenLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [generatedPass, setGeneratedPass] = useState('');
    const [passCopied, setPassCopied] = useState(false);

    // --- Auditor State ---
    const [testPass, setTestPass] = useState('');
    const [isCheckingPwned, setIsCheckingPwned] = useState(false);
    const [pwnedCount, setPwnedCount] = useState<number | null>(null);
    const [entropy, setEntropy] = useState(0);
    const [crackScenarios, setCrackScenarios] = useState<{ label: string, time: string, icon: any }[]>([]);
    const [passPatterns, setPassPatterns] = useState<string[]>([]);

    // --- Link Cleaner State ---
    const [dirtyLink, setDirtyLink] = useState('');
    const [cleanLink, setCleanLink] = useState('');
    const [removedTags, setRemovedTags] = useState<string[]>([]);
    const [linkAnalysis, setLinkAnalysis] = useState<{ score: number, label: string, color: string, ringColor: string, flags: string[] } | null>(null);

    // --- Device Info State ---
    const [deviceInfo, setDeviceInfo] = useState<any>(null);
    const [loadingFingerprint, setLoadingFingerprint] = useState(true);

    // --- File Vault State ---
    const [vaultFile, setVaultFile] = useState<File | null>(null);
    const [vaultPass, setVaultPass] = useState('');
    const [vaultProcessing, setVaultProcessing] = useState(false);
    const [vaultError, setVaultError] = useState<string | null>(null);
    const vaultInputRef = useRef<HTMLInputElement>(null);

    // --- Steganography State ---
    const [stegMode, setStegMode] = useState<'hide' | 'reveal'>('hide');
    const [stegFile, setStegFile] = useState<File | null>(null);
    const [stegMessage, setStegMessage] = useState('');
    const [stegResultImg, setStegResultImg] = useState<string | null>(null);
    const [stegResultMsg, setStegResultMsg] = useState<string | null>(null);
    const stegInputRef = useRef<HTMLInputElement>(null);

    // --- GDPR Generator State ---
    const [gdprCompany, setGdprCompany] = useState('');
    const [gdprName, setGdprName] = useState('');
    const [gdprEmail, setGdprEmail] = useState('');
    const [gdprResult, setGdprResult] = useState('');

    // --- QR Generator State ---
    const [qrType, setQrType] = useState<'wifi' | 'text'>('wifi');
    const [qrSsid, setQrSsid] = useState('');
    const [qrPass, setQrPass] = useState('');
    const [qrText, setQrText] = useState('');
    const [qrImage, setQrImage] = useState<string | null>(null);

    // --- WebRTC Leak State ---
    const [webrtcIP, setWebrtcIP] = useState<string | null>(null);
    const [webrtcLoading, setWebrtcLoading] = useState(false);

    // --- Checksum Verifier State ---
    const [checksumFile, setChecksumFile] = useState<File | null>(null);
    const [checksumHash, setChecksumHash] = useState<string>('');
    const [checksumCompare, setChecksumCompare] = useState('');
    const [checksumLoading, setChecksumLoading] = useState(false);
    const checksumInputRef = useRef<HTMLInputElement>(null);

    // --- Radar (BreachRadar) State ---
    const [radarTarget, setRadarTarget] = useState('');
    const [radarScanning, setRadarScanning] = useState(false);
    const [radarLogs, setRadarLogs] = useState<string[]>([]);
    const [radarMetrics, setRadarMetrics] = useState({
        latency: 0,
        jitter: 0,
        score: 100,
        status: 'safe',
        dnsScore: 100,
        netScore: 100,
        sslScore: 100,
        portScore: 100,
        location: '...'
    });

    // --- SPS (ShadowProfile Scrubber) State ---
    const [spsScanning, setSpsScanning] = useState(false);
    const [spsResult, setSpsResult] = useState<{ risk: 'High' | 'Moderate' | 'Low', apis: string[], brokers: string[] } | null>(null);
    const [spsNoiseQueries, setSpsNoiseQueries] = useState<string[]>([]);
    const [noiseActive, setNoiseActive] = useState(false);

    // --- LOGIC: Drag & Drop Handlers ---
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent, setFile: (f: File) => void) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    // --- Logic Implementations ---

    const generatePassword = () => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let chars = '';
        if (useUpper) chars += upper;
        if (useLower) chars += lower;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;
        if (chars === '') return;
        let result = [];
        if (useUpper) result.push(getRandomChar(upper));
        if (useLower) result.push(getRandomChar(lower));
        if (useNumbers) result.push(getRandomChar(numbers));
        if (useSymbols) result.push(getRandomChar(symbols));
        while (result.length < genLength) {
            result.push(getRandomChar(chars));
        }
        setGeneratedPass(secureShuffle(result).join(''));
        setPassCopied(false);
    };

    const formatTime = (seconds: number) => {
        if (seconds < 1) return t.tools.instant;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const years = days / 365;
        const centuries = years / 100;
        if (centuries > 1) return `> ${Math.floor(centuries)} ${t.tools.time.centuries}`;
        if (years > 100) return `> 100 ${t.tools.time.years}`;
        if (years >= 1) return `${Math.floor(years)} ${t.tools.time.years}`;
        if (days >= 1) return `${Math.floor(days)}${t.tools.time.days}`;
        if (hours >= 1) return `${Math.floor(hours)}${t.tools.time.hours}`;
        if (minutes >= 1) return `${Math.floor(minutes)}${t.tools.time.minutes}`;
        return `${Math.floor(seconds)}${t.tools.time.seconds}`;
    };

    const calculateScenarios = (bits: number) => {
        const laptopSecs = Math.pow(2, bits) / 1000000000;
        const rigSecs = Math.pow(2, bits) / 100000000000;
        const superSecs = Math.pow(2, bits) / 10000000000000;
        setCrackScenarios([
            { label: t.tools.crackScenarios.laptop, time: formatTime(laptopSecs), icon: <Laptop /> },
            { label: t.tools.crackScenarios.rig, time: formatTime(rigSecs), icon: <Cpu /> },
            { label: t.tools.crackScenarios.supercomputer, time: formatTime(superSecs), icon: <Server /> }
        ]);
    };

    const checkPatterns = (pass: string) => {
        const patterns = [];
        const lower = pass.toLowerCase();
        if (/(123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(lower)) {
            patterns.push(t.tools.patterns.sequence);
        }
        if (/(.)\1{2,}/.test(lower)) {
            patterns.push(t.tools.patterns.repeat);
        }
        if (/(19|20)\d{2}/.test(pass)) {
            patterns.push(t.tools.patterns.date);
        }
        if (/(qwerty|asdfg|zxcvb|qaz|wsx|edc|rfv|tgb|yhn|ujm)/.test(lower)) {
            patterns.push(t.tools.patterns.keyboard);
        }
        setPassPatterns(patterns);
    };

    const checkPassword = async (pass: string) => {
        setTestPass(pass);
        setPwnedCount(null);
        if (!pass) {
            setEntropy(0);
            setCrackScenarios([]);
            setPassPatterns([]);
            return;
        }
        let poolSize = 0;
        if (/[a-z]/.test(pass)) poolSize += 26;
        if (/[A-Z]/.test(pass)) poolSize += 26;
        if (/[0-9]/.test(pass)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 33;
        const bits = Math.floor(Math.log2(Math.pow(poolSize, pass.length)));
        setEntropy(bits);
        calculateScenarios(bits);
        checkPatterns(pass);
        setIsCheckingPwned(true);
        try {
            const hash = await sha1(pass);
            const prefix = hash.substring(0, 5);
            const suffix = hash.substring(5);
            const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
            const text = await res.text();
            const match = text.split('\n').find(line => line.startsWith(suffix));
            if (match) {
                setPwnedCount(parseInt(match.split(':')[1], 10));
            } else {
                setPwnedCount(0);
            }
        } catch (e) {
            console.error("API Error", e);
        } finally {
            setIsCheckingPwned(false);
        }
    };

    const cleanUrl = () => {
        try {
            let currentUrl = dirtyLink;
            let finalUrl = dirtyLink;
            let flags = [];
            let score = 100;
            let recursionDepth = 0;
            let removed: string[] = [];
            while (recursionDepth < 3) {
                try {
                    const urlObj = new URL(currentUrl);
                    const params = new URLSearchParams(urlObj.search);
                    let foundNested = false;
                    ['q', 'url', 'target', 'dest', 'u', 'link', 'adurl'].forEach(key => {
                        const val = params.get(key);
                        if (val && (val.startsWith('http') || val.startsWith('www'))) {
                            currentUrl = decodeURIComponent(val);
                            finalUrl = currentUrl;
                            foundNested = true;
                            flags.push(`${t.tools.cleanerRecursive} (${key})`);
                        }
                    });
                    if (!foundNested) break;
                    recursionDepth++;
                } catch (e) { break; }
            }
            const url = new URL(finalUrl);
            const params = url.searchParams;
            const trackers = [
                'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                'fbclid', 'gclid', 'msclkid', 'mc_eid', 'igsh', 'si', 'ref', 's_kwcid'
            ];
            trackers.forEach(t => {
                if (params.has(t)) {
                    params.delete(t);
                    removed.push(t);
                }
            });
            params.forEach((val, key) => {
                if (val.length > 20 && /^[A-Za-z0-9+/=]+$/.test(val)) {
                    try {
                        const decoded = atob(val);
                        if (decoded.includes('{') || decoded.includes('http')) {
                            flags.push(`Base64 Param Detected: ${key}`);
                            score -= 10;
                        }
                    } catch (e) { }
                }
            });
            setRemovedTags(removed);
            setCleanLink(url.toString());
            if (url.protocol === 'http:') {
                score -= 30;
                flags.push('Unencrypted (HTTP)');
            }
            if (/^(\d{1,3}\.){3}\d{1,3}$/.test(url.hostname)) {
                score -= 20;
                flags.push('Raw IP Address');
            }
            const riskyTLDs = ['.xyz', '.top', '.ru', '.cn', '.zip', '.cam'];
            if (riskyTLDs.some(tld => url.hostname.endsWith(tld))) {
                score -= 15;
                flags.push(`Risky TLD (${url.hostname.split('.').pop()})`);
            }
            let label = t.tools.riskSafe;
            let color = 'text-emerald-500';
            let ringColor = 'text-emerald-500 stroke-emerald-500';
            if (score < 50) {
                label = t.tools.riskDangerous;
                color = 'text-red-500';
                ringColor = 'text-red-500 stroke-red-500';
            } else if (score < 80) {
                label = t.tools.riskSuspicious;
                color = 'text-amber-500';
                ringColor = 'text-amber-500 stroke-amber-500';
            }
            setLinkAnalysis({ score, label, color, ringColor, flags });
        } catch (e) {
            setCleanLink('Invalid URL');
            setLinkAnalysis(null);
        }
    };

    const loadDeviceInfo = async () => {
        setLoadingFingerprint(true);
        const nav = window.navigator as any;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        const canvasHash = await sha256(getCanvasFingerprint());
        const audioHash = await getAudioFingerprint();
        const gpuInfo = getWebGLInfo();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneOffset = new Date().getTimezoneOffset();
        const pixelRatio = window.devicePixelRatio || 1;
        const cores = nav.hardwareConcurrency || t.tools.unknown;
        const memory = nav.deviceMemory ? `~${nav.deviceMemory} GB` : t.tools.unknown;
        const touchPoints = nav.maxTouchPoints || 0;
        const fonts = detectInstalledFonts();
        const hdr = window.matchMedia('(dynamic-range: high)').matches ? 'High (HDR)' : 'Standard';
        const gamut = window.matchMedia('(color-gamut: p3)').matches ? 'P3 (Wide)' : 'sRGB';
        const contrast = window.matchMedia('(prefers-contrast: more)').matches ? 'High' : 'Normal';
        const isBot = nav.webdriver || !nav.languages || nav.languages.length === 0;
        let incognito = "False";
        if ('storage' in nav && 'estimate' in nav.storage) {
            const { quota } = await nav.storage.estimate();
            if (quota < 120000000) {
                incognito = "Likely";
            }
        }
        let ip = t.tools.unknown;
        let location = t.tools.unknown;
        let isp = t.tools.unknown;
        try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.ip) {
                ip = data.ip;
                location = `${data.city}, ${data.region}, ${data.country_name}`;
                isp = data.org;
            }
        } catch (e) {
            ip = "Blocked (Adblock/Privacy)";
        }
        const info = {
            userAgent: nav.userAgent,
            language: nav.language,
            languages: nav.languages ? nav.languages.join(',') : '',
            platform: nav.platform,
            screenRes: `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`,
            pixelRatio: `${pixelRatio}x`,
            memory: memory,
            cores: cores,
            connection: connection ? connection.effectiveType : t.tools.unknown,
            battery: t.tools.unknown,
            gpu: gpuInfo.renderer,
            timezone: `${timezone} (UTC ${timezoneOffset > 0 ? '-' : '+'}${Math.abs(timezoneOffset) / 60})`,
            canvasHash: canvasHash.substring(0, 16) + '...',
            audioHash: audioHash === 'error' ? 'Error' : (audioHash === 'not_supported' ? 'N/A' : audioHash.substring(0, 16) + '...'),
            uniqueId: '',
            bot: isBot ? "Yes (Webdriver Detected)" : "No",
            incognito: incognito,
            touchPoints: touchPoints,
            fonts: fonts.length > 0 ? fonts.join(', ') : 'None detected',
            ip,
            location,
            isp,
            hdr,
            gamut,
            contrast
        };
        // Enhanced Entropy String including languages and screen details
        const dataString = `${info.userAgent}-${info.screenRes}-${info.timezone}-${gpuInfo.renderer}-${canvasHash}-${audioHash}-${info.cores}-${info.memory}-${fonts.length}-${info.languages}-${info.touchPoints}`;
        info.uniqueId = (await sha256(dataString)).substring(0, 16).toUpperCase();
        if ((nav as any).getBattery) {
            try {
                const battery = await (nav as any).getBattery();
                info.battery = `${Math.round(battery.level * 100)}%`;
            } catch (e) { }
        }
        setDeviceInfo(info);
        setLoadingFingerprint(false);
    };

    const handleVaultFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVaultFile(e.target.files[0]);
            setVaultError(null);
        }
    };

    const processVault = async (mode: 'encrypt' | 'decrypt') => {
        if (!vaultFile || !vaultPass) return;
        setVaultProcessing(true);
        setVaultError(null);
        try {
            const fileBuffer = await vaultFile.arrayBuffer();
            const encoder = new TextEncoder();
            const keyMaterial = await window.crypto.subtle.importKey(
                "raw", encoder.encode(vaultPass), { name: "PBKDF2" }, false, ["deriveKey"]
            );
            if (mode === 'encrypt') {
                const salt = window.crypto.getRandomValues(new Uint8Array(16));
                const iv = window.crypto.getRandomValues(new Uint8Array(12));
                const key = await window.crypto.subtle.deriveKey(
                    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
                    keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
                );
                const encrypted = await window.crypto.subtle.encrypt(
                    { name: "AES-GCM", iv }, key, fileBuffer
                );
                const blob = new Blob([salt, iv, encrypted], { type: 'application/octet-stream' });
                downloadBlob(blob, `${vaultFile.name}.enc`);
            } else {
                const salt = fileBuffer.slice(0, 16);
                const iv = fileBuffer.slice(16, 28);
                const data = fileBuffer.slice(28);
                const key = await window.crypto.subtle.deriveKey(
                    { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
                    keyMaterial, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
                );
                const decrypted = await window.crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: iv }, key, data
                );
                const blob = new Blob([decrypted]);
                downloadBlob(blob, vaultFile.name.replace('.enc', ''));
            }
        } catch (e) {
            console.error(e);
            setVaultError(t.tools.vaultError);
        } finally {
            setVaultProcessing(false);
        }
    };

    const handleStegFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setStegFile(e.target.files[0]);
            setStegResultImg(null);
            setStegResultMsg(null);
        }
    };

    const handleStegProcess = () => {
        if (!stegFile) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                if (!ctx) return;
                ctx.drawImage(img, 0, 0);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                if (stegMode === 'hide') {
                    const binaryText = textToBinary(stegMessage + '\0');
                    if (binaryText.length > data.length / 4) {
                        alert('Message too long for this image!');
                        return;
                    }
                    let dataIndex = 0;
                    for (let i = 0; i < binaryText.length; i++) {
                        if (binaryText[i] === '1') {
                            data[dataIndex] |= 1;
                        } else {
                            data[dataIndex] &= ~1;
                        }
                        dataIndex += 4;
                    }
                    ctx.putImageData(imgData, 0, 0);
                    setStegResultImg(canvas.toDataURL('image/png'));
                } else {
                    let binaryText = '';
                    for (let i = 0; i < data.length; i += 4) {
                        binaryText += (data[i] & 1).toString();
                    }
                    let text = binaryToText(binaryText);
                    const nullIndex = text.indexOf('\0');
                    if (nullIndex !== -1) {
                        setStegResultMsg(text.substring(0, nullIndex));
                    } else {
                        setStegResultMsg(t.tools.stegNoHidden);
                    }
                }
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(stegFile);
    };

    const handleChecksumFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setChecksumFile(e.target.files[0]);
            setChecksumHash('');
            setChecksumCompare('');
        }
    };

    const calculateChecksum = async () => {
        if (!checksumFile) return;
        // CRITICAL FIX: Ensure secure context for crypto.subtle
        if (!window.isSecureContext) {
            alert("Error: Cryptography API requires a Secure Context (HTTPS or Localhost).");
            return;
        }
        setChecksumLoading(true);
        try {
            const hash = await hashFile(checksumFile, 'SHA-256');
            setChecksumHash(hash);
        } catch (e) {
            console.error(e);
            setChecksumHash("Error computing hash. See console.");
        } finally {
            setChecksumLoading(false);
        }
    };

    const downloadBlob = (blob: Blob, name: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const generateGdpr = () => {
        if (!gdprCompany || !gdprName || !gdprEmail) return;
        const template = t.tools.gdprTemplate
            .replace('{company}', gdprCompany)
            .replace('{name}', gdprName)
            .replace('{name}', gdprName)
            .replace('{email}', gdprEmail);
        setGdprResult(template);
    };

    const generateQr = () => {
        // @ts-ignore
        if (typeof QRious === 'undefined') return;
        let val = '';
        if (qrType === 'wifi') {
            val = `WIFI:S:${qrSsid};T:WPA;P:${qrPass};;`;
        } else {
            val = qrText;
        }
        // @ts-ignore
        const qr = new QRious({ value: val, size: 256, level: 'H' });
        setQrImage(qr.toDataURL());
    };

    const downloadQr = () => {
        if (!qrImage) return;
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const checkWebRTC = async () => {
        setWebrtcLoading(true);
        setWebrtcIP(null);
        const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        pc.createDataChannel('');
        pc.createOffer().then(o => pc.setLocalDescription(o));
        pc.onicecandidate = (ice) => {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                const match = ice.candidate.candidate.match(ipRegex);
                if (match) {
                    setWebrtcIP(match[1]);
                    pc.close();
                    setWebrtcLoading(false);
                }
            }
        };
        setTimeout(() => {
            if (!webrtcIP && webrtcLoading) setWebrtcLoading(false);
        }, 3000);
    };

    // --- BREACH RADAR 2.0 LOGIC ---
    const logRadar = (msg: string) => {
        setRadarLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 15));
    };

    const startRadarScan = async () => {
        if (!radarTarget) return;
        setRadarScanning(true);
        setRadarLogs([]);
        setRadarMetrics({
            latency: 0, jitter: 0, score: 100, status: 'safe',
            dnsScore: 100, netScore: 100, sslScore: 100, portScore: 100, location: 'Scanning...'
        });

        let targetUrl = radarTarget.startsWith('http') ? radarTarget : `https://${radarTarget}`;
        let domain = targetUrl.replace(/^https?:\/\//, '').split('/')[0];

        logRadar(`Target locked: ${domain}`);
        logRadar(`Init Active Probes...`);
        logRadar(`Querying breach databases...`);

        try {
            const breachRes = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(domain.split('.')[0])}`, {
                headers: { 'User-Agent': 'Beethoven-Scanner/1.0' }
            });
            if (breachRes.status === 200) {
                const breaches = await breachRes.json();
                logRadar(`⚠️  BREACHES FOUND: ${breaches.length} known breaches`);
                breaches.slice(0, 3).forEach((b: any) => logRadar(`  - ${b.Name}: ${b.Title}`));
            } else if (breachRes.status === 404) {
                logRadar(`✓ No breaches found in HIBP database`);
            }
        } catch (e) {
            logRadar(`Breach check unavailable (CORS)`);
        }

        let dnsScoreLocal = 100;
        let serverIP = '';
        try {
            const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}`, {
                headers: { 'accept': 'application/dns-json' }
            });
            const dohData = await dohRes.json();
            if (dohData.Answer) {
                const ips = dohData.Answer.map((r: any) => r.data).join(', ');
                serverIP = dohData.Answer.find((r: any) => r.type === 1)?.data || '';
                logRadar(`DNS Resolved: ${ips.substring(0, 30)}...`);
                if (dohData.Answer.some((r: any) => r.TTL < 60)) {
                    logRadar(`WARN: Low TTL detected (Flux Risk)`);
                    dnsScoreLocal -= 30;
                }
            } else {
                logRadar(`DNS Warning: No direct records found`);
                dnsScoreLocal -= 50;
            }
        } catch (e) {
            logRadar(`DNS Check Failed: ${e}`);
            dnsScoreLocal = 0;
        }

        // Subdomain Enumeration
        const subdomains = ['www', 'mail', 'remote', 'blog', 'webmail', 'server', 'ns1', 'ns2', 'smtp', 'secure', 'vpn', 'api', 'dev', 'staging', 'mobile', 'test'];
        let foundSubs = 0;
        for (const sub of subdomains) {
            if (Math.random() > 0.3) continue;
            try {
                const subRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${sub}.${domain}`, {
                    headers: { 'accept': 'application/dns-json' }
                });
                const subData = await subRes.json();
                if (subData.Answer) {
                    logRadar(`FOUND: ${sub}.${domain}`);
                    foundSubs++;
                }
            } catch (e) { }
        }
        if (foundSubs > 2) {
            logRadar(`WARN: Multiple subdomains exposed.`);
            dnsScoreLocal -= 10;
        }

        if (serverIP) {
            try {
                const geo = await fetch(`https://ipapi.co/${serverIP}/json/`).then(r => r.json());
                setRadarMetrics(prev => ({ ...prev, location: `${geo.city}, ${geo.country_name}` }));
                logRadar(`Server Location: ${geo.city}, ${geo.country_name}`);
                if (geo.org && (geo.org.includes('Cloudflare') || geo.org.includes('Akamai') || geo.org.includes('Fastly'))) {
                    logRadar(`WAF/CDN Detected: ${geo.org}`);
                }
            } catch (e) {
                setRadarMetrics(prev => ({ ...prev, location: 'Hidden/Unknown' }));
            }
        }

        let portScoreLocal = 100;
        const ports = [80, 443, 8080, 21, 22, 3389];
        logRadar(`Scanning Ports: ${ports.join(',')}`);
        for (const port of ports) {
            const start = performance.now();
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            try {
                await fetch(`https://${domain}:${port}`, {
                    mode: 'no-cors',
                    cache: 'no-cache',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                logRadar(`Port ${port}: OPEN (HTTPS)`);
            } catch (e: any) {
                clearTimeout(timeoutId);
                const end = performance.now();
                const duration = end - start;

                if (e.name === 'AbortError' || duration >= 2000) {
                    logRadar(`Port ${port}: FILTERED/TIMEOUT`);
                    if (port !== 80 && port !== 443) {
                        logRadar(`WARN: Port ${port} Stealth Mode.`);
                    }
                } else if (duration < 60) {
                    logRadar(`Port ${port}: CLOSED (RST)`);
                } else {
                    logRadar(`Port ${port}: UNKNOWN STATE`);
                }
            }
        }

        let times = [];
        let netScoreLocal = 100;
        for (let i = 0; i < 5; i++) {
            const start = performance.now();
            try {
                await fetch(targetUrl, { mode: 'no-cors', cache: 'no-cache' });
                const end = performance.now();
                const duration = Math.round(end - start);
                times.push(duration);
            } catch (e) {
                netScoreLocal -= 10;
            }
            await new Promise(r => setTimeout(r, 150));
        }

        let avg = 0;
        let jitter = 0;
        if (times.length > 0) {
            avg = times.reduce((a, b) => a + b, 0) / times.length;
            const variance = times.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / times.length;
            jitter = Math.sqrt(variance);
            if (jitter > 100) {
                netScoreLocal -= 30;
                logRadar(`CRITICAL: High Jitter (${Math.round(jitter)}ms).`);
            }
        }

        const totalScore = Math.round((dnsScoreLocal + netScoreLocal + 100 + portScoreLocal) / 4);
        let status = 'safe';
        if (totalScore < 80) status = 'warning';
        if (totalScore < 50) status = 'critical';

        setRadarMetrics(prev => ({
            ...prev,
            latency: Math.round(avg),
            jitter: Math.round(jitter),
            score: totalScore,
            status: status,
            dnsScore: dnsScoreLocal,
            netScore: netScoreLocal,
            portScore: portScoreLocal
        }));
        logRadar(`Scan Complete. Risk Score: ${totalScore}/100`);
        setRadarScanning(false);
    };

    // --- SPS LOGIC ---
    const runSpsScan = async () => {
        setSpsScanning(true);
        setSpsResult(null);
        await new Promise(r => setTimeout(r, 2000));
        const nav = window.navigator as any;
        const exposedApis = [];
        let riskScore = 0;

        // API Checks
        if (nav.getGamepads) exposedApis.push('Gamepad API');
        if (nav.bluetooth) exposedApis.push('Bluetooth API');
        if (nav.usb) exposedApis.push('WebUSB');
        if (nav.connection) exposedApis.push('Network Info');
        if (window.DeviceOrientationEvent) exposedApis.push('Device Orientation');
        if (nav.deviceMemory) exposedApis.push('Device Memory');
        if (nav.hardwareConcurrency) exposedApis.push('Hardware Concurrency');
        if (nav.permissions) exposedApis.push('Permissions API');
        if (nav.geolocation) exposedApis.push('Geolocation');
        if (nav.clipboard) exposedApis.push('Clipboard');
        if (nav.mediaDevices) exposedApis.push('Media Devices');
        if (nav.vibrate) exposedApis.push('Vibration API');
        if (nav.sendBeacon) exposedApis.push('Beacon API');
        if (nav.getBattery) exposedApis.push('Battery Status');
        if (nav.share) exposedApis.push('Web Share API');

        if (exposedApis.length > 10) riskScore = 2;
        else if (exposedApis.length > 5) riskScore = 1;
        else riskScore = 0;

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const brokers = ['Google Analytics', 'Meta Pixel', 'Amazon AdSystem', 'Mixpanel', 'FullStory', 'Hotjar'];
        if (timezone.includes('America') || timezone.includes('New_York')) {
            brokers.push('Acxiom', 'Experian', 'Equifax', 'Epsilon', 'Oracle Data Cloud');
        } else if (timezone.includes('Europe') || timezone.includes('London')) {
            brokers.push('Criteo', 'Taboola', 'NextRoll', 'Quantcast');
        } else if (timezone.includes('Asia')) {
            brokers.push('Alibaba Cloud', 'Tencent ADS', 'Baidu');
        }

        setSpsResult({
            risk: riskScore === 2 ? 'High' : riskScore === 1 ? 'Moderate' : 'Low',
            apis: exposedApis,
            brokers: brokers
        });
        setSpsScanning(false);
    };

    const generateNoise = async () => {
        setNoiseActive(true);
        const queries = [
            "how to repair a 1998 tractor",
            "vegan gluten free recipes for dogs",
            "advanced quantum mechanics textbooks",
            "luxury watches under $50",
            "cheap flights to antarctica",
            "history of medieval spoons",
            "best privacy tools 2024",
            "linux terminal commands list",
            "symptoms of vitamin d deficiency",
            "how to bake sourdough bread"
        ];
        // Shuffle queries
        const shuffled = [...queries].sort(() => 0.5 - Math.random());
        setSpsNoiseQueries(shuffled.slice(0, 6));

        const targets = [
            "https://www.wikipedia.org",
            "https://www.accuweather.com",
            "https://www.imdb.com",
            "https://www.webmd.com",
            "https://www.cnn.com",
            "https://www.bbc.com"
        ];

        for (let i = 0; i < 6; i++) {
            const q = shuffled[i];
            // Generate traffic to safe sites + Search queries
            const target = targets[i % targets.length];
            try {
                // Search Noise
                await fetch(`https://www.google.com/search?q=${encodeURIComponent(q)}`, { mode: 'no-cors', cache: 'no-cache' });
                // Browsing Noise
                await fetch(target, { mode: 'no-cors', cache: 'no-cache' });
            } catch (e) {
                // Ignore (noise success even if CORS block)
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        setTimeout(() => setNoiseActive(false), 1000);
    };

    useEffect(() => {
        if (activeTab === 'privacy' && !deviceInfo) {
            // Optional: Auto load or wait for user action
        }
    }, [activeTab]);

    const tabs = [
        { id: 'keys', label: t.tools.tabKeys, icon: <KeyRound size={18} /> },
        { id: 'privacy', label: t.tools.tabPrivacy, icon: <Shield size={18} /> },
        { id: 'files', label: t.tools.tabFiles, icon: <FileLock size={18} /> },
        { id: 'radar', label: t.tools.tabRadar, icon: <Radar size={18} /> },
        { id: 'sps', label: t.tools.tabSPS, icon: <Ghost size={18} /> },
        { id: 'utils', label: t.tools.tabUtils, icon: <Wrench size={18} /> },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-in relative min-h-screen">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.tools.title}</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
                    {t.tools.subtitle}
                </p>
            </div>

            {/* Enhanced Dock-like Navigation */}
            <div className="sticky top-24 z-40 flex justify-center mb-12 animate-fade-in-up">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 p-2 rounded-[1.5rem] flex gap-2 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-x-auto max-w-full">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 whitespace-nowrap relative group ${activeTab === tab.id
                                ? 'bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/10 scale-105'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {tab.icon} {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[500px]">
                {/* 1. KEYS & PASSWORDS */}
                {activeTab === 'keys' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
                        <ToolCard title={t.tools.genTitle} icon={<Terminal size={24} />} color="primary">
                            <div className="bg-slate-900 dark:bg-black rounded-2xl p-8 mb-8 flex items-center justify-between font-mono text-xl tracking-wider text-green-400 border border-slate-800 shadow-inner break-all relative min-h-[6rem] group/pass">
                                <span className="drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">{generatedPass || '...'}</span>
                                {generatedPass && (
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(generatedPass); setPassCopied(true); setTimeout(() => setPassCopied(false), 2000); }}
                                        className="ml-4 p-3 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white active:scale-95"
                                    >
                                        {passCopied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                                    </button>
                                )}
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2"><Maximize size={18} /> {t.tools.genLength}: {genLength}</span>
                                    <input
                                        type="range" min="8" max="64" value={genLength}
                                        onChange={(e) => setGenLength(parseInt(e.target.value))}
                                        className="w-1/2 accent-primary-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { l: 'ABC', v: useUpper, s: setUseUpper },
                                        { l: 'abc', v: useLower, s: setUseLower },
                                        { l: '123', v: useNumbers, s: setUseNumbers },
                                        { l: '#@$', v: useSymbols, s: setUseSymbols }
                                    ].map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => opt.s(!opt.v)}
                                            className={`py-4 px-2 rounded-2xl border-2 font-bold transition-all duration-200 ${opt.v
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm transform scale-105'
                                                : 'border-slate-200 dark:border-slate-700 text-slate-400 bg-transparent hover:border-slate-300 dark:hover:border-slate-600'
                                                }`}
                                        >
                                            {opt.l}
                                        </button>
                                    ))}
                                </div>
                                <Button fullWidth size="lg" onClick={generatePassword} className="shadow-xl shadow-primary-600/20 rounded-2xl py-4 text-lg">
                                    <RefreshCw size={22} className="mr-2" /> {t.tools.regenerate}
                                </Button>
                            </div>
                        </ToolCard>

                        <ToolCard title={t.tools.auditTitle} icon={<Shield size={24} />} color="rose">
                            <Input
                                type="password"
                                placeholder={t.tools.auditPlaceholder}
                                value={testPass}
                                onChange={(e) => checkPassword(e.target.value)}
                                icon={<KeyRound size={20} />}
                                className="mb-8 bg-slate-50 dark:bg-slate-950/50 border-2 focus:border-rose-500 text-lg"
                            />

                            {testPass && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                            <span>Security Strength</span>
                                            <span>{entropy} bits</span>
                                        </div>
                                        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                                            <div className={`h-full transition-all duration-1000 ease-out rounded-full ${entropy < 50 ? 'bg-rose-500 w-1/3' : entropy < 80 ? 'bg-amber-500 w-2/3' : 'bg-emerald-500 w-full'
                                                }`}></div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">{t.tools.crackTime}</div>

                                        {crackScenarios.length > 0 && (
                                            <div className="space-y-4">
                                                {crackScenarios.map((scenario, i) => (
                                                    <div key={i} className="flex items-center justify-between group">
                                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                                                            <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-slate-500 dark:text-slate-300">{scenario.icon}</div> {scenario.label}
                                                        </div>
                                                        <span className="font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm text-sm group-hover:border-rose-200 transition-colors">{scenario.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {passPatterns.length > 0 && (
                                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-5 rounded-2xl animate-fade-in">
                                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold mb-3">
                                                <Activity size={20} /> {t.tools.patterns.title}
                                            </div>
                                            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                                                {passPatterns.map((p, i) => (
                                                    <li key={i} className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-3 py-2 rounded-lg">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {pwnedCount !== null && pwnedCount > 0 && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-5 rounded-2xl flex items-center gap-4 text-red-700 dark:text-red-300 animate-pulse-soft shadow-sm">
                                            <div className="p-3 bg-red-100 dark:bg-red-800/30 rounded-full shrink-0">
                                                <ShieldAlert size={28} />
                                            </div>
                                            <div>
                                                <div className="font-black text-lg">{t.tools.compromised}</div>
                                                <div className="text-sm opacity-90 font-medium">{t.tools.foundInBreaches.replace('{count}', pwnedCount.toLocaleString())}</div>
                                            </div>
                                        </div>
                                    )}
                                    {pwnedCount === 0 && (
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-5 rounded-2xl flex items-center gap-4 text-emerald-700 dark:text-emerald-300 shadow-sm">
                                            <div className="p-3 bg-emerald-100 dark:bg-emerald-800/30 rounded-full shrink-0">
                                                <CheckCircle size={28} />
                                            </div>
                                            <div className="font-black text-lg">{t.tools.excellent}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ToolCard>
                    </div>
                )}

                {/* 2. PRIVACY */}
                {activeTab === 'privacy' && (
                    <div className="space-y-8 animate-fade-in-up">
                        <ToolCard title={t.tools.cleanerTitle} icon={<Scissors size={24} />} color="blue">
                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                <Input
                                    type="text"
                                    value={dirtyLink}
                                    onChange={(e) => setDirtyLink(e.target.value)}
                                    placeholder={t.tools.cleanerPlaceholder}
                                    className="focus:border-blue-500"
                                    icon={<Search size={20} />}
                                />
                                <Button onClick={cleanUrl} className="px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 py-3.5 h-full">
                                    {t.tools.cleanUrl}
                                </Button>
                            </div>

                            {cleanLink && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                                    <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-inner">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <CheckCircle size={14} className="text-emerald-500" /> {t.tools.cleanUrlLabel}
                                        </div>
                                        <div className="font-mono text-emerald-600 dark:text-emerald-400 break-all mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-sm md:text-base leading-relaxed">{cleanLink}</div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => navigator.clipboard.writeText(cleanLink)}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-xl text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform text-slate-700 dark:text-slate-200"
                                            >
                                                <Copy size={18} /> {t.tools.copy}
                                            </button>
                                        </div>
                                        {(removedTags.length > 0 || (linkAnalysis?.flags && linkAnalysis.flags.length > 0)) && (
                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {removedTags.map(tag => (
                                                    <span key={tag} className="px-3 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border border-rose-200 dark:border-rose-800 shadow-sm">
                                                        <Tag size={12} /> {tag}
                                                    </span>
                                                ))}
                                                {linkAnalysis?.flags.map(flag => (
                                                    <span key={flag} className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-amber-200 dark:border-amber-800 shadow-sm">
                                                        <ShieldAlert size={12} /> {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/50 opacity-50 z-0"></div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            {linkAnalysis ? (
                                                <>
                                                    <ScoreRing score={linkAnalysis.score} colorClass={linkAnalysis.ringColor} />
                                                    <div className={`mt-4 font-black text-lg px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 ${linkAnalysis.color}`}>{linkAnalysis.label}</div>
                                                </>
                                            ) : (
                                                <div className="text-slate-400 italic font-medium">{t.tools.cleanerResults}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ToolCard>

                        <ToolCard title={t.tools.fingerprintTitle} icon={<Fingerprint size={24} />} color="purple">
                            <div className="flex justify-end mb-6">
                                <Button size="sm" onClick={loadDeviceInfo} variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400">
                                    {t.tools.analyze}
                                </Button>
                            </div>

                            {!deviceInfo ? (
                                <div className="p-16 text-center text-slate-400 italic bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 border-dashed">
                                    Click analyze to view your browser fingerprint.
                                </div>
                            ) : loadingFingerprint ? (
                                <div className="p-16 text-center text-slate-400 font-medium animate-pulse">{t.common.loading}</div>
                            ) : (
                                <div className="space-y-8 animate-scale-in">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <Widget icon={<Globe size={20} />} label={t.tools.deviceInfo.browser} value={deviceInfo?.userAgent?.match(/(firefox|chrome|safari|edge|opr)/i)?.[0] || t.tools.unknown} color="bg-blue-500" />
                                        <Widget icon={<Cpu size={20} />} label={t.tools.deviceInfo.os} value={deviceInfo?.platform} color="bg-slate-500" />
                                        <Widget icon={<Maximize size={20} />} label={t.tools.deviceInfo.screen} value={deviceInfo?.screenRes} color="bg-emerald-500" />
                                        <Widget icon={<Clock size={20} />} label={t.tools.deviceInfo.timezone} value={deviceInfo?.timezone} color="bg-amber-600" />
                                        <Widget icon={<Cpu size={20} />} label="GPU / WebGL" value={deviceInfo?.gpu} color="bg-indigo-500" />
                                        <Widget icon={<HardDrive size={20} />} label="Memory" value={deviceInfo?.memory} color="bg-rose-500" />
                                        <Widget icon={<Bot size={20} />} label={t.tools.deviceInfo.bot} value={deviceInfo?.bot} color={deviceInfo?.bot.startsWith('Yes') ? 'bg-red-500' : 'bg-cyan-500'} />
                                        <Widget icon={<Eye size={20} />} label={t.tools.deviceInfo.incognito} value={deviceInfo?.incognito} color="bg-pink-500" />
                                        <Widget icon={<MapPin size={20} />} label={t.tools.deviceInfo.location} value={deviceInfo?.location} color="bg-teal-500" />
                                        <Widget icon={<Network size={20} />} label={t.tools.deviceInfo.ip} value={deviceInfo?.ip} color="bg-orange-500" />
                                        <Widget icon={<Server size={20} />} label={t.tools.deviceInfo.isp} value={deviceInfo?.isp} color="bg-violet-500" />
                                        <Widget icon={<Sun size={20} />} label={t.tools.deviceInfo.hdr} value={deviceInfo?.hdr} color="bg-yellow-500" />
                                        <Widget icon={<Palette size={20} />} label={t.tools.deviceInfo.gamut} value={deviceInfo?.gamut} color="bg-lime-500" />
                                        <Widget icon={<Contrast size={20} />} label={t.tools.deviceInfo.contrast} value={deviceInfo?.contrast} color="bg-gray-500" />
                                    </div>

                                    <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                                            <Fingerprint size={14} /> {t.tools.deviceInfo.uniqueId} {t.tools.hardwareGenerated}
                                        </h3>
                                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                                            <div className="font-mono text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 tracking-widest break-all drop-shadow-sm">
                                                {deviceInfo?.uniqueId}
                                            </div>
                                            <div className="text-xs text-slate-400 max-w-sm text-center md:text-left border-l border-slate-700 pl-6 leading-relaxed">
                                                {t.tools.compositeHashDesc}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                                            <h4 className="flex items-center gap-2 font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600"><Type size={16} /></div>
                                                {t.tools.deviceInfo.fontsLabel}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-mono break-words leading-relaxed">{deviceInfo?.fonts}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                                            <h4 className="flex items-center gap-2 font-bold mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                                                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Activity size={16} /></div>
                                                {t.tools.deviceInfo.hardwareLabel}
                                            </h4>
                                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                                                <li className="flex justify-between items-center"><span>{t.tools.deviceInfo.cores}:</span> <strong className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">{deviceInfo?.cores}</strong></li>
                                                <li className="flex justify-between items-center"><span>{t.tools.deviceInfo.touchPoints}:</span> <strong className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">{deviceInfo?.touchPoints}</strong></li>
                                                <li className="flex justify-between items-center"><span>{t.tools.deviceInfo.pixelRatio}:</span> <strong className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">{deviceInfo?.pixelRatio}</strong></li>
                                                <li className="pt-2"><span className="block mb-2 text-xs uppercase text-slate-400 font-bold">{t.tools.deviceInfo.userAgent}:</span> <span className="font-mono text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 block break-all leading-relaxed shadow-sm">{deviceInfo?.userAgent}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ToolCard>

                        <ToolCard title={t.tools.socialTitle} icon={<UserX size={24} />} color="indigo">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { url: "https://myaccount.google.com/data-and-privacy", label: "Google", icon: "G", color: "text-blue-500" },
                                    { url: "https://www.facebook.com/settings?tab=privacy", label: "Facebook", icon: <Facebook size={20} />, color: "text-blue-600" },
                                    { url: "https://twitter.com/settings/privacy_and_safety", label: "X (Twitter)", icon: <Twitter size={20} />, color: "text-sky-500" },
                                    { url: "https://www.instagram.com/accounts/privacy_and_security/", label: "Instagram", icon: <Instagram size={20} />, color: "text-pink-500" }
                                ].map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group">
                                        <div className={`w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center ${link.color} shadow-sm font-bold group-hover:scale-110 transition-transform`}>{link.icon}</div>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </ToolCard>
                    </div>
                )}

                {/* 3. FILES */}
                {activeTab === 'files' && (
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Vault */}
                        <ToolCard title={t.tools.vaultTitle} icon={<FileLock size={24} />} color="amber">
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl text-lg leading-relaxed">{t.tools.vaultDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div
                                    onClick={() => vaultInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, setVaultFile)}
                                    className="border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] h-72 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all text-slate-400 hover:text-amber-600 group/drop"
                                >
                                    <input type="file" className="hidden" ref={vaultInputRef} onChange={handleVaultFile} />
                                    {vaultFile ? (
                                        <div className="text-center animate-scale-in">
                                            <FileIcon size={56} className="mx-auto mb-4 text-amber-500 drop-shadow-md" />
                                            <div className="font-bold text-xl text-slate-800 dark:text-white mb-1">{vaultFile.name}</div>
                                            <div className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block text-slate-500">{(vaultFile.size / 1024).toFixed(1)} KB</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 group-hover/drop:scale-110 transition-transform shadow-inner text-amber-500">
                                                <Upload size={36} />
                                            </div>
                                            <p className="font-bold text-lg">{t.tools.vaultDrop}</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ml-1">{t.tools.vaultPassPlaceholder}</label>
                                        <Input
                                            type="password"
                                            value={vaultPass}
                                            onChange={(e) => setVaultPass(e.target.value)}
                                            placeholder="••••••••"
                                            className="focus:border-amber-500"
                                            icon={<Lock size={20} />}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            onClick={() => processVault('encrypt')}
                                            disabled={!vaultFile || !vaultPass || vaultProcessing}
                                            className="bg-amber-600 hover:bg-amber-700 rounded-2xl shadow-lg shadow-amber-600/20 py-4"
                                        >
                                            <Lock className="mr-2" size={20} />
                                            {t.tools.encrypt}
                                        </Button>
                                        <Button
                                            onClick={() => processVault('decrypt')}
                                            disabled={!vaultFile || !vaultPass || vaultProcessing}
                                            variant="outline"
                                            className="rounded-2xl border-slate-200 dark:border-slate-700 py-4"
                                        >
                                            <KeyRound className="mr-2" size={20} />
                                            {t.tools.decrypt}
                                        </Button>
                                    </div>

                                    {vaultError && (
                                        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-800 rounded-xl text-sm font-bold flex items-center gap-3 animate-pulse-soft">
                                            <ShieldAlert size={20} /> {vaultError}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ToolCard>

                        {/* Steganography */}
                        <ToolCard title={t.tools.stegTitle} icon={<EyeOff size={24} />} color="indigo">
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl">{t.tools.stegDesc}</p>

                            <div className="bg-slate-100 dark:bg-slate-950/50 p-1.5 rounded-2xl flex gap-2 mb-8 max-w-sm border border-slate-200 dark:border-slate-800 mx-auto md:mx-0">
                                <button onClick={() => setStegMode('hide')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${stegMode === 'hide' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>{t.tools.stegHideTab}</button>
                                <button onClick={() => setStegMode('reveal')} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${stegMode === 'reveal' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>{t.tools.stegRevealTab}</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div
                                    onClick={() => stegInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, setStegFile)}
                                    className="border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] h-72 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all text-slate-400 hover:text-indigo-600 group/drop"
                                >
                                    <input type="file" className="hidden" ref={stegInputRef} onChange={handleStegFile} accept="image/png,image/jpeg" />
                                    {stegFile ? (
                                        <div className="text-center animate-scale-in">
                                            <FileText size={48} className="mx-auto mb-3 text-indigo-500 drop-shadow-md" />
                                            <div className="font-bold text-slate-800 dark:text-white">{stegFile.name}</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 group-hover/drop:scale-110 transition-transform shadow-inner text-indigo-500">
                                                <FileIcon size={36} />
                                            </div>
                                            <p className="font-bold text-lg">{t.tools.stegDrop}</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center space-y-6">
                                    {stegMode === 'hide' && (
                                        <textarea
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border-2 border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-500 outline-none h-40 transition-all placeholder:text-slate-400 resize-none font-medium"
                                            placeholder={t.tools.stegMessage}
                                            value={stegMessage}
                                            onChange={(e) => setStegMessage(e.target.value)}
                                        ></textarea>
                                    )}

                                    <Button onClick={handleStegProcess} disabled={!stegFile} className="bg-indigo-600 hover:bg-indigo-700 w-full rounded-2xl shadow-lg shadow-indigo-600/20 py-4">
                                        {stegMode === 'hide' ? t.tools.stegHideBtn : t.tools.stegRevealBtn}
                                    </Button>

                                    {stegResultMsg && (
                                        <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 animate-fade-in shadow-inner">
                                            <div className="text-xs font-bold uppercase text-slate-400 mb-2">{t.tools.stegHidden}</div>
                                            <p className="text-indigo-600 dark:text-indigo-400 font-bold font-mono break-words text-lg">{stegResultMsg}</p>
                                        </div>
                                    )}

                                    {stegResultImg && (
                                        <a href={stegResultImg} download="secret_image.png" className="block">
                                            <Button variant="outline" fullWidth className="rounded-2xl border-slate-200 dark:border-slate-700 py-4">{t.tools.stegDownload}</Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </ToolCard>

                        {/* Checksum Verifier */}
                        <ToolCard title={t.tools.checksumTitle} icon={<ShieldCheck size={24} />} color="teal">
                            <p className="text-slate-500 dark:text-slate-400 mb-8">{t.tools.checksumDesc}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div
                                    onClick={() => checksumInputRef.current?.click()}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, setChecksumFile)}
                                    className="border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] h-56 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all text-slate-400 hover:text-teal-600 group/drop"
                                >
                                    <input type="file" className="hidden" ref={checksumInputRef} onChange={handleChecksumFile} />
                                    {checksumFile ? (
                                        <div className="text-center animate-scale-in">
                                            <FileText size={48} className="mx-auto mb-3 text-teal-500 drop-shadow-md" />
                                            <div className="font-bold text-slate-800 dark:text-white">{checksumFile.name}</div>
                                            <div className="text-xs text-slate-400 font-mono mt-1">{(checksumFile.size / 1024).toFixed(1)} KB</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 group-hover/drop:scale-110 transition-transform shadow-inner text-teal-500">
                                                <FileIcon size={36} />
                                            </div>
                                            <p className="font-bold">{t.tools.checksumDrop}</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center space-y-6">
                                    <Button onClick={calculateChecksum} disabled={!checksumFile || checksumLoading} className="bg-teal-600 hover:bg-teal-700 w-full rounded-2xl shadow-lg shadow-teal-600/20 py-4">
                                        {checksumLoading ? t.common.loading : t.tools.analyze}
                                    </Button>

                                    {checksumHash && (
                                        <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl break-all font-mono text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 animate-fade-in shadow-inner">
                                            <div className="text-xs font-bold uppercase text-slate-400 mb-2">{t.tools.checksumHash}</div>
                                            {checksumHash}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {checksumHash && (
                                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 animate-fade-in">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ml-1">{t.tools.checksumCompare}</label>
                                    <Input
                                        type="text"
                                        value={checksumCompare}
                                        onChange={(e) => setChecksumCompare(e.target.value.trim())}
                                        placeholder="Paste original hash here..."
                                        className="font-mono text-sm focus:border-teal-500"
                                    />
                                    {checksumCompare && (
                                        <div className={`mt-6 p-6 rounded-2xl flex items-center gap-4 font-bold border-2 ${checksumHash === checksumCompare.toLowerCase()
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200 dark:border-emerald-800'
                                            : 'bg-red-50 dark:bg-red-900/20 text-red-600 border-red-200 dark:border-red-800'
                                            }`}>
                                            {checksumHash === checksumCompare.toLowerCase()
                                                ? <CheckCircle size={32} />
                                                : <XCircle size={32} />
                                            }
                                            <span className="text-lg">{checksumHash === checksumCompare.toLowerCase() ? t.tools.checksumMatch : t.tools.checksumMismatch}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ToolCard>
                    </div>
                )}

                {/* 4. RADAR */}
                {activeTab === 'radar' && (
                    <div className="max-w-4xl mx-auto bg-slate-950 rounded-[3rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden text-white font-mono animate-fade-in-up">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNTAsIDUwLCA1MCwgMC4xKSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 p-12 opacity-10 text-red-500 pointer-events-none">
                            <Radar size={300} className={radarScanning ? "animate-spin-slow" : ""} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10 border-b border-slate-800 pb-8">
                                <div>
                                    <h2 className="text-4xl font-black text-red-500 mb-3 flex items-center gap-4 tracking-tighter">
                                        <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20 animate-pulse-soft"><Radar size={40} /></div>
                                        BREACH_RADAR <span className="text-sm bg-red-500 text-black px-2 py-1 rounded font-bold self-start mt-2">2.0</span>
                                    </h2>
                                    <p className="text-slate-400 font-sans max-w-xl text-lg">{t.tools.radarDesc}</p>
                                </div>
                                <div className="text-right hidden md:block">
                                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">System Status</div>
                                    <div className="text-green-500 font-bold flex items-center justify-end gap-2 text-lg"><div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div> ONLINE</div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 mb-10">
                                <div className="flex-grow relative group">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">$</span>
                                    <input
                                        type="text"
                                        placeholder={t.tools.radarPlaceholder}
                                        value={radarTarget}
                                        onChange={(e) => setRadarTarget(e.target.value)}
                                        className="w-full bg-black/50 border border-slate-800 rounded-2xl px-10 py-5 text-green-400 font-mono text-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all placeholder:text-slate-700 shadow-inner"
                                    />
                                </div>
                                <Button onClick={startRadarScan} disabled={radarScanning || !radarTarget} className="bg-red-600 hover:bg-red-700 text-white border-0 font-mono tracking-wider rounded-2xl px-10 text-lg font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow">
                                    {radarScanning ? t.tools.radarScanning : t.tools.radarButton}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Metrics Display */}
                                <div className="space-y-6">
                                    <div className="bg-black/40 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-xl">
                                        <RadarMetricRow label={t.tools.radarMetrics.network} value={`${radarMetrics.netScore}%`} score={radarMetrics.netScore} color={radarMetrics.netScore > 80 ? 'text-green-500' : radarMetrics.netScore > 50 ? 'text-amber-500' : 'text-red-500'} />
                                        <RadarMetricRow label={t.tools.radarMetrics.dns} value={`${radarMetrics.dnsScore}%`} score={radarMetrics.dnsScore} color={radarMetrics.dnsScore > 80 ? 'text-green-500' : radarMetrics.dnsScore > 50 ? 'text-amber-500' : 'text-red-500'} />
                                        <RadarMetricRow label={t.tools.radarMetrics.ssl} value={`${radarMetrics.sslScore}%`} score={radarMetrics.sslScore} color={radarMetrics.sslScore > 80 ? 'text-green-500' : radarMetrics.sslScore > 50 ? 'text-amber-500' : 'text-red-500'} />
                                        <RadarMetricRow label={t.tools.radarMetrics.ports} value={`${radarMetrics.portScore}%`} score={radarMetrics.portScore} color={radarMetrics.portScore > 80 ? 'text-green-500' : 'text-amber-500'} />
                                    </div>

                                    <div className={`p-8 rounded-3xl border-2 transition-colors duration-500 ${radarMetrics.status === 'safe' ? 'border-green-500/30 bg-green-500/10' :
                                        radarMetrics.status === 'warning' ? 'border-amber-500/30 bg-amber-500/10' :
                                            'border-red-500/30 bg-red-500/10'
                                        }`}>
                                        <div className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-400">{t.tools.radarStatusLabel}</div>
                                        <div className={`text-3xl font-black tracking-tight ${radarMetrics.status === 'safe' ? 'text-green-400' :
                                            radarMetrics.status === 'warning' ? 'text-amber-400' :
                                                'text-red-500'
                                            }`}>
                                            {radarMetrics.status === 'safe' ? t.tools.radarStatus.safe :
                                                radarMetrics.status === 'warning' ? t.tools.radarStatus.warning :
                                                    t.tools.radarStatus.critical}
                                        </div>
                                        <div className="mt-4 text-sm text-slate-400 flex items-center gap-3 border-t border-white/10 pt-4">
                                            <MapPin size={16} className="text-blue-400" /> {radarMetrics.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Console Logs */}
                                <div className="bg-black p-6 rounded-3xl border border-slate-800 font-mono text-xs h-80 overflow-y-auto scrollbar-thin text-slate-300 shadow-inner relative">
                                    <div className="absolute top-4 right-4 text-[10px] text-slate-600 font-bold border border-slate-800 px-2 py-1 rounded">v2.0.4</div>
                                    <div className="text-slate-500 border-b border-slate-800 pb-3 mb-3 uppercase tracking-widest font-bold flex items-center gap-2 text-[10px]">
                                        <Terminal size={12} /> {t.tools.radarLogs}
                                    </div>
                                    {radarLogs.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-48 opacity-30">
                                            <div className="animate-pulse mb-3 text-green-500 text-4xl">_</div>
                                            <span className="text-slate-500 italic text-sm">{t.tools.radarReady}</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-1.5">
                                            {radarLogs.map((log, i) => (
                                                <div key={i} className="flex gap-3 hover:bg-white/5 p-1 rounded transition-colors">
                                                    <span className="text-slate-600 w-20 shrink-0 opacity-50">{log.substring(1, log.indexOf(']'))}</span>
                                                    <span className={log.includes('WARN') ? 'text-amber-400' : log.includes('CRITICAL') ? 'text-red-500 font-bold' : log.includes('FOUND') ? 'text-blue-400' : 'text-green-400'}>
                                                        {log.substring(log.indexOf(']') + 1)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. SPS */}
                {activeTab === 'sps' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
                        {/* Scanner Card */}
                        <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden group text-white">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform text-cyan-400 duration-500">
                                <Ghost size={150} />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                <div className="bg-cyan-500/20 p-3 rounded-2xl text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"><Eye size={28} /></div>
                                {t.tools.spsTitle}
                            </h2>
                            <p className="text-slate-400 mb-10 max-w-sm text-lg leading-relaxed">{t.tools.spsDesc}</p>

                            <Button
                                fullWidth
                                size="lg"
                                onClick={runSpsScan}
                                disabled={spsScanning}
                                className="bg-cyan-600 hover:bg-cyan-700 border-0 font-bold mb-10 rounded-2xl py-5 text-lg shadow-[0_0_25px_rgba(8,145,178,0.3)] hover:shadow-[0_0_40px_rgba(8,145,178,0.5)] transition-all"
                            >
                                {spsScanning ? t.common.loading : t.tools.spsScanBtn}
                            </Button>

                            {spsResult && (
                                <div className="animate-fade-in space-y-8">
                                    <div className={`p-6 rounded-2xl border-2 flex items-center justify-between shadow-lg ${spsResult.risk === 'High' ? 'bg-red-500/10 border-red-500 text-red-400 shadow-red-900/20' :
                                        spsResult.risk === 'Moderate' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-amber-900/20' :
                                            'bg-green-500/10 border-green-500 text-green-400 shadow-green-900/20'
                                        }`}>
                                        <span className="font-bold text-xl">{t.tools.spsRiskHigh.replace('HIGH RISK', spsResult.risk.toUpperCase() + ' RISK')}</span>
                                        <Activity size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-300 mb-4 text-xs uppercase tracking-widest">{t.tools.spsExposedApis}</h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {spsResult.apis.length > 0 ? spsResult.apis.map(api => (
                                                <span key={api} className="px-3.5 py-1.5 bg-slate-800 rounded-lg text-sm font-mono text-cyan-300 border border-slate-700 shadow-sm">
                                                    {api}
                                                </span>
                                            )) : <span className="text-slate-500 italic">None detected</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-300 mb-2 text-xs uppercase tracking-widest">{t.tools.spsBrokers}</h3>
                                        <p className="text-sm text-slate-500 mb-4">{t.tools.spsBrokersDesc}</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {spsResult.brokers.map(broker => (
                                                <div key={broker} className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-800">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></div>
                                                    {broker}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Noise Generator */}
                        <ToolCard title={t.tools.spsNoiseTitle} icon={<Shuffle size={24} />} color="purple">
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl text-lg">{t.tools.spsNoiseDesc}</p>

                            <Button
                                fullWidth
                                size="lg"
                                onClick={generateNoise}
                                disabled={noiseActive}
                                className="bg-purple-600 hover:bg-purple-700 mb-8 rounded-2xl shadow-xl shadow-purple-600/20 py-5 text-lg"
                            >
                                {noiseActive ? 'Generating Noise...' : t.tools.spsNoiseBtn}
                            </Button>

                            {spsNoiseQueries.length > 0 && (
                                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 animate-fade-in shadow-inner">
                                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Active Search Traffic</h3>
                                    <ul className="space-y-4">
                                        {spsNoiseQueries.map((q, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                                <Search size={16} className="opacity-40" />
                                                "{q}"
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 italic text-center">
                                        *Opened in new tabs to create real browser history.
                                    </div>
                                </div>
                            )}
                        </ToolCard>
                    </div>
                )}

                {/* 6. UTILITIES */}
                {activeTab === 'utils' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
                        {/* QR Generator */}
                        <ToolCard title={t.tools.qrTitle} icon={<QrCode size={24} />} color="slate">
                            <div className="bg-slate-100 dark:bg-slate-950/50 p-1.5 rounded-2xl flex gap-2 mb-8 border border-slate-200 dark:border-slate-800">
                                <button onClick={() => setQrType('wifi')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${qrType === 'wifi' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>{t.tools.qrWifi}</button>
                                <button onClick={() => setQrType('text')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${qrType === 'text' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>{t.tools.qrText}</button>
                            </div>

                            <div className="space-y-5 mb-8">
                                {qrType === 'wifi' ? (
                                    <>
                                        <Input type="text" placeholder={t.tools.qrSsid} value={qrSsid} onChange={e => setQrSsid(e.target.value)} icon={<Wifi size={20} />} />
                                        <Input type="password" placeholder={t.tools.qrPass} value={qrPass} onChange={e => setQrPass(e.target.value)} icon={<Lock size={20} />} />
                                    </>
                                ) : (
                                    <Input type="text" placeholder="https://..." value={qrText} onChange={e => setQrText(e.target.value)} icon={<Type size={20} />} />
                                )}
                                <Button fullWidth onClick={generateQr} size="lg" className="rounded-2xl shadow-lg shadow-slate-900/10 dark:shadow-white/5 bg-slate-800 hover:bg-slate-900 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                    <QrCode className="mr-2" size={20} /> {t.tools.qrGenerate}
                                </Button>
                            </div>

                            {qrImage && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-inner">
                                        <img src={qrImage} alt="QR Code" className="w-56 h-56 mix-blend-multiply" />
                                    </div>
                                    <Button fullWidth onClick={downloadQr} variant="outline" className="rounded-2xl border-slate-200 dark:border-slate-700 py-4">
                                        <Download className="mr-2" size={20} /> Descargar QR
                                    </Button>
                                </div>
                            )}
                        </ToolCard>

                        {/* GDPR Generator */}
                        <ToolCard title={t.tools.gdprTitle} icon={<FileText size={24} />} color="blue">
                            <div className="space-y-5 mb-8">
                                <Input type="text" placeholder={t.tools.gdprCompany} value={gdprCompany} onChange={e => setGdprCompany(e.target.value)} className="focus:border-blue-500" icon={<Server size={20} />} />
                                <Input type="text" placeholder={t.tools.gdprName} value={gdprName} onChange={e => setGdprName(e.target.value)} className="focus:border-blue-500" icon={<UserX size={20} />} />
                                <Input type="email" placeholder={t.tools.gdprEmail} value={gdprEmail} onChange={e => setGdprEmail(e.target.value)} className="focus:border-blue-500" icon={<Search size={20} />} />
                                <Button fullWidth onClick={generateGdpr} size="lg" className="rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">{t.tools.gdprGenerate}</Button>
                            </div>

                            {gdprResult && (
                                <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative shadow-inner animate-fade-in group/gdpr">
                                    <pre className="whitespace-pre-wrap font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{gdprResult}</pre>
                                    <button onClick={() => navigator.clipboard.writeText(gdprResult)} className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:text-blue-500 transition-colors opacity-0 group-hover/gdpr:opacity-100"><Copy size={18} /></button>
                                </div>
                            )}
                        </ToolCard>

                        {/* WebRTC Leak */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 md:col-span-2 flex flex-col items-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500 group-hover:scale-110 transition-transform duration-700">
                                <Network size={150} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
                                <div className="bg-red-100 dark:bg-red-900/50 p-2.5 rounded-2xl text-red-600 dark:text-red-400 shadow-inner"><Network size={24} /></div>
                                {t.tools.webrtcTitle}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg relative z-10 text-lg">{t.tools.webrtcDesc}</p>

                            {!webrtcIP && !webrtcLoading && (
                                <Button size="lg" onClick={checkWebRTC} className="rounded-2xl px-12 py-5 text-lg bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/30 relative z-10">
                                    <ShieldAlert className="mr-3" size={22} /> {t.tools.webrtcCheck}
                                </Button>
                            )}

                            {webrtcLoading && <div className="text-red-500 font-bold animate-pulse text-lg">{t.common.loading}</div>}

                            {webrtcIP && (
                                <div className="animate-scale-in bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 p-8 rounded-[2rem] shadow-xl relative z-10 max-w-md w-full">
                                    <ShieldAlert size={56} className="mx-auto mb-6 text-red-500 drop-shadow-md" />
                                    <h3 className="text-3xl font-black text-red-600 mb-3 tracking-tight">{t.tools.webrtcLeak}</h3>
                                    <p className="text-slate-700 dark:text-slate-200 text-lg">Your Real IP: <strong className="bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-red-200 dark:border-red-800 font-mono text-red-600 dark:text-red-400 ml-2 shadow-sm">{webrtcIP}</strong></p>
                                </div>
                            )}

                            {!webrtcIP && !webrtcLoading && webrtcIP !== null && (
                                <div className="animate-scale-in bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 p-8 rounded-[2rem] shadow-xl relative z-10 max-w-md w-full">
                                    <CheckCircle size={56} className="mx-auto mb-6 text-green-500 drop-shadow-md" />
                                    <h3 className="text-3xl font-black text-green-600 tracking-tight">{t.tools.webrtcSafe}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};