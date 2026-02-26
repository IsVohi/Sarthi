"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSarthiStore } from "@/lib/store/userStore";
import {
    LayoutDashboard,
    BrainCircuit,
    Map,
    Code2,
    MessageSquare,
    TrendingUp,
    BookOpen,
    Settings,
    CloudLightning,
    Sparkles,
    HelpCircle,
    X,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Skill Gap Analysis", href: "/dashboard/skills", icon: BrainCircuit },
    { name: "Learning Path", href: "/dashboard/path", icon: Map },
    { name: "Project Review", href: "/dashboard/project-review", icon: Code2 },
    { name: "Interview Prep", href: "/dashboard/interview-prep", icon: MessageSquare },
    { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
    { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const user = useSarthiStore((s) => s.user);
    const mobileMenuOpen = useSarthiStore((s) => s.mobileMenuOpen);
    const setMobileMenuOpen = useSarthiStore((s) => s.setMobileMenuOpen);

    const SidebarContent = (
        <div className="flex flex-col h-full bg-[#0f0f1a] border-r border-[#1e1e2e]">
            {/* Logo */}
            <div className="p-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                    <div className="relative">
                        <Sparkles className="w-8 h-8 text-[#6366f1] group-hover:text-[#06b6d4] transition-colors" />
                        <div className="absolute inset-0 bg-[#6366f1] blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] transition-all">
                        Sarthi
                    </span>
                </Link>
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* User Profile */}
            <div className="px-6 pb-5 border-b border-[#1e1e2e] mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-[2px] shrink-0">
                        <div className="w-full h-full rounded-full bg-[#13131f] flex items-center justify-center text-sm font-bold text-indigo-300">
                            {user.avatar}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">{user.name}</h3>
                        <p className="text-xs text-[#94a3b8] truncate">{user.college}</p>
                        <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                            {user.year} • {user.branch}
                        </span>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        🎯 Goal: {user.targetRole}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                                isActive
                                    ? "bg-indigo-500/10 border-l-2 border-indigo-500 text-white rounded-l-none pl-4"
                                    : "text-[#94a3b8] hover:text-white hover:bg-white/5 pl-4"
                            }`}
                        >
                            <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-indigo-400" : ""}`} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-[#1e1e2e] space-y-3">
                <a
                    href="#"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                    <HelpCircle className="w-4 h-4" />
                    Need Help? Join Discord
                </a>
                <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <CloudLightning className="w-4 h-4 text-[#06b6d4]" />
                    <span className="text-[11px] font-semibold text-[#06b6d4]">Powered by AWS Bedrock</span>
                </div>
                <p className="text-center text-[10px] text-slate-600 font-medium">v1.0 — AI for Bharat 2026</p>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar (Static) */}
            <aside className="w-64 h-screen sticky top-0 hidden md:flex shrink-0">
                {SidebarContent}
            </aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 z-50 md:hidden shadow-2xl border-r border-[#1e1e2e]"
                        >
                            {SidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
