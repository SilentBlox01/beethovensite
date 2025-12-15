
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dog, Menu, X, Wrench, Home, Heart, Moon, Sun, Palette, Globe, Layers, Book, Eye, EyeOff, Hash, Type, Maximize, Palette as ColorIcon, Shield, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeColor } from '../types';
import { LANGUAGES } from '../data/locales';
import { APP_VERSION } from '../version';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, themeColor, setThemeColor, language, setLanguage, t, dir } = useApp();
  const location = useLocation();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);

  // Inspector State
  const [inspectorMode, setInspectorMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [elementDetails, setElementDetails] = useState<any>(null);

  // Canvas Ref for Interactive Background
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detect scroll for navbar styling (Threshold updated to 50px)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMenuOpen]);

  // --- INTERACTIVE BACKGROUND LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    let ripples: { x: number; y: number; radius: number; opacity: number; color: string }[] = [];
    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const onClick = (e: MouseEvent) => {
        // Add a ripple
        const color = theme === 'dark' ? '94, 234, 212' : '59, 130, 246'; // RGB: Teal or Blue
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            opacity: 0.8,
            color: color
        });

        // Shockwave effect: Push particles away
        particles.forEach(p => {
            const dx = p.x - e.clientX;
            const dy = p.y - e.clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 300) {
                const force = (300 - dist) / 300;
                const angle = Math.atan2(dy, dx);
                // Burst speed
                p.vx += Math.cos(angle) * force * 8;
                p.vy += Math.sin(angle) * force * 8;
            }
        });
    };

    const draw = () => {
        // Clear with transparency to leave the CSS grid visible behind
        ctx.clearRect(0, 0, w, h);
        
        // --- DRAW RIPPLES ---
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += 3; // Expand speed
            r.opacity -= 0.015; // Fade speed

            if (r.opacity <= 0) {
                ripples.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r.color}, ${r.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            // Subtle fill
            ctx.fillStyle = `rgba(${r.color}, ${r.opacity * 0.1})`;
            ctx.fill();
        }

        // --- DRAW PARTICLES ---
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)';
        
        particles.forEach((p, i) => {
            // Apply drag to slow down shockwave effect over time
            p.vx *= 0.96; // friction
            p.vy *= 0.96; // friction
            
            // Minimal ambient movement fallback
            if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.02;
            if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.02;

            // Cap ambient speed
            const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
            if(speed > 8) { // cap max burst speed
                p.vx = (p.vx / speed) * 8;
                p.vy = (p.vy / speed) * 8;
            }

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce edges
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            if (p.x > w) { p.x = w; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            if (p.y > h) { p.y = h; p.vy *= -1; }

            // Draw Dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connect to other particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = theme === 'dark' 
                        ? `rgba(94, 234, 212, ${1 - dist / connectionDistance})` // Teal in dark mode
                        : `rgba(148, 163, 184, ${1 - dist / connectionDistance})`; // Slate in light mode
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            // Connect to mouse
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mDist < mouseDistance) {
                const force = (mouseDistance - mDist) / mouseDistance;
                // Subtle attraction to mouse
                p.x -= (mdx / mDist) * force * 0.5;
                p.y -= (mdy / mDist) * force * 0.5;

                ctx.beginPath();
                ctx.strokeStyle = theme === 'dark' 
                    ? `rgba(20, 184, 166, ${force})` 
                    : `rgba(71, 85, 105, ${force})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });

        animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    draw();

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onClick);
        cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-init when theme changes to update colors

  // --- INSPECTOR LOGIC ---
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
        if (!inspectorMode) return;
        const target = e.target as HTMLElement;
        // Don't inspect the inspector itself
        if (target.closest('.inspector-panel') || target.closest('.inspector-toggle')) return;
        
        if (hoveredElement) hoveredElement.classList.remove('inspector-highlight');
        target.classList.add('inspector-highlight');
        setHoveredElement(target);
    };

    const handleClick = (e: MouseEvent) => {
        if (!inspectorMode) return;
        const target = e.target as HTMLElement;
        // Don't inspect the inspector itself
        if (target.closest('.inspector-panel') || target.closest('.inspector-toggle')) return;

        e.preventDefault();
        e.stopPropagation();
        
        const computed = window.getComputedStyle(target);
        
        setElementDetails({
            tag: target.tagName.toLowerCase(),
            class: target.className.replace('inspector-highlight', '').trim(),
            width: computed.width,
            height: computed.height,
            color: computed.color,
            bg: computed.backgroundColor,
            font: computed.fontFamily,
            size: computed.fontSize,
            padding: computed.padding,
            margin: computed.margin,
            display: computed.display
        });
        setSelectedElement(target);
        // Inspector remains active until explicitly disabled
        if (hoveredElement) hoveredElement.classList.remove('inspector-highlight');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && inspectorMode) {
            setInspectorMode(false);
            if (hoveredElement) hoveredElement.classList.remove('inspector-highlight');
            setSelectedElement(null);
            setElementDetails(null);
        }
    };

    if (inspectorMode) {
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('click', handleClick, { capture: true }); // Capture phase to prevent default actions
        document.addEventListener('keydown', handleKeyDown);
    } else {
        if (hoveredElement) hoveredElement.classList.remove('inspector-highlight');
        if (selectedElement) selectedElement.classList.remove('inspector-highlight');
    }

    return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('click', handleClick, { capture: true });
        document.removeEventListener('keydown', handleKeyDown);
        if (hoveredElement) hoveredElement.classList.remove('inspector-highlight');
    };
  }, [inspectorMode, hoveredElement, selectedElement]);


  const isActive = (path: string) => location.pathname === path 
    ? "text-primary-700 font-semibold bg-primary-50/80 dark:bg-primary-900/30 dark:text-primary-400 shadow-md shadow-primary-500/10 scale-105" 
    : "text-slate-500 hover:text-primary-600 hover:bg-slate-50 font-medium dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-slate-800 hover:scale-105 hover:shadow-sm";

  // Mobile active style - larger text
  const isMobileActive = (path: string) => location.pathname === path
    ? "text-primary-600 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-900/20 rounded-xl"
    : "text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors";

  const colors: { id: ThemeColor, color: string }[] = [
    { id: 'teal', color: '#14b8a6' },
    { id: 'blue', color: '#3b82f6' },
    { id: 'violet', color: '#8b5cf6' },
    { id: 'rose', color: '#f43f5e' },
    { id: 'amber', color: '#f59e0b' },
  ];

  const BetaBadge = () => (
    <span className="px-1.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-[9px] font-extrabold uppercase tracking-widest border border-primary-100 dark:border-primary-800 select-none ml-2 self-center">
        Beta
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Canvas for Interactive Network */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full opacity-40 dark:opacity-60"
          />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled && !isMenuOpen
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Section with Scroll Animation */}
            <Link to="/" className="flex items-center gap-2.5 group select-none relative z-50" onClick={() => setIsMenuOpen(false)}>
              <div className={`relative transition-all duration-500 ease-out ${scrolled ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}`}>
                <div className="absolute inset-0 bg-primary-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2.5 rounded-xl shadow-lg shadow-primary-600/20 group-hover:scale-105 transition-transform duration-300">
                    <Dog size={24} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-xl font-bold text-slate-800 dark:text-white tracking-tight transition-all duration-500 ${scrolled ? 'translate-x-1' : ''}`}>
                    {t.common.appName}
                </span>
                <BetaBadge />
              </div>
            </Link>

            {/* Desktop Nav - With Hover Effects */}
            <nav className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
              <Link to="/" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/')}`}>{t.nav.home}</Link>
              <Link to="/tools" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/tools')}`}>{t.nav.tools}</Link>
              <Link to="/hub" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/hub')}`}>{t.nav.hub}</Link>
              <Link to="/docs" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/docs')}`}>{t.nav.docs}</Link>
              <Link to="/hardening" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/hardening')}`}>{t.nav.hardening}</Link>
              <Link to="/temp-mail" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/temp-mail')}`}>{t.nav.tempMail}</Link>
              <Link to="/stories" className={`px-5 py-2.5 rounded-xl transition-all duration-300 ${isActive('/stories')}`}>{t.nav.stories}</Link>
              
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
              
              {/* Language Picker */}
              <div className="relative">
                <button 
                  onClick={() => setShowLangPicker(!showLangPicker)}
                  className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-primary-400 transition-colors flex items-center gap-2 hover:scale-105"
                >
                  <Globe size={20} />
                  <span className="text-sm font-bold uppercase">{language}</span>
                </button>
                
                {showLangPicker && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLangPicker(false)}></div>
                    <div className={`absolute top-full mt-2 w-48 max-h-80 overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-20 animate-scale-in ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLanguage(l.code); setShowLangPicker(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800 ${language === l.code ? 'text-primary-600 dark:text-primary-400 font-bold bg-slate-50 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300'}`}
                        >
                          <span className="text-lg">{l.flag}</span>
                          <span className="text-sm">{l.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Color Picker */}
              <div className="relative">
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-primary-400 transition-colors hover:scale-105"
                >
                  <Palette size={20} />
                </button>
                
                {showColorPicker && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowColorPicker(false)}></div>
                    <div className={`absolute top-full mt-2 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex gap-2 z-20 animate-scale-in ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                      {colors.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => { setThemeColor(c.id); setShowColorPicker(false); }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === c.id ? 'border-slate-400 dark:border-slate-400 scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: c.color }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-primary-400 transition-colors hover:scale-105"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </nav>

            {/* Mobile Menu Button - Z-Index raised to be above the overlay */}
            <div className="flex items-center gap-2 md:hidden relative z-50">
              <button 
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* SIDE DRAWER MOBILE MENU (Better UX) */}
        {/* Backdrop */}
        <div 
            className={`md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Drawer Panel */}
        <div 
            className={`md:hidden fixed top-0 right-0 z-40 h-full w-[80%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-300 ease-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
                
                {/* Main Links */}
                <div className="flex-1 flex flex-col space-y-2">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/')}`}>
                        <Home size={24} className="opacity-70" /> {t.nav.home}
                    </Link>
                    <Link to="/tools" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/tools')}`}>
                        <Wrench size={24} className="opacity-70" /> {t.nav.tools}
                    </Link>
                    <Link to="/hub" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/hub')}`}>
                        <Layers size={24} className="opacity-70" /> {t.nav.hub}
                    </Link>
                    <Link to="/docs" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/docs')}`}>
                        <Book size={24} className="opacity-70" /> {t.nav.docs}
                    </Link>
                    <Link to="/hardening" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/hardening')}`}>
                        <Shield size={24} className="opacity-70" /> {t.nav.hardening}
                    </Link>
                    <Link to="/temp-mail" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/temp-mail')}`}>
                        <Mail size={24} className="opacity-70" /> {t.nav.tempMail}
                    </Link>
                    <Link to="/stories" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 px-4 py-3 text-lg ${isMobileActive('/stories')}`}>
                        <Dog size={24} className="opacity-70" /> {t.nav.stories}
                    </Link>
                    
                    <div className="border-t border-slate-100 dark:border-slate-800 my-4"></div>
                    
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-500 dark:text-slate-400 font-medium hover:text-primary-600">
                        {t.nav.about}
                    </Link>
                    <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-500 dark:text-slate-400 font-medium hover:text-primary-600">
                        {t.nav.faq}
                    </Link>
                    <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-500 dark:text-slate-400 font-medium hover:text-primary-600">
                        {t.nav.legal}
                    </Link>
                </div>

                {/* Bottom Controls */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col gap-6">
                        {/* Colors */}
                        <div className="flex gap-3 justify-center">
                            {colors.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => setThemeColor(c.id)}
                                    className={`w-8 h-8 rounded-full transition-transform ${themeColor === c.id ? 'scale-125 ring-2 ring-offset-2 ring-slate-300 dark:ring-slate-600' : 'opacity-70'}`}
                                    style={{ backgroundColor: c.color }}
                                />
                            ))}
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={toggleTheme}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm"
                            >
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
                            </button>

                            <button 
                                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm"
                            >
                                <Globe size={18} />
                                <span>{language === 'en' ? 'English' : 'Español'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="flex-grow w-full relative z-10">
        {children}
      </main>

      {/* INSPECTOR PANEL */}
      {elementDetails && (
          <div className="inspector-panel fixed bottom-24 right-4 z-50 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-sm uppercase flex items-center gap-2"><Eye size={16} className="text-primary-500"/> {t.inspector.title}</span>
                  <button onClick={() => setElementDetails(null)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white"><X size={16} /></button>
              </div>
              <div className="p-4 space-y-4 text-sm max-h-96 overflow-y-auto">
                  <div>
                      <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.inspector.tag}</div>
                      <code className="text-primary-600 dark:text-primary-400 font-bold bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded">&lt;{elementDetails.tag}&gt;</code>
                  </div>
                  {elementDetails.class && (
                      <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.inspector.class}</div>
                          <code className="text-slate-600 dark:text-slate-300 break-all">{elementDetails.class}</code>
                      </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                          <div className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Maximize size={10} /> {t.inspector.dimensions}</div>
                          <div className="font-mono text-xs">{elementDetails.width} x {elementDetails.height}</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                          <div className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Hash size={10} /> {t.inspector.spacing}</div>
                          <div className="font-mono text-xs truncate" title={elementDetails.padding}>P: {elementDetails.padding}</div>
                          <div className="font-mono text-xs truncate" title={elementDetails.margin}>M: {elementDetails.margin}</div>
                      </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Type size={10} /> {t.inspector.font}</div>
                      <div className="font-mono text-xs break-words">{elementDetails.font} ({elementDetails.size})</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1"><ColorIcon size={10} /> {t.inspector.color}</div>
                      <div className="flex items-center gap-2 mb-1">
                          <div className="w-4 h-4 rounded border border-slate-300" style={{backgroundColor: elementDetails.color}}></div>
                          <span className="font-mono text-xs">{elementDetails.color}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded border border-slate-300" style={{backgroundColor: elementDetails.bg}}></div>
                          <span className="font-mono text-xs">{elementDetails.bg}</span>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors duration-300 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                  <div className="bg-gradient-to-tr from-primary-600 to-primary-400 text-white p-2 rounded-lg shadow-md">
                    <Dog size={18} strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-xl text-slate-800 dark:text-white">{t.common.appName}</span>
                  <BetaBadge />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-sm">
                {t.home.heroDesc}
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">{t.common.seeMore}</h4>
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.home}</Link>
                <Link to="/assessment" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.assessment}</Link>
                <Link to="/tools" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.tools}</Link>
                <Link to="/hub" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.hub}</Link>
                <Link to="/docs" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.docs}</Link>
                <Link to="/faq" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.faq}</Link>
                <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.about}</Link>
                <Link to="/stories" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400"><Dog size={14} /> {t.nav.stories}</Link>
              </div>
            </div>

            <div className="space-y-4">
               <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">{t.nav.legal}</h4>
               <div className="flex flex-col space-y-3">
                 <Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.terms}</Link>
                 <Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit">{t.nav.privacy}</Link>
                 <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit flex items-center gap-2">
                   GitHub
                 </a>
               </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
             <p>&copy; {new Date().getFullYear()} Beethoven. {t.common.openSource}. <span className="text-xs">v{APP_VERSION}</span></p>
             <div className="flex items-center gap-4">
                 <button 
                    onClick={() => {
                        setInspectorMode(!inspectorMode);
                        if(inspectorMode) {
                            setSelectedElement(null);
                            setElementDetails(null);
                        }
                    }}
                    className={`inspector-toggle flex items-center gap-1 text-xs font-bold uppercase transition-colors ${inspectorMode ? 'text-rose-500 animate-pulse' : 'text-slate-400 hover:text-primary-500'}`}
                 >
                    {inspectorMode ? <Eye size={14} /> : <EyeOff size={14} />} 
                    {inspectorMode ? t.inspector.disable : t.inspector.enable}
                 </button>
                 <p className="flex items-center gap-1">
                    {t.common.free} <Heart size={14} className="text-red-400 fill-red-400" />
                 </p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
