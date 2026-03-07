import { NextResponse } from 'next/server';
import { callBedrock, parseAIResponse } from '@/lib/bedrock';
import { SKILL_GAP_PROMPT } from '@/lib/prompts';
import { saveSkillGap } from '@/lib/dynamodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { year, branch, targetRole, currentSkills, targetCompanies, email } = body;

        if (!year || !branch || !targetRole || !currentSkills || !targetCompanies) {
            return NextResponse.json(
                { success: false, error: "Missing required fields for skill gap analysis" },
                { status: 400 }
            );
        }

        const prompt = SKILL_GAP_PROMPT(year, branch, targetRole, currentSkills, targetCompanies);

        console.log("Generating Skill Gap Analysis...");
        const rawResponse = await callBedrock(prompt);
        const data = parseAIResponse(rawResponse);

        // Non-blocking persist to DynamoDB
        if (email) {
            saveSkillGap(email, data as Record<string, unknown>).catch((err) =>
                console.error("DynamoDB skillgap persist failed (non-fatal):", err)
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Skill Gap API Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to analyze skills" },
            { status: 500 }
        );
    }
}
