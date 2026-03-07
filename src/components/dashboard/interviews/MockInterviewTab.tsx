"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Play, Square, Sparkles, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";

export default function MockInterviewTab() {
    const { interviewPrep } = useSarthiStore();
    const questions = interviewPrep.behavioral || [];

    const [isConfiguring, setIsConfiguring] = useState(true);
    const [interviewActive, setInterviewActive] = useState(false);
    const [interviewFinished, setInterviewFinished] = useState(false);

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);

    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per question

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (interviewActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && interviewActive) {
            handleNextQuestion();
        }
        return () => clearInterval(timer);
    }, [interviewActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const startInterview = () => {
        if (questions.length === 0) return;
        setIsConfiguring(false);
        setTimeout(() => {
            setInterviewActive(true);
            setTimeLeft(300);
            setCurrentQuestionIdx(0);
            setAnswers([]);
        }, 1500);
    };

    const handleNextQuestion = () => {
        setAnswers([...answers, {
            question: questions[currentQuestionIdx].question,
            answer: currentAnswer || "No answer provided."
        }]);

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
            setCurrentAnswer("");
            setTimeLeft(300);
        } else {
            setInterviewActive(false);
            setInterviewFinished(true);
        }
    };

    const stopInterview = () => {
        setInterviewActive(false);
        setIsConfiguring(true);
        setInterviewFinished(false);
    };

    return (
        <div className="h-full min-h-[500px] flex flex-col relative pb-8">

            {/* Configuration Overlay */}
            <AnimatePresence>
                {isConfiguring && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm"
                    >
                        <div className="glass-card bg-[#13131f] border border-[#1e1e2e] shadow-2xl rounded-2xl p-8 max-w-md w-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] pointer-events-none" />

                            <div className="flex items-center gap-3 mb-6">
                                <Settings2 className="w-6 h-6 text-indigo-400" />
                                <h2 className="text-xl font-bold text-white">Mock Interview</h2>
                            </div>

                            <p className="text-sm text-slate-400 mb-6">
                                You will be asked {questions.length || 3} behavioral questions based on your profile. You have 5 minutes to type your answer for each question.
                            </p>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={startInterview}
                                    disabled={questions.length === 0}
                                    className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-current" /> {questions.length === 0 ? "Loading Questions..." : "Start Mock"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Connecting State */}
            {!isConfiguring && !interviewActive && !interviewFinished && (
                <div className="flex-1 flex flex-col items-center justify-center text-indigo-400 h-full">
                    <Sparkles className="w-10 h-10 animate-bounce mb-3" />
                    <p className="font-bold">Connecting to Sarthi AI Sandbox...</p>
                </div>
            )}

            {/* Active Interview Content */}
            {interviewActive && (
                <div className="flex-1 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                            {questions.map((_, i) => (
                                <div key={i} className={`w-8 h-2 rounded-full ${i === currentQuestionIdx ? 'bg-indigo-500' : i < currentQuestionIdx ? 'bg-emerald-500' : 'bg-[#1e1e2e]'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${timeLeft <= 60 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-[#13131f] text-slate-300 border-[#1e1e2e]'}`}>
                                <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                            </div>
                            <button
                                onClick={stopInterview}
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                            >
                                <Square className="w-4 h-4 fill-current" />
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <motion.div
                        key={currentQuestionIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden flex-1 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[50px] pointer-events-none" />

                        <div className="relative z-10 flex-1 flex flex-col">
                            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">Question {currentQuestionIdx + 1} of {questions.length}</h3>
                            <p className="text-xl md:text-2xl font-semibold text-white mb-8 leading-snug">
                                {questions[currentQuestionIdx].question}
                            </p>

                            <textarea
                                value={currentAnswer}
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                placeholder="Type your answer using the STAR method (Situation, Task, Action, Result)..."
                                className="flex-1 w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500/50 resize-none custom-scrollbar min-h-[200px]"
                            />
                        </div>
                    </motion.div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleNextQuestion}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                        >
                            {currentQuestionIdx === questions.length - 1 ? "Submit Interview" : "Next Question"} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Finished State */}
            {interviewFinished && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center max-w-3xl mx-auto w-full pt-8"
                >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Interview Completed!</h2>
                    <p className="text-slate-400 mb-8 text-center">Your responses have been saved. You can use the Behavioral tab to get detailed AI feedback on specific answers.</p>

                    <div className="w-full glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl overflow-hidden mb-8">
                        <div className="p-4 bg-[#0f0f1a] border-b border-[#1e1e2e]">
                            <h3 className="font-bold text-white">Interview Summary</h3>
                        </div>
                        <div className="divide-y divide-[#1e1e2e]">
                            {answers.map((ans, idx) => (
                                <div key={idx} className="p-6">
                                    <h4 className="text-sm font-semibold text-indigo-300 mb-2">Q: {ans.question}</h4>
                                    <p className="text-sm text-slate-300 bg-[#0a0a0f] p-4 rounded-xl border border-[#1e1e2e]">{ans.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={stopInterview}
                        className="bg-[#1e1e2e] hover:bg-[#2a2a35] text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        Back to Settings
                    </button>
                </motion.div>
            )}
        </div>
    );
}
