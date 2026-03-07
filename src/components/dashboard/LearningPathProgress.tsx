"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, BookOpen, Code2, Play, Lock, Map, Trophy } from "lucide-react";
import Link from "next/link";
import { useSarthiStore } from "@/lib/store/userStore";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function LearningPathProgress() {
    const { learningPath, toggleTaskCompletion } = useSarthiStore();

    if (!learningPath.generated || !learningPath.weeklyPlan.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-8 mb-8 w-full flex flex-col items-center justify-center text-center min-h-[300px]"
            >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                    <Map className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Build Your Roadmap</h2>
                <p className="text-slate-400 max-w-md mb-6">
                    Ready to start learning? Generate a week-by-week curriculum tailored strictly to your skill gaps.
                </p>
                <Link
                    href="/dashboard/path"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
                >
                    Create Learning Path <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        );
    }

    const currentWeekPlan = learningPath.weeklyPlan.find(w => w.week === learningPath.currentWeek) || learningPath.weeklyPlan[0];

    const getIcon = (type: string) => {
        switch (type) {
            case "concept": return BookOpen;
            case "code":
            case "project": return Code2;
            case "dsa": return Trophy;
            default: return BookOpen;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 mb-8 w-full"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Your Learning Path</h2>
                    <p className="text-sm text-slate-400">{currentWeekPlan.theme}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
                        Week {learningPath.currentWeek} of {learningPath.totalWeeks}
                    </span>
                    <Link href="/dashboard/path" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                        View Full Plan <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="min-w-[500px] flex items-center justify-between relative px-2">
                    {/* Connecting Line background */}
                    <div className="absolute top-1/2 left-6 right-6 h-1 -translate-y-1/2 bg-[#1e1e2e] rounded-full z-0" />

                    {/* Connecting Line active (simulated gradient progress) */}
                    <div
                        className="absolute top-1/2 left-6 h-1 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full z-0 transition-all duration-500"
                        style={{ width: `${learningPath.overallProgress}%` }}
                    />

                    {learningPath.weeklyPlan.slice(0, 6).map((week) => {
                        const isCompleted = week.week < learningPath.currentWeek || week.completed;
                        const isCurrent = week.week === learningPath.currentWeek;

                        return (
                            <div key={week.week} className="relative z-10 flex flex-col items-center gap-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted
                                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                        : isCurrent
                                            ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                            : "bg-[#0a0a0f] border-[#1e1e2e] text-slate-500"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5" />
                                    ) : week.week > learningPath.currentWeek ? (
                                        <Lock className="w-4 h-4" />
                                    ) : (
                                        <span className="font-bold">{week.week}</span>
                                    )}

                                    {/* Pulse ring for current week */}
                                    {isCurrent && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-indigo-500/50"
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    )}
                                </div>
                                <span className={`text-xs font-semibold ${isCurrent ? 'text-indigo-400' : 'text-slate-500'}`}>
                                    Week {week.week}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Current Week Expanded Details */}
            <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-5 relative overflow-hidden">
                {/* Subtle grid pattern inside */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">{currentWeekPlan.theme}</h3>
                    <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-[#1e1e2e]">Today&apos;s Focus • Week {currentWeekPlan.week}</p>

                    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
                        {currentWeekPlan.dailyTasks.map((task, idx) => {
                            const Icon = getIcon(task.type);
                            return (
                                <motion.div
                                    key={`${task.day}-${idx}`}
                                    variants={staggerItem}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-white/[0.02] ${task.completed
                                        ? "bg-[#0f0f1a] border-[#1e1e2e] opacity-70"
                                        : "bg-[#13131f] border-[#6366f1]/30 hover:border-[#6366f1]/60"
                                        }`}
                                    onClick={() => toggleTaskCompletion(currentWeekPlan.week, task.day, task.task)}
                                >
                                    {/* Custom Checkbox */}
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${task.completed ? "bg-emerald-500 text-white" : "border-2 border-slate-600 group-hover:border-indigo-500"
                                        }`}>
                                        <AnimatePresence>
                                            {task.completed && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex-grow flex items-center gap-3 min-w-0">
                                        <div className={`p-1.5 rounded-md ${task.completed ? 'bg-[#1e1e2e]' : 'bg-indigo-500/10'}`}>
                                            <Icon className={`w-4 h-4 ${task.completed ? 'text-slate-500' : 'text-indigo-400'}`} />
                                        </div>
                                        <span className={`text-sm font-medium truncate transition-all ${task.completed ? "text-slate-500 line-through" : "text-white"
                                            }`}>
                                            {task.task}
                                        </span>
                                    </div>

                                    <span className="text-xs font-semibold px-2 py-1 bg-[#0a0a0f] border border-[#1e1e2e] rounded-md text-slate-400 flex-shrink-0">
                                        {task.duration}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
