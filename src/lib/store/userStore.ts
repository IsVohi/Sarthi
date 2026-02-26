import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ─── Types ─── */
export interface MissingSkill {
  skill: string;
  priority: "high" | "medium" | "low";
  reason: string;
  estimatedWeeks: number;
}

export interface DailyTask {
  day: string;
  task: string;
  type: "concept" | "code" | "dsa" | "project";
  duration: string;
  resource: string;
  completed: boolean;
}

export interface WeekPlan {
  week: number;
  theme: string;
  completed: boolean;
  topics: string[];
  dailyTasks: DailyTask[];
  dsaTopics: string[];
  weeklyProject: string;
}

export interface ProjectReview {
  id: string;
  projectName: string;
  githubUrl: string;
  techStack: string[];
  overallScore: number;
  submittedAt: string;
  status: "pending" | "reviewed";
}

export interface Notification {
  id: string;
  text: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  college: string;
  city: string;
  year: string;
  branch: string;
  targetRole: string;
  targetCompanies: string[];
  currentSkills: string[];
  githubUrl: string;
  avatar: string;
  timeline: string;
}

export interface SkillGapData {
  analyzed: boolean;
  readinessScore: number;
  currentLevel: string;
  estimatedWeeks: number;
  strongSkills: string[];
  missingSkills: MissingSkill[];
  summary: string;
  analyzedAt: string;
}

export interface LearningPathData {
  generated: boolean;
  totalWeeks: number;
  currentWeek: number;
  weeklyPlan: WeekPlan[];
  overallProgress: number;
}

export interface InterviewPrepData {
  questionsAttempted: number;
  questionsSolved: string[];
  mockSessionsCompleted: number;
  weakAreas: string[];
  strongAreas: string[];
}

/* ─── Store Interface ─── */
interface SarthiStore {
  user: UserProfile;
  skillGap: SkillGapData;
  learningPath: LearningPathData;
  projectReviews: ProjectReview[];
  interviewPrep: InterviewPrepData;
  onboardingComplete: boolean;
  activeSection: string;
  notifications: Notification[];
  mobileMenuOpen: boolean;

