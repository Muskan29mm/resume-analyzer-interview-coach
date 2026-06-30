import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.resume_parser import extract_resume_text

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

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    text = extract_resume_text(file_path)

    return jsonify({
        "filename": file.filename,
        "resume_text": text
    })

if __name__ == '__main__':
    app.run(debug=True)

