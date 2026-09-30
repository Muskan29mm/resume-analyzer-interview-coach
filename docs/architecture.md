# System Architecture

## Overview

The **Resume Analyzer & AI Interview Coach** follows a modular architecture in which each component has a specific responsibility.

The application allows users to:

* Upload a resume in PDF or DOCX format.
* Extract and process resume content.
* Analyze the resume against a job description.
* Calculate ATS compatibility.
* Identify matching and missing skills.
* Display resume strengths and weaknesses.
* Generate personalized resume improvement suggestions.
* Generate AI-powered interview questions.
* Conduct an interactive mock interview.
* Evaluate individual interview answers.
* Generate an overall interview performance review.

The system uses **React + Vite** for the frontend, **Flask** for the backend REST API, and **Google Gemini** for AI-powered analysis and interview functionality.

---

# High-Level Architecture

```text
                         +----------------------+
                         |      Frontend        |
                         |    React + Vite      |
                         +----------+-----------+
                                    |
                                    | HTTP Requests
                                    |
                         +----------v-----------+
                         |    Flask Backend     |
                         |      REST API        |
                         +----------+-----------+
                                    |
              +---------------------+----------------------+
              |                     |                      |
              |                     |                      |
      +-------v--------+    +-------v--------+    +--------v---------+
      | Resume Parser  |    | Resume         |    | Interview        |
      | PDF / DOCX     |    | Analysis       |    | Generator        |
      +-------+--------+    +-------+--------+    +--------+---------+
              |                     |                      |
              |                     |                      |
              |             +-------v----------------------v------+
              |             |          Google Gemini AI            |
              +-----------> | Resume Analysis + Interview AI      |
                            +----------------+---------------------+
                                             |
                                             |
                              +--------------v--------------+
                              |       AI Results            |
                              |                              |
                              | - ATS Score                 |
                              | - Skills Match              |
                              | - Strengths / Weaknesses    |
                              | - Suggestions               |
                              | - Interview Questions       |
                              | - Answer Evaluation         |
                              | - Overall Interview Review  |
                              +--------------+---------------+
                                             |
                                             v
                                   JSON Response to UI
```

---

# Component Description

## 1. Frontend (React + Vite)

The frontend provides the user interface for resume analysis and the AI interview experience.

### Responsibilities

* Upload resume files.
* Accept job descriptions.
* Display resume analysis results.
* Display ATS score and breakdown.
* Display matching and missing skills.
* Display resume strengths and weaknesses.
* Display improvement suggestions.
* Configure AI interview generation.
* Display generated interview questions.
* Start and manage mock interview sessions.
* Accept user answers.
* Display AI feedback for individual answers.
* Display the final overall interview review.

### Frontend Structure

```text
frontend/
└── src/
    ├── assets/

    ├── components/
    │
    │   ├── Navbar/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   │
    │   ├── Hero/
    │   │   ├── Hero.jsx
    │   │   └── Hero.css
    │   │
    │   ├── SectionTitle/
    │   │   ├── SectionTitle.jsx
    │   │   └── SectionTitle.css
    │   │
    │   ├── Features/
    │   │   ├── Features.jsx
    │   │   └── Features.css
    │   │
    │   ├── HowItWorks/
    │   │   ├── HowItWorks.jsx
    │   │   └── HowItWorks.css
    │   │
    │   ├── InterviewCoach/
    │   │   ├── InterviewCoach.jsx
    │   │   └── InterviewCoach.css
    │   │
    │   ├── ResumeDashboard/
    │   │   ├── ResumeDashboard.jsx
    │   │   └── ResumeDashboard.css
    │   │
    │   └── AIInterviewQuestionGenerator/
    │       ├── AIInterviewQuestionGenerator.jsx
    │       └── AIInterviewQuestionGenerator.css
    │
    ├── pages/
    ├── styles/
    ├── App.jsx
    └── main.jsx
```

---

# Landing Page Structure

```text
Navbar
   │
   ├── Hero
   │
   ├── Features
   │
   ├── How It Works
   │
   ├── AI Interview Coach Preview
   │
   ├── Resume Analysis Preview
   │
   ├── FAQ
   │
   ├── CTA (Call to Action)
   │
   └── Footer
```

### Conceptual Landing Page

```text
------------------------------------------------------------
                         ResumeAI

Home | Features | How It Works | FAQ

              Analyze Your Resume.
              Ace Every Interview.

       [ Analyze Resume ]  [ Try AI Interview Coach ]

------------------------------------------------------------
```

---

# 2. Backend (Flask)

The Flask backend acts as the central API layer between the React frontend, resume-processing utilities, and Gemini AI service.

### Responsibilities

* Expose REST APIs.
* Receive uploaded resumes.
* Validate uploaded files.
* Store uploaded files temporarily.
* Invoke the resume parser.
* Process resume and job-description data.
* Perform resume analysis.
* Generate ATS-related results.
* Generate interview questions.
* Evaluate interview answers.
* Generate the overall interview review.
* Return structured JSON responses to the frontend.
* Handle API validation and errors.

