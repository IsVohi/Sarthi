"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
    {
        num: "1",
        title: "Create Profile",
        desc: "Enter your year, branch, skills and target role",
        href: "/onboarding",
    },
    {
        num: "2",
        title: "AI Gap Analysis",
        desc: "Bedrock AI scans your profile against 100+ job requirements",
        href: "/dashboard/skills",
    },
    {
        num: "3",
        title: "Get Your Roadmap",
        desc: "Receive a personalized week-by-week learning plan",
        href: "/dashboard/path",
    },
    {
        num: "4",
        title: "Build & Review",
        desc: "Submit projects for AI-powered production-ready feedback",
        href: "/dashboard/project-review",
    },
    {
        num: "5",
        title: "Ace Interviews",
        desc: "Practice with role-specific questions and get instant feedback",
        href: "/dashboard/interview-prep",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#6366f1]/5 blur-[100px] pointer-events-none rounded-[100%]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        <span className="text-white">From Student to </span>
                        <span className="text-gradient-primary">Job-Ready</span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative"
                >
                    {/* Connecting gradient line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] opacity-30" />

                    {/* Connecting gradient line (Mobile) */}
                    <div className="md:hidden absolute top-[20px] bottom-[20px] left-[28px] w-[2px] bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] opacity-30" />

                    <div className="flex flex-col md:flex-row gap-10 md:gap-4 justify-between">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-4 group md:flex-1"
                            >
                                <Link href={step.href} className="contents">
                                    {/* Number Circle */}
                                    <div className="relative flex-shrink-0 z-10">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#06b6d4] rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#13131f] border-2 border-[#1e1e2e] group-hover:border-[#6366f1] transition-colors duration-300 flex items-center justify-center relative shadow-lg">
                                            <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#06b6d4]">
                                                {step.num}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:text-center pt-2 md:pt-4">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] transition-all">{step.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] md:mx-auto mb-2">
                                            {step.desc}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Try now <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
