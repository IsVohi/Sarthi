"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle, Shield, Zap, LayoutDashboard, Server, BookOpen, Copy, CheckCircle2, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const scoreData = [
    { label: "Code Quality", score: 72, color: "#6366f1" }, // indigo
    { label: "Security", score: 55, color: "#ef4444" }, // red
    { label: "Production Ready", score: 48, color: "#f59e0b" }, // amber
    { label: "Documentation", score: 30, color: "#8b5cf6" }, // purple
];

const mockStrengths = [
    "Clean folder structure",
    "Good variable naming conventions",
    "REST API endpoints follow standards",
    "Proper use of async/await"
];

const mockIssues = [
    { priority: "HIGH", text: "No .env file — API keys hardcoded in source", color: "text-red-500", dot: "bg-red-500" },
    { priority: "HIGH", text: "No input validation on POST routes", color: "text-red-500", dot: "bg-red-500" },
    { priority: "MED", text: "Missing error handling middleware", color: "text-amber-500", dot: "bg-amber-500" },
    { priority: "MED", text: "No rate limiting on API endpoints", color: "text-amber-500", dot: "bg-amber-500" },
    { priority: "LOW", text: "README is minimal, needs improvement", color: "text-emerald-500", dot: "bg-emerald-500" },
    { priority: "LOW", text: "No unit tests present", color: "text-emerald-500", dot: "bg-emerald-500" },
];

