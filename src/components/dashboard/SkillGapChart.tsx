"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSarthiStore } from "@/lib/store/userStore";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const skillData = [
    { name: "Node.js", current: 85, required: 90, priority: "low" },
    { name: "Docker", current: 30, required: 85, priority: "high" },
    { name: "System Design", current: 40, required: 80, priority: "high" },
    { name: "AWS Basics", current: 50, required: 75, priority: "medium" },
    { name: "DSA", current: 75, required: 95, priority: "medium" },
    { name: "REST API", current: 65, required: 90, priority: "medium" },
];

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

interface CustomTooltipProps {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card bg-[#0f0f1a]/90 border border-[#1e1e2e] p-3 rounded-lg shadow-xl backdrop-blur-md">
                <p className="text-white font-medium mb-2">{label}</p>
                <p className="text-sm text-indigo-400">Current Level: <span className="font-bold text-white">{payload[0].value}%</span></p>
                <p className="text-sm text-slate-400">Required Role Level: <span className="font-bold text-white">{payload[1]?.value}%</span></p>
            </div>
        );
    }
    return null;
};

export default function SkillGapChart() {
    const { skillGap } = useSarthiStore();

    if (!skillGap.analyzed) {
        return (
            <motion.div
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-8 mb-8 flex flex-col items-center justify-center text-center min-h-[300px]"
            >
                <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Discover Your Skill Gap</h2>
                <p className="text-slate-400 max-w-md mb-6">
                    Our AI will analyze your current skills against industry requirements to build a personalized mastery plan.
                </p>
                <Link
                    href="/dashboard/skills"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
                >
                    Start Analysis <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        );
    }

    // Dynamic Chart Data mapping from store
    const dynamicSkillData = [
        ...skillGap.strongSkills.map(s => ({ name: s, current: 85, required: 90, priority: "low" })),
        ...skillGap.missingSkills.map(m => ({
            name: m.skill,
            current: 30,
            required: 85,
            priority: m.priority
        }))
    ].slice(0, 6);

    const highPriorityCount = skillGap.missingSkills.filter(m => m.priority === 'high').length;
    const medPriorityCount = skillGap.missingSkills.filter(m => m.priority === 'medium').length;

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
            {/* Left Column: Skill Gap Chart (2/3 width) */}
            <motion.div variants={staggerItem} className="lg:col-span-2 glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Your Skill Gap Report</h2>
                    <Link href="/dashboard/skills" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 rounded-md transition-colors border border-indigo-500/20">
                        <RefreshCw className="w-3.5 h-3.5" /> Re-analyze
                    </Link>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart
                            data={dynamicSkillData}
                            layout="vertical"
                            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
                            barGap={4}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e1e2e" />
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                width={100}
                            />
                            <Tooltip cursor={{ fill: '#1e1e2e', opacity: 0.4 }} content={<CustomTooltip />} />
                            <Bar dataKey="current" name="Your Level" radius={[0, 4, 4, 0]} barSize={12}>
                                {dynamicSkillData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.priority === 'high' ? '#ef4444' : entry.priority === 'medium' ? '#f59e0b' : '#10b981'} />
                                ))}
                            </Bar>
                            <Bar dataKey="required" name="Required" fill="#1e1e2e" radius={[0, 4, 4, 0]} barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Priority Badges Below */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#1e1e2e]">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs text-slate-400">High Priority: <strong className="text-white">{highPriorityCount} Skills</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span className="text-xs text-slate-400">Medium: <strong className="text-white">{medPriorityCount} Skills</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs text-slate-400">Mastered: <strong className="text-white">{skillGap.strongSkills.length} Skills</strong></span>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: AI Insight (1/3 width) */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 relative overflow-hidden flex flex-col">
                {/* Top cyan gradient border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] to-[#6366f1]" />

                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#06b6d4]" />
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        This Week&apos;s Focus
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]"></span>
                        </span>
                    </h2>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                    Based on your profile, focus on <strong className="text-white">{skillGap.missingSkills[0]?.skill || "your fundamentals"}</strong> this week. Focus on closing this specific gap to drastically improve your readiness score.
                </p>

                <div className="space-y-4 mt-auto">
                    <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Suggested Resource</span>
                        <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] hover:border-[#6366f1] transition-colors group">
                            <span className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                                📺 Docker in 1 Hour — FCC
                            </span>
                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        </a>
                    </div>

                    <div className="text-[10px] text-slate-500 flex justify-center pt-2">
                        Generated by AWS Bedrock Claude 3
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
