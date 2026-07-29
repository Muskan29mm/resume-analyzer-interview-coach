import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.resume_parser import extract_resume_text
from utils.resume_analyzer import analyze_resume

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return "Resume Parser API is running."


@app.route('/upload', methods=['POST'])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["resume"]
    print(f"Uploaded File: {file.filename}")

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    allowed_extensions = ['.pdf', '.docx']
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        return jsonify({"error": "Unsupported file format. Please upload a PDF or DOCX file."}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    try:
        text = extract_resume_text(file_path)

        return jsonify({"resume_text": text, "filename": file.filename}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze', methods=['POST'])
def analyze_resume_route():
    data = request.get_json()

    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")

    print(f"Resume Length: {len(resume_text)}")
    print(f"Job Description Length: {len(job_description)}")

    if not resume_text:
        return jsonify({
            "error": "Resume text is required"
        }), 400

    if not job_description:
        return jsonify({
            "error": "Job description is required"
        }), 400

    analysis = analyze_resume(
        resume_text,
        job_description
    )

    print("Analysis Completed Successfully")
    print(analysis)

    return jsonify(analysis), 200


if __name__ == '__main__':
    app.run(debug=True)

