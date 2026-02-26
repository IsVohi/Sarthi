"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Github, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

// --- Types ---
type OnboardingData = {
    fullName: string;
    college: string;
    city: string;
    year: string;
    branch: string;
    skills: string[];
    customSkill: string;
    targetRole: string;
    targetCompanies: string[];
    timeline: string;
    githubUrl: string;
};

// --- Animations ---
const fadeVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function OnboardingFlow() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [data, setData] = useState<OnboardingData>({
        fullName: "",
        college: "",
        city: "",
        year: "",
        branch: "",
        skills: [],
        customSkill: "",
        targetRole: "",
        targetCompanies: [],
        timeline: "",
        githubUrl: "",
    });

    const nextStep = () => {
        if (step < 5) {
            setDirection(1);
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const updateData = (fields: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...fields }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);

        // Confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    // Render current step component
    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepWelcome nextStep={nextStep} />;
            case 2:
                return <StepBasicInfo data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
            case 3: return <StepSkills data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
            case 4: return <StepRole data={data} updateData={updateData} nextStep={nextStep} prevStep={prevStep} />;
            case 5: return <StepFinish data={data} updateData={updateData} handleSubmit={handleSubmit} prevStep={prevStep} isSubmitting={isSubmitting} />;
            default:
                return null; // temporary
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#6366f1]/10 to-[#8b5cf6]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10 glass-card rounded-2xl p-8 shadow-2xl overflow-hidden pb-12">
                {/* Progress Bar Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                        <span className="font-bold text-white tracking-tight">Sarthi Setup</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        Step {step} of 5
                    </div>
                </div>

                {/* Top Progress Line */}
                <div className="flex gap-2 mb-10 w-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${i < step
                                ? "bg-[#6366f1]" // Completed
                                : i === step
                                    ? "bg-gradient-to-r from-[#6366f1] to-[#06b6d4] shadow-[0_0_10px_rgba(99,102,241,0.5)]" // Active
                                    : "bg-white/10" // Upcoming
                                }`}
                        />
                    ))}
                </div>

                {/* Step Content with AnimatePresence */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={fadeVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute inset-0 w-full"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// --- Step Components ---

function StepWelcome({ nextStep }: { nextStep: () => void }) {
    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center flex flex-col items-center justify-center h-full pt-6">
            <motion.div variants={staggerItem} className="text-6xl mb-6">🎓</motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
                Welcome to Sarthi
            </motion.h2>
            <motion.p variants={staggerItem} className="text-slate-400 text-lg max-w-sm mb-12">
                Let&apos;s build your personalized career roadmap. This takes about 2 minutes.
            </motion.p>
            <motion.button
                variants={staggerItem}
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] group"
            >
                Let&apos;s Begin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </motion.div>
    );
}

function StepBasicInfo({ data, updateData, nextStep, prevStep }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void; nextStep: () => void; prevStep: () => void; }) {
    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full">
            <motion.div variants={staggerItem} className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
                <p className="text-slate-400 text-sm">This helps us personalize your journey.</p>
            </motion.div>

            <div className="space-y-4 flex-grow">
                <motion.div variants={staggerItem}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={data.fullName}
                        onChange={(e) => updateData({ fullName: e.target.value })}
                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={staggerItem}>
                        <input
                            type="text"
                            placeholder="College/University"
                            value={data.college}
                            onChange={(e) => updateData({ college: e.target.value })}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                        />
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <input
                            type="text"
                            placeholder="City"
                            value={data.city}
                            onChange={(e) => updateData({ city: e.target.value })}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={staggerItem}>
                        <select
                            value={data.year}
                            onChange={(e) => updateData({ year: e.target.value })}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none"
                        >
                            <option value="" disabled className="text-slate-500">Year of Study</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                            <option value="final">Final Year</option>
                        </select>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <select
                            value={data.branch}
                            onChange={(e) => updateData({ branch: e.target.value })}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none"
                        >
                            <option value="" disabled className="text-slate-500">Branch</option>
                            <option value="CS">Computer Science</option>
                            <option value="IT">Information Technology</option>
                            <option value="ECE">Electronics (ECE)</option>
                            <option value="EE">Electrical (EE)</option>
                            <option value="ME">Mechanical</option>
                            <option value="CE">Civil</option>
                            <option value="Other">Other</option>
                        </select>
                    </motion.div>
                </div>
            </div>

            <motion.div variants={staggerItem} className="flex justify-between mt-8">
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-all">
                    Next <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </motion.div>
    );
}

const skillCategories = [
    {
        name: "Languages",
        skills: ["Python", "JavaScript", "Java", "C++", "TypeScript", "Go", "Rust"]
    },
    {
        name: "Frontend",
        skills: ["HTML/CSS", "React", "Vue", "Angular", "Next.js", "Tailwind"]
    },
    {
        name: "Backend",
        skills: ["Node.js", "Express", "Django", "FastAPI", "Spring Boot"]
    },
    {
        name: "Databases",
        skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase", "Redis"]
    },
    {
        name: "Tools",
        skills: ["Git", "Docker", "Linux", "AWS", "GCP"]
    },
    {
        name: "CS Fundamentals",
        skills: ["DSA", "OOP", "DBMS", "OS", "Networks", "System Design"]
    }
];

function StepSkills({ data, updateData, nextStep, prevStep }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void; nextStep: () => void; prevStep: () => void; }) {
    const toggleSkill = (skill: string) => {
        if (data.skills.includes(skill)) {
            updateData({ skills: data.skills.filter((s: string) => s !== skill) });
        } else {
            updateData({ skills: [...data.skills, skill] });
        }
    };

    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full">
            <motion.div variants={staggerItem} className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">What do you know already?</h2>
                <p className="text-slate-400 text-sm">Select all that apply</p>
            </motion.div>

            <div className="flex-grow overflow-y-auto pr-2 pb-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {skillCategories.map((cat, i) => (
                    <motion.div key={i} variants={staggerItem}>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{cat.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill: string) => {
                                const isSelected = data.skills.includes(skill);
                                return (
                                    <motion.button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        whileTap={{ scale: 0.95 }}
                                        animate={{ scale: isSelected ? 1.05 : 1 }}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${isSelected
                                            ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 border"
                                            : "bg-[#0f0f1a] border border-[#1e1e2e] text-[#94a3b8] hover:border-white/20"
                                            }`}
                                    >
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                        {skill}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}

                <motion.div variants={staggerItem} className="pt-2">
                    <input
                        type="text"
                        placeholder="Other skills (e.g. Figma, Unity)..."
                        value={data.customSkill}
                        onChange={(e) => updateData({ customSkill: e.target.value })}
                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                    />
                </motion.div>
            </div>

            <motion.div variants={staggerItem} className="flex justify-between mt-4 pt-4 border-t border-white/5">
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-all">
                    Next <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </motion.div>
    );
}

