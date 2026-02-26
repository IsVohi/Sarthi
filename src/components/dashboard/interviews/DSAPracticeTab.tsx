"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Filter, Bot, Send } from "lucide-react";

const dsQuestions = [
    { id: 1, title: "Two Sum", topic: "Arrays", difficulty: "Easy", companies: ["Amazon", "Flipkart"], solved: true, color: "bg-emerald-500" },
    { id: 2, title: "LRU Cache", topic: "Design", difficulty: "Medium", companies: ["Uber", "Razorpay"], solved: false, color: "bg-amber-500" },
    { id: 3, title: "Word Break II", topic: "DP", difficulty: "Hard", companies: ["Google"], solved: false, color: "bg-red-500" },
    { id: 4, title: "Clone Graph", topic: "Graphs", difficulty: "Medium", companies: ["Microsoft"], solved: false, color: "bg-amber-500" },
    { id: 5, title: "Valid Parentheses", topic: "Stack", difficulty: "Easy", companies: ["All companies"], solved: false, color: "bg-emerald-500" },
    { id: 6, title: "Merge K Sorted Lists", topic: "Heaps", difficulty: "Hard", companies: ["Amazon", "Uber"], solved: false, color: "bg-red-500" },
    { id: 7, title: "Trapping Rain Water", topic: "Arrays", difficulty: "Hard", companies: ["Goldman Sachs"], solved: false, color: "bg-red-500" },
];

export default function DSAPracticeTab() {
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(dsQuestions[0].title);

    const handleSendHint = (text: string) => {
        if (!text.trim()) return;
        setMessages([...messages, { role: 'user', text }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "Think about what data structure allows O(1) lookup... Consider storing complements as you iterate."
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full pb-8">
            {/* Left Panel: Question Bank */}
            <div className="lg:w-2/3 flex flex-col h-full">
                
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6 p-4 glass-card bg-[#13131f] rounded-2xl shrink-0">
                    <Filter className="w-4 h-4 text-slate-400" />
                    
                    <div className="h-6 w-px bg-[#1e1e2e] mx-2" />
                    
                    <div className="flex gap-2">
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20">All</button>
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">Easy</button>
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">Medium</button>
                        <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">Hard</button>
                    </div>

                    <div className="h-6 w-px bg-[#1e1e2e] mx-2 hidden sm:block" />
                    
                    <select className="bg-[#0f0f1a] border border-[#1e1e2e] text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500/50 appearance-none">
                        <option>All Topics</option>
                        <option>Arrays</option>
                        <option>DP</option>
                        <option>Graphs</option>
                        <option>Trees</option>
                    </select>

                    <select className="bg-[#0f0f1a] border border-[#1e1e2e] text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500/50 appearance-none">
                        <option>All Companies</option>
                        <option>Amazon</option>
                        <option>Flipkart</option>
                        <option>Google</option>
                    </select>
                </div>

                {/* Question List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                    {dsQuestions.map((q, i) => (
                        <motion.div 
                            key={q.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setActiveQuestion(q.title)}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                                activeQuestion === q.title 
                                ? "bg-indigo-500/[0.03] border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.05)]" 
                                : "bg-[#0f0f1a] border-[#1e1e2e] hover:border-indigo-500/30"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-2.5 h-2.5 shrink-0 rounded-full ${q.color} shadow-[0_0_8px_currentColor]`} />
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1.5 group-hover:text-indigo-100 transition-colors">{q.title}</h4>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                            {q.topic}
                                        </span>
                                        {q.companies.map(c => (
                                            <span key={c} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#13131f] text-slate-400 border border-[#1e1e2e]">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                                {q.solved ? (
                                    <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold px-3 py-1.5">
                                        <CheckCircle2 className="w-4 h-4 cursor-default" /> Solved
                                    </div>
                                ) : (
                                    <button className="flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-transparent hover:border-indigo-500/30 px-3 py-1.5 rounded-lg transition-all">
                                        Solve <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right Panel: AI Hint System */}
            <div className="lg:w-1/3 flex flex-col h-[500px] lg:h-auto">
                <div className="glass-card bg-[#13131f] border border-[#1e1e2e] border-t-indigo-500/50 rounded-2xl flex flex-col h-full shadow-[0_-2px_15px_rgba(99,102,241,0.1)] overflow-hidden">
                    
                    {/* Header */}
                    <div className="p-4 border-b border-[#1e1e2e] bg-[#0f0f1a] flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <Bot className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Struggling? Ask Sarthi 🤖</h3>
                            <p className="text-xs text-slate-400 truncate max-w-[200px] bg-white/5 inline-block px-1.5 rounded mt-0.5">Focus: {activeQuestion}</p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-3">
                        {/* Initial specific context instruction */}
                        <div className="flex justify-start">
                             <div className="max-w-[90%] p-3 rounded-2xl text-xs sm:text-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 rounded-tl-sm">
                                I won&apos;t give you the full code, but I can guide you through the optimal approach for <strong className="text-white">{activeQuestion}</strong> step-by-step. What have you tried so far?
                             </div>
                        </div>

                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] p-3 rounded-2xl text-xs sm:text-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-indigo-500 text-white rounded-tr-sm' 
                                    : 'bg-[#0f0f1a] border border-[#1e1e2e] text-slate-300 rounded-tl-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-[#0f0f1a] border border-[#1e1e2e] p-3 rounded-2xl rounded-tl-sm flex gap-1.5">
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-[#1e1e2e] bg-[#0f0f1a]">
                        <div className="flex items-end gap-2 bg-[#13131f] border border-[#1e1e2e] rounded-xl focus-within:border-indigo-500/50 transition-colors p-1.5">
                            <textarea 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendHint(input);
                                    }
                                }}
                                placeholder={`Ask for a hint on "${activeQuestion}"...`}
                                className="w-full bg-transparent border-none text-xs sm:text-sm text-white focus:outline-none resize-none max-h-24 min-h-[36px] px-2 py-2 custom-scrollbar"
                                rows={1}
                            />
                            <button 
                                onClick={() => handleSendHint(input)}
                                disabled={!input.trim() || isTyping}
                                className="p-1.5 shrink-0 bg-indigo-500 hover:bg-indigo-600 disabled:bg-[#1e1e2e] disabled:text-slate-500 text-white rounded-lg transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Show Full Solution CTA */}
                    <div className="p-3 bg-[#0a0a0f] text-center border-t border-[#1e1e2e]">
                        <button className="text-xs font-semibold text-slate-400 hover:text-white underline decoration-[#1e1e2e] hover:decoration-slate-500 underline-offset-4 transition-all">
                            Give up? Show Full Explanation & Code
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
