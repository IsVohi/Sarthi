"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Send,
    Code2,
    ShieldCheck,
    Zap,
    Terminal,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowLeft,
    FileCode,
    MessageSquare,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";
import { toast } from "sonner";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
    const { user, projectReviews, addProjectReview } = useSarthiStore();
    const [githubUrl, setGithubUrl] = useState("");
    const [projectName, setProjectName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(projectReviews[0] || null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!githubUrl.trim() || !projectName.trim()) {
            toast.error("Please provide both project name and GitHub URL");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await API.submitProjectReview({
                email: user.email,
                projectName,
                githubUrl,
                techStack: ["React", "TypeScript", "Node.js"], // Simplified for now
            });

            if (res.success) {
                addProjectReview(res.data);
                setSelectedReview(res.data);
                setGithubUrl("");
                setProjectName("");
                toast.success("AI Analysis Complete!");
            } else {
                toast.error(res.error || "Analysis failed");
            }
        } catch (error) {
            toast.error("Connection error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-300 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors mb-4 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Code2 className="w-10 h-10 text-indigo-500" /> Project Reviews
                        </h1>
                        <p className="text-slate-400 mt-2">Get deep technical feedback on your code using Sarthi AI.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Submission & History */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Submission Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Send className="w-4 h-4 text-indigo-400" /> New Analysis
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. E-commerce Backend"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">GitHub Repository URL</label>
                                    <div className="relative">
                                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="url"
                                            placeholder="https://github.com/user/repo"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start AI Review <Zap className="w-4 h-4 group-hover:fill-current" /></>}
                                </button>
                            </form>
                        </motion.div>

                        {/* Recent Reviews List */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">History</h3>
                            {projectReviews.length > 0 ? (
                                <div className="space-y-3">
                                    {projectReviews.map((review) => (
                                        <button
                                            key={review.id}
                                            onClick={() => setSelectedReview(review)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedReview?.id === review.id ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-[#13131f] border-[#1e1e2e] hover:border-[#2e2e3e]'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-white text-sm truncate">{review.projectName}</h4>
                                                <span className="text-[10px] font-bold text-indigo-400">{review.overallScore}/100</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-1">{new Date(review.date || Date.now()).toLocaleDateString()}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#13131f] border border-dashed border-[#1e1e2e] rounded-xl p-8 text-center">
                                    <FileCode className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                    <p className="text-xs text-slate-600">No projects analyzed yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Analysis Display */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {selectedReview ? (
                                <motion.div
                                    key={selectedReview.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    {/* Header Section */}
                                    <div className="p-8 border-b border-[#1e1e2e] bg-gradient-to-r from-transparent to-indigo-500/5">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">Analysis Ready</span>
                                                    <span className="text-slate-500 text-xs">• {new Date(selectedReview.date || Date.now()).toLocaleDateString()}</span>
                                                </div>
                                                <h2 className="text-3xl font-bold text-white mb-2">{selectedReview.projectName}</h2>
                                                <a href={selectedReview.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1.5 transition-colors">
                                                    <Github className="w-3.5 h-3.5" /> View on GitHub <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                            <div className="text-center bg-[#0f0f1a] p-4 rounded-2xl border border-[#1e1e2e] min-w-[120px]">
                                                <div className="text-4xl font-black text-white">{selectedReview.overallScore}</div>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Overall Score</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Tabs/Grid */}
                                    <div className="p-8 space-y-8">
                                        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <motion.div variants={staggerItem} className="p-4 rounded-xl bg-[#0f0f1a] border border-[#1e1e2e]">
                                                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Security</span>
                                                </div>
                                                <p className="text-sm text-white font-medium">{selectedReview.securityScore || 85}/100</p>
                                            </motion.div>
                                            <motion.div variants={staggerItem} className="p-4 rounded-xl bg-[#0f0f1a] border border-[#1e1e2e]">
                                                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                                    <Zap className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Performance</span>
                                                </div>
                                                <p className="text-sm text-white font-medium">{selectedReview.performanceScore || 78}/100</p>
                                            </motion.div>
                                            <motion.div variants={staggerItem} className="p-4 rounded-xl bg-[#0f0f1a] border border-[#1e1e2e]">
                                                <div className="flex items-center gap-2 text-violet-400 mb-2">
                                                    <FileCode className="w-4 h-4" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Clean Code</span>
                                                </div>
                                                <p className="text-sm text-white font-medium">{selectedReview.codeQualityScore || 92}/100</p>
                                            </motion.div>
                                        </motion.div>

                                        {/* Identified Issues */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-orange-500" /> Improvement Areas
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                {selectedReview.issues.map((issue: any, idx: number) => {
                                                    const isObject = typeof issue === 'object' && issue !== null;
                                                    const description = isObject ? issue.description : issue;
                                                    const severity = isObject ? issue.severity : 'medium';
                                                    const suggestion = isObject ? issue.suggestion : null;

                                                    return (
                                                        <div key={idx} className={`flex flex-col gap-2 p-4 rounded-xl border ${severity === 'high' ? 'bg-red-500/5 border-red-500/10' :
                                                                severity === 'medium' ? 'bg-orange-500/5 border-orange-500/10' :
                                                                    'bg-blue-500/5 border-blue-500/10'
                                                            }`}>
                                                            <div className="flex gap-4 items-start">
                                                                <div className="mt-1">
                                                                    <Terminal className={`w-4 h-4 ${severity === 'high' ? 'text-red-400' :
                                                                            severity === 'medium' ? 'text-orange-400' :
                                                                                'text-blue-400'
                                                                        }`} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">{description}</p>
                                                                    {suggestion && (
                                                                        <p className="text-xs text-slate-500 italic">💡 Suggestion: {suggestion}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Suggestions */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Sarthi Feedback
                                            </h3>
                                            <div className="p-6 rounded-2xl bg-[#0f0f1a] border border-[#1e1e2e] relative group">
                                                <MessageSquare className="absolute top-6 right-6 w-12 h-12 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors" />
                                                <p className="text-slate-300 italic leading-relaxed relative z-10">
                                                    "{selectedReview.feedback || "Your project shows a strong understanding of fundamental concepts. Focus on optimizing your database queries and implementing more robust error boundaries to reach the next level."}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-[#13131f] border border-dashed border-[#1e1e2e] rounded-2xl">
                                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                                        <Loader2 className="w-10 h-10 text-indigo-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Ready for Analysis</h3>
                                    <p className="text-slate-500 max-w-sm">
                                        Choose a previous project from the sidebar or submit a new GitHub URL to get a comprehensive AI review of your work.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
