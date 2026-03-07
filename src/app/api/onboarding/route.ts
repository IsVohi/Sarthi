import { NextResponse } from 'next/server';
import { saveUser, getUser } from '@/lib/dynamodb';
import { hashPassword } from '@/lib/authutils';

export async function POST(req: Request) {
    let body: Record<string, any> = {};
    try {
        body = await req.json();
        const { email, password } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email is required for onboarding" },
                { status: 400 }
            );
        }

        // Fetch existing user to preserve password/credentials if not changing
        const existingUser = await getUser(email);

        // Prepare final item for DB
        let userData = {
            ...existingUser, // Start with existing data
            ...body,         // Merge new onboarding data
        };

        if (password) {
            // If they provided a password (legacy or update), hash it
            userData.password = await hashPassword(password as string);
        } else if (!existingUser?.password) {
            // If no password exists and none provided, we have a problem 
            // (though signup should have handled this)
            console.warn(`[Onboarding] User ${email} has no password set.`);
        }

        // Fire-and-forget: DynamoDB save is non-blocking
        try {
            await saveUser(userData);
        } catch (dbErr) {
            console.error("DynamoDB save failed (non-fatal):", dbErr);
        }

        return NextResponse.json({ success: true, data: userData });
    } catch (error) {
        console.error("Onboarding POST Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to save user profile" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, error: "Email query parameter is required" },
                { status: 400 }
            );
        }

        let user: Record<string, unknown> | null = null;
        try {
            user = await getUser(email);
        } catch (dbErr) {
            console.error("DynamoDB get failed (non-fatal):", dbErr);
        }

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        console.error("Onboarding GET Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Failed to fetch user profile" },
            { status: 500 }
        );
    }
}