export default function ProjectResults() {
    const [animatedScore, setAnimatedScore] = useState(0);
    const [copiedContent, setCopiedContent] = useState<string | null>(null);
    const [readmeView, setReadmeView] = useState<"preview" | "raw">("preview");

    useEffect(() => {
        // Animate the overall score counter
        const duration = 1500;
        const steps = 60;
        const target = 62;
        const stepTime = Math.abs(Math.floor(duration / steps));
        
        let current = 0;
        const timer = setInterval(() => {
            current += target / steps;
            if (current >= target) {
                setAnimatedScore(target);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.floor(current));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedContent(id);
        setTimeout(() => setCopiedContent(null), 2000);
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6 pt-4"
        >
            {/* Block 1 — Score Overview */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] rounded-2xl p-6 md:p-8 relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 pointer-events-none" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 relative z-10">
                    {scoreData.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <svg className="w-20 h-20 transform -rotate-90 absolute inset-0 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[#1e1e2e]" />
                                    <motion.circle
                                        cx="40" cy="40" r="34"
                                        stroke={item.color}
                                        strokeWidth="6"
                                        fill="transparent"
                                        strokeDasharray={213.6} // 2 * pi * 34
                                        initial={{ strokeDashoffset: 213.6 }}
                                        animate={{ strokeDashoffset: 213.6 - (213.6 * item.score) / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                                        strokeLinecap="round"
                                        style={{ filter: `drop-shadow(0 0 4px ${item.color})` }}
                                    />
                                </svg>
                                <span className="text-xl font-bold text-white relative z-10">{item.score}%</span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase text-center">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-xl text-slate-300 mb-1">Overall Score</h2>
                    <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] drop-shadow-[0_0_20px_rgba(99,102,241,0.4)] mb-6 tracking-tighter">
                        {animatedScore}<span className="text-4xl text-slate-500">/100</span>
                    </div>
                    
                    <div className="w-full h-3 bg-[#1e1e2e] rounded-full overflow-hidden shadow-inner flex items-center">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] relative"
                            initial={{ width: 0 }}
                            animate={{ width: "62%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] skew-x-12" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Block 2 — Strengths vs Issues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* What's Good */}
                <motion.div variants={staggerItem} className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        What&apos;s Good <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </h3>
                    <ul className="space-y-4">
                        {mockStrengths.map((str, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + (i * 0.1) }}
                                className="flex items-start gap-3"
                            >
                                <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span className="text-slate-200 text-sm">{str}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Issues Found */}
                <motion.div variants={staggerItem} className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        Issues Found <X className="w-5 h-5 text-red-500" />
                    </h3>
                    <ul className="space-y-4">
                        {mockIssues.map((issue, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.5 + (i * 0.1) }}
                                className="flex items-start gap-3 group"
                            >
                                <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${issue.dot} shadow-[0_0_8px_currentColor]`} />
                                <div className="flex-1">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 uppercase tracking-wider bg-black/40 ${issue.color}`}>{issue.priority}</span>
                                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{issue.text}</span>
                                </div>
                                <button className="shrink-0 text-xs text-indigo-400 hover:text-indigo-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Fix →
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Block 3 — Detailed Fix Recommendations (Tabs) */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-[#1e1e2e]">
                    <h3 className="text-xl font-bold text-white">Detailed Fix Recommendations</h3>
                </div>
                
                <Tabs defaultValue="security" className="w-full">
                    <div className="px-6 md:px-8 border-b border-[#1e1e2e] overflow-x-auto custom-scrollbar">
                        <TabsList className="bg-transparent space-x-2 h-14 p-0">
                            <TabsTrigger value="security" className="data-[state=active]:bg-indigo-500/10 data-[state=active]:text-indigo-400 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-4 py-4 transition-all">
                                <Shield className="w-4 h-4 mr-2" /> Security
                            </TabsTrigger>
                            <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 px-4 py-4 transition-all">
                                <Zap className="w-4 h-4 mr-2" /> Performance
                            </TabsTrigger>
                            <TabsTrigger value="architecture" className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 px-4 py-4 transition-all">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> Architecture
                            </TabsTrigger>
                            <TabsTrigger value="devops" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400 rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 px-4 py-4 transition-all">
                                <Server className="w-4 h-4 mr-2" /> DevOps
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 md:p-8 bg-[#0a0a0f]/50">
                        {/* Security Tab Content */}
                        <TabsContent value="security" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                            <div className="bg-[#13131f] border border-[#1e1e2e] rounded-xl overflow-hidden">
                                <div className="bg-red-500/10 border-b border-red-500/20 p-4 flex items-start gap-4">
                                    <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase tracking-wider">High Priority</span>
                                        </div>
                                        <p className="text-white font-medium text-sm">Issue: API keys are hardcoded in app.py line 23</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-500/5">
                                    <p className="text-emerald-400 text-sm font-medium mb-4 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> How to Fix: Create a .env file and use python-dotenv
                                    </p>
                                    
                                    <div className="relative group">
                                        <div className="absolute right-3 top-3">
                                            <button 
                                                onClick={() => handleCopy("# .env\nSECRET_KEY=your_secret_key_here\nDB_URL=your_database_url\n\n# app.py\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\nsecret = os.getenv('SECRET_KEY')", "code1")}
                                                className="p-1.5 bg-[#1e1e2e] hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 rounded-md transition-colors"
                                            >
                                                {copiedContent === "code1" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <pre className="bg-[#0f0f1a] border border-[#1e1e2e] rounded-lg p-4 overflow-x-auto text-sm font-mono text-slate-300">
                                            <code>
                                                <span className="text-slate-500"># .env</span>{"\n"}
                                                <span className="text-blue-400">SECRET_KEY</span>=<span className="text-emerald-400">your_secret_key_here</span>{"\n"}
                                                <span className="text-blue-400">DB_URL</span>=<span className="text-emerald-400">your_database_url</span>{"\n"}
                                                {"\n"}
                                                <span className="text-slate-500"># app.py</span>{"\n"}
                                                <span className="text-purple-400">from</span> dotenv <span className="text-purple-400">import</span> load_dotenv{"\n"}
                                                <span className="text-purple-400">import</span> os{"\n"}
                                                {"\n"}
                                                <span className="text-cyan-400">load_dotenv</span>(){"\n"}
                                                secret = os.<span className="text-cyan-400">getenv</span>(<span className="text-amber-300">&apos;SECRET_KEY&apos;</span>)
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Other tabs would follow same pattern, hidden for brevity */}
                        <TabsContent value="performance" className="mt-0 text-slate-400">
                            Performance recommendations will appear here. No high priority issues found.
                        </TabsContent>
                        <TabsContent value="architecture" className="mt-0 text-slate-400">
                            Architecture analysis ready.
                        </TabsContent>
                        <TabsContent value="devops" className="mt-0 text-slate-400">
                            DevOps infrastructure suggestions.
                        </TabsContent>
                    </div>
                </Tabs>
            </motion.div>

            {/* Block 4 — Production Readiness Checklist */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6">Production Readiness Checklist</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { label: "Git version control", status: "done" },
                        { label: "Proper folder structure", status: "done" },
                        { label: "Logging", status: "partial" },
                        { label: "Error handling", status: "partial" },
                        { label: "Environment variables (.env)", status: "missing" },
                        { label: "Docker / containerization", status: "missing" },
                        { label: "Unit tests", status: "missing" },
                        { label: "CI/CD pipeline", status: "missing" },
                        { label: "API documentation", status: "missing" },
                        { label: "Rate limiting", status: "missing" },
                        { label: "Auth & authorization", status: "missing" },
                        { label: "Input validation", status: "missing" },
                    ].map((item, i) => (
                        <div 
                            key={i} 
                            className={`flex items-center gap-3 p-3 rounded-xl border ${
                                item.status === 'done' ? 'bg-emerald-500/5 border-emerald-500/20' :
                                item.status === 'partial' ? 'bg-amber-500/5 border-amber-500/20' :
                                'bg-red-500/5 border-red-500/20'
                            }`}
                        >
                            <div className="shrink-0">
                                {item.status === 'done' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                {item.status === 'partial' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                {item.status === 'missing' && <X className="w-5 h-5 text-red-500" />}
                            </div>
                            <span className="text-sm font-medium text-slate-200">{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Block 5 — Improved README Preview */}
            <motion.div variants={staggerItem} className="glass-card bg-[#13131f] border border-[#1e1e2e] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8 border-b border-[#1e1e2e] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f0f1a]">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-cyan-400" /> Your Improved README
                    </h3>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex bg-[#13131f] border border-[#1e1e2e] rounded-lg p-1">
                            <button 
                                onClick={() => setReadmeView("preview")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${readmeView === "preview" ? "bg-indigo-500 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                            >
                                Preview
                            </button>
                            <button 
                                onClick={() => setReadmeView("raw")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${readmeView === "raw" ? "bg-indigo-500 text-white shadow-sm" : "text-slate-400 hover:text-white"}`}
                            >
                                Raw Markdown
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => handleCopy("# Todo App\n\nThis is my app...", "readme")}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        >
                            {copiedContent === "readme" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedContent === "readme" ? "Copied" : "Copy "}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] overflow-hidden">
                    {/* Left: Before */}
                    <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#1e1e2e] bg-[#0a0a0f] relative flex flex-col">
                        <div className="absolute top-4 right-4 bg-slate-800/80 text-slate-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur z-10">
                            BEFORE
                        </div>
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 opacity-70">
                            <article className="prose prose-invert prose-sm max-w-none prose-h1:text-xl">
                                <h1>Todo App</h1>
                                <p>This is a django todo app i made for practicing.</p>
                                <h3>Setup</h3>
                                <p>run python manage.py runserver</p>
                            </article>
                        </div>
                    </div>

                    {/* Right: After (AI Generated) */}
                    <div className="w-full lg:w-1/2 relative flex flex-col bg-[#0f0f1a] shadow-[inset_0_0_50px_rgba(16,185,129,0.02)]">
                        <div className="absolute inset-0 ring-1 ring-inset ring-emerald-500/20 pointer-events-none" />
                        <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur z-10 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Sparkles className="w-3 h-3" /> AFTER (IMPROVED)
                        </div>
                        
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                            {readmeView === "preview" ? (
                                <article className="prose prose-invert prose-sm max-w-none prose-headings:text-emerald-50 prose-a:text-cyan-400 prose-code:bg-[#1a1a24] prose-code:text-indigo-300 prose-pre:bg-[#1a1a24] prose-pre:border prose-pre:border-[#2a2a35] marker:text-emerald-500">
                                    <ReactMarkdown>
{`# 🚀 Django TaskFlow API

A robust, RESTful Task Management API built with Django and Django REST Framework. This project demonstrates backend architecture patterns, secure authentication, and relational database modeling.

## 🌟 Key Features
- **JWT Authentication**: Secure login and token-based protected routes.
- **CRUD Operations**: Complete task management lifecycle.
- **Filtering & Pagination**: Efficient data retrieval based on status and creation date.

## 💻 Tech Stack
- Django 4.2
- Django REST Framework (DRF)
- PostgreSQL
- Simple JWT

## 🛠️ Local Setup

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/username/django-todo.git
cd django-todo
\`\`\`

2. **Create and activate Virtual Environment**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

3. **Install dependencies**
\`\`\`bash
pip install -r requirements.txt
\`\`\`
`}
                                    </ReactMarkdown>
                                </article>
                            ) : (
                                <pre className="text-xs font-mono text-emerald-300/80 whitespace-pre-wrap">
{`# 🚀 Django TaskFlow API

A robust, RESTful Task Management API built with Django and Django REST Framework. This project demonstrates backend architecture patterns, secure authentication, and relational database modeling.

## 🌟 Key Features
- **JWT Authentication**: Secure login and token-based protected routes.
- **CRUD Operations**: Complete task management lifecycle.
- **Filtering & Pagination**: Efficient data retrieval based on status and creation date.

## 💻 Tech Stack
- Django 4.2
- Django REST Framework (DRF)
- PostgreSQL
- Simple JWT`}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
