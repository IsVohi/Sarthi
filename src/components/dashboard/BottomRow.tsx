"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import Link from "next/link";
import { useSarthiStore } from "@/lib/store/userStore";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BottomRow() {
    const { projectReviews, interviewPrep } = useSarthiStore();

    // Mapping prep data for donut chart
    const prepData = [
        { name: "DSA", value: interviewPrep.dsaQuestions.length || 20, color: "#6366f1" },
        { name: "System Design", value: interviewPrep.systemDesign.length || 10, color: "#8b5cf6" },
        { name: "Behavioral", value: interviewPrep.behavioral.length || 5, color: "#06b6d4" },
        { name: "Remaining", value: Math.max(0, 100 - (interviewPrep.dsaQuestions.length + interviewPrep.systemDesign.length + interviewPrep.behavioral.length)), color: "#1e1e2e" },
    ];

    const categoryProgress = [
        { name: "Arrays & Strings", progress: interviewPrep.strongAreas.includes("Arrays") ? 70 : 30, color: "bg-emerald-500" },
        { name: "System Design", progress: interviewPrep.strongAreas.includes("System Design") ? 60 : 20, color: "bg-indigo-500" },
        { name: "Behavioral", progress: 40, color: "bg-cyan-500" },
    ];

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12"
        >
            {/* Recent Project Reviews */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6 border-b border-[#1e1e2e] pb-4">
                    <h2 className="text-xl font-bold text-white">Project Reviews</h2>
                    <Link href="/dashboard/projects" className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 rounded-full transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        Submit Project <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {projectReviews.length > 0 ? (
                        projectReviews.slice(0, 2).map((review) => (
                            <div key={review.id} className="bg-[#0f0f1a] border border-[#1e1e2e] hover:border-indigo-500/30 transition-colors rounded-xl p-4 group">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">{review.projectName}</h3>
                                        <p className="text-xs text-slate-500 mt-1">Status: {review.status}</p>
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-md text-sm font-bold flex items-center gap-1.5 ${review.overallScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                        review.overallScore >= 60 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                        {review.overallScore}/100
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {review.techStack.map((tech, idx) => (
                                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 bg-indigo-500/10 text-indigo-400">
                                            {tech}
                                        </span>
                                    ))}
                                    {review.issues.length > 0 && (
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 bg-red-500/10 text-red-400">
                                            <AlertTriangle className="w-3 h-3" /> {review.issues.length} Issues
                                        </span>
                                    )}
                                </div>

                                <Link href={`/dashboard/projects`} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2">
                                    View Full Review <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-slate-500 text-sm">No project reviews yet.</p>
                            <p className="text-xs text-slate-600 mt-1">Submit your first project for AI analysis!</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Interview Prep Progress */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6 border-b border-[#1e1e2e] pb-4">
                    <h2 className="text-xl font-bold text-white">Interview Prep</h2>
                    <Link href="/dashboard/interviews" className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors">
                        Start Session <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Donut Chart */}
                    <div className="relative w-40 h-40 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                            <PieChart>
                                <Pie
                                    data={prepData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1500}
                                >
                                    {prepData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0f0f1a', borderColor: '#1e1e2e', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xl font-bold text-white leading-tight">
                                {interviewPrep.questionsAttempted}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide">Questions</span>
                        </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="flex-grow w-full space-y-4">
                        {categoryProgress.map((cat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-semibold text-slate-300">{cat.name}</span>
                                    <span className="text-xs font-bold text-white">{cat.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${cat.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${cat.progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
