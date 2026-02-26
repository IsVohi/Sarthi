"use client";

import { Youtube, ExternalLink, BookOpen, FileCode2 } from "lucide-react";

const mockResources = [
    {
        id: 1,
        title: "Node.js Complete Course 2024",
        platform: "YouTube",
        platformColor: "bg-red-500/10 text-red-500 border-red-500/20",
        type: "Video",
        icon: <Youtube className="w-5 h-5" />,
        price: "Free",
        difficulty: "Beginner"
    },
    {
        id: 2,
        title: "Relational Database Design",
        platform: "FreeCodeCamp",
        platformColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        type: "Article",
        icon: <BookOpen className="w-5 h-5" />,
        price: "Free",
        difficulty: "Intermediate"
    },
    {
        id: 3,
        title: "Two Sum & DB Joins",
        platform: "LeetCode",
        platformColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        type: "Practice",
        icon: <FileCode2 className="w-5 h-5" />,
        price: "Paid",
        difficulty: "Easy"
    },
    {
        id: 4,
        title: "Express JS Documentation",
        platform: "Docs",
        platformColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        type: "Reference",
        icon: <BookOpen className="w-5 h-5" />,
        price: "Free",
        difficulty: "All Levels"
    },
];

export default function ResourcesPanel() {
    return (
        <div className="pt-8 border-t border-[#1e1e2e]">
            <h3 className="text-xl font-bold text-white mb-6">Recommended Resources</h3>
            
            <div className="w-full overflow-x-auto pb-6 scrollbar-hide hide-scrollbar">
                <div className="flex gap-4 min-w-max px-1">
                    {mockResources.map((res) => (
                        <a 
                            key={res.id} 
                            href="#"
                            className="w-[280px] glass-card bg-[#13131f] border border-[#1e1e2e] hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] rounded-2xl p-5 group transition-all shrink-0 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2.5 rounded-xl border ${res.platformColor}`}>
                                    {res.icon}
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                            </div>

                            <h4 className="font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-indigo-100 transition-colors">
                                {res.title}
                            </h4>

                            <div className="mt-auto flex items-center justify-between pt-4 gap-2">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${res.platformColor}`}>
                                    {res.platform}
                                </span>
                                
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${res.price === 'Free' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                        {res.price}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-500 bg-[#0a0a0f] border border-[#1e1e2e] px-1.5 py-0.5 rounded">
                                        {res.difficulty}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
