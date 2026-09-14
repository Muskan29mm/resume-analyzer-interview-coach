import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from utils.interview_generator import (
    evaluate_interview_answer,
    generate_interview_questions,
)
from utils.resume_analyzer import analyze_resume
from utils.resume_parser import extract_resume_text


app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024  # 10 MB

ALLOWED_EXTENSIONS = {".pdf", ".docx"}


@app.route("/")
def home():
    return "Resume Analyzer & AI Interview Coach API is running."


@app.route("/upload", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    if not file or not file.filename:
        return jsonify({"error": "No file selected"}), 400

    filename = secure_filename(file.filename)
    file_extension = os.path.splitext(filename)[1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        return jsonify({
            "error": "Unsupported file format. Please upload a PDF or DOCX file."
        }), 400

    if not filename:
        return jsonify({"error": "Invalid file name"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    try:
        file.save(file_path)

        resume_text = extract_resume_text(file_path)

        return jsonify({
            "resume_text": resume_text,
            "filename": filename,
        }), 200

    except Exception as exc:
        return jsonify({
            "error": f"Failed to process resume: {str(exc)}"
        }), 500

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


@app.route("/analyze", methods=["POST"])
def analyze_resume_route():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data provided"}), 400

    resume_text = data.get("resume_text", "").strip()
    job_description = data.get("job_description", "").strip()

    if not resume_text:
        return jsonify({"error": "Resume text is required"}), 400

    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    try:
        analysis = analyze_resume(
            resume_text,
            job_description,
        )

        return jsonify(analysis), 200

    except Exception as exc:
        return jsonify({
            "error": f"Resume analysis failed: {str(exc)}"
        }), 500


@app.route("/generate-interview", methods=["POST"])
def generate_interview():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data provided"}), 400

    resume_text = data.get("resume_text", "").strip()
    job_description = data.get("job_description", "").strip()
    number_of_questions = data.get("number_of_questions", 10)
    question_type = data.get("question_type", "Mixed")
    difficulty = data.get("difficulty", "Medium")

    if not resume_text:
        return jsonify({"error": "Resume text is required"}), 400

    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    try:
        number_of_questions = int(number_of_questions)

        if not 1 <= number_of_questions <= 20:
            return jsonify({
                "error": "Number of questions must be between 1 and 20."
            }), 400

    except (TypeError, ValueError):
        return jsonify({
            "error": "Number of questions must be a valid integer."
        }), 400

    try:
        interview_questions = generate_interview_questions(
            resume_text,
            job_description,
            question_type,
            difficulty,
            number_of_questions,
        )

        return jsonify(interview_questions), 200

    except Exception as exc:
        return jsonify({
            "error": f"Interview question generation failed: {str(exc)}"
        }), 500


@app.route("/evaluate-answer", methods=["POST"])
def evaluate_answer():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No data provided"}), 400

    resume_text = data.get("resume_text", "").strip()
    job_description = data.get("job_description", "").strip()
    question = data.get("question", "").strip()
    answer = data.get("answer", "").strip()

    if not resume_text:
        return jsonify({"error": "Resume text is required"}), 400

    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    if not question:
        return jsonify({"error": "Interview question is required"}), 400

    if not answer:
        return jsonify({"error": "Answer is required"}), 400

    try:
        evaluation = evaluate_interview_answer(
            resume_text,
            job_description,
            question,
            answer,
        )

        return jsonify(evaluation), 200

    except Exception as exc:
        return jsonify({
            "error": f"Interview answer evaluation failed: {str(exc)}"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)