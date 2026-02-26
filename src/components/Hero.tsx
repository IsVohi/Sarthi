"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, Users, Sparkles, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#6366f1]/20 to-[#8b5cf6]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[#06b6d4]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Floating Particles */}
            {mounted && [...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white/20 rounded-full z-0"
                    initial={{
                        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                        opacity: Math.random() * 0.5 + 0.1
                    }}
                    animate={{
                        y: [null, Math.random() * -100 - 50],
                        opacity: [null, Math.random() * 0.5 + 0.1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center w-full"
                >
                    {/* Tagline */}
                    <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span className="text-xs font-medium text-slate-300">AWS Bedrock Powered</span>
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                        <motion.div variants={itemVariants} className="text-white">Your AI Career</motion.div>
                        <motion.div variants={itemVariants} className="text-white mt-1">Navigator for</motion.div>
                        <motion.div variants={itemVariants} className="mt-2 text-gradient-primary">
                            Bharat
                        </motion.div>
                    </h1>

                    {/* Subtext */}
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                        Sarthi bridges the gap between outdated college curriculum and industry expectations — with personalized AI guidance, powered by AWS Bedrock.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full justify-center">
                        <Link href="/onboarding" className="flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] w-full sm:w-auto justify-center group text-lg">
                            Analyze My Skills
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#how-it-works" className="flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all w-full sm:w-auto justify-center text-lg">
                            <Play className="w-5 h-5" />
                            See How It Works
                        </a>
                    </motion.div>

                    {/* Badges */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <Users className="w-4 h-4 text-[#06b6d4]" />
                            <span className="text-sm font-medium text-slate-300">10L+ Students</span>
                        </div>
                        <Link href="#features" className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                            <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                            <span className="text-sm font-medium text-slate-300">4 AI Features</span>
                        </Link>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <Cloud className="w-4 h-4 text-[#6366f1]" />
                            <span className="text-sm font-medium text-slate-300">AWS Powered</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
