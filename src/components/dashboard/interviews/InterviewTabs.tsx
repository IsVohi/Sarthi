"use client";

// InterviewTabs component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Server, Users, Laptop } from "lucide-react";
import DSAPracticeTab from "@/components/dashboard/interviews/DSAPracticeTab";
import SystemDesignTab from "@/components/dashboard/interviews/SystemDesignTab";
import BehavioralTab from "@/components/dashboard/interviews/BehavioralTab";
import MockInterviewTab from "@/components/dashboard/interviews/MockInterviewTab";

export default function InterviewTabs() {
    return (
        <div className="flex-1 flex flex-col min-h-0">
            <Tabs defaultValue="dsa" className="flex-1 flex flex-col h-full">
                <div className="border-b border-[#1e1e2e] overflow-x-auto custom-scrollbar shrink-0">
                    <TabsList className="bg-transparent space-x-2 h-14 p-0 min-w-max">
                        <TabsTrigger value="dsa" className="data-[state=active]:bg-indigo-500/10 data-[state=active]:text-white text-slate-400 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 px-6 py-4 transition-all hover:text-white">
                            <Code2 className="w-4 h-4 mr-2" /> DSA Practice
                        </TabsTrigger>
                        <TabsTrigger value="design" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-white text-slate-400 rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 px-6 py-4 transition-all hover:text-white">
                            <Server className="w-4 h-4 mr-2" /> System Design
                        </TabsTrigger>
                        <TabsTrigger value="behavioral" className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-white text-slate-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 px-6 py-4 transition-all hover:text-white">
                            <Users className="w-4 h-4 mr-2" /> Behavioral
                        </TabsTrigger>
                        <TabsTrigger value="mock" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-white text-slate-400 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 px-6 py-4 transition-all hover:text-white">
                            <Laptop className="w-4 h-4 mr-2" /> Mock Interview
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto pt-6 custom-scrollbar relative">
                    <TabsContent value="dsa" className="h-full m-0 outline-none">
                        <DSAPracticeTab />
                    </TabsContent>
                    
                    <TabsContent value="design" className="h-full m-0 outline-none">
                        <SystemDesignTab />
                    </TabsContent>
                    
                    <TabsContent value="behavioral" className="h-full m-0 outline-none">
                        <BehavioralTab />
                    </TabsContent>
                    
                    <TabsContent value="mock" className="h-full m-0 outline-none">
                        <MockInterviewTab />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
