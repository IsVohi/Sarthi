"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

export default function TopHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                    Good morning, Vikas <span className="inline-block hover:animate-wave origin-bottom-right">👋</span>
                </h1>
                <p className="text-slate-400 text-sm">
                    You&apos;re <strong className="text-indigo-400">34% closer</strong> to your SDE Backend goal this week.
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Urgent Badge */}
                <div className="hidden md:flex items-center border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2" />
                    <span className="text-xs font-semibold text-orange-400">7 days to DB Project submission</span>
                </div>

                {/* Notifications */}
                <button className="relative w-10 h-10 rounded-full border border-[#1e1e2e] bg-[#13131f] flex items-center justify-center hover:bg-white/5 transition-colors group">
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#13131f]" />
                </button>

                {/* Mobile avatar - only shows on small screens since sidebar has desktop avatar */}
                <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#13131f] overflow-hidden">
                        <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vikas" alt="Vikas" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
