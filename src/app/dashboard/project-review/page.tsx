import { Metadata } from "next";
import ProjectInput from "@/components/dashboard/projects/ProjectInput";
import { Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Project Review | Sarthi",
  description: "Get production-ready feedback on your GitHub projects.",
};

export default function ProjectReviewPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]">Review</span>
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Submit your GitHub project and get detailed production-ready feedback powered by AWS Bedrock Claude 3
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded-full shrink-0">
          <Cloud className="w-4 h-4 text-[#06b6d4]" />
          <span className="text-xs font-bold text-[#06b6d4] tracking-wider uppercase">AWS Bedrock</span>
        </div>
      </div>

      <ProjectInput />
    </div>
  );
}
