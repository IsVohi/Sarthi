import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

process.env.AWS_BEARER_TOKEN_BEDROCK = process.env.BEDROCK_API_KEY!;

const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION ?? "ap-south-1",
});

export async function callBedrock(
    prompt: string,
    maxTokens: number = 4096
): Promise<string> {
    const modelId = process.env.BEDROCK_MODEL_ID!;

    // Claude 3 payload format (Messages API)
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: maxTokens,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
    };

    const command = new InvokeModelCommand({
        modelId: modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const result = JSON.parse(
        new TextDecoder().decode(response.body)
    );

    // Claude returns content array
    return result.content[0].text;
}

export function parseAIResponse<T = any>(raw: string): T {
    try {
        const cleaned = raw
            .replace(/```json\n?/gi, "")
            .replace(/```\n?/gi, "")
            .trim();
        return JSON.parse(cleaned);
    } catch {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error("Failed to parse AI response");
    }
}
