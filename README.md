# Sarthi: AI Career Navigator for Bharat 🚀

Sarthi is an AI-powered platform designed to bridge the gap between academic curriculum and industry expectations. It provides students with a personalized learning roadmap, technical skills analysis, and interview preparation tools, all powered by state-of-the-art AI.

## ✨ Features

- **AI Skill Gap Analysis**: Dynamically analyzes your current skills against target industry roles (e.g., Backend SDE, Frontend, ML Engineer).
- **Personalized Learning Paths**: Generates a week-by-week curriculum with specific daily tasks and high-quality resources.
- **AI Project Review**: Paste a GitHub URL for a deep-dive audit of your code quality, security, and performance.
- **AI Resume Auditor**: Upload your PDF resume for professional scoring, strength identification, and actionable improvements.
- **Mock Interview Chat**: Practice with an AI Senior Technical Recruiter. Supports both text and **Voice-to-Text** for a realistic experience.
- **Real-Time Notifications**: Milestone achievements, analysis readiness, and streak alerts.
- **Mobile Optimized**: A premium, responsive experience on any device.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org) (App Router)
- **Styling**: Tailwind CSS & Framer Motion (Glassmorphic Design)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with Persistence
- **Backend / Database**: 
  - **AWS Bedrock**: Claude 3 (Sonnet & Haiku) for intelligent analysis and chat.
  - **Amazon DynamoDB**: Scalable, sub-second persistence for user profiles, roadmaps, and project reviews.
- **Utilities**: 
  - `bcryptjs` for secure local hashing.
  - `pdf-parse` for resume extraction.
  - Web Speech API for voice-to-text interviews.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- AWS Credentials with Bedrock and DynamoDB access.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/sarthix.git
   cd sarthix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env.local`:
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   DYNAMODB_TABLE_USERS=sarthi-users
   DYNAMODB_TABLE_SESSIONS=sarthi-sessions
   DYNAMODB_TABLE_REVIEWS=sarthi-reviews
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

## 🔒 Security

Sarthi prioritizes user data security:
- Passwords are hashed locally using `bcryptjs` before being sent to the cloud.
- AWS IAM roles and policies ensure minimal privileged access to DynamoDB tables.

## 📄 License

Professional Edition. All Rights Reserved.
