"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Flame, CheckCircle2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = to;
        if (start === end) return;

        const totalDuration = 1500;
        const incrementTime = (totalDuration / end);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [to]);

    return <span>{count}{suffix}</span>;
}

export default function StatsRow() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {/* Card 1: Skills Mastered */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 hover:-translate-y-1 transition-transform group hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-500/30">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Skills Mastered</p>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f8fafc] to-[#94a3b8]">
                            <AnimatedNumber to={12} />
                        </h3>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                        <BrainCircuit className="w-5 h-5 text-indigo-400" />
                    </div>
                </div>
                <div className="flex items-center text-xs font-semibold text-emerald-400">
                    <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded mr-1.5">+3</span>
                    this week
                </div>
            </motion.div>

            {/* Card 2: Learning Streak */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 hover:-translate-y-1 transition-transform group hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-orange-500/30">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Learning Streak</p>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                                <AnimatedNumber to={7} />
                            </h3>
                            <span className="text-xl">🔥</span>
                        </div>
                    </div>
                    <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                        <Flame className="w-5 h-5 text-orange-400" />
                    </div>
                </div>
                <div className="text-xs font-semibold text-orange-400/80">
                    Days. Keep it up!
                </div>
            </motion.div>

            {/* Card 3: Tasks Completed */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 hover:-translate-y-1 transition-transform group hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-500/30">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">This Week&apos;s Tasks</p>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                            <AnimatedNumber to={24} /> <span className="text-lg text-slate-500 font-medium">/ 30</span>
                        </h3>
                    </div>
                    <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                </div>
                <div className="w-full h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden mt-2">
                    <motion.div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </motion.div>

            {/* Card 4: Profile Completion */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 hover:-translate-y-1 transition-transform group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2 relative z-10">
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1">Profile Complete</p>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#06b6d4]">
                            <AnimatedNumber to={68} suffix="%" />
                        </h3>
                    </div>
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* SVG Progress Ring */}
                        <svg className="w-12 h-12 transform -rotate-90 absolute inset-0">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#1e1e2e]" />
                            <motion.circle
                                cx="24" cy="24" r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={126} // 2 * pi * 20
                                initial={{ strokeDashoffset: 126 }}
                                whileInView={{ strokeDashoffset: 126 - (126 * 68) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-[#06b6d4]"
                                strokeLinecap="round"
                            />
                        </svg>
                        <Trophy className="w-4 h-4 text-[#06b6d4]" />
                    </div>
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-3 relative z-10">
                    Add <span className="text-white">GitHub</span> to reach 100%
                </div>
            </motion.div>

        </motion.div>
    );
}
