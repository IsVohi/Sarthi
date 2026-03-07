import { NextResponse } from 'next/server';
import { callBedrock } from '@/lib/bedrock';
import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION ?? "us-east-1" });

async function checkTable(tableName: string): Promise<{ table: string; status: string; error?: string }> {
    try {
        const res = await dynamo.send(new DescribeTableCommand({ TableName: tableName }));
        return {
            table: tableName,
            status: res.Table?.TableStatus ?? "UNKNOWN",
        };
    } catch (err: unknown) {
        const e = err as { name?: string; message?: string };
        return {
            table: tableName,
            status: "ERROR",
            error: e.name === "ResourceNotFoundException"
                ? "Table not found — create it in AWS Console"
                : e.name === "UnrecognizedClientException"
                    ? "Invalid AWS credentials (check AWS_BEARER_TOKEN_BEDROCK)"
                    : e.name === "AccessDeniedException"
                        ? "Access denied — API key lacks DynamoDB permissions"
                        : (e.message ?? "Unknown error"),
        };
    }
}

export async function GET() {
    // 1. Test Bedrock
    let bedrockStatus = "UNKNOWN";
    let bedrockError: string | undefined;
    try {
        console.log("Testing Bedrock Connection...");
        await callBedrock("Reply with just the word: OK");
        bedrockStatus = "ONLINE";
    } catch (err) {
        bedrockStatus = "ERROR";
        bedrockError = err instanceof Error ? err.message : "Bedrock call failed";
    }

    // 2. Test DynamoDB tables in parallel
    const tables = [
        process.env.DYNAMODB_TABLE_USERS ?? "sarthi-users",
        process.env.DYNAMODB_TABLE_REVIEWS ?? "sarthi-reviews",
        process.env.DYNAMODB_TABLE_SESSIONS ?? "sarthi-sessions",
    ];
    const tableResults = await Promise.all(tables.map(checkTable));
    const allTablesOk = tableResults.every((t) => t.status === "ACTIVE");

    return NextResponse.json({
        success: bedrockStatus === "ONLINE" && allTablesOk,
        bedrock: { status: bedrockStatus, error: bedrockError },
        dynamoDB: {
            allAccessible: allTablesOk,
            tables: tableResults,
        },
    });
}
