"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronRight, Timer, Menu } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";
import CommandPalette from "@/components/layout/CommandPalette";
import NotificationDrawer from "@/components/layout/NotificationDrawer";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/skills": "Skill Gap Analysis",
    "/dashboard/path": "Learning Path",
    "/dashboard/project-review": "Project Review",
    "/dashboard/interview-prep": "Interview Prep",
    "/dashboard/progress": "Progress",
    "/dashboard/resources": "Resources",
    "/dashboard/settings": "Settings",
};

export default function TopBar() {
    const pathname = usePathname();
    const user = useSarthiStore((s) => s.user);
    const notifications = useSarthiStore((s) => s.notifications);
    const setMobileMenuOpen = useSarthiStore((s) => s.setMobileMenuOpen);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const [paletteOpen, setPaletteOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const pageTitle = pageTitles[pathname] || "Dashboard";

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-16 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1e1e2e] sticky top-0 z-40 flex items-center justify-between px-6 gap-4 shrink-0"
            >
                {/* Left: Breadcrumb & Mobile Menu */}
                <div className="flex items-center gap-3 text-sm min-w-0 shrink-0">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="text-[#94a3b8] hidden sm:inline">Dashboard</span>
                    {pageTitle !== "Dashboard" && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
                            <span className="text-white font-semibold truncate">{pageTitle}</span>
                        </>
                    )}
                    {pageTitle === "Dashboard" && (
                        <span className="text-white font-semibold sm:hidden">Dashboard</span>
                    )}
                </div>

                {/* Center: Search */}
                <button
                    onClick={() => setPaletteOpen(true)}
                    className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl text-sm text-[#94a3b8] hover:border-[#6366f1]/30 hover:text-white transition-all max-w-md w-full"
                >
                    <Search className="w-4 h-4 shrink-0" />
                    <span className="text-left flex-1 truncate">Search features, questions, resources...</span>
                    <kbd className="hidden lg:inline text-[10px] font-mono bg-[#1e1e2e] px-1.5 py-0.5 rounded text-slate-500 border border-slate-700">⌘K</kbd>
                </button>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Countdown */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full">
                        <Timer className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-[11px] font-bold text-red-400">7 days left</span>
                    </div>

                    {/* Notification Bell */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="relative p-2 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-[1.5px] cursor-pointer">
                        <div className="w-full h-full rounded-full bg-[#13131f] flex items-center justify-center text-xs font-bold text-indigo-300">
                            {user.avatar}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Overlays */}
            <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
            <NotificationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
}
