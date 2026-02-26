"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle, FileText, PlayCircle, Code2, Database, Github, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

interface Task {
    id: string;
    title: string;
    type: "Concept" | "Code" | "DSA" | "Project";
    duration: string;
    completed: boolean;
}

interface WeekData {
    weekNumber: number;
    title: string;
    topics: string[];
    isCurrent: boolean;
    isCompleted: boolean;
}

const mockDailyTasks: Record<string, Task[]> = {
    "Monday": [
        { id: "t1", title: "Read: Intro to Relational VS NoSQL", type: "Concept", duration: "20 min", completed: true },
        { id: "t2", title: "Setup Local Postgres Instance", type: "Code", duration: "45 min", completed: true },
    ],
    "Tuesday": [
        { id: "t3", title: "Video: Indexing under the hood", type: "Concept", duration: "30 min", completed: false },
        { id: "t4", title: "Write: 5 complex aggregations", type: "Code", duration: "60 min", completed: false },
    ],
    "Wednesday": [
        { id: "t5", title: "Solve: Two Sum variant (DB join)", type: "DSA", duration: "45 min", completed: false },
    ]
};

const typeColors = {
    "Concept": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Code": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "DSA": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Project": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function WeekCard({ week }: { week: WeekData }) {
    const [isExpanded, setIsExpanded] = useState(week.isCurrent);
    const [tasks, setTasks] = useState(mockDailyTasks);
    const [isFullyCompleted, setIsFullyCompleted] = useState(week.isCompleted);

    const toggleTask = (day: string, taskId: string) => {
        setTasks(prev => ({
            ...prev,
            [day]: prev[day].map(t => 
                t.id === taskId ? { ...t, completed: !t.completed } : t
            )
        }));
    };

    const handleCompleteWeek = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFullyCompleted(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#06b6d4', '#10b981']
        });
        setTimeout(() => {
            setIsExpanded(false);
        }, 1500);
    };

    const headerBorderClass = isFullyCompleted 
        ? "border-emerald-500/50 bg-emerald-500/[0.02]" 
        : week.isCurrent
        ? "border-indigo-500/50 bg-indigo-500/[0.02] shadow-[0_0_20px_rgba(99,102,241,0.05)]"
        : "border-[#1e1e2e] hover:border-slate-700";

    return (
        <div className={`glass-card bg-[#13131f] border-2 rounded-2xl overflow-hidden transition-all duration-300 ${headerBorderClass}`}>
            {/* Header Row */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        isFullyCompleted 
                        ? "bg-emerald-500/20 text-emerald-400"
                        : week.isCurrent
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
                        : "bg-[#1e1e2e] text-slate-400"
                    }`}>
                        Week {week.weekNumber}
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-1 flex items-center gap-2 ${isFullyCompleted ? "text-emerald-100" : "text-white"}`}>
                            {week.title}
                            {isFullyCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        </h3>
                        <div className="hidden sm:flex flex-wrap gap-2">
                            {week.topics.map(topic => (
                                <span key={topic} className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-[#0a0a0f] px-2 py-0.5 rounded-md border border-[#1e1e2e]">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-4">
                    <div className="text-right hidden xs:block">
                        <div className="text-sm font-semibold text-white">3/5 Tasks</div>
                        <div className="w-24 h-1.5 bg-[#1e1e2e] rounded-full mt-1.5 overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: "60%" }} />
                        </div>
                    </div>
                    <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>
                </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-2 border-t border-[#1e1e2e]/50">
                            
                            {/* Layout Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                
                                {/* Left: Daily Tasks (Takes up 2 columns) */}
                                <div className="lg:col-span-2 space-y-6">
                                    {Object.entries(tasks).map(([day, dayTasks]) => (
                                        <div key={day}>
                                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                {day}
                                            </h4>
                                            <div className="space-y-2">
                                                {dayTasks.map(task => (
                                                    <div 
                                                        key={task.id}
                                                        onClick={() => toggleTask(day, task.id)}
                                                        className={`flex items-start gap-4 p-3 rounded-xl border transition-all cursor-pointer group hover:bg-[#1a1a24] ${
                                                            task.completed 
                                                            ? "border-emerald-500/10 bg-emerald-500/[0.02]" 
                                                            : "border-[#1e1e2e] bg-[#0f0f1a]"
                                                        }`}
                                                    >
                                                        <motion.div 
                                                            whileTap={{ scale: 0.8 }}
                                                            className="shrink-0 mt-0.5"
                                                        >
                                                            {task.completed ? (
                                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                                            )}
                                                        </motion.div>
                                                        
                                                        <div className="flex-1">
                                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                                                                <span className={`text-sm font-medium transition-colors ${task.completed ? "text-slate-400 line-through" : "text-slate-200"}`}>
                                                                    {task.title}
                                                                </span>
                                                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${typeColors[task.type]}`}>
                                                                    {task.type}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                                <span>⏳ {task.duration}</span>
                                                                <a href="#" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                                                                    {task.type === "Concept" ? <FileText className="w-3.5 h-3.5" /> : <PlayCircle className="w-3.5 h-3.5" />}
                                                                    Material
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right: Focus Boxes */}
                                <div className="space-y-4">
                                    {/* DSA Focus Box */}
                                    <div className="bg-gradient-to-br from-[#6366f1]/10 to-transparent border border-[#6366f1]/20 rounded-xl p-5 relative overflow-hidden">
                                        <div className="absolute -right-4 -top-4 opacity-10">
                                            <Code2 className="w-24 h-24 text-indigo-500" />
                                        </div>
                                        <h4 className="text-sm font-bold text-indigo-300 mb-3 uppercase tracking-wider relative z-10">This Week&apos;s DSA</h4>
                                        <div className="space-y-2 relative z-10">
                                            <span className="inline-block bg-[#13131f] border border-[#1e1e2e] text-slate-200 text-xs px-2.5 py-1 rounded-md">Binary Trees</span>
                                            <span className="inline-block bg-[#13131f] border border-[#1e1e2e] text-slate-200 text-xs px-2.5 py-1 rounded-md">Graph BFS/DFS</span>
                                            <span className="inline-block bg-[#13131f] border border-[#1e1e2e] text-slate-200 text-xs px-2.5 py-1 rounded-md">DP Basics</span>
                                        </div>
                                        <p className="text-xs text-indigo-400/80 mt-4 relative z-10 font-medium">Recommended: 1 problem/day</p>
                                    </div>

                                    {/* Mini Project Box */}
                                    <div className="bg-gradient-to-br from-[#06b6d4]/10 to-transparent border border-[#06b6d4]/20 rounded-xl p-5 relative overflow-hidden">
                                        <div className="absolute -right-4 -top-4 opacity-10">
                                            <Database className="w-24 h-24 text-cyan-500" />
                                        </div>
                                        <h4 className="text-sm font-bold text-cyan-300 mb-2 uppercase tracking-wider relative z-10">Build This Week</h4>
                                        <p className="text-white font-medium mb-1 relative z-10">URL Shortener Service</p>
                                        <p className="text-xs text-slate-400 mb-4 relative z-10 leading-relaxed">Implement a basic REST API that takes a long URL, hashes it, stores it in Postgres, and redirects on visit.</p>
                                        
                                        <div className="flex items-center gap-2 relative z-10">
                                            <a href="#" className="inline-flex items-center gap-1.5 bg-[#0a0a0f] border border-[#1e1e2e] hover:border-cyan-500/50 transition-colors text-white text-xs px-3 py-1.5 rounded-lg">
                                                <Github className="w-3.5 h-3.5" /> Template
                                                <ExternalLink className="w-3 h-3 text-slate-500" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Completion CTA */}
                            {week.isCurrent && !isFullyCompleted && (
                                <div className="mt-8 pt-6 border-t border-[#1e1e2e]">
                                    <button 
                                        onClick={handleCompleteWeek}
                                        className="w-full relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white rounded-xl py-3.5 font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] group overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Mark Week as Complete <CheckCircle2 className="w-5 h-5" />
                                        </span>
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                    </button>
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
