import { NextResponse } from 'next/server';
import { getUser, saveUser } from '@/lib/dynamodb';
import { hashPassword } from '@/lib/authutils';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await getUser(email);
        if (existingUser) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);

        // Save initial user record with just email and password
        // Other fields will be filled during onboarding
        await saveUser({
            email,
            password: hashedPassword,
            name: "", // Placeholder
            college: "",
            city: "",
            year: "",
            branch: "",
            targetRole: "",
            targetCompanies: [],
            currentSkills: [],
            githubUrl: "",
            timeline: ""
        });

        return NextResponse.json({
            success: true,
            message: "Account created successfully"
        });

    } catch (error: any) {
        console.error("[Signup API Error]:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
