import { NextResponse } from 'next/server';
import { callBedrock, parseAIResponse } from '@/lib/bedrock';
import { PROJECT_REVIEW_PROMPT } from '@/lib/prompts';
import { saveProjectReview } from '@/lib/dynamodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { projectName, description, techStack, githubUrl, projectType, email } = body;

        if (!projectName || !description || !techStack || !githubUrl || !projectType) {
            return NextResponse.json(
                { success: false, error: "Missing required fields for project review" },
                { status: 400 }
            );
        }

        const prompt = PROJECT_REVIEW_PROMPT(projectName, description, techStack, githubUrl, projectType);

        console.log(`Generating code review for ${projectName}...`);
        const rawResponse = await callBedrock(prompt);
        const data = parseAIResponse(rawResponse);

        // Non-blocking persist to DynamoDB
        if (email) {
            saveProjectReview(email, { projectName, githubUrl, techStack, ...(data as Record<string, unknown>) }).catch((err) =>
                console.error("DynamoDB project review persist failed (non-fatal):", err)
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Project Review API Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to review project" },
            { status: 500 }
        );
    }
}
