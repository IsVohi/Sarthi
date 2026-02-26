import { OnboardingFlow } from "@/components/Onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Onboarding | Sarthi",
    description: "Set up your personalized career roadmap with Sarthi AI.",
};

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] selection:bg-[#6366f1]/30 selection:text-white">
            <OnboardingFlow />
        </main>
    );
}
