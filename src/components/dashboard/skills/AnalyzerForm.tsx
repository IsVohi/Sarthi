"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, X } from "lucide-react";
import AnalyzerResults from "@/components/dashboard/skills/AnalyzerResults";

const skillCategories = [
    { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go"] },
    { title: "Frontend", items: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Redux"] },
    { title: "Backend", items: ["Node.js", "Express", "Django", "Spring Boot", "GraphQL"] },
    { title: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Supabase"] },
    { title: "DevOps & Cloud", items: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Linux"] },
    { title: "Core CS", items: ["DSA", "System Design", "OS", "Computer Networks", "DBMS"] },
];

export default function AnalyzerForm() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Form State
    const [targetCompanies, setTargetCompanies] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    
    // Controlled inputs for the rest couldn't hurt, but simplified for UI demo purposes

    const handleAddCompany = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            e.preventDefault();
            const newCompany = e.currentTarget.value.trim();
            if (!targetCompanies.includes(newCompany)) {
                setTargetCompanies([...targetCompanies, newCompany]);
            }
            e.currentTarget.value = "";
        }
    };

    const removeCompany = (company: string) => {
        setTargetCompanies(targetCompanies.filter((c) => c !== company));
    };

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate API call to Bedrock
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 3000);
    };

    return (
        <div className="space-y-8">
            {/* Input Form Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 md:p-8 relative overflow-hidden"
            >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] lg:via-[#8b5cf6] to-[#06b6d4]">Skill Gap</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Tell us about yourself and your target role. Our AWS Bedrock AI will identify exactly what you need to learn.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Left Column */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Year</label>
                                <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none">
                                    <option value="" disabled selected>Select Year</option>
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>4th Year</option>
                                    <option>Final Year</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Branch</label>
                                <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none">
                                    <option value="" disabled selected>Select Branch</option>
                                    <option>Computer Science (CS)</option>
                                    <option>Information Technology (IT)</option>
                                    <option>Electronics (ECE)</option>
                                    <option>Electrical (EE)</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">College Location Tier</label>
                                <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none">
                                    <option value="" disabled selected>Select Tier</option>
                                    <option>Tier 1 (IITs, NITs, BITS)</option>
                                    <option>Tier 2 (Top State/Private)</option>
                                    <option>Tier 3 (Local/Regional)</option>
                                    <option>Rural/Remote</option>
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Role</label>
                                <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none">
                                    <option value="" disabled selected>Select Role</option>
                                    <option>SDE Frontend</option>
                                    <option>SDE Backend</option>
                                    <option>Full Stack Developer</option>
                                    <option>ML/AI Engineer</option>
                                    <option>DevOps / Cloud Engineer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Companies (optional)</label>
                                <div className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-3 py-2 min-h-[50px] flex flex-wrap gap-2 focus-within:border-[#6366f1] focus-within:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all text-white">
                                    {targetCompanies.map((company) => (
                                        <span key={company} className="bg-white/10 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                                            {company}
                                            <button onClick={() => removeCompany(company)} className="text-slate-400 hover:text-white transition-colors">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder={targetCompanies.length === 0 ? "e.g. Google (Press Enter)" : "Add another..."}
                                        onKeyDown={handleAddCompany}
                                        className="bg-transparent border-none text-sm outline-none flex-grow min-w-[150px] h-8"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Experience with Projects</label>
                                <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none">
                                    <option value="" disabled selected>Select Experience</option>
                                    <option>Beginner (0 projects)</option>
                                    <option>Novice (1-2 basic projects)</option>
                                    <option>Intermediate (3-5 projects)</option>
                                    <option>Advanced (5+ or open source)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Current Skills Multi-select */}
                    <div className="mb-8 pt-6 border-t border-[#1e1e2e]">
                        <h3 className="text-sm font-semibold text-white mb-4">Current Skills</h3>
                        <div className="space-y-5">
                            {skillCategories.map((category) => (
                                <div key={category.title}>
                                    <p className="text-xs font-medium text-slate-500 mb-2">{category.title}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((skill) => {
                                            const isSelected = selectedSkills.includes(skill);
                                            return (
                                                <button
                                                    key={skill}
                                                    onClick={() => toggleSkill(skill)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                        isSelected
                                                            ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400"
                                                            : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:bg-white/10"
                                                    }`}
                                                >
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || showResults}
                        className="w-full relative bg-gradient-to-r from-[#6366f1] to-[#06b6d4] hover:opacity-90 text-white rounded-xl py-4 text-lg font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                        {isAnalyzing ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>AWS Bedrock is analyzing your profile...</span>
                            </div>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                {showResults ? "Analysis Complete" : "Analyze My Skill Gap"}
                                {!showResults && <Sparkles className="w-5 h-5" />}
                            </span>
                        )}

                        {/* Shimmer Effect while analyzing */}
                        {isAnalyzing && (
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        )}
                        {/* Shimmer Effect on hover (when not analyzing) */}
                        {!isAnalyzing && !showResults && (
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        )}
                    </button>
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
                        <AnalyzerResults />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
