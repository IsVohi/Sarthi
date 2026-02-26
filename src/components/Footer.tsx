"use client";

import { Sparkles, Cloud, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative bg-[#0a0a0f] pt-16 pb-8 border-t border-transparent z-10">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] opacity-50" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">

                    {/* Logo Left */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                            <div className="absolute inset-0 bg-[#6366f1] blur-md opacity-50 rounded-full"></div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] transition-all">Sarthi</span>
                    </Link>

                    {/* Links Center */}
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <Link href="/onboarding" className="hover:text-white transition-colors">Get Started</Link>
                    </div>

                    {/* Social Icons Right */}
                    <div className="flex items-center gap-4 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-slate-500">
                    <p>Built for AI for Bharat Hackathon 2026</p>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        <Cloud className="w-3.5 h-3.5 text-[#6366f1]" />
                        <span className="font-medium text-slate-300">Powered by AWS Bedrock</span>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Sarthi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
