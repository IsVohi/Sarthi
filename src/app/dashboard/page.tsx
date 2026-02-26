import { Metadata } from "next";
import TopHeader from "@/components/dashboard/TopHeader";
import StatsRow from "@/components/dashboard/StatsRow";
import SkillGapChart from "@/components/dashboard/SkillGapChart";
import LearningPathProgress from "@/components/dashboard/LearningPathProgress";
import BottomRow from "@/components/dashboard/BottomRow";

export const metadata: Metadata = {
    title: "Dashboard | Sarthi",
    description: "Your personalized AI career navigator dashboard.",
};

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <TopHeader />
            <StatsRow />
            <SkillGapChart />
            <LearningPathProgress />
            <BottomRow />
        </div>
    );
}
