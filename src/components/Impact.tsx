"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "10L+", label: "Engineering students in non-tier-1 colleges" },
    { value: "4x", label: "Faster skill gap identification vs manual research" },
    { value: "₹0", label: "Cost to access personalized AI mentorship" },
    { value: "7 Days", label: "Average time to complete first learning milestone" },
];

export function Impact() {
    return (
        <section id="impact" className="py-24 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-[#0f0f1a] rounded-[2rem] border border-white/5 overflow-hidden p-10 md:p-16"
                >
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#6366f1]/10 blur-[120px] pointer-events-none rounded-[100%]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 lg:divide-white/10 sm:[&>*:nth-child(even)]:border-l lg:[&>*:nth-child(even)]:border-l-white/10 sm:[&>*:nth-child(odd)]:border-l-0 lg:[&>*:nth-child(odd)]:border-l border-white/10 [&>*:first-child]:border-l-0">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex flex-col items-center text-center px-6 pt-10 sm:pt-0 first:pt-0"
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#6366f1] mb-4">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400 font-medium max-w-[200px] leading-relaxed">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
