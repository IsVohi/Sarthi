import { Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[#6366f1]/5 blur-[100px] pointer-events-none" />
            
            <div className="relative flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#6366f1] blur-md opacity-40 rounded-full animate-ping" />
                    <div className="relative w-16 h-16 bg-[#13131f] border border-[#1e1e2e] rounded-2xl flex items-center justify-center shrink-0">
                        <Sparkles className="w-8 h-8 text-[#8b5cf6] animate-pulse" />
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-sm font-medium text-slate-400 tracking-wider uppercase">Loading</span>
                </div>
            </div>
        </div>
    );
}
