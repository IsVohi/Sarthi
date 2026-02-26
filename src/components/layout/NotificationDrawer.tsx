"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Info, AlertTriangle, Bell } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

const typeIcon: Record<string, React.ReactNode> = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
};

export default function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
    const notifications = useSarthiStore((s) => s.notifications);
    const markNotificationRead = useSarthiStore((s) => s.markNotificationRead);
    const markAllNotificationsRead = useSarthiStore((s) => s.markAllNotificationsRead);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[80] w-80 h-full bg-[#0f0f1a] border-l border-[#1e1e2e] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-[#1e1e2e]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Bell className="w-5 h-5 text-indigo-400" /> Notifications
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={markAllNotificationsRead}
                                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Mark all read
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <Bell className="w-10 h-10 text-slate-600 mb-3" />
                                    <p className="text-[#94a3b8] text-sm">No notifications yet</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-[#1e1e2e]">
                                    {notifications.map((n) => (
                                        <button
                                            key={n.id}
                                            onClick={() => markNotificationRead(n.id)}
                                            className={`w-full text-left p-4 flex gap-3 hover:bg-white/[0.02] transition-colors ${
                                                !n.read ? "bg-indigo-500/[0.03]" : ""
                                            }`}
                                        >
                                            <div className="mt-0.5">{typeIcon[n.type]}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm ${!n.read ? "text-white font-medium" : "text-[#94a3b8]"}`}>
                                                    {n.text}
                                                </p>
                                                <p className="text-xs text-slate-600 mt-1">{timeAgo(n.createdAt)}</p>
                                            </div>
                                            {!n.read && (
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
