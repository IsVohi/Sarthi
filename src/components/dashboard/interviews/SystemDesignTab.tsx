"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Activity, LayoutDashboard, ChevronDown } from "lucide-react";

import { useSarthiStore } from "@/lib/store/userStore";

export default function SystemDesignTab() {
    const { interviewPrep } = useSarthiStore();
    const designTopics = interviewPrep.systemDesign;

    const [expandedIdea, setExpandedIdea] = useState<string | null>(null);

    return (
        <div className="max-w-4xl mx-auto pb-8">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-8 flex items-start gap-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0 mt-1">
                    <Server className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <h3 className="font-bold text-indigo-100 mb-1">System Design Approach</h3>
                    <p className="text-sm text-indigo-200/80 leading-relaxed">
                        In backend SDE interviews, you are expected to drive the discussion. Always start with requirements gathering (Functional & Non-Functional), then move to capacity estimation, high-level design, and finally deep dive into specific components like database choice and caching.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {designTopics.length === 0 ? (
                    <div className="text-center p-8 text-slate-400">Loading AI generated system design questions...</div>
                ) : (
                    designTopics.map((topic, idx) => {
                        const isExpanded = expandedIdea === topic.topic;
                        // Assigning alternating colors
                        const colors = ["indigo", "emerald", "amber"];
                        const themeColor = colors[idx % colors.length];

                        return (
                            <div key={idx} className={`glass-card bg-[#13131f] border transition-all duration-300 rounded-2xl overflow-hidden ${isExpanded ? 'border-slate-600 shadow-lg' : 'border-[#1e1e2e] hover:border-slate-700'}`}>
                                <button
                                    onClick={() => setExpandedIdea(isExpanded ? null : topic.topic)}
                                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] flex items-center justify-center shrink-0 shadow-inner`}>
                                            <Server className={`w-5 h-5 text-${themeColor}-400`} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">{topic.topic}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase bg-${themeColor}-500/10 text-${themeColor}-400 border border-${themeColor}-500/20`}>
                                                System Design
                                            </span>
                                        </div>
                                    </div>
                                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0 border-t border-[#1e1e2e] bg-[#0a0a0f]/30 mt-2 flex flex-col gap-6">

                                                {/* Details */}
                                                <div className="mt-4">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Problem Statement</h4>
                                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{topic.question}</p>

                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Discussion Points</h4>
                                                    <ul className="space-y-3">
                                                        {topic.keyPoints?.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500" />
                                                                <span className="text-slate-300 text-sm">{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-4 border-t border-[#1e1e2e]">
                                                    <button className="w-full py-2.5 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-xl text-sm font-medium text-slate-300 transition-all">
                                                        Start AI Mock Interview for this System
                                                    </button>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
