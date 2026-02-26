"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Minus } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";

const contextChips: Record<string, string[]> = {
    "/dashboard": ["What should I focus on today?", "Show my weakest skills", "How am I progressing?"],
    "/dashboard/skills": ["Explain my gap report", "Which skill to learn first?", "Compare me to job requirements"],
    "/dashboard/path": ["Simplify this week's tasks", "Give me a DSA hint", "What if I skip a week?"],
    "/dashboard/project-review": ["What's most critical to fix?", "How to improve my score?", "Explain this issue"],
    "/dashboard/interview-prep": ["Give me a warm-up question", "Tips for system design", "Mock interview prep"],
    "/dashboard/progress": ["Am I on track?", "What's my strongest area?", "Weekly summary"],
    "/dashboard/resources": ["Best resource for Docker?", "Free courses for system design", "YouTube recommendations"],
    "/dashboard/settings": ["How to change my goal?", "Reset my progress?", "Export my data"],
};

export default function ChatFAB() {
    const pathname = usePathname();
    const user = useSarthiStore((s) => s.user);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const chips = contextChips[pathname] || contextChips["/dashboard"];

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: `Great question! Based on your profile targeting **${user.targetRole}** roles at ${user.targetCompanies.slice(0, 2).join(" & ")}, I'd suggest focusing on your weak areas first. Since I'm running in demo mode, connect AWS Bedrock for real-time AI coaching.`,
                },
            ]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* FAB Button */}
            {!isOpen && (
                <motion.button
                    onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] transition-shadow group"
                >
                    <Sparkles className="w-6 h-6" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#13131f] text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-[#1e1e2e] whitespace-nowrap hidden md:block pointer-events-none">
                        Ask Sarthi AI
                    </span>
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-ping opacity-20" />
                </motion.button>
            )}

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm md:hidden" />
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 right-0 md:right-6 md:bottom-6 z-[70] w-full md:w-96 h-[80vh] md:h-[600px] max-h-screen bg-[#0f0f1a] border border-[#1e1e2e] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-[#1e1e2e] bg-[#13131f] flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                                        <Sparkles className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Sarthi AI</h3>
                                        <p className="text-[10px] text-[#06b6d4] font-medium">Powered by AWS Bedrock</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => setIsMinimized(true)} className="p-2 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-2 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-3">
                                {messages.length === 0 ? (
                                    <div className="my-auto text-center space-y-4">
                                        <p className="text-white font-medium">Hi {user.name.split(" ")[0]}! 👋</p>
                                        <p className="text-sm text-[#94a3b8]">I&apos;m Sarthi, your AI career mentor. Targeting <strong className="text-indigo-300">{user.targetRole}</strong> roles. How can I help?</p>
                                        <div className="flex flex-col gap-2 mt-4">
                                            {chips.map((chip) => (
                                                <button key={chip} onClick={() => handleSend(chip)} className="text-left px-4 py-2.5 text-sm text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 rounded-xl transition-colors">
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-indigo-500/20 border border-indigo-500/30 text-white rounded-br-sm" : "bg-[#13131f] border border-[#1e1e2e] text-slate-200 rounded-bl-sm"}`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-[#13131f] border border-[#1e1e2e] p-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-indigo-400" />
                                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-indigo-400" />
                                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-indigo-400" />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t border-[#1e1e2e] bg-[#13131f] shrink-0">
                                <div className="flex items-end gap-2 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl focus-within:border-indigo-500/50 transition-all p-2">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(input); } }}
                                        placeholder="Type your message..."
                                        className="w-full bg-transparent border-none text-sm text-white focus:outline-none resize-none max-h-24 min-h-[36px] px-2 py-1 custom-scrollbar"
                                        rows={1}
                                    />
                                    <button onClick={() => handleSend(input)} disabled={!input.trim() || isTyping} className="p-2 shrink-0 bg-indigo-500 hover:bg-indigo-600 disabled:bg-[#1e1e2e] disabled:text-slate-500 text-white rounded-lg transition-colors">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Minimized pill */}
            {isOpen && isMinimized && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#13131f] border border-[#1e1e2e] text-white text-sm font-medium shadow-lg hover:border-indigo-500/30 transition-all"
                >
                    <Sparkles className="w-4 h-4 text-indigo-400" /> Sarthi AI
                </motion.button>
            )}
        </>
    );
}
