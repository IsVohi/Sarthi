import { Metadata } from "next";
import PathHeader from "@/components/dashboard/path/PathHeader";
import WeekTimeline from "@/components/dashboard/path/WeekTimeline";
import WeekCard from "@/components/dashboard/path/WeekCard";
import ResourcesPanel from "@/components/dashboard/path/ResourcesPanel";

export const metadata: Metadata = {
  title: "Learning Path | Sarthi",
  description: "Your personalized week-by-week curriculum to reach your goals.",
};

const weekData = [
    { weekNumber: 1, title: "Backend Fundamentals", topics: ["Node.js Basics", "HTTP Protocols", "Express Setup"], isCurrent: false, isCompleted: true },
    { weekNumber: 2, title: "Database Architecture", topics: ["SQL & Joins", "DB Modeling", "Connecting DBs"], isCurrent: true, isCompleted: false },
    { weekNumber: 3, title: "REST APIs & Auth", topics: ["API Design", "JWT Auth", "OAuth 2.0"], isCurrent: false, isCompleted: false },
    { weekNumber: 4, title: "Advanced Backend", topics: ["Redis Caching", "WebSockets", "Message Queues"], isCurrent: false, isCompleted: false },
    { weekNumber: 5, title: "System Design Prep", topics: ["Scalability", "Load Balancing", "Microservices"], isCurrent: false, isCompleted: false },
    { weekNumber: 6, title: "DevOps & Deployment", topics: ["Docker", "CI/CD Actions", "AWS EC2 Deployment"], isCurrent: false, isCompleted: false },
];

export default function LearningPathPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      <PathHeader />
      <WeekTimeline currentWeek={2} weeks={weekData} />
      
      <div className="space-y-4">
        {weekData.map((week) => (
            <WeekCard key={week.weekNumber} week={week} />
        ))}
      </div>

      <ResourcesPanel />
    </div>
  );
}