  setUser: (data: Partial<UserProfile>) => void;
  setSkillGap: (data: Partial<SkillGapData>) => void;
  setLearningPath: (data: Partial<LearningPathData>) => void;
  addProjectReview: (review: ProjectReview) => void;
  updateTaskComplete: (week: number, taskIndex: number) => void;
  markWeekComplete: (week: number) => void;
  addSolvedQuestion: (id: string) => void;
  setOnboardingComplete: () => void;
  addNotification: (notif: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setActiveSection: (section: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

/* ─── Demo Data ─── */
const demoUser: UserProfile = {
  name: "Vikas Sharma",
  college: "Poornima University",
  city: "Jaipur",
  year: "3rd Year",
  branch: "CS",
  targetRole: "Backend SDE",
  targetCompanies: ["Flipkart", "Razorpay", "Zerodha"],
  currentSkills: ["Python", "Node.js", "MongoDB", "Git", "HTML/CSS", "JavaScript"],
  githubUrl: "https://github.com/vikassharma",
  avatar: "VS",
  timeline: "3 months",
};

const demoSkillGap: SkillGapData = {
  analyzed: true,
  readinessScore: 62,
  currentLevel: "Intermediate",
  estimatedWeeks: 8,
  strongSkills: ["Python", "Node.js", "MongoDB", "Git", "REST APIs"],
  missingSkills: [
    { skill: "System Design", priority: "high", reason: "Required for SDE-2 interviews", estimatedWeeks: 4 },
    { skill: "Docker & Kubernetes", priority: "high", reason: "Production deployment standard", estimatedWeeks: 3 },
    { skill: "Redis & Caching", priority: "medium", reason: "Performance optimization layer", estimatedWeeks: 2 },
    { skill: "PostgreSQL", priority: "medium", reason: "Relational DB mastery needed", estimatedWeeks: 2 },
    { skill: "CI/CD Pipelines", priority: "medium", reason: "DevOps awareness expected", estimatedWeeks: 1 },
    { skill: "Unit Testing", priority: "low", reason: "Code quality signal for interviews", estimatedWeeks: 1 },
  ],
  summary: "You have solid fundamentals in backend development. Focus on system design patterns and DevOps tooling to become interview-ready for product companies.",
  analyzedAt: new Date().toISOString(),
};

const demoWeeks: WeekPlan[] = [
  {
    week: 1, theme: "Backend Foundations & SQL", completed: true,
    topics: ["REST API Best Practices", "PostgreSQL Deep Dive", "ORM (Prisma/Sequelize)"],
    dailyTasks: [
      { day: "Monday", task: "REST API Design Patterns", type: "concept", duration: "2h", resource: "https://restfulapi.net", completed: true },
      { day: "Tuesday", task: "PostgreSQL Setup & Queries", type: "code", duration: "3h", resource: "https://www.postgresql.org/docs", completed: true },
      { day: "Wednesday", task: "Two Sum & Valid Parentheses", type: "dsa", duration: "2h", resource: "LeetCode", completed: true },
      { day: "Thursday", task: "Build CRUD API with Express", type: "project", duration: "3h", resource: "Express docs", completed: true },
      { day: "Friday", task: "SQL Joins & Subqueries", type: "concept", duration: "2h", resource: "SQLBolt", completed: true },
    ],
    dsaTopics: ["Arrays", "Strings", "Hash Maps"],
    weeklyProject: "Build a RESTful Notes API with PostgreSQL",
  },
  {
    week: 2, theme: "Authentication & Security", completed: true,
    topics: ["JWT Authentication", "OAuth 2.0", "Input Validation", "CORS & Helmet"],
    dailyTasks: [
      { day: "Monday", task: "JWT Token Flow Deep Dive", type: "concept", duration: "2h", resource: "jwt.io", completed: true },
      { day: "Tuesday", task: "Implement Auth Middleware", type: "code", duration: "3h", resource: "Node.js docs", completed: true },
      { day: "Wednesday", task: "Linked List Problems", type: "dsa", duration: "2h", resource: "LeetCode", completed: true },
      { day: "Thursday", task: "OAuth2 with Google Sign-In", type: "project", duration: "3h", resource: "Passport.js docs", completed: true },
      { day: "Friday", task: "Security Best Practices", type: "concept", duration: "2h", resource: "OWASP", completed: true },
    ],
    dsaTopics: ["Linked Lists", "Stacks", "Queues"],
    weeklyProject: "Add JWT auth to Notes API",
  },
  {
    week: 3, theme: "Caching & Performance", completed: false,
    topics: ["Redis Fundamentals", "Caching Strategies", "Rate Limiting", "Database Indexing"],
    dailyTasks: [
      { day: "Monday", task: "Redis Data Structures", type: "concept", duration: "2h", resource: "redis.io", completed: true },
      { day: "Tuesday", task: "Implement Redis Caching Layer", type: "code", duration: "3h", resource: "ioredis docs", completed: true },
      { day: "Wednesday", task: "Binary Tree Traversals", type: "dsa", duration: "2h", resource: "LeetCode", completed: false },
      { day: "Thursday", task: "Rate Limiter Middleware", type: "project", duration: "3h", resource: "express-rate-limit", completed: false },
      { day: "Friday", task: "Database Indexing Strategies", type: "concept", duration: "2h", resource: "Use The Index, Luke", completed: false },
    ],
    dsaTopics: ["Trees", "Binary Search"],
    weeklyProject: "Add Redis caching + rate limiting to API",
  },
  {
    week: 4, theme: "Docker & Containerization", completed: false,
    topics: ["Docker Basics", "Dockerfile Optimization", "Docker Compose", "Container Networking"],
    dailyTasks: [
      { day: "Monday", task: "Docker Fundamentals", type: "concept", duration: "2h", resource: "Docker docs", completed: false },
      { day: "Tuesday", task: "Dockerize the Notes API", type: "code", duration: "3h", resource: "Docker docs", completed: false },
      { day: "Wednesday", task: "Graph BFS/DFS", type: "dsa", duration: "2h", resource: "LeetCode", completed: false },
      { day: "Thursday", task: "Multi-container with Compose", type: "project", duration: "3h", resource: "Docker Compose docs", completed: false },
      { day: "Friday", task: "Container Best Practices", type: "concept", duration: "2h", resource: "Hadolint", completed: false },
    ],
    dsaTopics: ["Graphs", "BFS", "DFS"],
    weeklyProject: "Dockerize full-stack app with Compose",
  },
  {
    week: 5, theme: "System Design Basics", completed: false,
    topics: ["Load Balancing", "Horizontal Scaling", "Database Sharding", "Message Queues"],
    dailyTasks: [
      { day: "Monday", task: "Scalability Patterns", type: "concept", duration: "2h", resource: "System Design Primer", completed: false },
      { day: "Tuesday", task: "Design a URL Shortener", type: "code", duration: "3h", resource: "educative.io", completed: false },
      { day: "Wednesday", task: "Dynamic Programming Intro", type: "dsa", duration: "2h", resource: "LeetCode", completed: false },
      { day: "Thursday", task: "Message Queue with RabbitMQ", type: "project", duration: "3h", resource: "RabbitMQ tutorials", completed: false },
      { day: "Friday", task: "CAP Theorem & Trade-offs", type: "concept", duration: "2h", resource: "Martin Kleppmann", completed: false },
    ],
    dsaTopics: ["Dynamic Programming", "Greedy"],
    weeklyProject: "Design Twitter Feed system (whiteboard)",
  },
  {
    week: 6, theme: "CI/CD & Testing", completed: false,
    topics: ["GitHub Actions", "Unit Testing with Jest", "Integration Testing", "Deployment Strategies"],
    dailyTasks: [
      { day: "Monday", task: "GitHub Actions Workflows", type: "concept", duration: "2h", resource: "GitHub docs", completed: false },
      { day: "Tuesday", task: "Write Unit Tests with Jest", type: "code", duration: "3h", resource: "Jest docs", completed: false },
      { day: "Wednesday", task: "Sliding Window Problems", type: "dsa", duration: "2h", resource: "LeetCode", completed: false },
      { day: "Thursday", task: "CI Pipeline for Notes API", type: "project", duration: "3h", resource: "GitHub Actions", completed: false },
      { day: "Friday", task: "Deployment to AWS EC2", type: "concept", duration: "2h", resource: "AWS docs", completed: false },
    ],
    dsaTopics: ["Sliding Window", "Two Pointers"],
    weeklyProject: "Full CI/CD pipeline + deploy Notes API",
  },
];

const demoNotifications: Notification[] = [
  { id: "n1", text: "Your skill gap analysis is ready!", type: "success", read: false, createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: "n2", text: "Week 2 learning path completed 🎉", type: "success", read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "n3", text: "You've solved 47 DSA questions!", type: "info", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "n4", text: "Submission deadline in 7 days", type: "warning", read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "n5", text: "New system design resource added", type: "info", read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

/* ─── Store ─── */
export const useSarthiStore = create<SarthiStore>()(
  persist(
    (set) => ({
      user: demoUser,
      skillGap: demoSkillGap,
      learningPath: {
        generated: true,
        totalWeeks: 6,
        currentWeek: 3,
        weeklyPlan: demoWeeks,
        overallProgress: 38,
      },
      projectReviews: [
        {
          id: "pr1",
          projectName: "Django Todo App",
          githubUrl: "https://github.com/vikassharma/django-todo",
          techStack: ["Python", "Django", "PostgreSQL"],
          overallScore: 62,
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          status: "reviewed",
        },
      ],
      interviewPrep: {
        questionsAttempted: 47,
        questionsSolved: ["q1", "q5", "q12", "q18", "q22"],
        mockSessionsCompleted: 3,
        weakAreas: ["System Design", "Dynamic Programming"],
        strongAreas: ["Arrays", "Strings", "Hash Maps", "REST APIs"],
      },
      onboardingComplete: true,
      activeSection: "dashboard",
      notifications: demoNotifications,
      mobileMenuOpen: false,

      /* ─── Actions ─── */
      setUser: (data) =>
        set((s) => ({ user: { ...s.user, ...data } })),

      setSkillGap: (data) =>
        set((s) => ({ skillGap: { ...s.skillGap, ...data } })),

      setLearningPath: (data) =>
        set((s) => ({ learningPath: { ...s.learningPath, ...data } })),

      addProjectReview: (review) =>
        set((s) => ({ projectReviews: [...s.projectReviews, review] })),

      updateTaskComplete: (week, taskIndex) =>
        set((s) => {
          const plan = [...s.learningPath.weeklyPlan];
          const w = { ...plan[week] };
          const tasks = [...w.dailyTasks];
          tasks[taskIndex] = { ...tasks[taskIndex], completed: !tasks[taskIndex].completed };
          w.dailyTasks = tasks;
          plan[week] = w;
          const totalTasks = plan.reduce((a, wk) => a + wk.dailyTasks.length, 0);
          const doneTasks = plan.reduce((a, wk) => a + wk.dailyTasks.filter((t) => t.completed).length, 0);
          return {
            learningPath: {
              ...s.learningPath,
              weeklyPlan: plan,
              overallProgress: Math.round((doneTasks / totalTasks) * 100),
            },
          };
        }),

      markWeekComplete: (week) =>
        set((s) => {
          const plan = [...s.learningPath.weeklyPlan];
          const w = { ...plan[week] };
          w.completed = true;
          w.dailyTasks = w.dailyTasks.map((t) => ({ ...t, completed: true }));
          plan[week] = w;
          const totalTasks = plan.reduce((a, wk) => a + wk.dailyTasks.length, 0);
          const doneTasks = plan.reduce((a, wk) => a + wk.dailyTasks.filter((t) => t.completed).length, 0);
          return {
            learningPath: {
              ...s.learningPath,
              weeklyPlan: plan,
              currentWeek: Math.min(week + 2, s.learningPath.totalWeeks),
              overallProgress: Math.round((doneTasks / totalTasks) * 100),
            },
          };
        }),

      addSolvedQuestion: (id) =>
        set((s) => ({
          interviewPrep: {
            ...s.interviewPrep,
            questionsAttempted: s.interviewPrep.questionsAttempted + 1,
            questionsSolved: [...s.interviewPrep.questionsSolved, id],
          },
        })),

      setOnboardingComplete: () => set({ onboardingComplete: true }),

      addNotification: (notif) =>
        set((s) => ({ notifications: [notif, ...s.notifications] })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      setActiveSection: (section) => set({ activeSection: section }),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    { name: "sarthi-store" }
  )
);