const roles = [
    { icon: "💻", title: "Frontend Developer" },
    { icon: "⚙️", title: "Backend Developer" },
    { icon: "🌐", title: "Full Stack Developer" },
    { icon: "🤖", title: "ML/AI Engineer" },
    { icon: "☁️", title: "DevOps/Cloud" },
    { icon: "🔒", title: "Cybersecurity" },
    { icon: "📱", title: "Mobile Developer" },
    { icon: "📊", title: "Data Engineer" },
    { icon: "🔗", title: "Blockchain Developer" },
];

function StepRole({ data, updateData, nextStep, prevStep }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void; nextStep: () => void; prevStep: () => void; }) {
    const handleAddCompany = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault();
            const newCompany = e.currentTarget.value.trim();
            if (!data.targetCompanies.includes(newCompany)) {
                updateData({ targetCompanies: [...data.targetCompanies, newCompany] });
            }
            e.currentTarget.value = '';
        }
    };

    const removeCompany = (company: string) => {
        updateData({ targetCompanies: data.targetCompanies.filter((c: string) => c !== company) });
    };

    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full">
            <motion.div variants={staggerItem} className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">What&apos;s your dream role?</h2>
                <p className="text-slate-400 text-sm">We&apos;ll tailor your roadmap to this goal.</p>
            </motion.div>

            <div className="flex-grow space-y-6 overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <motion.div variants={staggerItem} className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {roles.map((role) => {
                        const isSelected = data.targetRole === role.title;
                        return (
                            <button
                                key={role.title}
                                onClick={() => updateData({ targetRole: role.title })}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${isSelected
                                    ? "bg-indigo-500/10 border-indigo-500 border shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                    : "bg-[#0f0f1a] border border-[#1e1e2e] hover:border-white/20"
                                    }`}
                            >
                                <span className="text-2xl mb-2">{role.icon}</span>
                                <span className="text-xs font-medium text-slate-300 text-center">{role.title}</span>
                            </button>
                        );
                    })}
                </motion.div>

                <motion.div variants={staggerItem}>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Companies (optional)</label>
                    <div className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-3 py-2 min-h-[50px] flex flex-wrap gap-2 focus-within:border-[#6366f1] focus-within:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
                        {data.targetCompanies.map((company: string) => (
                            <span key={company} className="bg-white/10 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                                {company}
                                <button onClick={() => removeCompany(company)} className="text-slate-400 hover:text-white transition-colors">&times;</button>
                            </span>
                        ))}
                        <input
                            type="text"
                            placeholder={data.targetCompanies.length === 0 ? "e.g. Google, Atlassian (Press Enter)" : "Add another..."}
                            onKeyDown={handleAddCompany}
                            className="bg-transparent border-none text-white text-sm outline-none flex-grow min-w-[150px]"
                        />
                    </div>
                </motion.div>

                <motion.div variants={staggerItem}>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Timeline</label>
                    <select
                        value={data.timeline}
                        onChange={(e) => updateData({ timeline: e.target.value })}
                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all appearance-none"
                    >
                        <option value="" disabled className="text-slate-500">Select timeline</option>
                        <option value="1 month">1 month</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year+</option>
                    </select>
                </motion.div>
            </div>

            <motion.div variants={staggerItem} className="flex justify-between mt-4 border-t border-white/5 pt-4">
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={nextStep} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-all">
                    Next <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </motion.div>
    );
}

function StepFinish({ data, updateData, handleSubmit, prevStep, isSubmitting }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void; handleSubmit: () => void; prevStep: () => void; isSubmitting: boolean; }) {
    return (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col h-full">
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <motion.div variants={staggerItem} className="w-16 h-16 bg-[#0f0f1a] rounded-2xl flex items-center justify-center border border-[#1e1e2e] mb-6 shadow-inner">
                    <Github className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h2 variants={staggerItem} className="text-2xl font-bold text-white mb-2">Link your GitHub (optional)</motion.h2>
                <motion.p variants={staggerItem} className="text-slate-400 text-sm mb-8 max-w-sm">
                    We&apos;ll analyze your projects for better recommendations and personalized code reviews.
                </motion.p>

                <motion.div variants={staggerItem} className="w-full relative mb-12">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Github className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={data.githubUrl}
                        onChange={(e) => updateData({ githubUrl: e.target.value })}
                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all"
                    />
                </motion.div>

                <motion.div variants={staggerItem} className="w-full">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full relative bg-gradient-to-r from-[#6366f1] to-[#06b6d4] hover:opacity-90 text-white rounded-xl py-4 text-lg font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Processing Profile...</span>
                            </div>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Generate My Learning Path <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                        {/* Shimmer effect inside button on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                        <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" />
                        Powered by AWS Bedrock AI
                    </div>
                </motion.div>
            </div>

            <motion.div variants={staggerItem} className="flex justify-start mt-4 pt-4 border-t border-white/5">
                <button onClick={prevStep} disabled={isSubmitting} className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
            </motion.div>
        </motion.div>
    );
}
