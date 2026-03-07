"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { API } from "@/lib/api";
import { useSarthiStore } from "@/lib/store/userStore";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setOnboardingComplete, loadFromCloud, demoLogin } = useSarthiStore();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("Please enter both email and password");
            return;
        }

        setIsLoading(true);
        try {
            // New secure sign-in API
            const res = await API.signin({ email, password });

            if (!res.success) {
                throw new Error(res.error || "Invalid credentials");
            }

            // Set user profile from the returned data
            setUser(res.data);

            // Load their progress (Skill Gap, Learning Path, etc)
            await loadFromCloud(email);

            setOnboardingComplete();
            toast.success("Welcome back!");
            router.push("/dashboard");

        } catch (error: any) {
            toast.error(error.message || "Failed to sign in. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemo = () => {
        demoLogin();
        router.push("/dashboard");
    };

    return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#6366f1]/30 selection:text-white">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#6366f1]/10 to-[#8b5cf6]/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay pointer-events-none" />

            <div className="w-full max-w-md relative z-10 glass-card rounded-2xl p-8 shadow-2xl">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-6 h-6 text-[#8b5cf6]" />
                    <span className="font-bold text-2xl text-white tracking-tight">Sign in back to Sarthi</span>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full relative bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white rounded-xl py-3.5 font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Checking account...</span>
                            </div>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-[#1e1e2e] text-center space-y-4">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-[#6366f1] hover:text-indigo-400 font-semibold transition-colors">
                            Sign up here
                        </Link>
                    </p>
                    <button
                        onClick={handleDemo}
                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Try Demo Mode instead
                    </button>
                </div>
            </div>
        </main>
    );
}
