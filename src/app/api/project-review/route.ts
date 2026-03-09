import { NextResponse } from 'next/server';
import { callBedrock, parseAIResponse } from '@/lib/bedrock';
import { PROJECT_REVIEW_PROMPT } from '@/lib/prompts';
import { saveProjectReview } from '@/lib/dynamodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { projectName, description, techStack, githubUrl, projectType, email } = body;

        if (!projectName || !githubUrl) {
            return NextResponse.json(
                { success: false, error: "Project name and GitHub URL are required" },
                { status: 400 }
            );
        }

        // Use defaults for simplified frontend submission
        const finalDescription = description || "A technical project on GitHub";
        const finalTechStack = techStack || ["React", "JavaScript"];
        const finalProjectType = projectType || "Full Stack";

        const prompt = PROJECT_REVIEW_PROMPT(projectName, finalDescription, finalTechStack, githubUrl, finalProjectType);

        console.log(`Generating code review for ${projectName}...`);
        const rawResponse = await callBedrock(prompt);
        const data = parseAIResponse(rawResponse);

        // Non-blocking persist to DynamoDB
        if (email) {
            saveProjectReview(email, {
                projectName,
                githubUrl,
                techStack: finalTechStack,
                date: new Date().toISOString(),
                ...(data as Record<string, unknown>)
            }).catch((err) =>
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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        const { getProjectReviews } = await import('@/lib/dynamodb');
        const reviews = await getProjectReviews(email);

        return NextResponse.json({ success: true, data: reviews });
    } catch (error) {
        console.error("Project Review GET Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
    }
}
