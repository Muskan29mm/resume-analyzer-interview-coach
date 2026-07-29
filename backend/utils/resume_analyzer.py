import re

#Initial skill directory
SKILLS = ["python", "sql", "machine learning", "deep learning", "tensorflow", "pytorch","scikit-learn","pandas", "numpy","nlp", "natural language processing", "django", "flask", "fastapi", "react", "javascript", "html", "css", "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "postgreesql", "mysql", "mongodb", "langchain", "rag", "generative AI"]

def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill.title())

    return found_skills

# Helper functions
def has_email(text):
    return bool(re.search(r"[A-za-z0-9._%+-]+@[A-Za-x0-9,-]+\.[A-Za-z]{2,}", text))

def has_phone(text):
    return bool(re.search(r"\+?\d[\d\s\-]{8,}\d", text))

def analyze_resume(resume_text, job_description):
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    resume_skills_lower = {
        skill.lower()
        for skill in resume_skills
    }

    matched_skills = [
        skill for skill in job_skills
        if skill.lower() in resume_skills_lower
    ]

    missing_skills = [
    skill for skill in job_skills
    if skill.lower() not in resume_skills_lower
    ]

    if len(job_skills) > 0:
        resume_match = round((len(matched_skills)/ len(job_skills))*100)
    else:
        resume_match = 0

    # ATS score
    ats_score = 0

    # skill match (70 points)
    ats_score += round((resume_match / 100)* 70)

    # Email present (15 points)
    if has_email(resume_text):
        ats_score += 15

    # Phone Present (15 points)
    if has_phone(resume_text):
        ats_score += 15

    ats_score = min(100, ats_score)

    suggestions = []

    if ats_score >= 85:
        suggestions.append(
            "Your resume is well optimized for ATS. Keep it updated for each job application."
        )

    elif ats_score >=70:
        suggestions.append(
            "Your resume has a good ATS score, but adding more relevant keywords can improve it."
        )

    else:
        suggestions.append(
            "Your resume needs more ATS optimization. Match more skills from the job description."
        )

    if missing_skills:
        suggestions.append(
             "Add these relevant skills if you have experience: " +
        ", ".join(missing_skills)
        )

    if not has_email(resume_text):
        suggestions.append(
        "Add a professional email address."
    )

    if not has_phone(resume_text):
        suggestions.append(
        "Include your contact number."
    )

    if "summary" not in resume_text.lower():
        suggestions.append(
        "Include a professional summary highlighting your key skills and experience."
    )

    if "project" not in resume_text.lower():
     suggestions.append(
        "Add a projects section to showcase your practical experience."
    )

    if "experience" not in resume_text.lower():
        suggestions.append(
        "Include a work experience section, even if it contains internships or freelance work."
    )
    return{
        "ats_score": ats_score,
        "resume_match": resume_match,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "resume_skills": resume_skills,
        "suggestions": suggestions
    }

