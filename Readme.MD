# Resume Analyzer & AI Interview Coach

An AI-powered web application that analyzes resumes, provides ATS optimization suggestions, identifies missing skills, and generates personalized interview questions based on the uploaded resume.

The project is designed to help job seekers improve their resumes while preparing for technical interviews through AI-driven insights.

---

## Features

### ✅ Current Features

- Upload resumes in PDF and DOCX formats
- Automatic resume text extraction
- Compare resumes with a job description
- Technical skill extraction
- Resume-to-job skill matching
- Resume Match percentage
- Matched skills identification
- Missing skills detection
- Dynamic ATS Score
- ATS Score Breakdown
  - Skill Match – 70 points
  - Email Presence – 15 points
  - Phone Presence – 15 points
- ATS compatibility classification
- Personalized resume improvement suggestions
- REST APIs built using Flask
- Cross-Origin Resource Sharing (CORS) support
- React + Vite frontend
- Responsive Resume Dashboard
- Reusable React component architecture
- Modular CSS architecture

### 🚧 Planned Features

- AI Interview Question Generator
- Resume history
- Download analysis report (PDF)
- User authentication
- Mock interview assistant

---

## Tech Stack

### Backend
- Python
- Flask
- Flask-CORS

### Resume Parsing
- pdfplumber
- python-docx

### AI (Upcoming)
- Google Gemini API

### Frontend (Progress )
- React
- Vite
- Javascript
- React Icons
- HTML5
- CSS3

---

## Project Structure

```text
resume-analyzer-interview-coach/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── uploads/
│   └── utils/
│       └── resume_parser.py
|       └── resume_analyzer.py
│
├── frontend/
  └── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── styles/
    ├── App.jsx
    └── main.jsx
│
├── docs/
│   ├── architecture.md
│   └── Project_journey.md
    └── React_notes.md
│
├── README.md
├── .gitignore

```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```
For backend 

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Run the Flask application:

```bash
python app.py
```

The server will start at:

```
http://127.0.0.1:5000
```
For Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependency

```bash
npm install
```

Run the application:
```bash
npm run dev
```

The server will start at:

```
http://localhost:5173
```
---

## API Overview

### Upload Resume

**Endpoint**

```
POST /upload
```

**Request**

- Content-Type: `multipart/form-data`
- Field Name: `resume`

**Sample Response**

```json
{
    "filename": "resume.pdf",
    "resume_text": "Extracted resume text..."
}
```

### Analyze Resume

**Endpoint**

```
POST /analyze
```

**Request**

```json
{
    "resume_text": "...",
    "job_description": "..."
}
```

**Sample Response**

```json
{
    "ats_score": 80,
    "ats_breakdown": {
        "skill_match_score": 50,
        "email_score": 15,
        "phone_score": 15
    },
    "resume_match": 71,
    "matched_skills": [
        "Python",
        "Tensorflow",
        "Pytorch",
        "Nlp",
        "Aws"
    ],
    "missing_skills": [
        "Docker",
        "Kubernetes"
    ],
    "resume_skills": [
        "Python",
        "Sql",
        "Machine Learning",
        "Tensorflow",
        "Pytorch"
    ],
    "suggestions": [
        "Your resume has a good ATS score, but adding more relevant keywords can improve it.",
        "Add these relevant skills if you have experience: Docker, Kubernetes"
    ]
}
```

---

## Current Progress


## Current Progress

| Step | Description                             | Status       |
| ---- | -----------                             | -----------  |
| 1    | Project Initialization                  | ✅ Completed |
| 2    | GitHub Integration                      | ✅ Completed |
| 3    | Backend Setup                           | ✅ Completed |
| 4    | Resume Parsing Module                   | ✅ Completed |
| 5    | Resume Upload API                       | ✅ Completed |
| 6    | React Frontend Initialization           | ✅ Completed |
| 7    | Frontend Architecture & Landing Page    | ✅ Completed |
| 8    | AI Interview Coach Preview              | ✅ Completed |
| 9    | Resume Analysis Dashboard               | ✅ Completed |
| 10   | AI Resume Analysis Integration          | ✅ Completed |
| 11   | ATS Score Breakdown                     | ✅ Completed |
| 12   | Resume Strengths & Weaknesses           | ⏳ Upcoming  |
| 13   | Enhanced Resume Improvement Suggestions | ⏳ Upcoming  |
| 14   | AI Interview Question Generator         | ⏳ Upcoming  |
| 15   | AI Mock Interview                       | ⏳ Upcoming  |
| 16   | Interview Feedback & Scoring            | ⏳ Upcoming  |
| 17   | Resume Analysis History                 | ⏳ Upcoming  |
| 18   | User Authentication                     | ⏳ Upcoming  |
| 19   | Download Analysis Report                | ⏳ Upcoming  |


---

## Future Enhancements

- Resume strengths and weaknesses analysis
- Enhanced resume improvement recommendations
- AI Interview Question Generator
- AI-powered mock interview assistant
- Interview feedback and scoring
- Resume analysis history
- User authentication
- Download analysis report as PDF
- Google Gemini API integration

---

## Documentation

Additional project documentation is available in the `docs/` directory:

- `architecture.md` – System architecture and design
- `Project_journey.md` – Development progress and implementation journey
- `React_notes.md` - Notes of react and it's components

---

## License

This project is developed for learning, portfolio, and interview preparation purposes.