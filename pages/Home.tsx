
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Lock, EyeOff, Shield, Zap, Code, Github, Globe, Layers, Image, AlertOctagon, ShieldCheck, Binary, Database, Key, Fingerprint, Network, Dog, BarChart2, MousePointer2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, theme } = useApp();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const improvementIcons = {
    zap: Zap,
    mouse: MousePointer2,
    shield: ShieldCheck,
    globe: Globe
  };
  
  // Interactive State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
      });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof (window as any).L !== 'undefined' && mapContainer.current && !mapInstance.current) {
        const L = (window as any).L;
        const map = L.map(mapContainer.current, {
            center: [25, 0],
            zoom: 1.5,
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            attributionControl: false,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
        }).addTo(map);

        const locations = [
            [40.7128, -74.0060], [51.5074, -0.1278], [35.6762, 139.6503], [-33.8688, 151.2093],
            [19.4326, -99.1332], [48.8566, 2.3522], [-23.5505, -46.6333], [37.7749, -122.4194],
            [52.5200, 13.4050], [1.3521, 103.8198], [55.7558, 37.6173], [19.0760, 72.8777],
            [-34.6037, -58.3816], [30.0444, 31.2357], [6.5244, 3.3792], [39.9042, 116.4074],
            [41.9028, 12.4964], [59.3293, 18.0686], [34.0522, -118.2437], [43.6532, -79.3832]
        ];

        locations.forEach(loc => {
            L.circleMarker(loc, {
                radius: Math.random() * 5 + 3,
                fillColor: '#14b8a6',
                color: 'transparent',
                weight: 0,
                opacity: 1,
                fillOpacity: 0.6
            }).addTo(map);
        });

        mapInstance.current = map;
    }

    return () => {
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    }
  }, []);

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="flex flex-col w-full overflow-hidden relative"
    >
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-10 pb-20 lg:pt-0 overflow-hidden">
        
        {/* Interactive Spotlight Background */}
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
                background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.06), transparent 40%)`
            }}
        ></div>
        
        {/* Parallax Floating Icons Layer */}
        <div 
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            style={{
                transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
             <div className="absolute top-[15%] left-[10%] text-primary-300/30 dark:text-primary-800/30 animate-float"><Binary size={64} /></div>
             <div className="absolute bottom-[20%] right-[10%] text-blue-300/30 dark:text-blue-800/30 animate-float-delayed"><Database size={80} /></div>
             <div className="absolute top-[20%] right-[20%] text-purple-300/30 dark:text-purple-800/30 animate-pulse-soft"><Key size={50} /></div>
             <div className="absolute bottom-[30%] left-[20%] text-emerald-300/30 dark:text-emerald-800/30 animate-float"><Fingerprint size={70} /></div>
             <div className="absolute top-[50%] left-[5%] text-slate-300/40 dark:text-slate-700/40 animate-float-delayed"><Network size={40} /></div>
             <div className="absolute top-[10%] left-[50%] text-rose-300/30 dark:text-rose-800/30 animate-pulse-soft"><ShieldCheck size={55} /></div>
             
             {/* Main Decorative Icons */}
             <div className="absolute top-1/2 left-[10%] -translate-y-1/2 hidden xl:block opacity-60 dark:opacity-40 animate-float">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl rotate-12">
                    <Dog size={60} className="text-blue-500 dark:text-blue-400" />
                </div>
            </div>
             <div className="absolute top-1/3 right-[10%] translate-x-1/2 hidden xl:block opacity-60 dark:opacity-40 animate-float-delayed">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl -rotate-12">
                    <Lock size={60} className="text-primary-500 dark:text-primary-400" />
                </div>
            </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-primary-400/20 to-blue-400/20 rounded-full blur-[120px] animate-pulse-soft mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-[120px] animate-pulse-soft animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 border border-primary-200 dark:border-primary-800 shadow-sm text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8 backdrop-blur-md animate-fade-in-up hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              {t.common.free} & {t.common.openSource}
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              {t.home.heroTitle} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 dark:from-primary-400 dark:via-blue-400 dark:to-purple-400 animate-gradient-x">
                {t.home.heroSubtitle}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {t.home.heroDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Button size="lg" onClick={() => navigate('/analyzer')} className="gap-3 shadow-xl shadow-primary-900/20 hover:shadow-2xl hover:shadow-primary-900/30 px-8 py-5 text-lg rounded-2xl w-full sm:w-auto justify-center bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 border-0 transform transition-all hover:-translate-y-1">
                {t.home.ctaAnalyzer}
                <BarChart2 size={22} className="opacity-90" />
              </Button>
              
              <Button size="lg" variant="outline" onClick={() => navigate('/assessment')} className="gap-3 px-8 py-5 text-lg rounded-2xl w-full sm:w-auto justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-white dark:hover:bg-slate-900 transform transition-all hover:-translate-y-1">
                {t.home.ctaCheck}
                <ArrowRight size={22} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Glassmorphism */}
      <section className="py-24 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{t.home.featuresTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed">
                {t.home.featuresDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Diagnosis */}
            <div onClick={() => navigate('/assessment')} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-3xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.home.featDiagnosis}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
                {t.home.featDiagnosisDesc}
              </p>
              <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t.common.start} <ArrowRight size={18} className="ml-2 rtl:rotate-180" />
              </div>
            </div>

            {/* Feature 2: Tools */}
            <div onClick={() => navigate('/tools')} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-3xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.home.featTools}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
                {t.home.featToolsDesc}
              </p>
               <div className="flex items-center text-purple-600 dark:text-purple-400 font-bold group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t.common.start} <ArrowRight size={18} className="ml-2 rtl:rotate-180" />
              </div>
            </div>

            {/* Feature 3: Privacy Hub */}
            <div onClick={() => navigate('/hub')} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.home.featHub}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
                {t.home.featHubDesc}
              </p>
               <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t.common.start} <ArrowRight size={18} className="ml-2 rtl:rotate-180" />
              </div>
            </div>

            {/* Feature 4: Image Lab */}
            <div onClick={() => navigate('/lab')} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-3xl flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Image size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.home.featLab}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow">
                {t.home.featLabDesc}
              </p>
               <div className="flex items-center text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t.common.start} <ArrowRight size={18} className="ml-2 rtl:rotate-180" />
              </div>
            </div>

            {/* Feature 5: Cyber Trainer (Formerly Phishing) */}
            <div onClick={() => navigate('/phishing')} className="group bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full md:col-span-2 lg:col-span-2 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-3xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <AlertOctagon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t.home.featPhishing}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-grow max-w-lg">
                {t.home.featPhishingDesc}
              </p>
               <div className="flex items-center text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t.common.start} <ArrowRight size={18} className="ml-2 rtl:rotate-180" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Section & Map */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-950 rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-slate-200/40 dark:shadow-black/40 text-center border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-blue-500 to-purple-500"></div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 tracking-tight">{t.home.trustTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 mb-20">
              <div className="flex flex-col items-center gap-6 group">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl text-slate-600 dark:text-slate-300 mb-2 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 group-hover:scale-110 transform border border-slate-100 dark:border-slate-800">
                   <EyeOff size={40} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{t.home.trustNoTrackers}</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t.home.trustNoTrackersDesc}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 group">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl text-slate-600 dark:text-slate-300 mb-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 group-hover:scale-110 transform border border-slate-100 dark:border-slate-800">
                    <Lock size={40} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{t.home.trustLocal}</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t.home.trustLocalDesc}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 group">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl text-slate-600 dark:text-slate-300 mb-2 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 group-hover:scale-110 transform border border-slate-100 dark:border-slate-800">
                    <ShieldCheck size={40} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{t.home.trustOpen}</h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t.home.trustOpenDesc}</p>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative z-10 w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-900">
                <div ref={mapContainer} className={`w-full h-full ${theme === 'dark' ? 'invert hue-rotate-180 brightness-90' : 'grayscale contrast-[0.9] brightness-110'}`} style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg) brightness(0.7) contrast(1.2)' : 'grayscale(1) opacity(0.7)' }}></div>
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 pointer-events-none">
                    <div className="flex items-center gap-2">
                        <Globe size={18} className="text-primary-600 dark:text-primary-400" />
                        <span className="font-bold text-slate-800 dark:text-white text-sm">{t.home.mapLabel}</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Improvement Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-200 font-semibold text-sm mb-6 border border-primary-100 dark:border-primary-800">
              {t.home.improvements.title}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {t.home.improvements.subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.improvements.items.map((item, idx) => {
              const Icon = improvementIcons[item.icon] || Zap;
              return (
                <div
                  key={idx}
                  className="group relative bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary-400/50 dark:hover:border-primary-400/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary-500/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-600 dark:text-primary-300 mb-5 shadow group-hover:scale-110 transition-transform">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-3xl mb-4 border border-white/10">
                       <Code size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t.home.openSourceSectionTitle}</h2>
                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                        {t.home.openSourceSectionDesc}
                    </p>
                    <div className="pt-4">
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 shadow-xl shadow-white/10 group"
                        >
                            <Github size={24} className="group-hover:rotate-12 transition-transform" />
                            {t.home.openSourceSectionBtn}
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};
