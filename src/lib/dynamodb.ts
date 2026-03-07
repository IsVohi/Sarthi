/**
 * /lib/dynamodb.ts
 *
 * DynamoDB client and helper functions for Sarthi.
 *
 * ──────────────────────────────────────────────
 * AWS TABLES SETUP (create manually in AWS Console)
 * ──────────────────────────────────────────────
 * Table 1: sarthi-users
 *   - Partition key: email (String)
 *   - Capacity: On-demand (pay-per-request)
 *   - Region: us-east-1
 *
 * Table 2: sarthi-reviews
 *   - Partition key: reviewId (String)
 *   - Sort key: email (String)
 *   - Capacity: On-demand
 *   - Region: us-east-1
 *
 * Table 3: sarthi-sessions
 *   - Partition key: sessionId (String)
 *   - Capacity: On-demand
 *   - Region: us-east-1
 * ──────────────────────────────────────────────
 *
 * AUTH: Uses AWS_BEARER_TOKEN_BEDROCK env variable.
 * The same Bedrock API key works for DynamoDB when
 * set as AWS_BEARER_TOKEN_BEDROCK.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";

/* ─── Ensure the bearer token env var is propagated ─── */
if (process.env.AWS_BEARER_TOKEN_BEDROCK && !process.env.AWS_BEARER_TOKEN_BEDROCK.startsWith("Bearer ")) {
    process.env.AWS_BEARER_TOKEN_BEDROCK = process.env.AWS_BEARER_TOKEN_BEDROCK;
}

/* ─── DynamoDB Client ─── */
export const dynamoClient = new DynamoDBClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    // AWS_BEARER_TOKEN_BEDROCK env var is automatically picked up 
    // by the AWS SDK for bearer token authentication.
});

export const docClient = DynamoDBDocumentClient.from(dynamoClient, {
    marshallOptions: {
        removeUndefinedValues: true,
        convertEmptyValues: true,
    },
});

/* ─── Table Names ─── */
const USERS_TABLE = process.env.DYNAMODB_TABLE_USERS ?? "sarthi-users";
const REVIEWS_TABLE = process.env.DYNAMODB_TABLE_REVIEWS ?? "sarthi-reviews";

/* ─── Error Handler ─── */
function handleDynamoError(error: unknown, context: string) {
    const err = error as { name?: string; message?: string };
    if (err.name === "ResourceNotFoundException") {
        console.error(`[DynamoDB] Table not found (${context}). Create the table in AWS Console first.`);
    } else if (err.name === "UnrecognizedClientException") {
        console.error(`[DynamoDB] Invalid AWS credentials (${context}). Check AWS_BEARER_TOKEN_BEDROCK in .env.local`);
    } else if (err.name === "AccessDeniedException") {
        console.error(`[DynamoDB] Insufficient permissions (${context}). Add DynamoDB access to your Bedrock API key.`);
    } else {
        console.error(`[DynamoDB] Error in ${context}:`, err.message ?? error);
    }
}

/* ─── 1. saveUser ─── */
export async function saveUser(userData: Record<string, unknown>): Promise<void> {
    try {
        await docClient.send(
            new PutCommand({
                TableName: USERS_TABLE,
                Item: {
                    ...userData,
                    onboardingComplete: true,
                    createdAt: (userData.createdAt as string) ?? new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            })
        );
    } catch (error) {
        handleDynamoError(error, "saveUser");
        throw error;
    }
}

/* ─── 2. getUser ─── */
export async function getUser(email: string): Promise<Record<string, unknown> | null> {
    try {
        const result = await docClient.send(
            new GetCommand({
                TableName: USERS_TABLE,
                Key: { email },
            })
        );
        return (result.Item as Record<string, unknown>) ?? null;
    } catch (error) {
        handleDynamoError(error, "getUser");
        throw error;
    }
}

/* ─── 3. updateUser ─── */
export async function updateUser(
    email: string,
    updates: Record<string, unknown>
): Promise<void> {
    try {
        const keys = Object.keys(updates).filter((k) => k !== "email");
        if (keys.length === 0) return;

        const expressionParts = keys.map((k, i) => `#f${i} = :v${i}`);
        const ExpressionAttributeNames: Record<string, string> = { "#upd": "updatedAt" };
        const ExpressionAttributeValues: Record<string, unknown> = { ":upd": new Date().toISOString() };

        keys.forEach((k, i) => {
            ExpressionAttributeNames[`#f${i}`] = k;
            ExpressionAttributeValues[`:v${i}`] = updates[k];
        });

        await docClient.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { email },
                UpdateExpression: `SET ${expressionParts.join(", ")}, #upd = :upd`,
                ExpressionAttributeNames,
                ExpressionAttributeValues,
            })
        );
    } catch (error) {
        handleDynamoError(error, "updateUser");
        throw error;
    }
}

