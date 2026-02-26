"use client";

import { motion } from "framer-motion";

export function LanguageSupport() {
    return (
        <section className="py-24 relative z-10 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl p-[1px] bg-gradient-to-r from-[#06b6d4] to-[#10b981] overflow-hidden group"
                >
                    {/* Inner Card */}
                    <div className="bg-[#13131f] rounded-3xl p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

                        <div className="flex-1 relative z-10 text-center md:text-left">
                            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6 border border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                                <span className="text-3xl">🇮🇳</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#10b981]">Bharat</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Sarthi speaks your language. Ask questions in Hindi, English,
                                or Hinglish — our AI understands and responds naturally.
                            </p>
                        </div>

                        <div className="flex-1 w-full relative z-10 space-y-4">
                            {/* User Bubble */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex justify-end"
                            >
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tr-sm px-5 py-3.5 border border-white/5 max-w-[85%] shadow-lg">
                                    <p className="text-white text-sm">
                                        Backend development ke liye kya skills chahiye fresher ke liye?
                                    </p>
                                </div>
                            </motion.div>

                            {/* AI Bubble */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex justify-start"
                            >
                                <div className="bg-gradient-to-r from-[#06b6d4]/20 to-[#10b981]/20 backdrop-blur-md rounded-2xl rounded-tl-sm px-5 py-3.5 border border-[#06b6d4]/30 max-w-[90%] shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        Great question! For backend development, you should focus on learning a language like <strong>Node.js</strong> or <strong>Java</strong>, working with databases (SQL/NoSQL), and understanding REST APIs. Shall we add this to your learning path?
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
