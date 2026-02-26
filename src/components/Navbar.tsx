"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                        <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                        <div className="absolute inset-0 bg-[#6366f1] blur-md opacity-50 rounded-full"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] transition-all">Sarthi</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                    <a href="#impact" className="hover:text-white transition-colors">Impact</a>
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Link href="/onboarding" className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
