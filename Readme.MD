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
- Resume Strengths and Weaknesses Analysis
- ATS compatibility classification
- Personalized resume improvement suggestions
- REST APIs built using Flask
- Cross-Origin Resource Sharing (CORS) support
- React + Vite frontend
- Responsive Resume Dashboard
- Reusable React component architecture
- Modular CSS architecture
- AI-powered interview question generation
- Generate questions based on resume and job description
- Select interview question type:
    Mixed
    Technical
    Behavioral
    Situational
    Project-Based
    HR
- Select interview difficulty:
    Easy
    Medium
    Hard
- Select number of questions:
    5
    10
    15
    20
- Interactive question-by-question mock interview
- Answer submission interface
- AI-powered answer evaluation
- Individual answer score out of 10
- AI-generated answer feedback
- Answer strengths
- Areas for improvement
- Interview progress tracking
- Final interview completion flow
- Overall interview performance score
- Category-based interview scoring
- Overall interview summary
- Overall strengths
- Areas for improvement
- Personalized interview recommendations

### Application
REST APIs built using Flask
Cross-Origin Resource Sharing (CORS) support
React + Vite frontend
Responsive Resume Dashboard
Reusable React component architecture
Modular CSS architecture
Gemini API integration
Error handling for temporary Gemini API availability issues

### 🚧 Planned Features

- Resume analysis history
- Save interview results
- User authentication
- Download analysis report as PDF
- Persistent user profiles
- Interview history and performance tracking

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
- Gemini Flash Model

### Frontend
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
|       └── interview_generator.py
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

Create and activate a virtual environment:

python -m venv .venv

Linux/macOS:

source .venv/bin/activate

For backend 

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Create a .env file inside the backend directory and add your Gemini API key:

GEMINI_API_KEY=your_api_key_here

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
    ],
    "strengths": [
    "Your Resume matches the job description with these skills: Python, Flask, Docker",
    "Your resume demonstrates a strong range of technical skills",
    "Your resume includes a professional email address",
    "Your resume includes a contact number"
    ],
    "weaknesses": [
    "Your resume is missing these relevant skills: Kubernetes, AWS",
    "Your resume does not include a professional summary highlighting your key skills and experience"
]
}
```

### Generate Interview Questions

**Endpoint**

```
POST /generate-interview
```

**Purpose**

Generates personalized interview questions using the user's resume and target job description.

**Request**

{
    "resume_text": "...",
    "job_description": "...",
    "question_type": "Mixed",
    "difficulty": "Medium",
    "num_questions": 10
}

**Supported Question Types**

Mixed
Technical
Behavioral
Situational
Project-Based
HR

**Supported Difficulty Levels**

Easy
Medium
Hard

**Supported Question Counts**

5
10
15
20

**Sample Response**

{
    "questions": [
        {
            "question": "Explain how you have used Python in your previous projects.",
            "type": "Technical",
            "difficulty": "Medium"
        },
        {
            "question": "Describe a challenging problem you encountered and how you solved it.",
            "type": "Behavioral",
            "difficulty": "Medium"
        }
    ]
}

### Evaluate Interview Answer

**Endpoint**

POST /evaluate-answer

**Purpose**

Evaluates an individual interview answer using the resume, job description, interview question, and user's answer.

**Request**

{
    "resume_text": "...",
    "job_description": "...",
    "question": "Explain how you have used Python in your projects.",
    "answer": "I have used Python for data analysis and machine learning..."
}

**Sample Response**

{
    "score": 8,
    "feedback": "The answer is relevant and demonstrates practical Python experience, but it could be strengthened with specific project examples and measurable results.",
    "strengths": [
        "Relevant to the interview question",
        "Demonstrates practical Python experience"
    ],
    "improvements": [
        "Provide a specific project example",
        "Explain the impact of the work",
        "Include measurable results where possible"
    ]
}

### Generate Overall Interview Review

**Endpoint**

POST /overall-review

**Purpose**

Generates a final AI-powered assessment after the user completes the mock interview.

**Request**

{
    "resume_text": "...",
    "job_description": "...",
    "interview_data": [
        {
            "question": "Explain how you have used Python.",
            "type": "Technical",
            "difficulty": "Medium",
            "answer": "I have used Python for...",
            "evaluation": {
                "score": 8,
                "feedback": "...",
                "strengths": [
                    "..."
                ],
                "improvements": [
                    "..."
                ]
            }
        }
    ]
}

**Sample Response**

{
    "overall_score": 8,
    "summary": "The candidate demonstrated good technical knowledge and communicated their experience clearly.",
    "category_scores": {
        "technical_knowledge": 8,
        "answer_quality": 7,
        "communication": 8,
        "clarity": 8,
        "depth_of_understanding": 7
    },
    "strengths": [
        "Good understanding of technical concepts",
        "Clear communication"
    ],
    "areas_for_improvement": [
        "Provide more detailed project examples",
        "Include measurable results"
    ],
    "recommendations": [
        "Practice explaining projects using the STAR method",
        "Prepare deeper examples for technical questions"
    ]
}



---

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
| 12   | Resume Strengths & Weaknesses           | ✅ Completed |
| 13   | Enhanced Resume Improvement Suggestions | ✅ Completed |
| 14   | AI Interview Question Generator         | ✅ Completed |
| 15   | AI Mock Interview                       | ✅ Completed |
| 16   | Interview Answer Evaluation & Feedback  | ✅ Completed |
| 17   | Overall Interview Review                | ✅ Completed |
| 18   | Resume Analysis History                 | ⏳ Upcoming  |
| 19   | User Authentication                     | ⏳ Upcoming  |
| 20   | Download Analysis Report                | ⏳ Upcoming  |


---

## Future Enhancements

- Resume analysis history
- Save and retrieve previous interview sessions
- Interview performance history
- User authentication
- User profiles
- Download resume analysis reports as PDF
- Download interview performance reports
- Persistent interview results
- Advanced interview analytics
- Improved AI evaluation and reliability

---

## Documentation

Additional project documentation is available in the `docs/` directory:

- `architecture.md` – System architecture and design
- `Project_journey.md` – Development progress and implementation journey
- `React_notes.md` - Notes of react and it's components

---

## License

This project is developed for learning, portfolio, and interview preparation purposes.