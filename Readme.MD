# Resume Analyzer & AI Interview Coach

An AI-powered web application that analyzes resumes, provides ATS optimization suggestions, identifies missing skills, and generates personalized interview questions based on the uploaded resume.

The project is designed to help job seekers improve their resumes while preparing for technical interviews through AI-driven insights.

---

## Features

### ✅ Current Features

- Upload resumes in PDF format
- Upload resumes in DOCX format
- Extract text from uploaded resumes
- REST API built using Flask
- Cross-Origin Resource Sharing (CORS) support
- Resume upload API tested using Postman

### 🚧 Planned Features

- AI-powered resume analysis
- ATS compatibility score
- Resume strengths and weaknesses
- Missing skills identification
- Personalized interview questions
- Resume improvement suggestions
- Interactive React frontend
- Resume history
- User authentication

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

### Frontend (Upcoming)
- Streamlit

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
│
├── frontend/
│
├── docs/
│   ├── architecture.md
│   └── Project_journey.md
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

---

## Current Progress

| Module | Status |
|---------|--------|
| Project Setup | ✅ Completed |
| Git & GitHub Setup | ✅ Completed |
| Backend Setup | ✅ Completed |
| Resume Upload API | ✅ Completed |
| Resume Text Extraction | ✅ Completed |
| AI Resume Analysis | ⏳ In Progress |
| Interview Question Generator | ⏳ Planned |
| Frontend Development | ⏳ Planned |

---

## Future Enhancements

- Resume scoring
- ATS optimization
- Skill gap analysis
- Cover letter generation
- Mock interview assistant
- Resume dashboard
- Authentication & user profiles

---

## Documentation

Additional project documentation is available in the `docs/` directory:

- `architecture.md` – System architecture and design
- `Project_journey.md` – Development progress and implementation journey

---

## License

This project is developed for learning, portfolio, and interview preparation purposes.