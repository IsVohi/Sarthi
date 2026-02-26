"use client";

import { motion } from "framer-motion";
import { useSarthiStore } from "@/lib/store/userStore";
import {
    Share2, Download, Flame, BookCheck, ListChecks, Target,
    Trophy, Calendar
} from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const weeklyActivity = [
    { week: "W1", tasks: 5, dsa: 8 },
    { week: "W2", tasks: 5, dsa: 6 },
    { week: "W3", tasks: 2, dsa: 4 },
    { week: "W4", tasks: 0, dsa: 0 },
    { week: "W5", tasks: 0, dsa: 0 },
    { week: "W6", tasks: 0, dsa: 0 },
];

const skillGrowth = [
    { area: "APIs", start: 60, now: 85 },
    { area: "SQL", start: 30, now: 70 },
    { area: "Docker", start: 10, now: 20 },
    { area: "Redis", start: 5, now: 40 },
    { area: "Testing", start: 15, now: 20 },
    { area: "System Design", start: 10, now: 25 },
];

const milestones = [
    { label: "Started Sarthi", done: true, date: "Week 0" },
    { label: "Completed Skill Gap Analysis", done: true, date: "Week 0" },
    { label: "Week 1 — Backend Foundations", done: true, date: "Week 1" },
    { label: "Week 2 — Auth & Security", done: true, date: "Week 2" },
    { label: "First Project Review Submitted", done: true, date: "Week 2" },
    { label: "50 DSA Questions Solved", done: false, date: "Week 3" },
    { label: "Week 3 — Caching & Performance", done: false, date: "Week 3" },
    { label: "First Mock Interview", done: false, date: "Week 4" },
];

// Generate heatmap data (6 weeks × 7 days)
function generateHeatmap() {
    const data = [];
    for (let w = 0; w < 6; w++) {
        for (let d = 0; d < 7; d++) {
            let level = 0;
            if (w < 2) level = Math.floor(Math.random() * 3) + 1;
            else if (w === 2 && d < 3) level = Math.floor(Math.random() * 2) + 1;
            data.push({ week: w, day: d, level });
        }
    }
    return data;
}

export default function ProgressPage() {
    const { skillGap, learningPath } = useSarthiStore();
    const heatmap = generateHeatmap();

    const doneTasks = learningPath.weeklyPlan.reduce(
        (a, w) => a + w.dailyTasks.filter((t) => t.completed).length, 0
    );
    const daysActive = (learningPath.currentWeek - 1) * 7 + (doneTasks % 5);
    const skillsLearned = skillGap.strongSkills.length;

    const sparkData = [
        [40, 55, 50, 65, 60, 72, 68],
        [2, 3, 4, 5, 5, 6, 6],
        [3, 5, 8, 12, 14, 15, doneTasks],
        [45, 48, 52, 55, 58, 60, skillGap.readinessScore],
    ];

    const stats = [
        { label: "Days Active", value: daysActive, icon: Flame, color: "text-orange-400", spark: sparkData[0] },
        { label: "Skills Learned", value: skillsLearned, icon: BookCheck, color: "text-cyan-400", spark: sparkData[1] },
        { label: "Tasks Done", value: doneTasks, icon: ListChecks, color: "text-emerald-400", spark: sparkData[2] },
        { label: "Readiness", value: `${skillGap.readinessScore}%`, icon: Target, color: "text-indigo-400", spark: sparkData[3] },
    ];

    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    const heatColors = ["bg-[#1e1e2e]", "bg-indigo-900/60", "bg-indigo-600/70", "bg-indigo-400"];

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-6xl mx-auto pb-12 space-y-8">
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Your <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">Progress</span>
                    </h1>
                    <p className="text-[#94a3b8] text-sm">Track your growth towards Backend SDE goal</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#94a3b8] border border-[#1e1e2e] hover:border-[#6366f1]/30 rounded-xl transition-all hover:text-white">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl transition-all hover:opacity-90">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <motion.div key={i} variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 hover:border-[#6366f1]/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">{s.label}</span>
                            <s.icon className={`w-4 h-4 ${s.color} opacity-60`} />
                        </div>
                        <div className="text-3xl font-black text-white mb-3">{s.value}</div>
                        <div className="h-8">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                <LineChart data={s.spark.map((v, j) => ({ v, i: j }))}>
                                    <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Activity Heatmap */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" /> Activity Heatmap</h3>
                <div className="flex gap-6">
                    <div className="flex flex-col gap-1 text-[10px] text-[#94a3b8] pt-0.5">
                        {dayLabels.map((d) => <div key={d} className="h-4 flex items-center">{d}</div>)}
                    </div>
                    <div className="flex gap-1 flex-1 overflow-x-auto custom-scrollbar">
                        {Array.from({ length: 6 }).map((_, w) => (
                            <div key={w} className="flex flex-col gap-1">
                                {Array.from({ length: 7 }).map((_, d) => {
                                    const cell = heatmap.find((h) => h.week === w && h.day === d);
                                    return (
                                        <div key={d} className={`w-4 h-4 rounded-[3px] ${heatColors[cell?.level || 0]} transition-colors`} title={`Week ${w + 1}, Day ${d + 1}`} />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end gap-1 text-[10px] text-[#94a3b8] shrink-0">
                        Less {heatColors.map((c, i) => <div key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />)} More
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Activity Chart */}
                <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Weekly Activity</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <BarChart data={weeklyActivity}>
                                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: 12, fontSize: 12 }} />
                                <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} name="Tasks" />
                                <Bar dataKey="dsa" fill="#06b6d4" radius={[4, 4, 0, 0]} name="DSA" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Skill Growth Radar */}
                <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Skill Growth</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <RadarChart data={skillGrowth} outerRadius="70%">
                                <PolarGrid stroke="#1e1e2e" />
                                <PolarAngleAxis dataKey="area" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                                <Radar name="Start" dataKey="start" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeDasharray="4 4" />
                                <Radar name="Now" dataKey="now" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                                <Tooltip contentStyle={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: 12, fontSize: 12 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Milestone Timeline */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Milestones</h3>
                <div className="relative pl-8">
                    <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-[#1e1e2e]" />
                    <div className="space-y-6">
                        {milestones.map((m, i) => (
                            <motion.div key={i} variants={fadeUp} className="relative flex items-start gap-4">
                                <div className={`absolute -left-5 w-3 h-3 rounded-full border-2 ${m.done ? "bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-[#0a0a0f] border-[#1e1e2e]"}`} />
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${m.done ? "text-white" : "text-[#94a3b8]"}`}>{m.label}</p>
                                    <p className="text-xs text-slate-600 mt-0.5">{m.date}</p>
                                </div>
                                {m.done && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Done</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
