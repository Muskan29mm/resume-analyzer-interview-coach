import re


# Initial skill directory
SKILLS = [
    "python",
    "sql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "pandas",
    "numpy",
    "nlp",
    "natural language processing",
    "django",
    "flask",
    "fastapi",
    "react",
    "javascript",
    "html",
    "css",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "git",
    "github",
    "postgresql",
    "mysql",
    "mongodb",
    "langchain",
    "rag",
    "generative ai"
]


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
    return bool(
        re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text
        )
    )


def has_phone(text):
    return bool(
        re.search(
            r"\+?\d[\d\s-]{8,}\d",
            text
        )
    )

def generate_strengths_weaknesses(resume_text, matched_skills, missing_skills, resume_skills):
    strengths =[]
    weaknesses = []

    resume_text_lower = resume_text.lower()

    # Strengths
    if matched_skills:
        strengths.append(
            "Your Resume matches the job description with these skills: " + ", ".join(matched_skills)
        )

    if len(resume_skills) >= 5:
        strengths.append("Your resume demonstrates a strong range of technical skills")

    if has_email(resume_text):
        strengths.append("Your resume includes a professional email address")

    if has_phone(resume_text):
        strengths.append("Your resume includes a contact number")   

    if "summary" in resume_text_lower:
        strengths.append("Your resume includes a professional summary highlighting your key skills and experience")

    if "project" in resume_text_lower:
        strengths.append("Your resume includes a projects section to showcase your practical experience")

    if "experience" in resume_text_lower:
        strengths.append("Your resume includes a work experience section, even if it contains internships or freelance work")

    # Weaknesses
    if missing_skills:
        weaknesses.append("Your resume is missing these relevant skills: " + ", ".join(missing_skills))

    if not has_email(resume_text):
        weaknesses.append("Your resume does not include a professional email address")

    if not has_phone(resume_text):
        weaknesses.append("Your resume does not include a contact number")

    if "summary" not in resume_text_lower:
        weaknesses.append("Your resume does not include a professional summary highlighting your key skills and experience")

    if "project" not in resume_text_lower:
        weaknesses.append("Your resume does not include a projects section to showcase your practical experience")

    if "experience" not in resume_text_lower:
        weaknesses.append("Your resume does not include a work experience section, even if it contains internships or freelance work")

    return strengths, weaknesses


def analyze_resume(resume_text, job_description):

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    resume_skills_lower = {
        skill.lower()
        for skill in resume_skills
    }

    matched_skills = [
        skill
        for skill in job_skills
        if skill.lower() in resume_skills_lower
    ]

    missing_skills = [
        skill
        for skill in job_skills
        if skill.lower() not in resume_skills_lower
    ]

    # Stengths and weaknesses
    strengths, weaknesses = generate_strengths_weaknesses(
        resume_text, matched_skills, missing_skills, resume_skills
    )
    

    # Resume match percentage
    if len(job_skills) > 0:
        resume_match = round(
            (len(matched_skills) / len(job_skills)) * 100
        )
    else:
        resume_match = 0

    # -------------------------
    # ATS SCORE
    # -------------------------

    # Skill match - 70 points
    skill_match_score = round((resume_match / 100) * 70)

    # Email - 15 points
    email_score = 15 if has_email(resume_text) else 0

    # Phone - 15 points
    phone_score = 15 if has_phone(resume_text) else 0

    # Total ATS score
    ats_score = skill_match_score + email_score + phone_score

    ats_score = min(100, ats_score)

    # -------------------------
    # SUGGESTIONS
    # -------------------------

    suggestions = []

    if ats_score >= 85:
        suggestions.append(
            "Your resume is well optimized for ATS. "
            "Keep it updated for each job application."
        )

    elif ats_score >= 70:
        suggestions.append(
            "Your resume has a good ATS score, but adding "
            "more relevant keywords can improve it."
        )

    else:
        suggestions.append(
            "Your resume needs more ATS optimization. "
            "Match more skills from the job description."
        )

    if missing_skills:
        suggestions.append(
            "Add these relevant skills if you have experience: "
            + ", ".join(missing_skills)
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
            "Include a professional summary highlighting "
            "your key skills and experience."
        )

    if "project" not in resume_text.lower():
        suggestions.append(
            "Add a projects section to showcase your "
            "practical experience."
        )

    if "experience" not in resume_text.lower():
        suggestions.append(
            "Include a work experience section, even if "
            "it contains internships or freelance work."
        )

    return {
        "ats_score": ats_score,
        "ats_breakdown": {
            "skill_match_score": skill_match_score,
            "email_score": email_score,
            "phone_score": phone_score
        },
        "resume_match": resume_match,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "resume_skills": resume_skills,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }