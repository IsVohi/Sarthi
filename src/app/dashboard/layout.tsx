import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PageTransition from "@/components/dashboard/PageTransition";
import ChatFAB from "@/components/dashboard/ChatFAB";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#0a0a0f] min-h-screen text-slate-50 font-sans selection:bg-[#6366f1]/30 selection:text-white">
            <Sidebar />
            <main className="flex-1 h-screen relative flex flex-col min-w-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                    <TopBar />
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 custom-scrollbar">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </div>
                </div>
            </main>
            <ChatFAB />
            <Toaster theme="dark" position="bottom-right" />
        </div>
    );
}
