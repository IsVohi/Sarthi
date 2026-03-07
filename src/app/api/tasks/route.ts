import { NextResponse } from 'next/server';
import { updateTaskComplete, markWeekComplete } from '@/lib/dynamodb';

// POST: Mark a single task as complete
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, weekIndex, dayIndex, taskIndex } = body;

        if (!email || weekIndex === undefined || taskIndex === undefined) {
            return NextResponse.json(
                { success: false, error: "email, weekIndex, taskIndex required" },
                { status: 400 }
            );
        }

        await updateTaskComplete(email, weekIndex, dayIndex ?? 0, taskIndex);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Task complete Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to mark task complete" },
            { status: 500 }
        );
    }
}

// PUT: Mark an entire week as complete
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { email, weekIndex } = body;

        if (!email || weekIndex === undefined) {
            return NextResponse.json(
                { success: false, error: "email and weekIndex required" },
                { status: 400 }
            );
        }

        await markWeekComplete(email, weekIndex);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Week complete Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to mark week complete" },
            { status: 500 }
        );
    }
}
