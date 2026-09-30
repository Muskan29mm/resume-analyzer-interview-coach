import { useState } from "react";
import "./ResumeDashboard.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import AIInterviewQuestionGenerator from "../AIInterviewQuestionGenerator/AIInterviewQuestionGenerator";
import InterviewCoach from "../InterviewCoach/InterviewCoach";
import {
    FiCheckCircle,
    FiTrendingUp,
    FiTarget,
    FiAlertCircle,
    FiUpload
} from "react-icons/fi";

function ResumeDashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [error, setError] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [interviewQuestions, setInterviewQuestions] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const filename = file.name.toLowerCase();

        if (
            !filename.endsWith(".pdf") &&
            !filename.endsWith(".docx")
        ) {
            setError("Invalid file type. Please upload a PDF or DOCX file.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setError("");
        setAnalysis(null);
        setInterviewQuestions([]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a resume first.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedFile);

        setUploading(true);
        setError("");

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            setResumeText(data.resume_text);
            setAnalysis(null);
            setInterviewQuestions([]);

        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!resumeText || !jobDescription.trim()) {
            return;
        }

        setAnalyzing(true);
        setError("");
        setAnalysis(null);
        setInterviewQuestions([]);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        resume_text: resumeText,
                        job_description: jobDescription
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Analysis failed");
            }

            setAnalysis(data);

        } catch (error) {
            setError(error.message);
        } finally {
            setAnalyzing(false);
        }
    };

    const getAtsLabel = (score) => {
        if (score >= 85) return "Excellent";
        if (score >= 70) return "Good";
        if (score >= 50) return "Average";
        return "Poor";
    };

    const getAtsDescription = (score) => {
        if (score >= 85) return "Excellent ATS Compatibility";
        if (score >= 70) return "Good ATS Compatibility";
        if (score >= 50) return "Average ATS Compatibility";
        return "Low ATS Compatibility";
    };

    const getMatchLabel = (score) => {
        if (score >= 80) return "High Compatibility";
        if (score >= 50) return "Moderate Compatibility";
        return "Low Compatibility";
    };

    return (
        <section id="resume-dashboard" className="resume-dashboard section">
            <div className="container">

                <SectionTitle
                    badge="Resume Analyzer"
                    title="See Your Resume Through an ATS Lens"
                    subtitle="Upload your resume and receive an AI-powered analysis with ATS score, skill matching, missing skills, and actionable suggestions to improve your chances of getting shortlisted."
                />

                {/* Resume Upload */}

                <div className="resume-upload-card">

                    <div className="upload-icon">
                        <FiUpload />
                    </div>

                    <h3>Upload Your Resume</h3>

                    <p>
                        Upload your resume in PDF or DOCX format
                    </p>

                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                    />

                    {selectedFile && (
                        <p className="selected-file">
                            Selected: {selectedFile.name}
                        </p>
                    )}

                    <button
                        className="upload-button"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Upload Resume"}
                    </button>

                    {error && (
                        <p className="upload-error">
                            {error}
                        </p>
                    )}

                </div>

                {/* Extracted Resume Text */}

                {resumeText && (
                    <div className="resume-text-card">

                        <h3>Extracted Resume Text</h3>

                        <pre>
                            {resumeText}
                        </pre>

                    </div>
                )}

                {/* Job Description */}

                {resumeText && (
                    <div className="job-description-card">

                        <h3>Paste Job Description</h3>

                        <p>
                            Add the job description to compare your resume against the target role.
                        </p>

                        <textarea
                            value={jobDescription}
                            onChange={(event) => setJobDescription(event.target.value)}
                            placeholder="Paste the job description here..."
                            rows="10"
                        />

                        <button
                            className="analyze-button"
                            onClick={handleAnalyze}
                            disabled={!jobDescription.trim() || analyzing}
                        >
                            {analyzing ? "Analyzing..." : "Analyze Resume"}
                        </button>

                    </div>
                )}

                {/* Dashboard */}

                <div className="dashboard-preview">

                    {/* ATS Score */}

                    <div className="dashboard-card ats-card">

                        <div className="card-header">
                            <h3>ATS Score</h3>
                            <FiTrendingUp />
                        </div>

                        <div className="score-row">

                            <h2>
                                {analysis ? `${analysis.ats_score}%` : "--"}
                            </h2>

                            <span className="score-badge">
                                {analysis
                                    ? getAtsLabel(analysis.ats_score)
                                    : "Not analyzed"}
                            </span>

                        </div>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${analysis ? analysis.ats_score : 0}%`
                                }}
                            />
                        </div>

                        <p>
                            {analysis
                                ? getAtsDescription(analysis.ats_score)
                                : "Upload your resume and analyze it against a job description to see your ATS score."}
                        </p>

                        {analysis?.ats_breakdown && (
                            <div className="ats-breakdown">

                                <h4>ATS Score Breakdown</h4>

                                <div className="breakdown-item">

                                    <div className="breakdown-header">
                                        <span>Skill Match</span>
                                        <span>
                                            {analysis.ats_breakdown.skill_match_score} / 70
                                        </span>
                                    </div>

                                    <div className="breakdown-bar">
                                        <div
                                            className="breakdown-fill"
                                            style={{
                                                width: `${(analysis.ats_breakdown.skill_match_score / 70) * 100}%`
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="breakdown-item">

                                    <div className="breakdown-header">
                                        <span>Email</span>
                                        <span>
                                            {analysis.ats_breakdown.email_score} / 15
                                        </span>
                                    </div>

                                    <div className="breakdown-bar">
                                        <div
                                            className="breakdown-fill"
                                            style={{
                                                width: `${(analysis.ats_breakdown.email_score / 15) * 100}%`
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="breakdown-item">

                                    <div className="breakdown-header">
                                        <span>Phone</span>
                                        <span>
                                            {analysis.ats_breakdown.phone_score} / 15
                                        </span>
                                    </div>

                                    <div className="breakdown-bar">
                                        <div
                                            className="breakdown-fill"
                                            style={{
                                                width: `${(analysis.ats_breakdown.phone_score / 15) * 100}%`
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        )}

                    </div>


                    {/* Resume Match */}

                    <div className="dashboard-card">

                        <div className="card-header">
                            <h3>Resume Match</h3>
                            <FiTarget />
                        </div>

                        <h2>
                            {analysis ? `${analysis.resume_match}%` : "--"}
                        </h2>

                        <h4>
                            {analysis
                                ? getMatchLabel(analysis.resume_match)
                                : "Not analyzed"}
                        </h4>

                        <p>
                            {analysis
                                ? "Your resume match is based on the skills identified in the resume and the target job description."
                                : "Analyze your resume against a job description to see how well your skills match the target role."}
                        </p>

                    </div>


                    {/* Missing Skills */}

                    <div className="dashboard-card missing-skills">

                        <div className="card-header">
                            <h3>Missing Skills</h3>
                            <FiAlertCircle />
                        </div>

                        <ul>

                            {analysis?.missing_skills?.length > 0 ? (

                                analysis.missing_skills.map((skill) => (
                                    <li key={skill}>
                                        {skill}
                                    </li>
                                ))

                            ) : analysis ? (

                                <li>
                                    No missing skills found 🎉
                                </li>

                            ) : (

                                <li>
                                    Analyze your resume to identify missing skills.
                                </li>

                            )}

                        </ul>

                    </div>


                    {/* Resume Strengths */}

                    <div className="dashboard-card strengths-card">

                        <div className="card-header">
                            <h3>Resume Strengths</h3>
                            <FiCheckCircle />
                        </div>

                        <ul>

                            {analysis?.strengths?.length > 0 ? (

                                analysis.strengths.map((strength, index) => (
                                    <li key={index}>
                                        <FiCheckCircle />
                                        {strength}
                                    </li>
                                ))

                            ) : analysis ? (

                                <li>
                                    No major strengths identified.
                                </li>

                            ) : (

                                <li>
                                    Analyze your resume to see its strengths.
                                </li>

                            )}

                        </ul>

                    </div>


                    {/* Resume Weaknesses */}

                    <div className="dashboard-card weaknesses-card">

                        <div className="card-header">
                            <h3>Resume Weaknesses</h3>
                            <FiAlertCircle />
                        </div>

                        <ul>

                            {analysis?.weaknesses?.length > 0 ? (

                                analysis.weaknesses.map((weakness, index) => (
                                    <li key={index}>
                                        <FiAlertCircle />
                                        {weakness}
                                    </li>
                                ))

                            ) : analysis ? (

                                <li>
                                    No major weaknesses identified 🎉
                                </li>

                            ) : (

                                <li>
                                    Analyze your resume to identify areas for improvement.
                                </li>

                            )}

                        </ul>

                    </div>


                    {/* AI Suggestions */}

                    <div className="dashboard-card full-width">

                        <div className="card-header">
                            <h3>AI Suggestions</h3>
                            <FiCheckCircle />
                        </div>

                        <ul>

                            {analysis ? (

                                analysis.suggestions?.length > 0 ? (

                                    analysis.suggestions.map((suggestion, index) => (
                                        <li key={index}>
                                            <FiCheckCircle />
                                            {suggestion}
                                        </li>
                                    ))

                                ) : (

                                    <li>
                                        <FiCheckCircle />
                                        Your resume looks good. No major improvements suggested.
                                    </li>

                                )

                            ) : (

                                <li>
                                    Analyze your resume to receive personalized suggestions.
                                </li>

                            )}

                        </ul>

                    </div>


                    {/* AI Interview Question Generator */}

                    {resumeText && jobDescription.trim() && (
                        <AIInterviewQuestionGenerator
                            resumeText={resumeText}
                            jobDescription={jobDescription}
                            onQuestionsGenerated={setInterviewQuestions}
                        />
                    )}


                    {/* AI Interview Coach */}

                    {interviewQuestions.length > 0 && (
                        <div id="interviewcoach">
                            <InterviewCoach
                            resumeText={resumeText}
                            jobDescription={jobDescription}
                            questions={interviewQuestions}
                            />
                        </div>
                    )}

                </div>

            </div>
        </section>
    );
}

export default ResumeDashboard;
