import { Metadata } from "next";
import AnalyzerForm from "@/components/dashboard/skills/AnalyzerForm";

export const metadata: Metadata = {
  title: "Skill Gap Analyzer | Sarthi",
  description: "Identify what you need to learn to reach your dream role.",
};

export default function SkillGapPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <AnalyzerForm />
    </div>
  );
}
