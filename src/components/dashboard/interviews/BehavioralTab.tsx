"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Send, Bot, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";

export default function BehavioralTab() {
    const { interviewPrep } = useSarthiStore();
    const behavioralQuestions = interviewPrep.behavioral;

    const [situation, setSituation] = useState("");
    const [task, setTask] = useState("");
    const [action, setAction] = useState("");
    const [result, setResult] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Default to first question or null
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedQuestionObj = behavioralQuestions[selectedIndex];

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setFeedback(null);

        try {
            const prompt = `Please act as an expert technical recruiter. Evaluate the following behavioral interview answer formatted using the STAR method. 

Question: ${selectedQuestionObj?.question}

Candidate's Answer:
Situation: ${situation}
Task: ${task}
Action: ${action}
Result: ${result}

Please provide:
1. A score out of 10.
2. 2-3 Strengths of their answer.
3. 1-2 areas to improve (especially focusing on metrics in the result, or clarity in the action).

Format your response in Markdown. Do not include a conversational intro, just the evaluation.`;

            const res = await API.chat({ message: prompt, context: "Behavioral Interview Practice Tab" });
            setFeedback(res.data);
        } catch (error) {
            console.error(error);
            setFeedback("Failed to get AI evaluation. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
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
                        {behavioralQuestions.length === 0 ? (
                            <div className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-slate-400 text-sm">
                                Loading AI generated questions...
                            </div>
                        ) : (
                            <>
                                <select
                                    value={selectedIndex}
                                    onChange={(e) => setSelectedIndex(Number(e.target.value))}
                                    className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none text-sm mb-3"
                                >
                                    {behavioralQuestions.map((q, i) => <option key={i} value={i}>{q.question}</option>)}
                                </select>

                                {selectedQuestionObj && (
                                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-100/80">
                                        <strong className="text-emerald-400 block mb-1">AI Tip:</strong>
                                        {selectedQuestionObj.tips}
                                    </div>
                                )}
                            </>
                        )}
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

                        <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-emerald-400">
                            <ReactMarkdown>{feedback}</ReactMarkdown>
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
