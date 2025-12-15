

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Globe, Mail, MessageCircle, Cloud, Search, Cpu, ArrowRight, ShieldCheck, Lock, Activity, Server, Smartphone, Key, HardDrive, FileText, Wrench, Droplet, Moon, Chrome, Send, Wifi, Video, Users, UserX, RefreshCw, Box, Download, Map, Music, Image, List, Twitter, Instagram, Zap } from 'lucide-react';

export const PrivacyHub: React.FC = () => {
  const { t } = useApp();
  // Updated state type to include 'password-manager' explicitly matching data types
  const [activeFilter, setActiveFilter] = useState<'all' | 'browser' | 'email' | 'messaging' | 'cloud' | 'search' | 'os' | 'vpn' | 'password-manager' | 'dns' | 'store' | 'productivity' | 'utilities' | 'social' | 'maps' | 'media'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (iconName: string) => {
      switch(iconName) {
          case 'firefox': return <Globe size={32} className="text-orange-500" />;
          case 'shield': return <ShieldCheck size={32} className="text-orange-600" />;
          case 'ghost': return <Globe size={32} className="text-purple-600" />;
          case 'mail': return <Mail size={32} className="text-indigo-600" />;
          case 'message-circle': return <MessageCircle size={32} className="text-blue-500" />;
          case 'lock': return <Lock size={32} className="text-emerald-500" />;
          case 'search': return <Search size={32} className="text-red-500" />;
          case 'cloud': return <Cloud size={32} className="text-purple-500" />;
          case 'cpu': return <Cpu size={32} className="text-green-600" />;
          case 'key': return <Key size={32} className="text-blue-600" />;
          case 'hard-drive': return <HardDrive size={32} className="text-slate-600" />;
          case 'activity': return <Activity size={32} className="text-cyan-500" />;
          case 'server': return <Server size={32} className="text-indigo-500" />;
          case 'smartphone': return <Smartphone size={32} className="text-rose-500" />;
          case 'file-text': return <FileText size={32} className="text-teal-500" />;
          case 'trash': return <Wrench size={32} className="text-slate-500" />;
          case 'hash': return <span className="text-2xl font-bold text-slate-800 dark:text-white">#</span>;
          case 'droplet': return <Droplet size={32} className="text-blue-400" />;
          case 'moon': return <Moon size={32} className="text-slate-400" />;
          case 'chrome': return <Chrome size={32} className="text-blue-500" />;
          case 'send': return <Send size={32} className="text-sky-500" />;
          case 'wifi': return <Wifi size={32} className="text-orange-500" />;
          case 'video': return <Video size={32} className="text-pink-500" />;
          case 'users': return <Users size={32} className="text-indigo-500" />;
          case 'user-x': return <UserX size={32} className="text-rose-500" />;
          case 'refresh-cw': return <RefreshCw size={32} className="text-green-500" />;
          case 'box': return <Box size={32} className="text-slate-600" />;
          case 'download': return <Download size={32} className="text-emerald-500" />;
          case 'map': return <Map size={32} className="text-emerald-500" />;
          case 'navigation': return <Map size={32} className="text-emerald-600" />;
          case 'music': return <Music size={32} className="text-rose-500" />;
          case 'image': return <Image size={32} className="text-purple-500" />;
          case 'list': return <List size={32} className="text-slate-500" />;
          case 'twitter': return <Twitter size={32} className="text-sky-500" />;
          case 'instagram': return <Instagram size={32} className="text-pink-500" />;
          case 'zap': return <Zap size={32} className="text-yellow-500" />;
          case 'mask': return <UserX size={32} className="text-slate-700" />;
          case 'message-square': return <MessageCircle size={32} className="text-green-500" />;
          default: return <Layers size={32} />;
      }
  };

  // Fixed ID for password category to match 'password-manager' in data/locales.ts
  const categories = [
      { id: 'all', label: t.common.all, icon: <Layers size={18} /> },
      { id: 'browser', label: t.hub.cats.browser, icon: <Globe size={18} /> },
      { id: 'search', label: t.hub.cats.search, icon: <Search size={18} /> },
      { id: 'email', label: t.hub.cats.email, icon: <Mail size={18} /> },
      { id: 'messaging', label: t.hub.cats.messaging, icon: <MessageCircle size={18} /> },
      { id: 'social', label: t.hub.cats.social, icon: <Users size={18} /> },
      { id: 'media', label: t.hub.cats.media, icon: <Video size={18} /> },
      { id: 'maps', label: t.hub.cats.maps, icon: <Map size={18} /> },
      { id: 'password-manager', label: t.hub.cats.pass, icon: <Key size={18} /> },
      { id: 'productivity', label: t.hub.cats.productivity, icon: <FileText size={18} /> },
      { id: 'vpn', label: t.hub.cats.vpn, icon: <ShieldCheck size={18} /> },
      { id: 'cloud', label: t.hub.cats.cloud, icon: <Cloud size={18} /> },
      { id: 'utilities', label: t.hub.cats.utilities, icon: <Wrench size={18} /> },
      { id: 'dns', label: t.hub.cats.dns, icon: <Activity size={18} /> },
      { id: 'store', label: t.hub.cats.store, icon: <Smartphone size={18} /> },
      { id: 'os', label: t.hub.cats.os, icon: <Cpu size={18} /> },
  ];

  const getPricingBadge = (pricing: 'Free' | 'Freemium' | 'Paid') => {
      // Localize pricing label if possible, or mapping
      let label: string = pricing;
      if (t.common.free === "Gratis") { // Detection for Spanish
           if (pricing === 'Free') label = 'Gratis';
           if (pricing === 'Paid') label = 'Pago';
      }

      const styles = {
          'Free': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
          'Freemium': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          'Paid': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      };
      return (
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${styles[pricing]}`}>
              {label}
          </span>
      );
  };

  const filteredApps = t.hub.apps.filter(app => {
      const matchesCategory = activeFilter === 'all' || app.category === activeFilter;
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.replaces.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
        <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-3xl mb-4 shadow-sm">
                <Layers size={40} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.hub.title}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                {t.hub.subtitle}
            </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 space-y-8">
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder={t.hub.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary-500 focus:outline-none text-lg shadow-sm transition-all"
                />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                            activeFilter === cat.id 
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105' 
                            : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800'
                        }`}
                    >
                        {cat.icon}
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                    <div key={app.id} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 dark:hover:shadow-primary-900/20 transition-all duration-300 group flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                {getIcon(app.icon)}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {app.badge && (
                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-md uppercase tracking-wide border border-slate-200 dark:border-slate-700">
                                        {app.badge}
                                    </span>
                                )}
                                {getPricingBadge(app.pricing)}
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{app.name}</h3>
                        <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-bold uppercase tracking-wide">
                            <span>{t.hub.replacesLabel}</span>
                            <span className="text-red-500 line-through decoration-2 decoration-red-500/50">{app.replaces}</span>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                            {app.description}
                        </p>
                        
                        <a 
                            href={app.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors gap-2 group/btn"
                        >
                            {t.common.seeMore} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-xl">{t.hub.noAppsFound}</p>
                <button 
                    onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                    className="mt-4 text-primary-600 font-bold hover:underline"
                >
                    {t.hub.clearFilters}
                </button>
            </div>
        )}
    </div>
  );
};