### Main Backend Structure

```text
backend/
├── app.py
│
├── utils/
│   ├── resume_parser.py
│   ├── resume_analyzer.py
│   └── interview_generator.py
│
├── uploads/
│
└── .env
```

---

# 3. Resume Parser

The Resume Parser is responsible for extracting readable text from uploaded resume documents.

### Responsibilities

* Extract text from PDF resumes.
* Extract text from DOCX resumes.
* Validate supported file types.
* Provide extracted resume text to the analysis layer.

### Libraries Used

* `pdfplumber`
* `python-docx`

### Supported Formats

```text
.pdf
.docx
```

---

# 4. Resume Analysis Module

The Resume Analysis module processes the extracted resume text together with the user's job description.

### Responsibilities

* Analyze resume content.
* Compare resume skills with job-description requirements.
* Calculate ATS score.
* Generate ATS score breakdown.
* Identify matching skills.
* Identify missing skills.
* Identify resume strengths.
* Identify resume weaknesses.
* Generate personalized improvement suggestions.

### Analysis Flow

```text
Resume Text
     +
Job Description
     |
     v
Resume Analysis
     |
     +------------------+
     |                  |
     v                  v
ATS Analysis       Skill Matching
     |                  |
     +--------+---------+
              |
              v
     Strengths / Weaknesses
              |
              v
     Improvement Suggestions
              |
              v
         JSON Response
```

---

# 5. AI Service (Google Gemini)

Google Gemini is used as the application's AI processing layer.

The AI service supports both resume analysis and interview-related functionality.

### Responsibilities

#### Resume Analysis

* Analyze resume content.
* Evaluate ATS compatibility.
* Identify strengths.
* Identify weaknesses.
* Identify missing skills.
* Generate improvement suggestions.

#### Interview Question Generation

* Generate personalized interview questions.
* Use resume content as context.
* Use job description as context.
* Support different question types.
* Support different difficulty levels.
* Generate the requested number of questions.

### Supported Interview Question Types

```text
Mixed
Technical
Behavioral
Situational
Project-Based
HR
```

### Supported Difficulty Levels

```text
Easy
Medium
Hard
```

---

# 6. AI Interview Coach

The AI Interview Coach provides an interactive mock interview experience.

### Responsibilities

* Receive generated interview questions.
* Present questions one at a time.
* Allow users to submit answers.
* Send answers to the backend for evaluation.
* Display AI-generated feedback.
* Allow users to move to the next question.
* Track interview progress.
* Finish the interview after the final question.
* Generate an overall interview review.

### Interview Flow

```text
Generate Interview Questions
            |
            v
      Start Interview
            |
            v
       Display Question
            |
            v
       User Gives Answer
            |
            v
     AI Answer Evaluation
            |
            +----------------------+
            |                      |
            v                      v
       Feedback                  Score
            |                      |
            +----------+-----------+
                       |
                       v
                Next Question
                       |
                       v
              Repeat Interview
                       |
                       v
                Finish Interview
                       |
                       v
            Overall Interview Review
```

---

# 7. Interview Answer Evaluation

The Interview Answer Evaluation module evaluates each submitted answer using the resume, job description, interview question, and user's answer.

### Inputs

```text
Resume
Job Description
Interview Question
Candidate Answer
```

### AI Evaluation

Gemini evaluates the answer and generates:

* Score
* Feedback
* Strengths
* Areas for improvement

### Evaluation Flow

```text
Resume
   +
Job Description
   +
Interview Question
   +
Candidate Answer
        |
        v
   Gemini AI
        |
        v
Answer Evaluation
        |
        +----------------------+
        |          |           |
        v          v           v
      Score     Strengths   Improvements
        |
        v
      Feedback
```

The answer score is validated on a **1–10 scale** before being returned to the frontend.

---

# 8. Overall Interview Review

After the mock interview is completed, the system generates an overall assessment using the complete interview session.

### Inputs

```text
Resume
Job Description
Interview Questions
Candidate Answers
Individual Answer Evaluations
```

### Overall Review Includes

* Overall interview score.
* Technical knowledge score.
* Answer quality score.
* Communication score.
* Clarity score.
* Depth of understanding score.
* Overall summary.
* Strengths.
* Areas for improvement.
* Recommendations.

### Overall Review Flow

```text
Completed Interview
        |
        v
Questions + Answers
        |
        v
Individual Evaluations
        |
        v
   Gemini AI Review
        |
        v
Overall Interview Review
        |
        +---------------------------+
        |                           |
        v                           v
   Category Scores          Strengths / Improvements
        |
        v
      Summary
```

---

# API Layer

The Flask backend exposes REST endpoints for the major application workflows.

| Endpoint              | Method | Purpose                                   |
| --------------------- | ------ | ----------------------------------------- |
| `/upload`             | POST   | Upload and process a resume               |
| `/analyze`            | POST   | Analyze resume against a job description  |
| `/generate-interview` | POST   | Generate personalized interview questions |
| `/evaluate-answer`    | POST   | Evaluate an individual interview answer   |
| `/overall-review`     | POST   | Generate the final interview review       |

