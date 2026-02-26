"use client";

const items = [
    "Skill Gap Analysis",
    "Personalized Learning Paths",
    "Project Review",
    "Interview Prep",
    "AWS Bedrock Powered",
    "Hindi + English Support",
    "Tier-2/3 College Focus"
];

export function SocialProof() {
    return (
        <div className="w-full bg-[#0a0a0f]/80 backdrop-blur-sm border-y border-white/5 py-4 overflow-hidden relative z-20">
            <div className="flex w-[200%] md:w-[150%] animate-[ticker_40s_linear_infinite]">
                {/* We map twice for seamless sliding loop */}
                {[...items, ...items, ...items].map((item, i) => (
                    <div key={i} className="flex items-center whitespace-nowrap px-6 md:px-10">
                        <span className="text-sm font-medium text-slate-400 tracking-wide">{item}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] ml-12 md:ml-20 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    </div>
                ))}
            </div>
            <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
        </div>
    );
}
