import { useState } from "react";
import "./InterviewCoach.css";

const InterviewCoach = ({
    resumeText = "",
    jobDescription = "",
    questions = []
}) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [evaluating, setEvaluating] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleStartInterview = () => {
        if (!questions.length) {
            return;
        }

        setCurrentQuestionIndex(0);
        setAnswer("");
        setFeedback(null);
        setInterviewStarted(true);
    };

    const handleSubmitAnswer = async () => {
        if (!answer.trim() || !currentQuestion) {
            return;
        }

        setFeedback(null);
        setEvaluating(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/evaluate-answer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        resume_text: resumeText,
                        job_description: jobDescription,
                        question: currentQuestion.question,
                        answer: answer,
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to evaluate the answer."
                );
            }

            setFeedback(data);
        } catch (error) {
            console.error(
                "Interview answer evaluation error:",
                error
            );

            setFeedback({
                score: null,
                feedback: error.message || "Failed to evaluate the answer.",
                strengths: [],
                improvements: []
            });
        } finally {
            setEvaluating(false);
    }
    };

    const handleNextQuestion = () => {

        if (currentQuestionIndex < questions.length - 1) {

            setCurrentQuestionIndex(
                currentQuestionIndex + 1
            );

            setAnswer("");
            setFeedback(null);

        } else {

            setInterviewStarted(false);
        }
    };

    if (!interviewStarted) {

        return (
            <div className="interview-coach-card">

                <div className="interview-coach-header">

                    <div className="interview-coach-icon">
                        🤖
                    </div>

                    <div>
                        <h2>AI Interview Coach</h2>

                        <p>
                            Practice your interview with AI-powered
                            questions and personalized feedback.
                        </p>
                    </div>

                </div>

                <div className="interview-coach-info">

                    <div className="coach-info-item">
                        <span className="coach-info-number">
                            {questions.length}
                        </span>

                        <span>
                            Questions
                        </span>
                    </div>

                    <div className="coach-info-item">
                        <span className="coach-info-icon-small">
                            🎯
                        </span>

                        <span>
                            Resume Based
                        </span>
                    </div>

                    <div className="coach-info-item">
                        <span className="coach-info-icon-small">
                            💬
                        </span>

                        <span>
                            AI Feedback
                        </span>
                    </div>

                </div>

                <button
                    className="start-interview-button"
                    onClick={handleStartInterview}
                    disabled={!questions.length}
                >
                    Start Interview
                </button>

                {!questions.length && (
                    <p className="coach-warning">
                        Generate interview questions first to start
                        the AI Interview Coach.
                    </p>
                )}

            </div>
        );
    }

    return (
        <div className="interview-coach-card">

            {/* Header */}

            <div className="interview-session-header">

                <div>
                    <h2>AI Interview Coach</h2>

                    <p>
                        Question {currentQuestionIndex + 1} of{" "}
                        {questions.length}
                    </p>
                </div>

                <div className="interview-progress">

                    <div
                        className="interview-progress-bar"
                        style={{
                            width: `${
                                ((currentQuestionIndex + 1) /
                                    questions.length) *
                                100
                            }%`
                        }}
                    />

                </div>

            </div>


            {/* Question */}

            <div className="coach-question-card">

                <div className="coach-question-label">
                    Question {currentQuestionIndex + 1}
                </div>

                <h3>
                    {currentQuestion?.question}
                </h3>

                <div className="coach-question-meta">

                    {currentQuestion?.type && (
                        <span>
                            {currentQuestion.type}
                        </span>
                    )}

                    {currentQuestion?.difficulty && (
                        <span>
                            {currentQuestion.difficulty}
                        </span>
                    )}

                </div>

            </div>


            {/* Answer */}

            <div className="coach-answer-section">

                <label htmlFor="interview-answer">
                    Your Answer
                </label>

                <textarea
                    id="interview-answer"
                    value={answer}
                    onChange={(event) =>
                        setAnswer(event.target.value)
                    }
                    placeholder="Type your answer here..."
                    rows={7}
                />

                <div className="answer-actions">

                    <span className="answer-hint">
                        Try to answer as if you were in a real
                        interview.
                    </span>

                    {!feedback && (
                        <button
                            className="submit-answer-button"
                            onClick={handleSubmitAnswer}
                            disabled={!answer.trim() || evaluating}
                        >
                            {evaluating ? "Evaluating...": "Submit Answer"}
                        </button>
                    )}

                </div>

            </div>


            {/* AI Feedback */}

            {feedback && (

                <div className="coach-feedback-card">

                    <div className="feedback-header">
                        <h3>AI Feedback</h3>

                        {feedback.score !== null && (
                            <div className="feedback-score">
                                {feedback.score}/10
                            </div>
                        )}
                    </div>

                    <div className="feedback-content">

                        <div className="feedback-section">

                            <h4>Feedback</h4>

                            <p>
                                {feedback.feedback}
                            </p>

                        </div>

                        {feedback.strengths?.length > 0 && (

                            <div className="feedback-section">

                                <h4>Strengths</h4>

                                <ul>
                                    {feedback.strengths.map(
                                        (strength, index) => (
                                            <li key={index}>
                                                {strength}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>

                        )}

                        {feedback.improvements?.length > 0 && (

                            <div className="feedback-section">

                                <h4>Areas to Improve</h4>

                                <ul>
                                    {feedback.improvements.map(
                                        (improvement, index) => (
                                            <li key={index}>
                                                {improvement}
                                            </li>
                                        )
                                    )}
                                </ul>

                            </div>

                        )}

                    </div>

                    <button
                        className="next-question-button"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestionIndex <
                        questions.length - 1
                            ? "Next Question"
                            : "Finish Interview"}
                    </button>

                </div>

            )}

        </div>
    );
};

export default InterviewCoach;