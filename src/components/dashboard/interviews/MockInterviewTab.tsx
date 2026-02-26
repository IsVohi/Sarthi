"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Video, Settings2, Play, Square, Circle, Sparkles, AlertCircle } from "lucide-react";

export default function MockInterviewTab() {
    const [isConfiguring, setIsConfiguring] = useState(true);
    const [interviewActive, setInterviewActive] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [videoOn, setVideoOn] = useState(false);

    const startInterview = () => {
        setIsConfiguring(false);
        // Simulate loading then starting
        setTimeout(() => setInterviewActive(true), 1500);
    };

    const stopInterview = () => {
        setInterviewActive(false);
        setIsConfiguring(true);
    };

    return (
        <div className="h-full min-h-[500px] flex flex-col md:flex-row gap-6 relative">
            
            {/* Configuration Overlay (Shown initially) */}
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
                                <h2 className="text-xl font-bold text-white">Interview Settings</h2>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Company Type Target</label>
                                    <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 appearance-none text-sm cursor-pointer">
                                        <option>FAANG / Tier 1 (Heavy DSA/Design)</option>
                                        <option>High-Growth Startup (Practical API/DB)</option>
                                        <option>Service Based (Core Java/Concepts)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Interview Length</label>
                                    <select className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 appearance-none text-sm cursor-pointer">
                                        <option>45 Minutes (Standard)</option>
                                        <option>60 Minutes (Deep Dive)</option>
                                        <option>20 Minutes (Quick Screening)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button 
                                    onClick={startInterview}
                                    className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-current" /> Start Mock
                                </button>
                            </div>
                            
                            <div className="mt-6 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex gap-2">
                                <AlertCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-emerald-400">Audio and Video processing happens locally in your browser. No recordings are saved.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Interview Content */}
            
            {/* Main AI Avatar / Shared Screen Area */}
            <div className="flex-1 bg-[#0f0f1a] border border-[#1e1e2e] rounded-2xl overflow-hidden relative group">
                {!interviewActive && !isConfiguring && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-400">
                        <Sparkles className="w-10 h-10 animate-bounce mb-3" />
                        <p className="font-bold">Connecting to Sarthi AI Sandbox...</p>
                    </div>
                )}
                
                {interviewActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] to-[#13131f]">
                        <div className="relative">
                            {/* Pulsing rings based on speaking volume (simulated via Framer Motion) */}
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} 
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="absolute inset-0 bg-indigo-500 rounded-full blur-[20px]" 
                            />
                            <motion.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }} 
                                transition={{ repeat: Infinity, duration: 2, delay: 0.2, ease: "easeInOut" }}
                                className="absolute inset-0 bg-cyan-500 rounded-full blur-[30px]" 
                            />
                            
                            <div className="w-40 h-40 rounded-full bg-[#1e1e2e] border-4 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.3)] flex items-center justify-center relative z-10 overflow-hidden">
                                <div className="text-3xl">🤖</div>
                            </div>
                            
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1e1e2e]/80 backdrop-blur w-max px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-2 shadow-lg">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                Sarthi AI Interviewer
                            </div>
                        </div>

                        {/* Transcript Subtitles Overlay */}
                        <div className="absolute bottom-10 left-10 right-10 text-center">
                            <span className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl text-lg font-medium text-white inline-block max-w-xl shadow-xl border border-white/5">
                                &quot;Welcome to the interview. Could you start by introducing yourself and telling me about an interesting project you&apos;ve worked on recently?&quot;
                            </span>
                        </div>
                    </div>
                )}

                {/* User Camera Preview (PIP) */}
                <div className="absolute top-6 right-6 w-48 aspect-video bg-[#1e1e2e] border-2 border-[#2a2a35] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center flex-col z-20">
                    {videoOn ? (
                        <span className="text-xs text-slate-500">Camera Feed Active</span>
                    ) : (
                        <>
                            <Video className="w-8 h-8 text-slate-600 mb-2" />
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Camera Off</span>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar Tools / Transcript */}
            <div className="w-full md:w-80 flex flex-col gap-4">
                
                {/* Control Panel */}
                <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-4 flex flex-col max-h-[160px]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
                            <Circle className="w-3 h-3 fill-current" /> Live
                        </span>
                        <span className="font-mono text-sm text-slate-300 font-medium">00:03:42</span>
                    </div>

                    <div className="flex gap-2 justify-center">
                        {/* Mic Toggle */}
                        <button 
                            onClick={() => setMicOn(!micOn)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-[#2a2a35] text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30'}`}
                            title={micOn ? "Mute" : "Unmute"}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                        
                        {/* Video Toggle */}
                        <button 
                            onClick={() => setVideoOn(!videoOn)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-[#2a2a35] text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30'}`}
                            title={videoOn ? "Turn Video Off" : "Turn Video On"}
                        >
                            <Video className="w-5 h-5" />
                        </button>
                        
                        {/* End Interview */}
                        <button 
                            onClick={stopInterview}
                            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all ml-4"
                            title="End Interview"
                        >
                            <Square className="w-4 h-4 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Live Transcript / Notes */}
                <div className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl flex-1 overflow-hidden flex flex-col min-h-[300px]">
                    <div className="p-4 border-b border-[#1e1e2e] bg-[#0f0f1a]">
                        <h3 className="font-bold text-white text-sm">Live Transcript</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                        {interviewActive ? (
                            <>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-indigo-400">Interviewer</span>
                                    <p className="text-sm text-slate-300 bg-[#0f0f1a] p-3 rounded-lg border border-[#1e1e2e]">
                                        Welcome to the interview. Could you start by introducing yourself and telling me about an interesting project you&apos;ve worked on recently?
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-bold text-emerald-400">You (Transcribing...)</span>
                                    <p className="text-sm text-emerald-100 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 flex gap-1">
                                        Hi, thanks for having me. I&apos;m currently a 3rd year student... <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse mt-0.5" />
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                                Transcript will appear here...
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
