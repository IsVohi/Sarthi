import { NextResponse } from 'next/server';
import { getUser, updateUser } from '@/lib/dynamodb';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, error: "email query param required" },
                { status: 400 }
            );
        }

        const user = await getUser(email);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                skillGap: user.skillGap,
                learningPath: user.learningPath,
                interviewPrep: user.interviewPrep,
            },
        });
    } catch (error) {
        console.error("Progress GET Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch progress" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, updates } = body;

        if (!email || !updates) {
            return NextResponse.json(
                { success: false, error: "email and updates required" },
                { status: 400 }
            );
        }

        await updateUser(email, updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Progress POST Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update progress" },
            { status: 500 }
        );
    }
}
