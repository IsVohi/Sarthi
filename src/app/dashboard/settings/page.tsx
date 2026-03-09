"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";
import {
    User, Target, Bell, Database,
    Save, RotateCcw, Download, Github,
    Code2, X, Plus, Loader2
} from "lucide-react";
import { toast } from "sonner";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export default function SettingsPage() {
    const { user, setUser } = useSarthiStore();

    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(user.name);
    const [college, setCollege] = useState(user.college);
    const [city, setCity] = useState(user.city);
    const [year, setYear] = useState(user.year);
    const [branch, setBranch] = useState(user.branch);
    const [githubUrl, setGithubUrl] = useState(user.githubUrl);
    const [targetRole, setTargetRole] = useState(user.targetRole);
    const [timeline, setTimeline] = useState(user.timeline);
    const [companies, setCompanies] = useState(user.targetCompanies.join(", "));
    const [skills, setSkills] = useState<string[]>(user.currentSkills || []);
    const [newSkill, setNewSkill] = useState("");

    const [notifEmail, setNotifEmail] = useState(true);
    const [notifWeekly, setNotifWeekly] = useState(true);
    const [notifAchievements, setNotifAchievements] = useState(true);

    const handleSyncToBackend = async (data: any, successMsg: string) => {
        setIsSaving(true);
        try {
            const res = await API.saveOnboarding({
                email: user.email,
                ...data
            });
            if (res.success) {
                setUser(res.data);
                toast.success(successMsg);
            }
        } catch (error) {
            console.error("Failed to sync settings:", error);
            // toast handles in customFetch
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveProfile = () => {
        handleSyncToBackend({
            name,
            college,
            city,
            year,
            branch,
            githubUrl,
            avatar: name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
        }, "Profile saved successfully!");
    };

    const handleSaveGoals = () => {
        handleSyncToBackend({
            targetRole,
            timeline,
            targetCompanies: companies.split(",").map((c) => c.trim()).filter(Boolean),
        }, "Goals updated!");
    };

    const handleSaveSkills = () => {
        handleSyncToBackend({ currentSkills: skills }, "Skills updated!");
    };

    const addSkill = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const inputClass = "w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all text-sm disabled:opacity-50";

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl mx-auto pb-12 space-y-8">
            {/* Header */}
            <motion.div variants={fadeUp}>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">Settings</span>
                </h1>
                <p className="text-[#94a3b8] text-sm">Manage your profile, goals, and preferences</p>
            </motion.div>

            {/* Profile Card */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e]">
                    <User className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold text-white">Profile Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Full Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} disabled={isSaving} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">College</label>
                        <input value={college} onChange={(e) => setCollege(e.target.value)} className={inputClass} disabled={isSaving} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} disabled={isSaving} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Year</label>
                        <select value={year} onChange={(e) => setYear(e.target.value)} className={inputClass + " appearance-none"} disabled={isSaving}>
                            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Branch</label>
                        <select value={branch} onChange={(e) => setBranch(e.target.value)} className={inputClass + " appearance-none"} disabled={isSaving}>
                            <option>CS</option><option>IT</option><option>ECE</option><option>EE</option><option>ME</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">GitHub URL</label>
                        <div className="relative">
                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                            <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputClass + " pl-10"} disabled={isSaving} />
                        </div>
                    </div>
                </div>

                <button onClick={handleSaveProfile} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile
                </button>
            </motion.div>

            {/* Skills Card */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e]">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white">Technical Skills</h2>
                </div>

                <div className="space-y-4">
                    <form onSubmit={addSkill} className="flex gap-2">
                        <input
                            placeholder="Add a skill (e.g. React, Node.js)"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className={inputClass}
                            disabled={isSaving}
                        />
                        <button type="submit" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white" disabled={isSaving}>
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-[#0a0a0f] rounded-xl border border-[#1e1e2e]">
                        {skills.length === 0 && <p className="text-xs text-slate-500 italic">No skills added yet.</p>}
                        {skills.map((skill) => (
                            <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-lg text-xs font-semibold">
                                {skill}
                                <button onClick={() => removeSkill(skill)} disabled={isSaving} className="hover:text-red-400 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <button onClick={handleSaveSkills} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Skills
                </button>
            </motion.div>

            {/* Goals Card */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e]">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-bold text-white">Career Goals</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Target Role</label>
                        <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className={inputClass + " appearance-none"} disabled={isSaving}>
                            <option>Backend SDE</option><option>Full Stack SDE</option><option>Frontend SDE</option><option>DevOps Engineer</option><option>Data Engineer</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Timeline</label>
                        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className={inputClass + " appearance-none"} disabled={isSaving}>
                            <option>1 month</option><option>3 months</option><option>6 months</option><option>12 months</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Target Companies (comma-separated)</label>
                    <input value={companies} onChange={(e) => setCompanies(e.target.value)} placeholder="Flipkart, Razorpay, Zerodha" className={inputClass} disabled={isSaving} />
                </div>

                <button onClick={handleSaveGoals} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Goals
                </button>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e]">
                    <Bell className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold text-white">Notifications</h2>
                </div>
                {[
                    { label: "Email Notifications", desc: "Receive updates via email", value: notifEmail, set: setNotifEmail },
                    { label: "Weekly Progress Digest", desc: "Summary of your weekly activity", value: notifWeekly, set: setNotifWeekly },
                    { label: "Achievement Alerts", desc: "Get notified when you earn badges", value: notifAchievements, set: setNotifAchievements },
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2">
                        <div>
                            <p className="text-sm font-medium text-white">{item.label}</p>
                            <p className="text-xs text-[#94a3b8]">{item.desc}</p>
                        </div>
                        <button
                            onClick={() => item.set(!item.value)}
                            className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? "bg-indigo-500" : "bg-[#1e1e2e]"}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                        </button>
                    </div>
                ))}
            </motion.div>

            {/* Danger Zone */}
            <motion.div variants={fadeUp} className="bg-[#13131f] border border-red-500/20 rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-[#1e1e2e]">
                    <Database className="w-5 h-5 text-red-400" />
                    <h2 className="text-lg font-bold text-white">Data & Account</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => toast.success("Progress data exported!")}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#94a3b8] border border-[#1e1e2e] hover:border-[#6366f1]/30 rounded-xl transition-all hover:text-white"
                    >
                        <Download className="w-4 h-4" /> Export Data
                    </button>
                    <button
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                localStorage.removeItem("sarthi-store");
                                toast.success("Progress reset. Reloading...");
                                setTimeout(() => window.location.reload(), 1000);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <RotateCcw className="w-4 h-4" /> Reset All Progress
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
