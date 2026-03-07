import { NextResponse } from 'next/server';
import { callBedrock, parseAIResponse } from '@/lib/bedrock';
import { LEARNING_PATH_PROMPT } from '@/lib/prompts';
import { saveLearningPath } from '@/lib/dynamodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { targetRole, missingSkills, estimatedWeeks, currentLevel, email } = body;

        if (!targetRole || !missingSkills || !estimatedWeeks || !currentLevel) {
            return NextResponse.json(
                { success: false, error: "Missing required fields for learning path generation" },
                { status: 400 }
            );
        }

        const prompt = LEARNING_PATH_PROMPT(targetRole, missingSkills, estimatedWeeks, currentLevel);

        console.log("Generating Learning Path...");
        const rawResponse = await callBedrock(prompt);
        const data = parseAIResponse(rawResponse);

        // Non-blocking persist to DynamoDB
        if (email) {
            saveLearningPath(email, data as Record<string, unknown>).catch((err) =>
                console.error("DynamoDB learning path persist failed (non-fatal):", err)
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Learning Path API Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to generate learning path" },
            { status: 500 }
        );
    }
}
