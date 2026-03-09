"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Play, Square, Sparkles, Send, Loader2, Bot, User, Clock, CheckCircle2, Mic } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";
import { toast } from "sonner";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

export default function MockInterviewTab() {
    const { user, interviewPrep } = useSarthiStore();

    const [isConfiguring, setIsConfiguring] = useState(true);
    const [interviewActive, setInterviewActive] = useState(false);
    const [interviewFinished, setInterviewFinished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for the whole interview
    const [isListening, setIsListening] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => (result as any)[0])
                        .map((result: any) => result.transcript)
                        .join("");
                    setInput(transcript);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error:", event.error);
                    setIsListening(false);
                };
            }
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput("");
            recognitionRef.current.start();
            setIsListening(true);
            toast.info("Listening... speak clearly into the mic.");
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (interviewActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && interviewActive) {
            handleEndInterview();
        }
        return () => clearInterval(timer);
    }, [interviewActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startInterview = async () => {
        setIsConfiguring(false);
        setIsLoading(true);

        try {
            const initialGreeting = `Hello ${user.name}! I'm Sarthi, your interviewer today. I see you're targeting a ${user.targetRole} role at ${user.targetCompanies[0] || 'top companies'}. Let's get started. Could you please introduce yourself and tell me about your background?`;

            setMessages([{
                role: "assistant",
                content: initialGreeting,
                timestamp: new Date().toLocaleTimeString()
            }]);

            setInterviewActive(true);
            setTimeLeft(1800);
        } catch (error) {
            toast.error("Failed to start session.");
            setIsConfiguring(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            role: "user",
            content: input.trim(),
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await API.interviewChat({
                message: userMsg.content,
                history: messages.map(m => ({ role: m.role, content: m.content })),
                userProfile: user
            });

            if (response.success) {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: response.data,
                    timestamp: new Date().toLocaleTimeString()
                }]);
            }
        } catch (error) {
            console.error("Interview message failed:", error);
            toast.error("Interviewer is thinking... please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndInterview = () => {
        setInterviewActive(false);
        setInterviewFinished(true);
    };

    const resetInterview = () => {
        setInterviewFinished(false);
        setInterviewActive(false);
        setIsConfiguring(true);
        setMessages([]);
        setInput("");
    };

    return (
        <div className="h-[600px] flex flex-col relative pb-4 bg-[#0a0a0f] rounded-2xl border border-[#1e1e2e] overflow-hidden">

            {/* Header / StatusBar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#1e1e2e] bg-[#0f0f1a] z-20">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-white tracking-wide uppercase">AI Interviewer Session</span>
                </div>
                {interviewActive && (
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-xs ${timeLeft <= 300 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'}`}>
                            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                        </div>
                        <button
                            onClick={handleEndInterview}
                            className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest"
                        >
                            End Interview
                        </button>
                    </div>
                )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <AnimatePresence>
                    {isConfiguring ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6"
                        >
                            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center relative">
                                <Sparkles className="w-10 h-10 text-indigo-400" />
                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Ready to Start?</h2>
                                <p className="text-sm text-slate-400">
                                    Sarthi will conduct a realistic technical interview. Be prepared for follow-up questions!
                                </p>
                            </div>
                            <button
                                onClick={startInterview}
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> Start Mock Interview
                            </button>
                        </motion.div>
                    ) : interviewFinished ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto"
                        >
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">Interview Completed!</h2>
                            <p className="text-slate-400 mb-8">
                                Great job! Sarthi has recorded your responses. You can review them below or start a new session.
                            </p>
                            <div className="w-full space-y-3">
                                <button className="w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition-all">
                                    Generate Full Feedback Report
                                </button>
                                <button
                                    onClick={resetInterview}
                                    className="w-full text-indigo-400 font-bold py-3 hover:text-indigo-300 transition-colors"
                                >
                                    New Session
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${msg.role === 'assistant'
                                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                                    : 'bg-slate-800 border-slate-700 text-slate-300'
                                    }`}>
                                    {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                </div>
                                <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'assistant'
                                        ? 'bg-[#13131f] border border-[#1e1e2e] text-white rounded-tl-none'
                                        : 'bg-indigo-600 text-white rounded-tr-none'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium px-2">{msg.timestamp}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
                {isLoading && (
                    <div className="flex items-center gap-3 text-indigo-400 text-xs font-bold px-12 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" /> Sarthi is analyzing your response...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {interviewActive && !interviewFinished && (
                <div className="px-6 py-4 border-t border-[#1e1e2e] bg-[#0f0f1a]">
                    <form onSubmit={handleSendMessage} className="relative flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                placeholder={isListening ? "Listening..." : "Type your response..."}
                                className={`w-full bg-[#0a0a0f] border rounded-xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none transition-all placeholder-slate-600 ${isListening ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]" : "border-[#1e1e2e] focus:border-indigo-500"
                                    }`}
                            />
                            {isListening && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-indigo-500 rounded-full" />
                                    <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-indigo-500 rounded-full" />
                                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-indigo-500 rounded-full" />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={toggleListening}
                                disabled={isLoading}
                                className={`p-3.5 rounded-xl border transition-all flex items-center justify-center ${isListening
                                    ? "bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                                    : "bg-[#13131f] border-[#1e1e2e] text-slate-400 hover:text-white hover:border-indigo-500/50"
                                    }`}
                                title={isListening ? "Stop Listening" : "Start Voice Input"}
                            >
                                {isListening ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                            </button>

                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 px-6 flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                <span className="hidden sm:inline">Send</span>
                            </button>
                        </div>
                    </form>
                    <p className="text-[10px] text-slate-500 mt-3 text-center uppercase tracking-widest font-bold opacity-50">
                        Speak professionally • Mention STAR method • Don't panic
                    </p>
                </div>
            )}
        </div>
    );
}
