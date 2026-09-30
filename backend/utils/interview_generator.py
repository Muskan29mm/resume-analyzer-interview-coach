import json
import os
import re
import time

from dotenv import load_dotenv
from google import genai


load_dotenv()

GEMINI_MODEL = "gemini-3.8-flash"


def get_gemini_client():
    """Create and return a Gemini API client."""

    gemini_api_key = os.getenv("GEMINI_API_KEY")

    if not gemini_api_key:
        raise ValueError(
            "GEMINI_API_KEY environment variable is not configured."
        )

    return genai.Client(api_key=gemini_api_key)


def clean_json_response(response_text):
    """
    Remove markdown code fences and extract the JSON object.
    """

    if not response_text:
        raise ValueError("Gemini returned an empty response.")

    response_text = response_text.strip()

    # Remove markdown code fences if Gemini includes them.
    response_text = re.sub(
        r"^```(?:json)?\s*",
        "",
        response_text,
        flags=re.IGNORECASE,
    )

    response_text = re.sub(
        r"\s*```$",
        "",
        response_text,
    )

    response_text = response_text.strip()

    # Extract the JSON object if additional text surrounds it.
    start = response_text.find("{")
    end = response_text.rfind("}")

    if start == -1 or end == -1 or start > end:
        raise ValueError("Gemini response does not contain valid JSON.")

    return response_text[start:end + 1]


def generate_interview_questions(
    resume_text,
    job_description,
    question_type="Mixed",
    difficulty="Medium",
    number_of_questions=10,
):
    """Generate personalized interview questions using Gemini."""

    if not resume_text.strip():
        raise ValueError("Resume text is required.")

    if not job_description.strip():
        raise ValueError("Job description is required.")

    try:
        number_of_questions = int(number_of_questions)
    except (TypeError, ValueError):
        raise ValueError(
            "Number of questions must be a valid integer."
        )

    if not 1 <= number_of_questions <= 20:
        raise ValueError(
            "Number of questions must be between 1 and 20."
        )

    prompt = f"""
You are an expert technical interviewer.

Generate exactly {number_of_questions} personalized interview questions.

Use the candidate's resume and the job description.

QUESTION_TYPE:
{question_type}

DIFFICULTY:
{difficulty}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Requirements:

1. Questions must be personalized based on the resume.
2. Questions must be relevant to the job description.
3. Include a mixture of:
   - Resume-based questions
   - Technical questions
   - Project-based questions
   - Behavioral questions
   - Job-role-specific questions
4. Use the requested question type and difficulty as guidance.
5. Questions should be clear and realistic for an actual interview.
6. Do not provide answers.
7. Return ONLY valid JSON.
8. Do not use markdown.
9. Do not use ```json or ```.

Use exactly this format:

{{
    "questions": [
        {{
            "question": "Question text",
            "type": "Technical",
            "difficulty": "Medium"
        }}
    ]
}}
"""

    try:
        client = get_gemini_client()

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        response_text = clean_json_response(response.text)

        questions_json = json.loads(response_text)

        questions = questions_json.get("questions")

        if not isinstance(questions, list):
            raise ValueError(
                "Gemini response must contain a 'questions' list."
            )

        if len(questions) != number_of_questions:
            raise ValueError(
                f"Expected {number_of_questions} questions, "
                f"but Gemini returned {len(questions)}."
            )

        for question in questions:
            if not isinstance(question, dict):
                raise ValueError(
                    "Each interview question must be a JSON object."
                )

            required_fields = [
                "question",
                "type",
                "difficulty",
            ]

            for field in required_fields:
                if not question.get(field):
                    raise ValueError(
                        f"Interview question is missing '{field}'."
                    )

        return questions_json

    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Failed to parse Gemini response as JSON: {exc}"
        ) from exc

    except ValueError:
        raise

    except Exception as exc:
        raise ValueError(
            f"Gemini interview question generation failed: {exc}"
        ) from exc


