import { Metadata } from "next";
import InterviewHeader from "@/components/dashboard/interviews/InterviewHeader";
import InterviewTabs from "@/components/dashboard/interviews/InterviewTabs";

export const metadata: Metadata = {
  title: "Interview Prep | Sarthi",
  description: "AI-powered interview practice for software engineering roles.",
};

export default function InterviewPrepPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8 h-full flex flex-col">
      <InterviewHeader />
      <InterviewTabs />
    </div>
  );
}
