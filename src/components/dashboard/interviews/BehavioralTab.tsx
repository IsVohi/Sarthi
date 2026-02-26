"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Send, Bot, CheckCircle2 } from "lucide-react";

export default function BehavioralTab() {
    const [situation, setSituation] = useState("");
    const [task, setTask] = useState("");
    const [action, setAction] = useState("");
    const [result, setResult] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState(false);

    const questions = [
        "Tell me about a time you had a conflict with a teammate.",
        "Describe a situation where you had to meet a tight deadline.",
        "Tell me about your most challenging technical problem.",
    ];

    const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setFeedback(true);
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-8">
            
            {/* Input Form Column */}
            <div className="lg:w-3/5 space-y-6">
                <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">STAR Method Practice</h2>
                            <p className="text-sm text-slate-400">Structure your behavioral answers.</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selected Question</label>
                        <select 
                            value={selectedQuestion}
                            onChange={(e) => setSelectedQuestion(e.target.value)}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none text-sm"
                        >
                            {questions.map((q, i) => <option key={i} value={q}>{q}</option>)}
                        </select>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center justify-between">
                                <span>Situation <span className="text-slate-500 font-normal ml-1">(Context)</span></span>
                                <span className={`text-xs ${situation.length > 50 ? 'text-emerald-400' : 'text-slate-500'}`}>{situation.length}/50 min chars</span>
                            </label>
                            <textarea 
                                value={situation} onChange={(e) => setSituation(e.target.value)}
                                placeholder="Describe the background or context of the situation..."
                                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-24 custom-scrollbar"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Task <span className="text-slate-500 font-normal ml-1">(Your responsibility)</span></label>
                            <textarea 
                                value={task} onChange={(e) => setTask(e.target.value)}
                                placeholder="What was your specific role or challenge?"
                                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-20 custom-scrollbar"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Action <span className="text-slate-500 font-normal ml-1">(What YOU did)</span></label>
                            <textarea 
                                value={action} onChange={(e) => setAction(e.target.value)}
                                placeholder="Detail the specific actions you took to address the task..."
                                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-32 custom-scrollbar"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Result <span className="text-slate-500 font-normal ml-1">(Outcome & Impact)</span></label>
                            <textarea 
                                value={result} onChange={(e) => setResult(e.target.value)}
                                placeholder="What was the result? Include metrics or tangible outcomes if possible..."
                                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-24 custom-scrollbar"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleAnalyze}
                        disabled={!situation || !task || !action || !result || isAnalyzing}
                        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-[#1e1e2e] disabled:text-slate-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)] disabled:shadow-none"
                    >
                        {isAnalyzing ? (
                            <>
                                <Bot className="w-5 h-5 animate-bounce" /> Analyzing your story...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" /> Get AI Evaluation
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Feedback Column */}
            <div className="lg:w-2/5">
                {feedback ? (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 sticky top-6"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e] mb-6">
                            <Bot className="w-6 h-6 text-purple-400" />
                            <h3 className="font-bold text-white text-lg">AI Evaluation</h3>
                        </div>

                        <div className="text-center mb-8">
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">8/10</div>
                            <p className="text-sm font-medium text-emerald-400 bg-emerald-500/10 inline-block px-3 py-1 rounded-full border border-emerald-500/20">Strong Answer</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Strengths</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        Clear definition of the problem in Situation.
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                        Action section uses &quot;I&quot; instead of &quot;We&quot;, showing personal ownership.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To Improve</h4>
                                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-sm text-amber-200/90">
                                    Your <strong>Result</strong> lacks quantitative metrics. Try to add numbers. For example, instead of &quot;the query became faster&quot;, say &quot;the query latency dropped by 45% (from 200ms to 110ms)&quot;.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-[#1e1e2e] rounded-2xl bg-[#0a0a0f]/50">
                        <MessageSquare className="w-12 h-12 text-slate-600 mb-4" />
                        <h3 className="text-slate-400 font-medium mb-2">Fill out your STAR story</h3>
                        <p className="text-sm text-slate-500 max-w-[250px]">
                            Once submitted, the AI will evaluate your formatting, tone, and impact metrics.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
