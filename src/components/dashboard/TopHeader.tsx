"use client";

import { useState } from "react";
import { Bell, Check, Info, AlertCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useSarthiStore } from "@/lib/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function TopHeader() {
    const { user, learningPath, notifications, markNotificationRead, markAllNotificationsRead } = useSarthiStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const firstName = user.name ? user.name.split(' ')[0] : "there";
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                    Good morning, {firstName} <span className="inline-block hover:animate-wave origin-bottom-right">👋</span>
                </h1>
                <p className="text-slate-400 text-sm">
                    You&apos;re <strong className="text-indigo-400">{learningPath.overallProgress}% closer</strong> to your {user.targetRole || "SDE Backend"} goal this week.
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Urgent Badge */}
                <div className="hidden md:flex items-center border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mr-2" />
                    <span className="text-xs font-semibold text-orange-400">Next milestone: Week {learningPath.currentWeek}</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative w-10 h-10 rounded-full border border-[#1e1e2e] bg-[#13131f] flex items-center justify-center hover:bg-white/5 transition-colors group ${showNotifications ? 'bg-white/5 border-indigo-500/50' : ''}`}
                    >
                        <Bell className={`w-5 h-5 transition-colors ${unreadCount > 0 ? 'text-indigo-400' : 'text-slate-400'} group-hover:text-white`} />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#13131f]" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-[calc(100vw-2rem)] sm:w-80 bg-[#13131f] border border-[#1e1e2e] rounded-2xl shadow-2xl z-50 overflow-hidden"
                                >
                                    <div className="p-4 border-b border-[#1e1e2e] flex items-center justify-between">
                                        <h3 className="font-bold text-white text-sm">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllNotificationsRead}
                                                className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                                    <Bell className="w-5 h-5 text-slate-500" />
                                                </div>
                                                <p className="text-sm text-slate-400">No notifications yet</p>
                                            </div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => markNotificationRead(notif.id)}
                                                    className={`p-4 border-b border-[#1e1e2e] hover:bg-white/5 transition-colors cursor-pointer relative ${!notif.read ? 'bg-indigo-500/5' : ''}`}
                                                >
                                                    {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500" />}
                                                    <div className="flex gap-3">
                                                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                                                            notif.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'
                                                            }`}>
                                                            {notif.type === 'success' ? <Check className="w-4 h-4" /> :
                                                                notif.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className={`text-sm leading-snug mb-1 ${!notif.read ? 'text-white font-medium' : 'text-slate-300'}`}>
                                                                {notif.text}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500">
                                                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="p-3 bg-[#0a0a0f] text-center border-t border-[#1e1e2e]">
                                        <button className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
                                            View all activity
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile avatar - only shows on small screens since sidebar has desktop avatar */}
                <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#13131f] overflow-hidden">
                        <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} alt={firstName} width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
