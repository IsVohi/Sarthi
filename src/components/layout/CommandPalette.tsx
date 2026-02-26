"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, LayoutDashboard, BrainCircuit, Map, Code2, MessageSquare,
    TrendingUp, BookOpen, Settings, Sparkles, Zap, ArrowRight,
} from "lucide-react";

interface PaletteItem {
    id: string;
    label: string;
    category: "pages" | "actions";
    icon: React.ReactNode;
    href?: string;
    action?: () => void;
}

const allItems: PaletteItem[] = [
    { id: "p1", label: "Dashboard", category: "pages", icon: <LayoutDashboard className="w-4 h-4" />, href: "/dashboard" },
    { id: "p2", label: "Skill Gap Analysis", category: "pages", icon: <BrainCircuit className="w-4 h-4" />, href: "/dashboard/skills" },
    { id: "p3", label: "Learning Path", category: "pages", icon: <Map className="w-4 h-4" />, href: "/dashboard/path" },
    { id: "p4", label: "Project Review", category: "pages", icon: <Code2 className="w-4 h-4" />, href: "/dashboard/project-review" },
    { id: "p5", label: "Interview Prep", category: "pages", icon: <MessageSquare className="w-4 h-4" />, href: "/dashboard/interview-prep" },
    { id: "p6", label: "Progress Tracker", category: "pages", icon: <TrendingUp className="w-4 h-4" />, href: "/dashboard/progress" },
    { id: "p7", label: "Resources", category: "pages", icon: <BookOpen className="w-4 h-4" />, href: "/dashboard/resources" },
    { id: "p8", label: "Settings", category: "pages", icon: <Settings className="w-4 h-4" />, href: "/dashboard/settings" },
    { id: "a1", label: "Analyze My Skills", category: "actions", icon: <Sparkles className="w-4 h-4 text-indigo-400" />, href: "/dashboard/skills" },
    { id: "a2", label: "Generate Learning Path", category: "actions", icon: <Zap className="w-4 h-4 text-cyan-400" />, href: "/dashboard/path" },
    { id: "a3", label: "Submit Project for Review", category: "actions", icon: <Code2 className="w-4 h-4 text-purple-400" />, href: "/dashboard/project-review" },
    { id: "a4", label: "Start Mock Interview", category: "actions", icon: <MessageSquare className="w-4 h-4 text-emerald-400" />, href: "/dashboard/interview-prep" },
];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = query.trim()
        ? allItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
        : allItems;

    const grouped = {
        pages: filtered.filter((i) => i.category === "pages"),
        actions: filtered.filter((i) => i.category === "actions"),
    };
    const flatList = [...grouped.pages, ...grouped.actions];

    // Cmd+K global shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (open) onClose();
                else {
                    // parent will open via state
                }
            }
            if (e.key === "Escape" && open) onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIdx(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const select = useCallback(
        (item: PaletteItem) => {
            if (item.href) router.push(item.href);
            if (item.action) item.action();
            onClose();
        },
        [router, onClose]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, flatList.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && flatList[activeIdx]) {
            e.preventDefault();
            select(flatList[activeIdx]);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[90] w-full max-w-lg"
                    >
                        <div className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl shadow-2xl overflow-hidden">
                            {/* Input */}
                            <div className="flex items-center gap-3 px-4 border-b border-[#1e1e2e]">
                                <Search className="w-5 h-5 text-[#94a3b8] shrink-0" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search pages, actions..."
                                    className="w-full bg-transparent py-4 text-sm text-white placeholder:text-[#94a3b8] outline-none"
                                />
                                <kbd className="text-[10px] font-mono bg-[#1e1e2e] px-1.5 py-0.5 rounded text-slate-500 border border-slate-700 shrink-0">ESC</kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
                                {flatList.length === 0 && (
                                    <p className="text-center text-[#94a3b8] text-sm py-8">No results found.</p>
                                )}

                                {grouped.pages.length > 0 && (
                                    <div className="mb-2">
                                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest px-3 py-1.5">Pages</p>
                                        {grouped.pages.map((item) => {
                                            const idx = flatList.indexOf(item);
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => select(item)}
                                                    onMouseEnter={() => setActiveIdx(idx)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                                        idx === activeIdx
                                                            ? "bg-indigo-500/10 text-white"
                                                            : "text-[#94a3b8] hover:text-white"
                                                    }`}
                                                >
                                                    {item.icon}
                                                    <span className="flex-1 text-left">{item.label}</span>
                                                    {idx === activeIdx && <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {grouped.actions.length > 0 && (
                                    <div>
                                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest px-3 py-1.5">Actions</p>
                                        {grouped.actions.map((item) => {
                                            const idx = flatList.indexOf(item);
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => select(item)}
                                                    onMouseEnter={() => setActiveIdx(idx)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                                        idx === activeIdx
                                                            ? "bg-indigo-500/10 text-white"
                                                            : "text-[#94a3b8] hover:text-white"
                                                    }`}
                                                >
                                                    {item.icon}
                                                    <span className="flex-1 text-left">{item.label}</span>
                                                    {idx === activeIdx && <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
