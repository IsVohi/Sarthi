import { NextRequest, NextResponse } from "next/server";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import pdf from "pdf-parse";

const bedrock = new BedrockRuntimeClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const targetRole = formData.get("targetRole") as string;
        const currentSkills = formData.get("currentSkills") as string;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await pdf(buffer);
        const resumeText = data.text;

        const prompt = `
            You are an expert Technical Recruiter and Career Coach. 
            Analyze the following resume text against the target role and existing skills profile.
            
            Target Role: ${targetRole}
            Current Skills Profile: ${currentSkills}
            
            Resume Content:
            ${resumeText}
            
            Provide a detailed alignment analysis in JSON format exactly like this:
            {
                "score": number (0-100 based on alignment with ${targetRole}),
                "summary": "Short 2-sentence summary of alignment",
                "strengths": ["list of 3-4 key strengths found"],
                "gaps": ["list of 3-4 missing keywords or experience items"],
                "recommendations": ["list of 3 actionable steps to improve the resume for ${targetRole}"]
            }
            Respond ONLY with the JSON block.
        `;

        const command = new InvokeModelCommand({
            modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            }),
        });

        const response = await bedrock.send(command);
        const responseData = JSON.parse(new TextDecoder().decode(response.body));
        const analysis = JSON.parse(responseData.content[0].text);

        return NextResponse.json({ success: true, data: analysis });
    } catch (error: any) {
        console.error("[Resume API] Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
