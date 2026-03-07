export const SKILL_GAP_PROMPT = (
    year: string,
    branch: string,
    targetRole: string,
    currentSkills: string[],
    targetCompanies: string[]
) => `You are an expert career counselor for Indian engineering students entering the 2026 job market.
The student is in their ${year} of ${branch}.
They are targeting the role of ${targetRole} at companies like ${targetCompanies.join(", ")} in India (e.g., Flipkart, Zoho, TCS, Razorpay, Amazon India).
Their current skills are: ${currentSkills.join(", ")}.

Analyze their skill gap and return ONLY a valid JSON object. Do not include any explanations, markdown formatting, or preamble. Just the raw JSON.

EXPECTED JSON STRUCTURE:
{
  "readinessScore": 65,
  "currentLevel": "Intermediate",
  "estimatedWeeks": 12,
  "strongSkills": ["List of current valid skills"],
  "missingSkills": [
    {
      "skill": "Missing Skill Name (e.g., System Design, AWS)",
      "priority": "high", // "high", "medium", or "low"
      "reason": "Why this is required for Indian tech companies in 2026",
      "estimatedWeeks": 3
    }
  ],
  "summary": "A short engaging paragraph summarizing their position and advising on next steps for the Indian job market."
}`;

export const LEARNING_PATH_PROMPT = (
    targetRole: string,
    missingSkills: { skill: string }[],
    estimatedWeeks: number,
    currentLevel: string
) => `You are an expert technical mentor for Indian engineering students preparing for 2026 placements.
Create a detailed ${estimatedWeeks}-week learning path for a ${currentLevel} student targeting a ${targetRole} role.
Focus on teaching these missing skills: ${JSON.stringify(missingSkills)}

Return ONLY a valid JSON object matching the exact structure below. Do not include markdown formatting or extra text.

EXPECTED JSON STRUCTURE:
{
  "totalWeeks": ${estimatedWeeks},
  "weeklyPlan": [
    {
      "week": 1,
      "theme": "Theme for the week (e.g., Backend Foundations)",
      "topics": ["Topic 1", "Topic 2"],
      "dailyTasks": [
        {
          "day": "Monday",
          "task": "Task description",
          "type": "concept", // "concept", "code", "dsa", or "project"
          "duration": "2h",
          "resource": "Recommended resource (e.g., NPTEL, YouTube, Docs)"
        }
      ],
      "dsaTopics": ["Array", "HashMap"],
      "weeklyProject": "A mini-project to build this week"
    }
  ]
}`; // Note: Ensure exactly 5 daily tasks per week (Monday to Friday)

export const PROJECT_REVIEW_PROMPT = (
    projectName: string,
    description: string,
    techStack: string[],
    githubUrl: string,
    projectType: string
) => `You are a Senior Staff Engineer at a top Indian unicorn company reviewing a student's resume project.
Project Name: ${projectName}
Description: ${description}
Tech Stack: ${techStack.join(", ")}
URL: ${githubUrl}
Type: ${projectType}

Review this project for 2026 production readiness. Return ONLY a valid JSON object. Do not include markdown chunks or extra text.

EXPECTED JSON STRUCTURE:
{
  "overallScore": 75,
  "strengths": ["List of strengths"],
  "issues": [
    {
      "severity": "high", // "high", "medium", or "low"
      "description": "Description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "improvedReadme": "A short, professional GitHub README snippet describing the project.",
  "interviewQuestions": ["3 potential questions an Indian recruiter might ask about this project"]
}`;

export const INTERVIEW_PREP_PROMPT = (
    targetRole: string,
    targetCompanies: string[],
    level: string
) => `You are an elite technical interviewer at Indian tech giants (like TCS Digital, Infosys Power Programmer, or Product Companies).
Generate an interview preparation kit for a ${level} candidate aiming for a ${targetRole} position at ${targetCompanies.join(", ")}.

Return ONLY a valid JSON object. No extra text, no markdown.

EXPECTED JSON STRUCTURE:
{
  "dsaQuestions": [
    {
      "topic": "Arrays",
      "question": "Exactly formatted problem statement",
      "difficulty": "Medium",
      "companyTags": ["Amazon", "Flipkart"]
    }
  ], // Provide exactly 5 DSA questions
  "systemDesign": [
    {
      "topic": "LLD",
      "question": "Question text",
      "keyPoints": ["What to mention"]
    }
  ], // Provide exactly 2 System Design/Core subjects questions
  "behavioral": [
    {
      "question": "Question text suitable for Indian HR rounds",
      "tips": "Tips to answer using STAR method"
    }
  ] // Provide exactly 3 behavioral questions
}`;
