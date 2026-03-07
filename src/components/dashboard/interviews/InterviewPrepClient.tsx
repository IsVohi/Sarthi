"use client";

import { useEffect, useState } from "react";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";
import { toast } from "sonner";
import { Bot, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InterviewPrepClient({ children }: { children: React.ReactNode }) {
    const { user, interviewPrep, setInterviewPrep } = useSarthiStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchInterviewPlan = async () => {
            if (interviewPrep.generated) return;
            if (!user.targetRole || !user.targetCompanies.length) return;

            setIsLoading(true);
            try {
                // Determine user level based on year/experience (simplified for demo)
                const level = user.year.includes("1st") || user.year.includes("2nd") ? "Beginner" : "Intermediate to Advanced";

                const response = await API.getInterviewPrep({
                    targetRole: user.targetRole,
                    targetCompanies: user.targetCompanies,
                    level: level
                });

                if (response.success && response.data) {
                    setInterviewPrep({
                        generated: true,
                        dsaQuestions: response.data.dsaQuestions || [],
                        systemDesign: response.data.systemDesign || [],
                        behavioral: response.data.behavioral || []
                    });
                    toast.success("Interview Prep Plan Generated!");
                }
            } catch (error: any) {
                console.error("Failed to generate interview prep:", error);
                toast.error("Failed to generate interview prep plan. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterviewPlan();
    }, [user, interviewPrep.generated, setInterviewPrep]);

    if (!user.targetRole || !user.targetCompanies.length) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-2">
                    <Bot className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Target Role Required</h3>
                <p className="text-slate-400 max-w-md">
                    Sarthi needs to know your target role and companies to generate an accurate interview prep plan.
                </p>
                <Link
                    href="/dashboard/settings"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors mt-4"
                >
                    Update Profile <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                    <Bot className="w-16 h-16 text-indigo-400 relative z-10 animate-pulse" />
                    <div className="absolute -bottom-2 -right-2 bg-[#0f0f1a] rounded-full p-1 border border-[#1e1e2e]">
                        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Generating Interview Kit...</h3>
                <p className="text-slate-400 max-w-sm text-center text-sm">
                    Sarthi is researching technical questions and behavioral scenarios for your target role at {user.targetCompanies[0] || "top companies"}...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
