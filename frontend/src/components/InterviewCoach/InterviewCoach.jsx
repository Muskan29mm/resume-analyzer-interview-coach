import "./InterviewCoach.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { FiMessageSquare, FiCpu, FiBarChart2, FiTrendingUp, FiMic, FiEdit3, } from "react-icons/fi";


function InterviewCoach() {
    return (
        <section id="interviewcoach" className="interview-coach section">
            <div className="container">


                <SectionTitle
                    badge="AI Interview Coach"
                    title="Practice Smarter. Interview Better."
                    subtitle="Experience AI-powered mock interviews tailored to your resume and
            target job role. Receive instant feedback and improve your interview
            performance with every session."/>


                <div className="interview-content">

                    {/* Left Side */}

                    <div className="interview-left">

                        <div className="feature">
                            <div className="feature-icon">
                                <FiMessageSquare />
                          </div>

                            <div className="feature-content">
                                <h4>✓ Personalized interview questions</h4>
                                <p>Generate interview questions based on your resume.</p>
                            </div>
                        </div>


                        <div className="feature">
                            <div className="feature-icon">
                                <FiCpu />
                            </div>

                            <div className="feature-content">
                                <h4>✓ Instant AI feedback</h4>
                                <p>Receive immediate feedback on your interview performance.</p>
                            </div>
                        </div>

                        <div className="feature">
                            <div className="feature-icon">
                                <FiBarChart2 />
                            </div>

                            <div className="feature-content">
                                <h4>✓ Performance scoring</h4>
                                <p>Get a detailed score of your interview performance.</p>
                            </div>
                        </div>



                        <div className="feature">
                            <div className="feature-icon">
                                <FiTrendingUp />
                            </div>
                            <div className="feature-content">
                                <h4>✓ Confidence insights</h4>
                                <p>Receive detailed insights on your confidence levels during interviews.</p>
                            </div>
                        </div>

                        <button className="primary-btn">
                            Try AI Interview
                        </button>

                    </div>

                    {/* Right Side */}

                    <div className="app-preview">

                        <div className="window-header">
                            <div className="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <p>AI Interview Coach</p>
                        </div>

                        <div className="preview-body">

                            <div className="role-card">
                                <span>Role</span>
                                <strong>Data Scientist</strong>
                            </div>

                            <div className="question-card">
                                <small>Question 3 of 10</small>

                                <p>
                                    Tell me about a machine learning project you're most proud of.
                                </p>
                            </div>

                            <div className="answer-buttons">


                                <button>
                                    <FiMic />
                                    <span>Record Answer</span>
                                </button>

                                <button>
                                    <FiEdit3 />
                                    <span>Type Answer</span>
                                </button>

                            </div>

                            <div className="feedback-preview">

                                <h4>AI Feedback</h4>

                                <ul>
                                    <li>✔ Strong communication</li>
                                    <li>✔ Technical clarity</li>
                                    <li>✔ Good confidence</li>
                                </ul>

                                <div className="preview-score">
                                    <span>Overall Score</span>
                                    <strong>8.7 / 10</strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default InterviewCoach;