/* ─── 4. saveSkillGap ─── */
export async function saveSkillGap(
    email: string,
    skillGapData: Record<string, unknown>
): Promise<void> {
    try {
        await updateUser(email, {
            skillGap: {
                ...skillGapData,
                analyzedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        handleDynamoError(error, "saveSkillGap");
        throw error;
    }
}

/* ─── 5. saveLearningPath ─── */
export async function saveLearningPath(
    email: string,
    pathData: Record<string, unknown>
): Promise<void> {
    try {
        await updateUser(email, { learningPath: pathData });
    } catch (error) {
        handleDynamoError(error, "saveLearningPath");
        throw error;
    }
}

/* ─── 6. updateTaskComplete ─── */
export async function updateTaskComplete(
    email: string,
    weekIndex: number,
    dayIndex: number,
    taskIndex: number
): Promise<void> {
    try {
        await docClient.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { email },
                // DynamoDB list_append path — sets nested task completed=true
                UpdateExpression: `SET learningPath.weeklyPlan[${weekIndex}].dailyTasks[${taskIndex}].completed = :t, #upd = :upd`,
                ExpressionAttributeNames: { "#upd": "updatedAt" },
                ExpressionAttributeValues: {
                    ":t": true,
                    ":upd": new Date().toISOString(),
                },
            })
        );
    } catch (error) {
        handleDynamoError(error, "updateTaskComplete");
        throw error;
    }
}

/* ─── 7. markWeekComplete ─── */
export async function markWeekComplete(email: string, weekIndex: number): Promise<void> {
    try {
        await docClient.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { email },
                UpdateExpression: `SET learningPath.weeklyPlan[${weekIndex}].completed = :t, learningPath.currentWeek = :nw, #upd = :upd`,
                ExpressionAttributeNames: { "#upd": "updatedAt" },
                ExpressionAttributeValues: {
                    ":t": true,
                    ":nw": weekIndex + 1,
                    ":upd": new Date().toISOString(),
                },
            })
        );
    } catch (error) {
        handleDynamoError(error, "markWeekComplete");
        throw error;
    }
}

/* ─── 8. saveProjectReview ─── */
export async function saveProjectReview(
    email: string,
    reviewData: Record<string, unknown>
): Promise<void> {
    try {
        const reviewId = `${email}-${Date.now()}`;
        await docClient.send(
            new PutCommand({
                TableName: REVIEWS_TABLE,
                Item: {
                    reviewId,
                    email,
                    ...reviewData,
                    createdAt: new Date().toISOString(),
                },
            })
        );
    } catch (error) {
        handleDynamoError(error, "saveProjectReview");
        throw error;
    }
}

/* ─── 9. getProjectReviews ─── */
export async function getProjectReviews(email: string): Promise<Record<string, unknown>[]> {
    try {
        const result = await docClient.send(
            new ScanCommand({
                TableName: REVIEWS_TABLE,
                FilterExpression: "#em = :email",
                ExpressionAttributeNames: { "#em": "email" },
                ExpressionAttributeValues: { ":email": email },
            })
        );
        const items = (result.Items as Record<string, unknown>[]) ?? [];
        return items.sort((a, b) =>
            ((b.createdAt as string) ?? "").localeCompare((a.createdAt as string) ?? "")
        );
    } catch (error) {
        handleDynamoError(error, "getProjectReviews");
        throw error;
    }
}

/* ─── 10. updateInterviewProgress ─── */
export async function updateInterviewProgress(
    email: string,
    questionId: string
): Promise<void> {
    try {
        await docClient.send(
            new UpdateCommand({
                TableName: USERS_TABLE,
                Key: { email },
                UpdateExpression:
                    "SET interviewPrep.questionsSolved = list_append(if_not_exists(interviewPrep.questionsSolved, :empty), :q), interviewPrep.questionsAttempted = if_not_exists(interviewPrep.questionsAttempted, :zero) + :one, #upd = :upd",
                ExpressionAttributeNames: { "#upd": "updatedAt" },
                ExpressionAttributeValues: {
                    ":q": [questionId],
                    ":empty": [],
                    ":zero": 0,
                    ":one": 1,
                    ":upd": new Date().toISOString(),
                },
            })
        );
    } catch (error) {
        handleDynamoError(error, "updateInterviewProgress");
        throw error;
    }
}
