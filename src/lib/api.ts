import { toast } from "sonner";

async function customFetch(url: string, options?: RequestInit) {
    try {
        const res = await fetch(url, options);
        const json = await res.json();

        if (!json.success) {
            // Check if it's a bedrock/AI service error specifically if needed,
            // but the generic error message from the backend works too.
            const errorMessage = json.error || "An API error occurred.";

            if (errorMessage.toLowerCase().includes("bedrock") || errorMessage.toLowerCase().includes("ai")) {
                toast.error("AI service unavailable. Please check your credentials.");
            } else if (errorMessage.toLowerCase().includes("dynamo") || errorMessage.toLowerCase().includes("database")) {
                // DynamoDB offline banner is handled via a store state in layout, but we can toast too
                toast.error("Database connection failed. Working in Offline Mode.");
            } else {
                toast.error(`Error: ${errorMessage}`);
            }
            throw new Error(errorMessage);
        }
        return json;
    } catch (error: any) {
        // If it's a network error (not a parsed JSON error thrown above)
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            toast.error("Network connection issue. Please check your internet.");
            throw new Error("Network connection issue");
        }
        throw error;
    }
}

export const API = {
    async testConnection() {
        return await customFetch("/api/test");
    },

    async analyzeSkillGap(data: any) {
        return await customFetch("/api/skill-gap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async generateLearningPath(data: any) {
        return await customFetch("/api/learning-path", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async submitProjectReview(data: any) {
        return await customFetch("/api/project-review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async getProjectReviews(email: string) {
        return await customFetch(`/api/project-review?email=${encodeURIComponent(email)}`);
    },

    async getInterviewPrep(data: any) {
        return await customFetch("/api/interview-prep", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async saveOnboarding(data: any) {
        return await customFetch("/api/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async chat(data: { message: string; context: string }) {
        return await customFetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async interviewChat(data: { message: string; history: any[]; userProfile: any }) {
        return await customFetch("/api/interview/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async getProgress(email: string) {
        return await customFetch(`/api/progress?email=${encodeURIComponent(email)}`);
    },

    async completeTask(data: { email: string; weekIndex: number; dayIndex: number; taskIndex: number }) {
        return await customFetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async completeWeek(data: { email: string; weekIndex: number }) {
        return await customFetch("/api/tasks", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },

    async signin(data: any) {
        return await customFetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    },

    async signup(data: any) {
        return await customFetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    },
};
