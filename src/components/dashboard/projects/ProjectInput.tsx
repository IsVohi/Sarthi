"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Sparkles, X, CheckCircle2, CircleDashed, Check } from "lucide-react";
import ProjectResults from "@/components/dashboard/projects/ProjectResults";

const reviewOptions = [
    { id: "quality", label: "Code Quality" },
    { id: "security", label: "Security Issues" },
    { id: "production", label: "Production Readiness" },
    { id: "architecture", label: "Architecture" },
    { id: "docs", label: "Documentation" },
    { id: "readme", label: "README Improvement" },
];

const loadingSteps = [
    { text: "Reading project structure...", delay: 500 },
    { text: "Analyzing code quality...", delay: 2000 },
    { text: "Checking security vulnerabilities...", delay: 4000 },
    { text: "Reviewing architecture...", delay: 6500 },
    { text: "Generating improved README...", delay: 9000 },
];

export default function ProjectInput() {
    const [techStack, setTechStack] = useState<string[]>([]);
    const [techInput, setTechInput] = useState("");
    const [selectedChecks, setSelectedChecks] = useState<string[]>(reviewOptions.map(o => o.id));
    
    // Status state
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && techInput.trim() !== "") {
            e.preventDefault();
            if (!techStack.includes(techInput.trim())) {
                setTechStack([...techStack, techInput.trim()]);
            }
            setTechInput("");
        }
    };

    const toggleCheck = (id: string) => {
        if (selectedChecks.includes(id)) {
            setSelectedChecks(selectedChecks.filter(c => c !== id));
        } else {
            setSelectedChecks([...selectedChecks, id]);
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setCurrentStepIndex(0);

        // Simulate progression of steps
        loadingSteps.forEach((step, index) => {
            setTimeout(() => {
                setCurrentStepIndex(index);
            }, step.delay);
        });

        // Finish analysis after all steps complete (approx 12 seconds total)
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 12000);
    };

    return (
        <div className="space-y-8">
            <motion.div 
                className={`glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 ${isAnalyzing ? 'shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30' : ''}`}
            >
                {/* Full Card Shimmer while analyzing */}
                {isAnalyzing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay pointer-events-none"
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                    {/* Left Column */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Name</label>
                            <input
                                type="text"
                                placeholder="My Django Todo App"
                                disabled={isAnalyzing || showResults}
                                className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">GitHub Repository URL</label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="url"
                                    placeholder="https://github.com/username/project"
                                    disabled={isAnalyzing || showResults}
                                    className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack Used</label>
                            <div className={`w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-3 py-2 min-h-[50px] flex flex-wrap gap-2 transition-all ${isAnalyzing || showResults ? 'opacity-50' : 'focus-within:border-[#6366f1] focus-within:shadow-[0_0_15px_rgba(99,102,241,0.2)]'}`}>
                                {techStack.map((tech) => (
                                    <span key={tech} className="bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                                        {tech}
                                        {(!isAnalyzing && !showResults) && (
                                            <button onClick={() => setTechStack(techStack.filter(t => t !== tech))} className="hover:text-white transition-colors">
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={handleAddTech}
                                    disabled={isAnalyzing || showResults}
                                    placeholder={techStack.length === 0 ? "e.g. React, Next.js (Press Enter)" : "Add more..."}
                                    className="bg-transparent border-none text-sm text-white outline-none flex-grow min-w-[150px] h-8 placeholder-slate-600 disabled:bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Description</label>
                            <textarea
                                placeholder="Describe what your project does, its main features, and what problem it solves..."
                                rows={5}
                                disabled={isAnalyzing || showResults}
                                className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all resize-none custom-scrollbar disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Type</label>
                            <select 
                                disabled={isAnalyzing || showResults}
                                className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none disabled:opacity-50"
                            >
                                <option value="" disabled selected>Select Type</option>
                                <option value="web">🌐 Web App</option>
                                <option value="mobile">📱 Mobile App</option>
                                <option value="ml">🤖 ML/AI Project</option>
                                <option value="blockchain">🔗 Blockchain</option>
                                <option value="cli">⚙️ CLI Tool</option>
                                <option value="backend">📦 API/Backend</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Checkboxes Row */}
                <div className="mb-8 pt-6 border-t border-[#1e1e2e] relative z-10">
                    <label className="block text-sm font-bold text-white mb-4">What to review?</label>
                    <div className="flex flex-wrap gap-4">
                        {reviewOptions.map((option) => {
                            const isChecked = selectedChecks.includes(option.id);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => !isAnalyzing && !showResults && toggleCheck(option.id)}
                                    disabled={isAnalyzing || showResults}
                                    className={`flex items-center gap-2 group focus:outline-none disabled:cursor-not-allowed ${isAnalyzing || showResults ? 'opacity-70' : ''}`}
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                                        isChecked 
                                        ? "bg-indigo-500 border-indigo-500" 
                                        : "bg-[#0f0f1a] border-[#1e1e2e] group-hover:border-indigo-400"
                                    } border-2`}>
                                        <AnimatePresence>
                                            {isChecked && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                >
                                                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 select-none">
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button & Loading State */}
                <div className="relative z-10">
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || showResults || selectedChecks.length === 0}
                        className="w-full relative bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] hover:opacity-90 text-white rounded-xl py-4 text-lg font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center justify-center gap-2">
                                <CircleDashed className="w-5 h-5 animate-spin" />
                                🔍 Analyzing your codebase...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                {showResults ? "Review Complete" : "Review My Project with AI"}
                                {!showResults && <Sparkles className="w-5 h-5" />}
                            </span>
                        )}

                        {/* Shimmer Effect */}
                        {!showResults && (
                            <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 ${isAnalyzing ? 'animate-[shimmer_1.5s_infinite]' : 'group-hover:animate-[shimmer_1.5s_infinite]'}`} />
                        )}
                    </button>

                    {/* Animated Progress Steps */}
                    <AnimatePresence>
                        {isAnalyzing && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="space-y-3 overflow-hidden"
                            >
                                {loadingSteps.map((step, idx) => {
                                    const isCompleted = idx < currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;

                                    return (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: idx <= currentStepIndex + 1 ? 1 : 0.3, x: 0 }}
                                            className="flex items-center gap-3 text-sm font-medium"
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            ) : isCurrent ? (
                                                <CircleDashed className="w-5 h-5 text-indigo-400 animate-spin" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full border-2 border-[#1e1e2e] bg-[#0f0f1a]" />
                                            )}
                                            
                                            <span className={`${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-indigo-300 animate-pulse' : 'text-slate-500'}`}>
                                                {step.text}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ProjectResults />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
