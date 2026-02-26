"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Activity, LayoutDashboard, ChevronDown } from "lucide-react";

const designTopics = [
    {
        id: "url-shortener",
        icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
        title: "Design a URL Shortener (e.g. TinyURL)",
        difficulty: "Medium",
        color: "bg-indigo-500",
        components: [
            "API Design (POST /create, GET /:id)",
            "Hash generation (Base62 encoding)",
            "Database schema (Relational vs NoSQL)",
            "Caching layer (Redis) for fast redirects",
            "Rate limiting & Analytics"
        ],
        mistakes: [
            "Not considering collision resolution in hash generation",
            "Choosing an SQL DB without considering horizontal scaling"
        ]
    },
    {
        id: "messaging",
        icon: <Activity className="w-5 h-5 text-emerald-400" />,
        title: "Design a Chat System (e.g. WhatsApp)",
        difficulty: "Hard",
        color: "bg-emerald-500",
        components: [
            "Real-time connections (WebSockets)",
            "Message ordering and delivery semantics",
            "Database schema for 1:1 and Group chats",
            "Online presence mapping",
            "Push notifications"
        ],
        mistakes: [
            "Polling instead of persistent connections",
            "Single point of failure in WebSocket managers"
        ]
    },
    {
        id: "ecom",
        icon: <Database className="w-5 h-5 text-amber-400" />,
        title: "Design an E-commerce Checkout System",
        difficulty: "Hard",
        color: "bg-amber-500",
        components: [
            "Inventory reservation (Distributed locks)",
            "Payment gateway integration (Idempotency)",
            "Order state machine",
            "Handling flash sales (Queueing)"
        ],
        mistakes: [
            "Lack of idempotency keys causing double charges",
            "Overselling inventory during high traffic"
        ]
    }
];

export default function SystemDesignTab() {
    const [expandedIdea, setExpandedIdea] = useState<string | null>(designTopics[0].id);

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
                {designTopics.map((topic) => {
                    const isExpanded = expandedIdea === topic.id;

                    return (
                        <div key={topic.id} className={`glass-card bg-[#13131f] border transition-all duration-300 rounded-2xl overflow-hidden ${isExpanded ? 'border-slate-600 shadow-lg' : 'border-[#1e1e2e] hover:border-slate-700'}`}>
                            <button 
                                onClick={() => setExpandedIdea(isExpanded ? null : topic.id)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] flex items-center justify-center shrink-0 shadow-inner`}>
                                        {topic.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">{topic.title}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${topic.color}/10 text-${topic.color.split('-')[1]}-400 border border-${topic.color.split('-')[1]}-500/20`}>
                                            {topic.difficulty}
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
                                        <div className="p-5 pt-0 border-t border-[#1e1e2e] bg-[#0a0a0f]/30 mt-2 flex flex-col md:flex-row gap-6">
                                            
                                            {/* Key Components to discuss */}
                                            <div className="flex-1 mt-4">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Components to Discuss</h4>
                                                <ul className="space-y-3">
                                                    {topic.components.map((comp, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500" />
                                                            <span className="text-slate-300 text-sm">{comp}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Common Mistakes */}
                                            <div className="flex-1 md:border-l border-[#1e1e2e] md:pl-6 mt-4">
                                                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Common Pitfalls</h4>
                                                <ul className="space-y-3">
                                                    {topic.mistakes.map((mistake, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                                            <span className="text-slate-400 text-sm">{mistake}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                <button className="mt-6 w-full py-2.5 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-xl text-sm font-medium text-slate-300 transition-all">
                                                    Start Mock Interview for this System
                                                </button>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
