# Requirements Document: Sarthi - AI-Powered Career Navigation Platform

## Introduction

Sarthi (meaning "guide" in Hindi) is an AI-powered career and skill navigation platform designed specifically for engineering students from tier-2 and tier-3 colleges in India. The platform bridges the gap between academic learning and industry requirements by providing personalized skill gap analysis, learning path generation, project reviews, and interview preparation guidance.

## Glossary

- **Sarthi_Platform**: The complete AI-powered career navigation system
- **Student**: An engineering student from a tier-2 or tier-3 college in India who uses the platform
- **Student_Profile**: A data structure containing student's current skills, academic background, completed projects, and career goals
- **Target_Role**: A specific job position or career path that a student aspires to achieve
- **Skill_Gap**: The difference between a student's current skill set and the skills required for their target role
- **Learning_Path**: A customized, sequential roadmap of learning resources and milestones
- **Project_Review**: An AI-generated analysis of a student's college project with actionable feedback
- **Interview_Prep_Session**: A guided practice session for technical or behavioral interviews
- **Skill_Assessment**: An evaluation of a student's proficiency in specific technical or soft skills
- **Industry_Requirements**: The set of skills, knowledge, and competencies expected by employers for specific roles
- **Production_Ready**: A project that meets industry standards for code quality, documentation, and deployment

## Requirements

### Requirement 1: Student Profile Management

**User Story:** As a student, I want to create and maintain my profile with my skills, academic background, and projects, so that the platform can provide personalized recommendations.

#### Acceptance Criteria

1. WHEN a student registers on the platform, THE Sarthi_Platform SHALL create a new Student_Profile with basic information
2. WHEN a student adds skills to their profile, THE Sarthi_Platform SHALL validate and store the skills with proficiency levels
3. WHEN a student updates their academic background, THE Sarthi_Platform SHALL persist the changes to the Student_Profile immediately
4. WHEN a student adds project details, THE Sarthi_Platform SHALL store project metadata including title, description, technologies used, and repository links
5. THE Sarthi_Platform SHALL allow students to specify multiple Target_Roles in their profile

### Requirement 2: Skill Gap Analysis

**User Story:** As a student, I want to analyze the gap between my current skills and my target role requirements, so that I know what to learn next.

#### Acceptance Criteria

1. WHEN a student requests skill gap analysis for a Target_Role, THE Sarthi_Platform SHALL retrieve current Industry_Requirements for that role
2. WHEN comparing student skills against Industry_Requirements, THE Sarthi_Platform SHALL identify all missing skills and categorize them by priority
3. WHEN generating a Skill_Gap report, THE Sarthi_Platform SHALL include both technical skills and soft skills gaps
4. WHEN a Skill_Gap is identified, THE Sarthi_Platform SHALL provide a difficulty estimate and time-to-learn estimate for each gap
5. THE Sarthi_Platform SHALL update Skill_Gap analysis when the Student_Profile changes

### Requirement 3: Personalized Learning Path Generation

**User Story:** As a student, I want a customized learning roadmap based on my skill gaps, so that I can systematically prepare for my target role.

#### Acceptance Criteria

1. WHEN a student requests a Learning_Path for a Target_Role, THE Sarthi_Platform SHALL generate a sequential roadmap addressing all identified Skill_Gaps
2. WHEN creating a Learning_Path, THE Sarthi_Platform SHALL prioritize skills based on industry demand and prerequisite dependencies
3. WHEN generating learning resources, THE Sarthi_Platform SHALL include free and affordable options suitable for tier-2/3 college students
4. WHEN a Learning_Path is created, THE Sarthi_Platform SHALL include milestone checkpoints and estimated completion timelines
5. WHEN a student completes a learning milestone, THE Sarthi_Platform SHALL update their Student_Profile and recalculate remaining Skill_Gaps

### Requirement 4: AI-Powered Project Review

**User Story:** As a student, I want my college projects reviewed with actionable feedback, so that I can make them production-ready and showcase them to employers.

#### Acceptance Criteria

1. WHEN a student submits a project for review, THE Sarthi_Platform SHALL analyze the project code, documentation, and structure
2. WHEN analyzing project code, THE Sarthi_Platform SHALL identify code quality issues, security vulnerabilities, and best practice violations
3. WHEN generating a Project_Review, THE Sarthi_Platform SHALL provide specific, actionable recommendations for improvement
4. WHEN evaluating a project, THE Sarthi_Platform SHALL assess whether the project meets Production_Ready standards
5. WHEN a Project_Review is complete, THE Sarthi_Platform SHALL generate a prioritized list of improvements with implementation guidance
6. THE Sarthi_Platform SHALL evaluate project documentation completeness including README, setup instructions, and API documentation

