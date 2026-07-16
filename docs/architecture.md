# System Architecture

## Overview

The Resume Analyzer & AI Interview Coach follows a modular architecture, where each component has a specific responsibility. The application accepts a user's resume, extracts its content, analyzes it using an AI model, and presents actionable insights through a user-friendly interface.

---

## High-Level Architecture

```text
+----------------------+
|      Frontend        |
|     (React + Vite)      |
+----------+-----------+
           |
           | HTTP Request
           |
+----------v-----------+
|    Flask Backend     |
|      (REST API)      |
+----------+-----------+
           |
           +----------------------------+
           |                            |
           |                            |
+----------v-----------+      +---------v----------+
|   Resume Parser      |      |   Gemini AI        |
| (PDF / DOCX Parser)  |      | Resume Analysis    |
+----------+-----------+      +---------+----------+
           |                            |
           |                            |
           +-------------+--------------+
                         |
                         v
               AI Analysis Result
                         |
                         v
                JSON Response to UI
```

---

# Component Description

## 1. Frontend (React)

Responsibilities:

- Upload resume (PDF/DOCX)
- Display resume analysis
- Show ATS score
- Display strengths and weaknesses
- Show missing skills
- Generate interview questions

Frontend Structure:

frontend/
└── src/
    ├── assets/
    ├── components/
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
    |   |
    |   ├── InterviewCoach/
    |   |   ├── InterviewCoach.jsx
    |   |   ├── InterviewCoach.css
    │
    ├── pages/
    ├── styles/
    ├── App.jsx
    └── main.jsx

Landing Page Flow/Structure:

Navbar
│
├── Hero
|
├── Features
|
├── How It Works
|
├── AI Interview Coach Preview
|
├── Resume Analysis Preview
|
├── FAQ
|
├── CTA(Call to action)
|
└── Footer

------------------------------------------------------------
                    ResumeAI

Home | Features | How It Works | FAQ

Analyze Your Resume.
Ace Every Interview.

[ Analyze Resume ]   [ Try AI Interview Coach ]

------------------------------------------------------------

---

## 2. Backend (Flask)

Responsibilities:

- Expose REST APIs
- Receive uploaded resume
- Validate uploaded files
- Invoke resume parser
- Send extracted text to AI service
- Return analysis as JSON

---

## 3. Resume Parser

Responsibilities:

- Extract text from PDF resumes
- Extract text from DOCX resumes
- Produce clean text for AI analysis

Libraries Used:

- pdfplumber
- python-docx

---

## 4. AI Service (Google Gemini)

Responsibilities:

- Analyze resume content
- Calculate ATS compatibility
- Identify strengths
- Identify weaknesses
- Detect missing skills
- Suggest improvements
- Generate personalized interview questions

---

## Data Flow

1. User uploads a resume through the React interface.
2. The frontend sends the file to the Flask backend.
3. The backend stores the uploaded file temporarily.
4. The Resume Parser extracts the text from the document.
5. The extracted text is sent to the Gemini AI model.
6. Gemini analyzes the resume and generates recommendations.
7. The backend formats the AI response as JSON.
8. The frontend displays the analysis to the user.

---

## Current Architecture Status

| Component | Status |
|-----------|--------|
| Frontend (React + Vite) | 🚧 Landing Page in Progress |
| Navbar | ✅ Completed |
| Hero Section | ✅ Completed |
| Features Section | ✅ Completed |
| How It Works Section | ✅ Completed |
| Flask Backend | ✅ Implemented |
| Resume Upload API | ✅ Implemented |
| Resume Parser | ✅ Implemented |
| AI Interview Coach Preview | ✅ Implemented |
| Resume Analysis Preview | ⏳ Planned |
| Gemini AI Integration | ⏳ Planned |

---

## Future Enhancements

- Resume history
- User authentication
- Downloadable PDF report
- Job description matching
- Cover letter generation
- AI mock interview session
- AI chat assistant
- Database integration
- Cloud deployment