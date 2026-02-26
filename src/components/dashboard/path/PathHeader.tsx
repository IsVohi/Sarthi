"use client";

import { RefreshCw, Download } from "lucide-react";

export default function PathHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Your Learning Path
                </h1>
                <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-medium tracking-wide">
                    Personalized for Backend SDE Goal
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/10">
                    <RefreshCw className="w-4 h-4" /> Regenerate Path
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#06b6d4] bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 rounded-xl transition-colors border border-[#06b6d4]/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <Download className="w-4 h-4" /> Download PDF
                </button>
            </div>
        </div>
    );
}
