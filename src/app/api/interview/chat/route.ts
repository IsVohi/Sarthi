import { NextResponse } from "next/server";
import { callBedrock } from "@/lib/bedrock";

const INTERVIEW_SYSTEM_PROMPT = `You are a Senior Technical Interviewer at a top-tier Indian tech company (like Flipkart, Zoho, or Swiggy).
You are conducting a mock technical interview with a candidate for a {ROLE} position.

RULES:
1.  **Strict Persona**: Be professional, curious, and challenging but supportive.
2.  **One Question at a Time**: Never ask multiple major questions in one response.
3.  **Dig Deeper**: If the candidate gives a shallow answer, ask follow-up questions (e.g., "How would that scale?", "What are the trade-offs?").
4.  **Stay on Topic**: Keep the conversation focused on technical skills, system design, or behavioral scenarios relevant to {ROLE}.
5.  **Assessment**: At the end when the user says "End Interview" or similar, provide a structured feedback summary.

CONVERSATION HISTORY:
{HISTORY}

Candidate's target companies: {COMPANIES}
Candidate's current tech stack: {STACK}

Your response should be natural dialogue. Do not output JSON. Just speak as the interviewer.`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, history, userProfile } = body;

        if (!message) {
            return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
        }

        const role = userProfile?.targetRole || "Software Engineer";
        const companies = userProfile?.targetCompanies?.join(", ") || "top tech companies";
        const stack = userProfile?.currentSkills?.join(", ") || "Full Stack";

        const historyText = history.map((h: any) => `${h.role === 'user' ? 'Candidate' : 'Interviewer'}: ${h.content}`).join("\n");

        const prompt = INTERVIEW_SYSTEM_PROMPT
            .replace(/{ROLE}/g, role)
            .replace(/{HISTORY}/g, historyText)
            .replace(/{COMPANIES}/g, companies)
            .replace(/{STACK}/g, stack);

        const finalPrompt = `${prompt}\n\nCandidate: ${message}\nInterviewer:`;

        console.log(`[Interview API] Generating response for role: ${role}`);
        const text = await callBedrock(finalPrompt, 2048);

        return NextResponse.json({
            success: true,
            data: text,
        });
    } catch (error: any) {
        console.error("Interview Chat API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to process interview chat" },
            { status: 500 }
        );
    }
}
