"use client";

import { motion, Variants } from "framer-motion";
import { Brain, Map, Github, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Skill Gap Analyzer",
        desc: "Tell us your year, branch, and target role. Our AI powered by AWS Bedrock analyzes exactly what skills you're missing and why.",
        icon: <Brain className="w-8 h-8 text-[#6366f1]" />,
        iconBg: "bg-[#6366f1]/10",
        tag: "Most Used Feature",
        tagColor: "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30",
        href: "/dashboard/skills",
    },
    {
        title: "Personalized Learning Path",
        desc: "Get a week-by-week roadmap with daily tasks, DSA problems, and mini-projects tailored to your current level and target role.",
        icon: <Map className="w-8 h-8 text-[#8b5cf6]" />,
        iconBg: "bg-[#8b5cf6]/10",
        tag: "4-8 Week Plans",
        tagColor: "bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30",
        href: "/dashboard/path",
    },
    {
        title: "AI Project Review",
        desc: "Submit your GitHub project and get detailed feedback on production-readiness, security, architecture, and a rewritten README.",
        icon: <Github className="w-8 h-8 text-[#06b6d4]" />,
        iconBg: "bg-[#06b6d4]/10",
        tag: "GitHub Integration",
        tagColor: "bg-[#06b6d4]/20 text-[#06b6d4] border-[#06b6d4]/30",
        href: "/dashboard/project-review",
    },
    {
        title: "Interview Prep Coach",
        desc: "Role-specific DSA problems, system design questions, and behavioral prep with STAR-method answers — all personalized for you.",
        icon: <MessageSquare className="w-8 h-8 text-[#10b981]" />,
        iconBg: "bg-[#10b981]/10",
        tag: "Company-Specific",
        tagColor: "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
        href: "/dashboard/interview-prep",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Features() {
    return (
        <section id="features" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        <span className="text-white">Everything You Need to </span>
                        <span className="text-gradient-primary">Get Hired</span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {features.map((feature, index) => (
                        <Link key={index} href={feature.href}>
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="glass-card neon-border-hover rounded-3xl p-8 md:p-10 flex flex-col h-full relative overflow-hidden group cursor-pointer"
                            >
                                {/* Subtle background glow based on icon color */}
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[50px] pointer-events-none">
                                    <div className={`w-32 h-32 rounded-full ${feature.iconBg.replace('/10', '')}`} />
                                </div>

                                <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} border border-white/5 flex items-center justify-center mb-8`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium flex-grow mb-8">
                                    {feature.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border ${feature.tagColor}`}>
                                        {feature.tag}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm font-medium text-[#94a3b8] group-hover:text-white transition-colors">
                                        Try it <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