---

# Data Flow

## Resume Analysis Flow

1. User uploads a PDF or DOCX resume through the React interface.
2. Frontend sends the resume to the Flask backend.
3. Backend validates and temporarily stores the uploaded file.
4. Resume Parser extracts the resume text.
5. The frontend/backend provides the job description for analysis.
6. Resume analysis processes the resume and job-description data.
7. Gemini generates AI-powered analysis and recommendations where applicable.
8. Backend structures the results as JSON.
9. Frontend displays ATS score, skill matching, strengths, weaknesses, and improvement suggestions.

## Interview Flow

1. User provides a resume and job description.
2. User selects interview type, difficulty, and number of questions.
3. Frontend sends the request to `/generate-interview`.
4. Backend sends the relevant context to Gemini.
5. Gemini generates personalized interview questions.
6. Frontend displays the generated questions.
7. User starts the mock interview.
8. Questions are displayed one at a time.
9. User submits an answer.
10. Frontend sends the answer to `/evaluate-answer`.
11. Gemini evaluates the answer.
12. Frontend displays the score, feedback, strengths, and improvements.
13. User proceeds to the next question.
14. The process continues until all questions are completed.
15. The collected interview data is sent to `/overall-review`.
16. Gemini generates the overall interview review.
17. Frontend displays the final interview performance results.

---

# Complete System Workflow

```text
                  USER
                    |
                    v
             Upload Resume
                    |
                    v
             Resume Parser
                    |
                    v
              Resume Text
                    |
          +---------+---------+
          |                   |
          v                   v
   Resume Analysis      Job Description
          |                   |
          +---------+---------+
                    |
                    v
              Gemini AI
                    |
                    v
        Resume Analysis Results
                    |
       +------------+-------------+
       |            |             |
       v            v             v
    ATS Score   Skills Match   Suggestions
       |
       v
 Strengths / Weaknesses
                    |
                    v
        Generate Interview
             Questions
                    |
                    v
             Mock Interview
                    |
                    v
             User Answer
                    |
                    v
          Answer Evaluation
                    |
       +------------+-------------+
       |            |             |
       v            v             v
     Score      Feedback     Improvements
                    |
                    v
             Next Question
                    |
                    v
             Finish Interview
                    |
                    v
        Overall Interview Review
                    |
                    v
             Final Results
```

---

# Current Architecture Status

| Component                       | Status        |
| ------------------------------- | ------------- |
| Frontend (React + Vite)         | ✅ Implemented |
| Navbar                          | ✅ Completed   |
| Hero Section                    | ✅ Completed   |
| Features Section                | ✅ Completed   |
| How It Works Section            | ✅ Completed   |
| Flask Backend                   | ✅ Implemented |
| Resume Upload API               | ✅ Implemented |
| Resume Parser                   | ✅ Implemented |
| Resume Analysis                 | ✅ Implemented |
| ATS Score & Breakdown           | ✅ Implemented |
| Skill Matching                  | ✅ Implemented |
| Resume Strengths & Weaknesses   | ✅ Implemented |
| Resume Improvement Suggestions  | ✅ Implemented |
| AI Interview Question Generator | ✅ Implemented |
| AI Mock Interview               | ✅ Implemented |
| Interview Answer Evaluation     | ✅ Implemented |
| Overall Interview Review        | ✅ Implemented |
| Gemini AI Integration           | ✅ Implemented |
| Analysis History                | ⏳ Upcoming    |
| User Authentication             | ⏳ Upcoming    |
| Downloadable Reports            | ⏳ Upcoming    |

---

# Future Enhancements

The following features are planned for future development:

* Resume analysis history.
* Saved interview sessions.
* User authentication.
* User profiles.
* Persistent database storage.
* Downloadable PDF analysis reports.
* Interview performance history.
* Advanced interview analytics.
* Cover letter generation.
* AI chat assistant.
* Improved AI reliability and retry handling.
* Cloud deployment.
* Production monitoring and logging.

---

# Technology Stack

```text
Frontend
├── React
├── Vite
├── JavaScript
└── CSS

Backend
├── Python
├── Flask
├── Flask-CORS
└── REST APIs

Resume Processing
├── pdfplumber
└── python-docx

AI
└── Google Gemini API

Development
├── Git
└── GitHub
```

---

# Architecture Summary

The application follows a modular **Frontend → Backend → AI/Processing → Backend → Frontend** architecture.

The Flask backend acts as the central orchestration layer. Resume parsing and analysis are handled through dedicated utility modules, while Gemini provides AI-powered resume and interview intelligence.

The architecture currently supports the complete core workflow:

**Resume Upload → Resume Parsing → Resume Analysis → ATS Analysis → Skill Matching → Improvement Suggestions → Interview Question Generation → AI Mock Interview → Answer Evaluation → Overall Interview Review**

The architecture is designed so that future capabilities such as authentication, persistent storage, analysis history, reporting, and advanced analytics can be added without significantly changing the existing core components.
