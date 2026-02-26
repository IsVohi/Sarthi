import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4 w-full">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <div className="h-4 w-32 bg-[#1e1e2e] rounded animate-pulse" />
        </div>
    );
}
