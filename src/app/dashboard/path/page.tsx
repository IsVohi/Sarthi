"use client";

import { useEffect } from "react";
import PathHeader from "@/components/dashboard/path/PathHeader";
import WeekTimeline from "@/components/dashboard/path/WeekTimeline";
import WeekCard from "@/components/dashboard/path/WeekCard";
import ResourcesPanel from "@/components/dashboard/path/ResourcesPanel";
import { useSarthiStore } from "@/lib/store/userStore";
import { API } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

// Removed mock weekData.

export default function LearningPathPage() {
  const { learningPath, skillGap, setLearningPath } = useSarthiStore();

  useEffect(() => {
    const generatePath = async () => {
      if (!learningPath.generated && skillGap.analyzed) {
        try {
          toast.info("Generating your personalized roadmap...");
          const res = await API.generateLearningPath(skillGap);

          const newPath = {
            generated: true,
            totalWeeks: res.data.totalWeeks,
            currentWeek: res.data.currentWeek || 1,
            weeklyPlan: res.data.weeklyPlan,
            overallProgress: 0,
          };
          setLearningPath(newPath);
          toast.success("Your personalized roadmap is ready!");
        } catch (error: any) {
          toast.error(error.message || "Failed to generate roadmap.");
        }
      }
    };

    generatePath();
  }, [learningPath.generated, skillGap.analyzed, skillGap, setLearningPath]);

  if (!learningPath.generated) {
    if (!skillGap.analyzed) {
      return (
        <div className="max-w-5xl mx-auto pb-12 min-h-[500px] flex flex-col items-center justify-center space-y-6 text-center">
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">No Learning Path Yet</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Your personalized learning path is built based on your individual skill gaps.
              Complete the skill gap analysis first to generate your roadmap.
            </p>
          </div>
          <Link
            href="/dashboard/skills"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Go to Skill Gap Analyzer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto pb-12 min-h-[500px] flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <h2 className="text-xl font-bold text-white">Structuring Your Curriculum...</h2>
        <p className="text-slate-400">Our AI is designing a schedule mapping perfectly to your skill gaps.</p>
      </div>
    );
  }

  // Map store schema into timeline UI props
  const timelineWeeks = learningPath.weeklyPlan.map((wk: any) => ({
    weekNumber: wk.week,
    title: wk.theme,
    isCurrent: wk.week === learningPath.currentWeek,
    isCompleted: wk.completed,
  }));

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      <PathHeader />
      <WeekTimeline currentWeek={learningPath.currentWeek} weeks={timelineWeeks} />

      <div className="space-y-4">
        {learningPath.weeklyPlan.map((week, idx) => (
          <WeekCard key={week.week} weekData={week} weekIndex={idx} currentWeek={learningPath.currentWeek} />
        ))}
      </div>

      <ResourcesPanel />
    </div>
  );
}
