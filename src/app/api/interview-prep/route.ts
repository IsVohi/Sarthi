import { NextResponse } from 'next/server';
import { callBedrock, parseAIResponse } from '@/lib/bedrock';
import { INTERVIEW_PREP_PROMPT } from '@/lib/prompts';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { targetRole, targetCompanies, level } = body;

        // Validation
        if (!targetRole || !targetCompanies || !level) {
            return NextResponse.json(
                { success: false, error: "Missing required fields for interview preparation" },
                { status: 400 }
            );
        }

        const prompt = INTERVIEW_PREP_PROMPT(targetRole, targetCompanies, level);

        console.log(`Generating interview prep kit for ${targetRole}...`);
        const rawResponse = await callBedrock(prompt);

        const data = parseAIResponse(rawResponse);

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Interview Prep API Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to generate interview prep kit" },
            { status: 500 }
        );
    }
}
