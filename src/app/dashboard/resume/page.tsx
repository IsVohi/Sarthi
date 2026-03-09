"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Loader2, Trophy, Target, Zap } from "lucide-react";
import { useSarthiStore } from "@/lib/store/userStore";
import { toast } from "sonner";

export default function ResumePage() {
    const { user } = useSarthiStore();
    const [file, setFile] = useState<File | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== "application/pdf") {
                toast.error("Please upload a PDF file");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsScanning(true);
        setAnalysis(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("targetRole", user.targetRole);
        formData.append("currentSkills", user.currentSkills.join(", "));

        try {
            const res = await fetch("/api/resume", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (result.success) {
                setAnalysis(result.data);
                toast.success("Analysis complete!");
            } else {
                toast.error(result.error || "Analysis failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pb-20">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                    <FileText className="w-10 h-10 text-indigo-400" />
                    AI Resume Auditor
                </h1>
                <p className="text-slate-400 max-w-2xl">
                    Get an instant industry-grade audit of your resume against your target role as a <strong className="text-indigo-400">{user.targetRole || "Software Engineer"}</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-6 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-indigo-400" />
                            Upload Resume
                        </h2>

                        <div className="border-2 border-dashed border-[#1e1e2e] hover:border-indigo-500/50 rounded-2xl p-8 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer relative">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-indigo-400" />
                            </div>
                            <p className="text-sm font-medium text-white mb-1">
                                {file ? file.name : "Click or drag PDF"}
                            </p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">PDF only (Max 5MB)</p>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!file || isScanning}
                            className={`w-full mt-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${!file || isScanning
                                    ? "bg-[#1e1e2e] text-slate-500 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
                                }`}
                        >
                            {isScanning ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Start AI Audit
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* How it works */}
                    <div className="p-6 bg-[#0a0a0f] border border-[#1e1e2e] rounded-3xl text-sm space-y-4">
                        <h3 className="font-bold text-white">How Sarthi Audits:</h3>
                        <div className="flex gap-3 text-slate-400">
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">1</div>
                            <p>Extracts technical skills and experience tokens.</p>
                        </div>
                        <div className="flex gap-3 text-slate-400">
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">2</div>
                            <p>Cross-references with <strong className="text-slate-200">{user.targetRole}</strong> job patterns.</p>
                        </div>
                        <div className="flex gap-3 text-slate-400">
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">3</div>
                            <p>Calculates alignment & identifies missing keywords.</p>
                        </div>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {isScanning ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
                            >
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                    <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-cyan-500 animate-spin-reverse" />
                                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">Crafting Your Analysis</h2>
                                <p className="text-slate-400 max-w-sm">
                                    Our AI is scanning 100+ data points to see how you match up against top-tier tech requirements.
                                </p>
                            </motion.div>
                        ) : analysis ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Results Header Card */}
                                <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-8 relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="relative w-32 h-32 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#1e1e2e]" />
                                                <motion.circle
                                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                    strokeDasharray={364}
                                                    initial={{ strokeDashoffset: 364 }}
                                                    animate={{ strokeDashoffset: 364 - (364 * analysis.score) / 100 }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="text-indigo-500"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-black text-white">{analysis.score}</span>
                                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Score</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold text-white mb-2">Alignment Report</h2>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                                {analysis.summary}
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                    <Target className="w-3 h-3" /> {user.targetRole}
                                                </span>
                                                <span className={`px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${analysis.score > 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    }`}>
                                                    <Zap className="w-3 h-3" /> {analysis.score > 70 ? "Ready to Apply" : "Needs Polish"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Three Column View */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-6">
                                        <h3 className="text-emerald-400 font-bold text-sm mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" /> Key Strengths
                                        </h3>
                                        <ul className="space-y-3">
                                            {analysis.strengths.map((s: string, i: number) => (
                                                <li key={i} className="text-xs text-slate-300 leading-relaxed">• {s}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-6">
                                        <h3 className="text-red-400 font-bold text-sm mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" /> Identified Gaps
                                        </h3>
                                        <ul className="space-y-3">
                                            {analysis.gaps.map((g: string, i: number) => (
                                                <li key={i} className="text-xs text-slate-300 leading-relaxed">• {g}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-3xl p-6 bg-gradient-to-dark from-[#13131f] to-indigo-950/20">
                                        <h3 className="text-indigo-400 font-bold text-sm mb-4 flex items-center gap-2">
                                            <Trophy className="w-4 h-4" /> Next Steps
                                        </h3>
                                        <ul className="space-y-3">
                                            {analysis.recommendations.map((r: string, i: number) => (
                                                <li key={i} className="text-xs text-slate-300 leading-relaxed">• {r}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-card bg-[#0a0a0f] border border-[#1e1e2e] border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <Sparkles className="w-10 h-10 text-slate-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-300 mb-2">Resume Audit Results</h2>
                                <p className="text-slate-500 max-w-sm mb-8">
                                    Your detailed alignment report will appear here once you upload your resume.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
