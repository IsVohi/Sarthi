import { NextResponse } from "next/server";
import { callBedrock } from "@/lib/bedrock";

const SYSTEM_PROMPT = `You are Sarthi, an AI career companion for engineering students.
Your goal is to help them with career advice, interview prep, skill building, and platform guidance.
Provide clear, concise, and helpful answers. Format your responses in Markdown when appropriate.

CURRENT PAGE CONTEXT:
The user is currently viewing the following page/context: {CONTEXT}

Incorporate the context into your response if relevant, but prioritize answering the user's specific message.
Don't explicitly mention the context unless it makes sense for the answer.`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, context } = body;

        if (!message) {
            return NextResponse.json(
                { success: false, error: "Message is required" },
                { status: 400 }
            );
        }

        const filledPrompt = SYSTEM_PROMPT.replace(
            "{CONTEXT}",
            context || "Unknown page"
        );
        const finalPrompt = `${filledPrompt}\n\nUser Message:\n${message}`;

        const text = await callBedrock(finalPrompt, 2048);

        return NextResponse.json({
            success: true,
            data: text, // Plain string response wrapped in data
        });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to process chat" },
            { status: 500 }
        );
    }
}