### Requirement 5: Interview Preparation Coach

**User Story:** As a student, I want interview preparation guidance and practice, so that I can confidently face technical and behavioral interviews.

#### Acceptance Criteria

1. WHEN a student requests interview preparation for a Target_Role, THE Sarthi_Platform SHALL generate role-specific interview questions
2. WHEN conducting a practice Interview_Prep_Session, THE Sarthi_Platform SHALL provide questions covering both technical and behavioral aspects
3. WHEN a student answers an interview question, THE Sarthi_Platform SHALL evaluate the response and provide constructive feedback
4. WHEN generating technical questions, THE Sarthi_Platform SHALL align questions with the student's Target_Role and current skill level
5. THE Sarthi_Platform SHALL track interview preparation progress and identify areas needing more practice

### Requirement 6: User Authentication and Authorization

**User Story:** As a student, I want secure access to my profile and data, so that my information remains private and protected.

#### Acceptance Criteria

1. WHEN a student registers, THE Sarthi_Platform SHALL require a valid email address and secure password
2. WHEN a student logs in, THE Sarthi_Platform SHALL authenticate credentials and create a secure session
3. WHEN a session expires, THE Sarthi_Platform SHALL require re-authentication before allowing access to protected resources
4. THE Sarthi_Platform SHALL encrypt sensitive student data at rest and in transit
5. WHEN a student requests password reset, THE Sarthi_Platform SHALL send a secure reset link to their registered email

### Requirement 7: AI Integration with AWS Bedrock

**User Story:** As the system, I need to integrate with AWS Bedrock for AI capabilities, so that I can provide intelligent analysis and recommendations.

#### Acceptance Criteria

1. WHEN the Sarthi_Platform needs AI analysis, THE Sarthi_Platform SHALL send requests to AWS Bedrock with appropriate context
2. WHEN AWS Bedrock returns a response, THE Sarthi_Platform SHALL parse and validate the response before presenting to students
3. IF AWS Bedrock is unavailable, THEN THE Sarthi_Platform SHALL return a graceful error message and queue the request for retry
4. THE Sarthi_Platform SHALL implement rate limiting to prevent excessive API calls to AWS Bedrock
5. WHEN making AI requests, THE Sarthi_Platform SHALL include relevant student context while respecting privacy constraints

### Requirement 8: Data Persistence and Retrieval

**User Story:** As the system, I need to reliably store and retrieve student data, so that students can access their information across sessions.

#### Acceptance Criteria

1. WHEN student data is created or updated, THE Sarthi_Platform SHALL persist changes to the database immediately
2. WHEN retrieving student data, THE Sarthi_Platform SHALL return the most recent version within 200 milliseconds for typical queries
3. WHEN a database operation fails, THE Sarthi_Platform SHALL log the error and return an appropriate error message to the user
4. THE Sarthi_Platform SHALL maintain data consistency across all student profile updates
5. WHEN querying for skill gap analysis history, THE Sarthi_Platform SHALL retrieve all historical analyses for a student efficiently

### Requirement 9: Frontend User Interface

**User Story:** As a student, I want an intuitive and responsive interface, so that I can easily navigate the platform and access features.

#### Acceptance Criteria

1. WHEN a student accesses the platform, THE Sarthi_Platform SHALL display a responsive interface that works on desktop and mobile devices
2. WHEN navigating between features, THE Sarthi_Platform SHALL provide clear navigation elements and breadcrumbs
3. WHEN loading data, THE Sarthi_Platform SHALL display loading indicators to inform students of ongoing operations
4. WHEN errors occur, THE Sarthi_Platform SHALL display user-friendly error messages with guidance on resolution
5. THE Sarthi_Platform SHALL support both English and Hindi language interfaces for accessibility

### Requirement 10: Performance and Scalability

**User Story:** As a platform administrator, I want the system to handle multiple concurrent users efficiently, so that all students have a smooth experience.

#### Acceptance Criteria

1. WHEN multiple students access the platform simultaneously, THE Sarthi_Platform SHALL maintain response times under 2 seconds for page loads
2. WHEN generating AI-powered analysis, THE Sarthi_Platform SHALL provide progress indicators for operations taking longer than 3 seconds
3. THE Sarthi_Platform SHALL support at least 1000 concurrent users without performance degradation
4. WHEN database queries are executed, THE Sarthi_Platform SHALL use appropriate indexes to optimize query performance
5. WHEN static assets are requested, THE Sarthi_Platform SHALL serve them through a CDN for faster delivery
