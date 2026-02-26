"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WeekData {
    weekNumber: number;
    title: string;
    isCurrent: boolean;
    isCompleted: boolean;
}

interface WeekTimelineProps {
    currentWeek: number;
    weeks: WeekData[];
}

export default function WeekTimeline({ currentWeek, weeks }: WeekTimelineProps) {
    return (
        <div className="w-full overflow-x-auto pb-6 scrollbar-hide hide-scrollbar">
            <div className="min-w-[800px] px-4">
                <div className="relative flex items-center justify-between">
                    
                    {/* Connecting Path Lines */}
                    <div className="absolute top-8 left-[30px] right-[30px] h-1 bg-[#1e1e2e] -z-10 rounded-full overflow-hidden">
                        {/* Completed portion (Green) */}
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentWeek - 1) / (weeks.length - 1)) * 100}%` }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        {/* Current portion (Indigo animated dashes) */}
                        <motion.div 
                            className="absolute top-0 h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(99,102,241,0.5)_4px,rgba(99,102,241,0.5)_8px)]"
                            style={{ 
                                left: `${((currentWeek - 1) / (weeks.length - 1)) * 100}%`,
                                width: `${(1 / (weeks.length - 1)) * 100}%`
                            }}
                        />
                    </div>

                    {/* Milestone Circles */}
                    {weeks.map((week, index) => {
                        const isPast = week.isCompleted;
                        const isCurrent = week.isCurrent;

                        return (
                            <div key={week.weekNumber} className="relative flex flex-col items-center group w-[100px]">
                                {/* Circle Container */}
                                <div className="relative flex items-center justify-center w-[60px] h-[60px] mb-3">
                                    {/* Current Pulse Effect */}
                                    {isCurrent && (
                                        <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500 opacity-20" />
                                    )}

                                    {/* The Circle */}
                                    <motion.div 
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`w-full h-full rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                                            isPast 
                                                ? "bg-gradient-to-br from-emerald-400 to-teal-600 border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                                                : isCurrent
                                                ? "bg-[#13131f] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-indigo-400"
                                                : "bg-[#0a0a0f] border-[#1e1e2e] text-slate-500"
                                        }`}
                                    >
                                        {isPast ? (
                                            <Check className="w-6 h-6 text-white" />
                                        ) : (
                                            <span className="text-xl font-bold tracking-tighter">W{week.weekNumber}</span>
                                        )}
                                    </motion.div>
                                </div>
                                
                                <span className={`text-xs text-center font-medium transition-colors ${
                                    isCurrent ? "text-indigo-300" : isPast ? "text-emerald-400/80" : "text-slate-500"
                                }`}>
                                    {week.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Scroller style injection for custom hide-scrollbar */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
