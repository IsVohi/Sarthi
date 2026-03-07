import { NextResponse } from 'next/server';
import { getUser } from '@/lib/dynamodb';
import { comparePassword } from '@/lib/authutils';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // 1. Fetch user from DynamoDB
        const user = await getUser(email);

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 2. Check if user has a password (legacy users might not)
        if (!user.password) {
            return NextResponse.json(
                { success: false, error: "Account requires password reset. Please contact support or sign up again." },
                { status: 401 }
            );
        }

        // 3. Compare passwords
        const isMatch = await comparePassword(password, user.password as string);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 4. Success - return user data (excluding password)
        const { password: _, ...userData } = user;
        return NextResponse.json({
            success: true,
            data: userData
        });

    } catch (error) {
        console.error("SignIn API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
