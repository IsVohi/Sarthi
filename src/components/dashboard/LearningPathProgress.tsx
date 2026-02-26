"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, BookOpen, Code2, Play, Lock } from "lucide-react";

const weeks = [
    { id: 1, status: "completed" },
    { id: 2, status: "current" },
    { id: 3, status: "upcoming" },
    { id: 4, status: "upcoming" },
    { id: 5, status: "upcoming" },
    { id: 6, status: "upcoming" },
];

const initialTasks = [
    { id: 1, text: "Read: REST API best practices", type: "read", duration: "15 min", completed: true, icon: BookOpen },
    { id: 2, text: "Solve: 2 LeetCode medium arrays", type: "code", duration: "45 min", completed: true, icon: Code2 },
    { id: 3, text: "Build: Express CRUD API with auth", type: "build", duration: "90 min", completed: false, icon: Code2 },
    { id: 4, text: "Watch: JWT authentication video", type: "watch", duration: "20 min", completed: false, icon: Play },
];

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
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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
                    <p className="text-sm text-slate-400">Mastering Backend Development (MERN)</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
                        Week 2 of 6
                    </span>
                    <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                        View Full Plan <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="min-w-[500px] flex items-center justify-between relative px-2">
                    {/* Connecting Line background */}
                    <div className="absolute top-1/2 left-6 right-6 h-1 -translate-y-1/2 bg-[#1e1e2e] rounded-full z-0" />

                    {/* Connecting Line active (simulated gradient progress) */}
                    <div className="absolute top-1/2 left-6 w-[25%] h-1 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full z-0" />

                    {weeks.map((week) => (
                        <div key={week.id} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${week.status === 'completed'
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                    : week.status === 'current'
                                        ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                        : "bg-[#0a0a0f] border-[#1e1e2e] text-slate-500"
                                    }`}
                            >
                                {week.status === 'completed' ? (
                                    <Check className="w-5 h-5" />
                                ) : week.status === 'upcoming' ? (
                                    <Lock className="w-4 h-4" />
                                ) : (
                                    <span className="font-bold">{week.id}</span>
                                )}

                                {/* Pulse ring for current week */}
                                {week.status === 'current' && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-indigo-500/50"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </div>
                            <span className={`text-xs font-semibold ${week.status === 'current' ? 'text-indigo-400' : 'text-slate-500'}`}>
                                Week {week.id}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Week Expanded Details */}
            <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-5 relative overflow-hidden">
                {/* Subtle grid pattern inside */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">REST API Design + Node.js Advanced</h3>
                    <p className="text-sm text-slate-400 mb-6 pb-4 border-b border-[#1e1e2e]">Today&apos;s Focus • Day 3/7</p>

                    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                variants={staggerItem}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-white/[0.02] ${task.completed
                                    ? "bg-[#0f0f1a] border-[#1e1e2e] opacity-70"
                                    : "bg-[#13131f] border-[#6366f1]/30 hover:border-[#6366f1]/60"
                                    }`}
                                onClick={() => toggleTask(task.id)}
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
                                        <task.icon className={`w-4 h-4 ${task.completed ? 'text-slate-500' : 'text-indigo-400'}`} />
                                    </div>
                                    <span className={`text-sm font-medium truncate transition-all ${task.completed ? "text-slate-500 line-through" : "text-white"
                                        }`}>
                                        {task.text}
                                    </span>
                                </div>

                                <span className="text-xs font-semibold px-2 py-1 bg-[#0a0a0f] border border-[#1e1e2e] rounded-md text-slate-400 flex-shrink-0">
                                    {task.duration}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
