"use client";

import { motion } from "framer-motion";
import { Target, Flame, BrainCircuit, ShieldAlert } from "lucide-react";

export default function InterviewHeader() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]">Prep Coach</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Personalized preparation for Backend SDE roles at Indian product companies, powered by AWS Bedrock.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                        <Target className="w-4 h-4" /> Backend SDE
                    </div>
                    <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        Change Role
                    </button>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stats Card 1 */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Questions Practiced</h3>
                        <BrainCircuit className="w-5 h-5 text-emerald-400 opacity-50" />
                    </div>
                    <div className="flex items-end gap-3 mb-3">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            47
                        </span>
                        <span className="text-sm text-slate-500 mb-1 font-medium">/ 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "47%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-emerald-500" 
                        />
                    </div>
                </motion.div>

                {/* Stats Card 2 */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Mock Sessions</h3>
                        <div className="flex gap-1">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mt-auto">
                        <span className="text-4xl font-black text-white">3</span>
                        <span className="text-sm text-slate-400 font-medium">sessions completed</span>
                    </div>
                </motion.div>

                {/* Stats Card 3 */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card bg-[#13131f] border border-[#red-500/20] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Weak Areas</h3>
                        <ShieldAlert className="w-5 h-5 text-amber-500 opacity-80" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-3 relative z-10">
                        <span className="text-4xl font-black text-amber-400">2</span>
                        <span className="text-sm text-amber-500/80 font-medium tracking-wide pb-1">topics</span>
                    </div>
                    <div className="flex gap-2 relative z-10">
                        <span className="bg-[#0a0a0f] border border-[#1e1e2e] text-xs font-semibold px-2 py-1 rounded text-slate-300">System Design</span>
                        <span className="bg-[#0a0a0f] border border-[#1e1e2e] text-xs font-semibold px-2 py-1 rounded text-slate-300">DP</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
