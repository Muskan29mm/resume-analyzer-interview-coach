import { useState } from "react";
import "./AIInterviewQuestionGenerator.css";

const AIInterviewQuestionGenerator = ({
    resumeText = "",
    jobDescription = "",
    onQuestionsGenerated,
}) => {

    const [questionType, setQuestionType] = useState("Mixed");
    const [difficulty, setDifficulty] = useState("Medium");
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateQuestions = async () => {
        setError("");
        setQuestions([]);

        if (!resumeText.trim()) {
            setError("Please upload your resume first.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please add the job description first.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/generate-interview",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        resume_text: resumeText,
                        job_description: jobDescription,
                        question_type: questionType,
                        difficulty: difficulty,
                        number_of_questions: numberOfQuestions,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to generate questions."
                );
            }

            const generatedQuestions = data.questions || [];

            setQuestions(generatedQuestions);

            if (onQuestionsGenerated) {
                onQuestionsGenerated(generatedQuestions);
            }

        } catch (err) {
            console.error(
                "Interview question generation error:",
                err
            );

            setError(
                err.message || "Failed to generate questions."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-interview-generator-card">

            <div className="ai-interview-generator-header">

                <h2>AI Interview Question Generator</h2>

                <p>
                    Generate personalized interview questions based on
                    your resume and the job description.
                </p>

            </div>

            <div className="ai-interview-generator-settings">

                <div className="ai-interview-generator-field">

                    <label>Question Type</label>

                    <select
                        value={questionType}
                        onChange={(e) =>
                            setQuestionType(e.target.value)
                        }
                    >
                        <option value="Mixed">Mixed</option>
                        <option value="Technical">Technical</option>
                        <option value="Behavioral">Behavioral</option>
                        <option value="Situational">Situational</option>
                        <option value="Project-Based">
                            Project-Based
                        </option>
                        <option value="HR">HR</option>
                    </select>

                </div>

                <div className="ai-interview-generator-field">

                    <label>Difficulty</label>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                </div>

                <div className="ai-interview-generator-field">

                    <label>Number of Questions</label>

                    <select
                        value={numberOfQuestions}
                        onChange={(e) =>
                            setNumberOfQuestions(
                                Number(e.target.value)
                            )
                        }
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>

                </div>

            </div>

            <button
                className="generate-ai-interview-button"
                onClick={generateQuestions}
                disabled={
                    loading ||
                    !resumeText.trim() ||
                    !jobDescription.trim()
                }
            >
                {loading
                    ? "Generating..."
                    : "Generate Interview Questions"}
            </button>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {questions.length > 0 && (
                <div className="generated-ai-interview-questions">

                    <div className="generated-ai-interview-header">

                        <h3>
                            Generated Interview Questions
                        </h3>

                        <span className="generated-ai-interview-count">
                            {questions.length} Questions
                        </span>

                    </div>

                    <div className="ai-interview-questions-list">

                        {questions.map((item, index) => (

                            <div
                                className="ai-interview-question-card"
                                key={index}
                            >

                                <div className="ai-interview-question-number">
                                    {index + 1}
                                </div>

                                <div className="ai-interview-question-content">

                                    <h4>
                                        {item.question}
                                    </h4>

                                    <div className="ai-interview-question-meta">

                                        {item.type && (
                                            <span>
                                                {item.type}
                                            </span>
                                        )}

                                        {item.difficulty && (
                                            <span>
                                                {item.difficulty}
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}

        </div>
    );
};

export default AIInterviewQuestionGenerator;