def evaluate_interview_answer(
    resume_text,
    job_description,
    question,
    answer,
):
    """Evaluate a candidate's interview answer using Gemini."""

    if not resume_text.strip():
        raise ValueError("Resume text is required.")

    if not job_description.strip():
        raise ValueError("Job description is required.")

    if not question.strip():
        raise ValueError("Interview question is required.")

    if not answer.strip():
        raise ValueError("Answer is required.")

    prompt = f"""
You are an expert interview evaluator.

Evaluate the candidate's interview answer objectively.

Use the candidate's resume, job description, interview question,
and candidate's answer.

CANDIDATE RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

INTERVIEW QUESTION:
{question}

CANDIDATE ANSWER:
{answer}

Evaluate the answer based on:

1. Relevance to the question
2. Technical correctness
3. Clarity
4. Communication
5. Depth of understanding
6. Use of examples where appropriate
7. Alignment with the job role

Give a score from 1 to 10.

Return ONLY valid JSON.

Do not use markdown.
Do not use ```json.
Do not provide anything outside the JSON.

Use exactly this format:

{{
    "score": 8,
    "feedback": "Detailed constructive feedback about the answer.",
    "strengths": [
        "Strength 1",
        "Strength 2"
    ],
    "improvements": [
        "Improvement 1",
        "Improvement 2"
    ]
}}
"""

    try:
        client = get_gemini_client()

        response = None

        for attempt in range(3):
            try:
                response = client.models.generate_content(
                    model=GEMINI_MODEL,
                    contents=prompt,
                )
                break

            except Exception as exc:
                error_message = str(exc)

                if (
                    "503" not in error_message
                    and "UNAVAILABLE" not in error_message
                ):
                    raise

                if attempt == 2:
                    raise

                time.sleep(2)

        response_text = clean_json_response(response.text)

        evaluation = json.loads(response_text)

        required_fields = [
            "score",
            "feedback",
            "strengths",
            "improvements",
        ]

        for field in required_fields:
            if field not in evaluation:
                raise ValueError(
                    f"Gemini response is missing '{field}'."
                )

        score = evaluation["score"]

        if not isinstance(score, (int, float)) or not 1 <= score <= 10:
            raise ValueError(
                "Interview evaluation score must be between 1 and 10."
            )

        if not isinstance(evaluation["strengths"], list):
            raise ValueError(
                "Evaluation 'strengths' must be a list."
            )

        if not isinstance(evaluation["improvements"], list):
            raise ValueError(
                "Evaluation 'improvements' must be a list."
            )

        return evaluation

    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Failed to parse Gemini evaluation response as JSON: {exc}"
        ) from exc

    except ValueError:
        raise

    except Exception as exc:
        raise ValueError(
            f"Gemini answer evaluation failed: {exc}"
        ) from exc


def generate_overall_interview_review(
    resume_text,
    job_description,
    interview_data,
):
    """Generate an overall review of the completed interview using Gemini."""

    if not resume_text.strip():
        raise ValueError("Resume text is required.")

    if not job_description.strip():
        raise ValueError("Job description is required.")

    if not isinstance(interview_data, list) or not interview_data:
        raise ValueError(
            "Interview data must be a non-empty list of question-answer pairs."
        )

    prompt = f"""
You are an expert technical interviewer and interview coach.

Provide an overall review of the completed interview.

Use:
1. The candidate's resume
2. The job description
3. Every interview question
4. Every candidate answer
5. The individual evaluations for each answer

CANDIDATE RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

INTERVIEW DATA:
{json.dumps(interview_data, indent=2)}

Analyze the candidate's performance across the complete interview.

Evaluate:
1. Overall performance
2. Technical knowledge
3. Answer quality
4. Communication and clarity
5. Relevance of answers
6. Depth of understanding
7. Strengths
8. Areas for improvement
9. Actionable recommendations for the candidate

Calculate an overall score from 1 to 10 based on the complete interview.

Return ONLY valid JSON.

Do not use markdown.
Do not use ```json.
Do not provide anything outside the JSON.

Use exactly this format:

{{
    "overall_score": 8,
    "summary": "Overall summary of the candidate's performance.",
    "category_scores": {{
        "technical_knowledge": 8,
        "answer_quality": 7,
        "communication": 9,
        "clarity": 8,
        "depth_of_understanding": 7
    }},
    "strengths": [
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],
    "areas_for_improvement": [
        "Improvement 1",
        "Improvement 2",
        "Improvement 3"
    ],
    "recommendations": [
        "Recommendation 1",
        "Recommendation 2",
        "Recommendation 3"
    ],
    "question_summary": [
        {{
            "question": "Interview question",
            "score": 8,
            "feedback": "Short summary of performance on this question."
        }}
    ]
}}
"""

    try:
        client = get_gemini_client()

        response = None

        for attempt in range(3):
            try:
                response = client.models.generate_content(
                    model=GEMINI_MODEL,
                    contents=prompt,
                )
                break

            except Exception as exc:
                error_message = str(exc)

                if (
                    "503" not in error_message
                    and "UNAVAILABLE" not in error_message
                ):
                    raise

                if attempt == 2:
                    raise

                time.sleep(2)

        response_text = clean_json_response(response.text)

        overall_review = json.loads(response_text)

        required_fields = [
            "overall_score",
            "summary",
            "category_scores",
            "strengths",
            "areas_for_improvement",
            "recommendations",
            "question_summary",
        ]

        for field in required_fields:
            if field not in overall_review:
                raise ValueError(
                    f"Gemini response is missing '{field}'."
                )

        overall_score = overall_review["overall_score"]

        if (
            not isinstance(overall_score, (int, float))
            or not 1 <= overall_score <= 10
        ):
            raise ValueError(
                "Overall interview score must be between 1 and 10."
            )

        if not isinstance(overall_review["category_scores"], dict):
            raise ValueError(
                "Overall review 'category_scores' must be a dictionary."
            )

        for field in [
            "strengths",
            "areas_for_improvement",
            "recommendations",
            "question_summary",
        ]:
            if not isinstance(overall_review[field], list):
                raise ValueError(
                    f"Overall review '{field}' must be a list."
                )

        return overall_review

    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Failed to parse Gemini overall review response as JSON: {exc}"
        ) from exc

    except ValueError:
        raise

    except Exception as exc:
        raise ValueError(
            f"Gemini overall interview review generation failed: {exc}"
        ) from exc

