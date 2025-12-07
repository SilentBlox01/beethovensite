
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
    CheckCircle,
    Circle,
    Lock,
    Unlock,
    Map,
    Server,
    Globe,
    Shield,
    Key,
    Mail,
    MessageSquare,
    Smartphone,
    Monitor,
    Database,
    Search,
    ExternalLink,
    ChevronRight,
    Trophy,
    Activity,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Confetti } from '../components/ui/Confetti';

// Helper for tool icon
const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
);

const Journey: React.FC = () => {
    const { t } = useApp();
    const [completedNodes, setCompletedNodes] = useState<string[]>([]);
    const [unlockedLevels, setUnlockedLevels] = useState<string[]>(['lvl1']);
    const [showConfetti, setShowConfetti] = useState(false);
    const prevCompletedCount = useRef(0);

    useEffect(() => {
        const saved = localStorage.getItem('beethoven_journey');
        if (saved) {
            const parsed = JSON.parse(saved);
            setCompletedNodes(parsed);
            prevCompletedCount.current = parsed.length;
        }
    }, []);

    useEffect(() => {
        // Unlock logic
        const newUnlocked = ['lvl1'];
        t.journey.levels.forEach((level, index) => {
            const allNodesComplete = level.nodes.every(n => completedNodes.includes(n.id));
            if (allNodesComplete && index < t.journey.levels.length - 1) {
                newUnlocked.push(t.journey.levels[index + 1].id);
            }
        });
        setUnlockedLevels(newUnlocked);

        // Check for level up (simple heuristic: more levels unlocked than before)
        // Or check if total completed nodes increased significantly (completing a level)
        // Here we just fire confetti if a node is toggled ON
        if (completedNodes.length > prevCompletedCount.current) {
            // Check if we just completed a level
            const didCompleteLevel = t.journey.levels.some(l =>
                l.nodes.every(n => completedNodes.includes(n.id)) &&
                l.nodes.some(n => !prevCompletedCount.current && completedNodes.includes(n.id)) // Simplified check
            );

            // Just fire confetti on every step for positive reinforcement, why not?
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        prevCompletedCount.current = completedNodes.length;

    }, [completedNodes, t.journey.levels]);

    const toggleNode = (id: string) => {
        const newCompleted = completedNodes.includes(id)
            ? completedNodes.filter(n => n !== id)
            : [...completedNodes, id];

        setCompletedNodes(newCompleted);
        localStorage.setItem('beethoven_journey', JSON.stringify(newCompleted));
    };

    const getIcon = (name: string) => {
        const icons: any = { Globe, Search, Server, Key, Shield, Mail, MessageSquare, Map, Smartphone, Monitor, Database };
        const Icon = icons[name] || Activity;
        return <Icon size={24} />;
    };

    const resetProgress = () => {
        if (confirm('Are you sure?')) {
            setCompletedNodes([]);
            localStorage.removeItem('beethoven_journey');
            prevCompletedCount.current = 0;
        }
    };

    // Calculate overall progress
    const totalNodes = t.journey.levels.reduce((acc, lvl) => acc + lvl.nodes.length, 0);
    const progressPercent = Math.round((completedNodes.length / totalNodes) * 100);

    return (
        <div className="min-h-screen pb-20 relative overflow-hidden">
            <Confetti active={showConfetti} />

            {/* Header Section */}
            <div className="relative pt-20 pb-12 px-4 text-center z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/20 dark:to-transparent -z-10 pointer-events-none" />

                <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-lg mb-6 animate-float">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl text-white">
                        <Map size={32} />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    {t.journey.title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
                    {t.journey.subtitle}
                </p>

                {/* Overall Progress Bar */}
                <div className="max-w-md mx-auto mt-8 bg-white dark:bg-slate-800 rounded-full h-6 p-1 shadow-inner border border-slate-200 dark:border-slate-700">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${Math.max(5, progressPercent)}%` }}
                    >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white leading-none">
                            {progressPercent}%
                        </div>
                    </div>
                </div>

                <button onClick={resetProgress} className="mt-4 text-xs font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                    {t.journey.resetBtn}
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                {/* SVG Connector Line (Desktop) */}
                <div className="absolute left-[3.25rem] top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 hidden md:block -z-10 rounded-full" />

                <div className="space-y-16">
                    {t.journey.levels.map((level, lvlIndex) => {
                        const isLocked = !unlockedLevels.includes(level.id);
                        const isCompleted = level.nodes.every(n => completedNodes.includes(n.id));

                        // Dynamic styles based on level color
                        const colorMap: any = {
                            cyan: 'from-cyan-500 to-blue-500',
                            emerald: 'from-emerald-500 to-teal-500',
                            purple: 'from-violet-500 to-fuchsia-500',
                            rose: 'from-rose-500 to-red-600',
                        };
                        const gradient = colorMap[level.color] || 'from-slate-500 to-slate-700';

                        // Border colors
                        const borderClass = isCompleted
                            ? `border-${level.color}-500`
                            : 'border-slate-200 dark:border-slate-700';

                        return (
                            <div
                                key={level.id}
                                className={`relative transition-all duration-700 transform ${isLocked ? 'opacity-60 grayscale blur-[1px] scale-95' : 'opacity-100 scale-100'}`}
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-stretch">

                                    {/* Level Marker & Title (Desktop Layout) */}
                                    <div className="hidden md:flex flex-col items-center shrink-0 w-24 pt-4">
                                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl z-20 transition-all duration-500 ${isCompleted
                                                ? `bg-gradient-to-br ${gradient} text-white scale-110 ring-4 ring-${level.color}-500/30`
                                                : isLocked
                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                                    : `bg-white dark:bg-slate-900 border-2 border-${level.color}-400 text-${level.color}-500`
                                            }`}>
                                            {isCompleted ? <Trophy size={36} className="animate-pulse-soft" /> : isLocked ? <Lock size={32} /> : <span className="text-3xl font-black">{lvlIndex + 1}</span>}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`flex-1 overflow-hidden rounded-[2rem] border-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-3xl ${borderClass}`}>

                                        {/* Level Header */}
                                        <div className={`p-8 bg-gradient-to-r ${isLocked ? 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900' : `${gradient} bg-opacity-10 text-white`}`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className={`text-xs font-black uppercase tracking-[0.2em] mb-2 ${isLocked ? 'text-slate-400' : 'text-white/80'}`}>
                                                        {isLocked ? t.journey.status.locked : isCompleted ? "Mission Complete" : t.journey.status.available}
                                                    </div>
                                                    <h2 className={`text-3xl font-black ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                                                        {level.title}
                                                    </h2>
                                                    <p className={`mt-2 font-medium ${isLocked ? 'text-slate-400' : 'text-white/90'}`}>
                                                        {level.desc}
                                                    </p>
                                                </div>
                                                {!isLocked && (
                                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                                        {isCompleted ? <CheckCircle size={32} className="text-white" /> : <Unlock size={32} className="text-white" />}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Nodes Grid */}
                                        <div className="p-8 grid grid-cols-1 gap-6">
                                            {level.nodes.map((node, i) => {
                                                const isDone = completedNodes.includes(node.id);
                                                return (
                                                    <div
                                                        key={node.id}
                                                        className={`group relative flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 ${isDone
                                                                ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                                                                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 hover:shadow-md'
                                                            }`}
                                                    >
                                                        {/* Icon Box */}
                                                        <button
                                                            onClick={() => !isLocked && toggleNode(node.id)}
                                                            disabled={isLocked}
                                                            className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDone
                                                                    ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg scale-105 rotate-3'
                                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:scale-110 shadow-inner'
                                                                }`}
                                                        >
                                                            {isDone ? <CheckCircle size={28} strokeWidth={3} /> : getIcon(node.icon)}
                                                        </button>

                                                        {/* Text */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className={`text-lg font-bold ${isDone ? 'text-slate-900 dark:text-white line-through decoration-emerald-500/50 decoration-2' : 'text-slate-700 dark:text-slate-200'}`}>
                                                                    {node.title}
                                                                </h3>
                                                                {isDone && <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">DONE</span>}
                                                            </div>
                                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                                                {node.desc}
                                                            </p>
                                                        </div>

                                                        {/* Actions */}
                                                        {!isLocked && (
                                                            <div className="flex flex-col gap-2">
                                                                {node.action && (
                                                                    <a
                                                                        href={node.action} target="_blank" rel="noopener noreferrer"
                                                                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-xl transition-all hover:scale-110"
                                                                        title="External Link"
                                                                    >
                                                                        <ExternalLink size={20} />
                                                                    </a>
                                                                )}
                                                                {node.toolAction && (
                                                                    <Link
                                                                        to={`/tools?tab=${node.toolAction}`}
                                                                        className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-xl transition-all hover:scale-110"
                                                                        title="Verify with Tool"
                                                                    >
                                                                        <WrenchIcon />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Journey;
