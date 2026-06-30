# System Architecture

## Overview

The Resume Analyzer & AI Interview Coach follows a modular architecture, where each component has a specific responsibility. The application accepts a user's resume, extracts its content, analyzes it using an AI model, and presents actionable insights through a user-friendly interface.

---

## High-Level Architecture

```text
+----------------------+
|      Frontend        |
|     (Streamlit)      |
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

## 1. Frontend (Streamlit)

Responsibilities:

- Upload resume (PDF/DOCX)
- Display resume analysis
- Show ATS score
- Display strengths and weaknesses
- Show missing skills
- Generate interview questions

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

1. User uploads a resume through the Streamlit interface.
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
| Frontend (Streamlit) | ⏳ Planned |
| Flask Backend | ✅ Implemented |
| Resume Upload API | ✅ Implemented |
| Resume Parser | ✅ Implemented |
| Gemini AI Integration | ⏳ Planned |
| Resume Analysis | ⏳ Planned |
| Interview Question Generator | ⏳ Planned |

---

## Future Enhancements

- Resume history
- User authentication
- Downloadable PDF report
- Job description matching
- Cover letter generation
- Database integration
- Cloud deployment