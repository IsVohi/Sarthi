"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSarthiStore } from "@/lib/store/userStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen, Video, FileText, Wrench, Users, ExternalLink,
    Bookmark, BookmarkCheck, Star, Search,
} from "lucide-react";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

interface Resource {
    id: string;
    title: string;
    platform: string;
    url: string;
    category: "video" | "article" | "course" | "tool" | "community";
    tags: string[];
    rating: number;
    free: boolean;
}

const allResources: Resource[] = [
    { id: "r1", title: "System Design Primer", platform: "GitHub", url: "#", category: "article", tags: ["System Design"], rating: 5, free: true },
    { id: "r2", title: "Docker for Beginners — Full Course", platform: "YouTube", url: "#", category: "video", tags: ["Docker", "DevOps"], rating: 5, free: true },
    { id: "r3", title: "Node.js Backend Masterclass", platform: "Udemy", url: "#", category: "course", tags: ["Node.js", "Backend"], rating: 4, free: false },
    { id: "r4", title: "Redis Crash Course", platform: "YouTube", url: "#", category: "video", tags: ["Redis", "Caching"], rating: 4, free: true },
    { id: "r5", title: "PostgreSQL Tutorial — Full Course", platform: "YouTube", url: "#", category: "video", tags: ["PostgreSQL", "SQL"], rating: 5, free: true },
    { id: "r6", title: "NeetCode 150 — DSA Roadmap", platform: "NeetCode", url: "#", category: "tool", tags: ["DSA", "Practice"], rating: 5, free: true },
    { id: "r7", title: "Designing Data-Intensive Applications", platform: "Book", url: "#", category: "article", tags: ["System Design", "Databases"], rating: 5, free: false },
    { id: "r8", title: "LeetCode Company-Wise Questions", platform: "LeetCode", url: "#", category: "tool", tags: ["DSA", "Interview"], rating: 4, free: true },
    { id: "r9", title: "GitHub Actions CI/CD Tutorial", platform: "GitHub Docs", url: "#", category: "article", tags: ["CI/CD", "DevOps"], rating: 4, free: true },
    { id: "r10", title: "r/cscareerquestions India", platform: "Reddit", url: "#", category: "community", tags: ["Career", "India"], rating: 4, free: true },
    { id: "r11", title: "Backend SDE Interview Prep Discord", platform: "Discord", url: "#", category: "community", tags: ["Interview", "Community"], rating: 4, free: true },
    { id: "r12", title: "AWS Cloud Practitioner Essentials", platform: "AWS", url: "#", category: "course", tags: ["AWS", "Cloud"], rating: 4, free: true },
];

const categoryIcons: Record<string, React.ReactNode> = {
    video: <Video className="w-4 h-4" />,
    article: <FileText className="w-4 h-4" />,
    course: <BookOpen className="w-4 h-4" />,
    tool: <Wrench className="w-4 h-4" />,
    community: <Users className="w-4 h-4" />,
};

const platformColors: Record<string, string> = {
    YouTube: "bg-red-500/10 text-red-400 border-red-500/20",
    GitHub: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    Udemy: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    LeetCode: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    NeetCode: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Reddit: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Discord: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    AWS: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    Book: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "GitHub Docs": "bg-slate-500/10 text-slate-300 border-slate-500/20",
};

export default function ResourcesPage() {
    const { skillGap } = useSarthiStore();
    const [bookmarks, setBookmarks] = useState<string[]>(["r1", "r6"]);
    const [search, setSearch] = useState("");

    const toggleBookmark = (id: string) => {
        setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
    };

    const filterBySearch = (resources: Resource[]) =>
        search.trim()
            ? resources.filter((r) =>
                  r.title.toLowerCase().includes(search.toLowerCase()) ||
                  r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
              )
            : resources;

    const recommended = allResources.filter((r) =>
        r.tags.some((t) => skillGap.missingSkills.some((ms) => ms.skill.toLowerCase().includes(t.toLowerCase())))
    );

    const renderCard = (r: Resource) => (
        <motion.div
            key={r.id}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 0 25px rgba(99,102,241,0.15)" }}
            className="bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-5 flex flex-col gap-3 group transition-all"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg border ${platformColors[r.platform] || "bg-slate-500/10 text-slate-300 border-slate-500/20"}`}>
                        {categoryIcons[r.category]}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${platformColors[r.platform] || ""}`}>
                        {r.platform}
                    </span>
                </div>
                <button onClick={() => toggleBookmark(r.id)} className="text-[#94a3b8] hover:text-indigo-400 transition-colors">
                    {bookmarks.includes(r.id) ? <BookmarkCheck className="w-4 h-4 text-indigo-400" /> : <Bookmark className="w-4 h-4" />}
                </button>
            </div>

            <h4 className="text-white font-semibold text-sm group-hover:text-indigo-100 transition-colors leading-snug">{r.title}</h4>

            <div className="flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-[#94a3b8] border border-white/5">{t}</span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#1e1e2e]">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    {r.free && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">FREE</span>}
                    <a href={r.url} className="text-indigo-400 hover:text-indigo-300 transition-colors"><ExternalLink className="w-4 h-4" /></a>
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-6xl mx-auto pb-12 space-y-8">
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Learning <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">Resources</span>
                    </h1>
                    <p className="text-[#94a3b8] text-sm">Curated materials for your Backend SDE journey</p>
                </div>
                <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search resources..."
                        className="w-full bg-[#0f0f1a] border border-[#1e1e2e] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all"
                    />
                </div>
            </motion.div>

            {/* Recommended */}
            {recommended.length > 0 && (
                <motion.div variants={fadeUp}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        ✨ Recommended for You
                        <span className="text-xs font-medium text-[#94a3b8]">Based on your skill gaps</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterBySearch(recommended).slice(0, 3).map(renderCard)}
                    </div>
                </motion.div>
            )}

            {/* Tabbed Library */}
            <Tabs defaultValue="all" className="w-full">
                <div className="border-b border-[#1e1e2e] overflow-x-auto custom-scrollbar">
                    <TabsList className="bg-transparent h-12 p-0 space-x-1">
                        {["all", "video", "article", "course", "tool", "community"].map((cat) => (
                            <TabsTrigger key={cat} value={cat} className="capitalize data-[state=active]:bg-indigo-500/10 data-[state=active]:text-white text-[#94a3b8] rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-4 py-3 text-sm transition-all">
                                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
                            </TabsTrigger>
                        ))}
                        <TabsTrigger value="saved" className="data-[state=active]:bg-indigo-500/10 data-[state=active]:text-white text-[#94a3b8] rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-4 py-3 text-sm transition-all">
                            Saved ({bookmarks.length})
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="pt-6">
                    <TabsContent value="all" className="m-0">
                        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filterBySearch(allResources).map(renderCard)}
                        </motion.div>
                    </TabsContent>
                    {["video", "article", "course", "tool", "community"].map((cat) => (
                        <TabsContent key={cat} value={cat} className="m-0">
                            <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filterBySearch(allResources.filter((r) => r.category === cat)).map(renderCard)}
                            </motion.div>
                        </TabsContent>
                    ))}
                    <TabsContent value="saved" className="m-0">
                        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filterBySearch(allResources.filter((r) => bookmarks.includes(r.id))).map(renderCard)}
                        </motion.div>
                        {bookmarks.length === 0 && (
                            <div className="text-center py-16 text-[#94a3b8]">
                                <Bookmark className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                                <p>No saved resources yet. Click the bookmark icon to save.</p>
                            </div>
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </motion.div>
    );
}
