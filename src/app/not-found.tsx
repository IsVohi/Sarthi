"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#6366f1]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            {/* Noise overlay removed */}

            <div className="max-w-md w-full relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-[#6366f1] blur-xl opacity-30 rounded-full animate-pulse" />
                    <div className="w-24 h-24 bg-[#13131f] border border-[#1e1e2e] rounded-3xl flex items-center justify-center relative shadow-2xl">
                        <Sparkles className="w-12 h-12 text-[#6366f1]" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-white mb-2">Lost in the Matrix</h2>
                    <p className="text-[#94a3b8] mb-8 leading-relaxed max-w-sm mx-auto">
                        Looks like our AI couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <button onClick={() => window.history.back()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#1e1e2e] bg-[#13131f] text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                        <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:opacity-90 transition-opacity font-medium shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                            <Home className="w-4 h-4" /> Dashboard
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
