"use client";

import { motion } from "framer-motion";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend
} from "recharts";
import { Plus, Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

import { useSarthiStore } from "@/lib/store/userStore";

export default function AnalyzerResults() {
    const { user, skillGap } = useSarthiStore();
    const [addedSkills, setAddedSkills] = useState<Set<number>>(new Set());

    const handleAddSkill = (index: number) => {
        const newAdded = new Set(addedSkills);
        if (newAdded.has(index)) {
            newAdded.delete(index);
        } else {
            newAdded.add(index);
        }
        setAddedSkills(newAdded);
    };

    if (!skillGap.analyzed) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-[#13131f] border border-[#1e1e2e] rounded-2xl min-h-[400px]">
                <Sparkles className="w-16 h-16 text-indigo-500/50 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Discover Your Skill Gaps</h3>
                <p className="text-slate-400 max-w-sm">
                    Fill out the form above and hit "Analyze My Skills" to generate your personalized career readiness report.
                </p>
            </div>
        );
    }

    // Dynamically generate chart data based on the AI response
    // Give strong skills high marks (75-95) and missing skills low marks (20-40)
    const allChartSkills = [...skillGap.strongSkills, ...skillGap.missingSkills.map(m => m.skill)].slice(0, 6);

    // Fallback if AI didn't return enough generic skills
    const baseSubjects = ['DSA', 'System Design', 'Backend', 'DevOps', 'Databases', 'CS Fundamentals'];
    const finalSubjects = allChartSkills.length >= 4 ? allChartSkills : baseSubjects;

    const radarData = finalSubjects.map((subject) => {
        const isStrong = skillGap.strongSkills.includes(subject);
        return {
            subject: subject.substring(0, 15) + (subject.length > 15 ? '...' : ''), // truncate long names
            A: isStrong ? Math.floor(Math.random() * 20) + 75 : Math.floor(Math.random() * 30) + 20,
            B: Math.floor(Math.random() * 15) + 85, // Target is always high
            fullMark: 100
        };
    });

    const progressBars = finalSubjects.map(subject => {
        const isStrong = skillGap.strongSkills.includes(subject);
        return {
            name: subject,
            coverage: isStrong ? Math.floor(Math.random() * 20) + 75 : Math.floor(Math.random() * 30) + 20
        };
    }).sort((a, b) => b.coverage - a.coverage);

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Result Card 1 — Summary Header */}
            <motion.div variants={staggerItem} className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                {/* SVG Definitions for Gradients */}
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="flex items-center gap-6">
                    <div className="text-6xl drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        📚
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            Current Level: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{skillGap.currentLevel}</span>
                        </h2>
                        <ul className="space-y-1 text-slate-300">
                            <li><strong className="text-slate-400 font-medium">Target:</strong> {user.targetRole}</li>
                            <li><strong className="text-slate-400 font-medium">Estimated time to job-ready:</strong> {skillGap.estimatedWeeks} weeks</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-28 h-28 transform -rotate-90 absolute inset-0">
                            {/* Background Circle */}
                            <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#1e1e2e]" />
                            {/* Foreground Circle (Score) */}
                            <motion.circle
                                cx="56" cy="56" r="48"
                                stroke="url(#score-gradient)"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={301.59} // 2 * pi * 48
                                initial={{ strokeDashoffset: 301.59 }}
                                animate={{ strokeDashoffset: 301.59 - (301.59 * 65) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="text-center">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#06b6d4]">{skillGap.readinessScore}%</span>
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 mt-2 tracking-wide uppercase">Readiness Score</span>
                </div>
            </motion.div>

            {/* Result Card 2 — Skills Breakdown */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">Skills Coverage</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Radar Chart */}
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#1e1e2e" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                {/* Hide radius axis for cleaner look */}
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Your Skills"
                                    dataKey="A"
                                    stroke="#6366f1"
                                    fill="#6366f1"
                                    fillOpacity={0.4}
                                />
                                <Radar
                                    name="Required"
                                    dataKey="B"
                                    stroke="#06b6d4"
                                    strokeDasharray="5 5"
                                    fill="transparent"
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px' }}
                                    formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Right: Progress Bars List */}
                    <div className="space-y-4">
                        {progressBars.map((skill) => {
                            // Determine color based on threshold
                            let colorClass = "from-[#6366f1] to-[#8b5cf6]"; // Indigo (40-70%)
                            if (skill.coverage > 70) colorClass = "from-emerald-400 to-teal-500"; // Green
                            else if (skill.coverage < 40) colorClass = "from-orange-400 to-red-500"; // Orange/Red

                            return (
                                <div key={skill.name}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                                        <span className="text-xs font-semibold text-white">{skill.coverage}% covered</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${colorClass}`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.coverage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* Result Card 3 — Missing Skills Table */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-[#1e1e2e]">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        Skills You Need to Learn
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                            {skillGap.missingSkills.length}
                        </span>
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            {skillGap.missingSkills.map((mSkill, idx) => (
                                <tr
                                    key={idx}
                                    className={`group transition-colors hover:bg-indigo-500/5 ${idx % 2 === 0 ? 'bg-[#0f0f1a]' : 'bg-transparent'}`}
                                >
                                    <td className="p-4 pl-6 align-top w-8 text-center" title={`Priority: ${mSkill.priority}`}>
                                        {mSkill.priority === "high" ? "🔴" : mSkill.priority === "medium" ? "🟡" : "🟢"}
                                    </td>
                                    <td className="p-4 align-top">
                                        <div className="font-bold text-white mb-1 leading-tight">{mSkill.skill}</div>
                                        <div className="text-sm text-slate-400 leading-snug max-w-lg">{mSkill.reason}</div>
                                    </td>
                                    <td className="p-4 align-top w-32">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 whitespace-nowrap">
                                            ~{mSkill.estimatedWeeks} wks
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6 align-top w-36 text-right">
                                        <button
                                            onClick={() => handleAddSkill(idx)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors border w-full justify-center ${addedSkills.has(idx)
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                                : "bg-transparent text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/10"
                                                }`}
                                        >
                                            {addedSkills.has(idx) ? (
                                                <><Check className="w-3.5 h-3.5" /> Added</>
                                            ) : (
                                                <><Plus className="w-3.5 h-3.5" /> Add to Path</>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Result Card 4 — Action CTA */}
            <motion.div variants={staggerItem} className="bg-gradient-to-r from-[#6366f1]/20 to-[#06b6d4]/20 border border-[#6366f1]/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                    <Sparkles className="w-8 h-8 text-indigo-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to close these gaps?</h2>

                    <Link href="/dashboard/path" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#06b6d4] hover:opacity-90 text-white rounded-full px-8 py-4 text-lg font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
                        Generate My Learning Path <ArrowRight className="w-5 h-5" />
                    </Link>

                    <p className="text-slate-400 text-sm mt-6">
                        AWS Bedrock will create a personalized week-by-week plan based on this exact analysis.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
