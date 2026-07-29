# Resume Analyzer & AI Interview Coach

An AI-powered web application that analyzes resumes, provides ATS optimization suggestions, identifies missing skills, and generates personalized interview questions based on the uploaded resume.

The project is designed to help job seekers improve their resumes while preparing for technical interviews through AI-driven insights.

---

## Features

### ✅ Current Features

- Upload resumes in PDF and DOCX formats
- Extract text from uploaded resumes
- Compare resumes with a job description
- Generate Resume Match percentage
- Identify matching strengths
- Detect missing skills
- Generate resume improvement suggestions
- REST APIs built using Flask
- Cross-Origin Resource Sharing (CORS) support
- React + Vite frontend
- Responsive Resume Dashboard
- Reusable React component architecture
- Modular CSS architecture

### 🚧 Planned Features

- AI Interview Question Generator
- ATS score visualization
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
    "resume_match": 85,
    "strengths": [],
    "missing_skills": [],
    "suggestions": []
}
```

---

## Current Progress


| Step | Description                          | Status      |
| ---- | ------------------------------------ | ----------- |
| 1    | Project Initialization               | ✅ Completed |
| 2    | GitHub Integration                   | ✅ Completed |
| 3    | Backend Setup                        | ✅ Completed |
| 4    | Resume Parsing Module                | ✅ Completed |
| 5    | Resume Upload API                    | ✅ Completed |
| 6    | React Frontend Initialization        | ✅ Completed |
| 7    | Frontend Architecture & Landing Page | ✅ Completed |
| 8    | AI Interview Coach Preview           | ✅ Completed |
| 9    | Resume Analysis Dashboard            | ✅ Completed |
| 10   | AI Resume Analysis Integration       | ✅ Completed |
| 11   | Call-to-Action Section               | ⏳ Upcoming  |
| 12   | Footer                               | ⏳ Upcoming  |
| 13   | Interview Question Generator         | ⏳ Upcoming  |


---

## Future Enhancements

- AI Interview Question Generator
- Download analysis report
- ATS score visualization
- Resume history
- User authentication
- Mock interview assistant

---

## Documentation

Additional project documentation is available in the `docs/` directory:

- `architecture.md` – System architecture and design
- `Project_journey.md` – Development progress and implementation journey
- `React_notes.md` - Notes of react and it's components

---

## License

This project is developed for learning, portfolio, and interview preparation purposes.