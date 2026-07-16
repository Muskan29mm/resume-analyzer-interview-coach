import "./ResumeDashboard.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import {FiCheckCircle, FiTrendingUp, FiTarget,FiAlertCircle} from "react-icons/fi";

function ResumeDashboard() {
    return (
        <section id="resume-dashboard" className="resume-dashboard section">
            <div className="container">

                <SectionTitle
                    badge="Resume Analyzer"
                    title="See Your Resume Through an ATS Lens"
                    subtitle="Upload your resume and receive an AI-powered analysis with ATS score, skill matching, missing skills, and actionable suggestions to improve your chances of getting shortlisted."
                />

                <div className="dashboard-preview">

                    {/* ATS Score Card */}

                    <div className="dashboard-card ats-card">

                        <div className="card-header">
                            <h3>ATS Score</h3>
                            <FiTrendingUp />
                        </div>

                  <div className="score-row">
    <h2>89%</h2>
    <span className="score-badge">Excellent</span>
</div>

<div className="progress-bar">
    <div className="progress-fill"></div>
</div>

<p>Excellent ATS Compatibility</p>

                    </div>


                    {/* Resume Match */}

                    <div className="dashboard-card">

                        <div className="card-header">
                            <h3>Resume Match</h3>
                            <FiTarget />
                        </div>

                        <h2>92%</h2>

                        <h4>High Compatibility</h4>

                        <p>
                        Your resume aligns well with the target job requirements.       
                        </p>


                    </div>


                    {/* Missing Skills */}

                    <div className="dashboard-card missing-skills">

                        <div className="card-header">
                            <h3>Missing Skills</h3>
                            <FiAlertCircle />
                        </div>

                        <ul>
                            <li>Docker</li>
                            <li>Kubernetes</li>
                            <li>AWS</li>
                        </ul>

                    </div>


                    {/* AI Suggestions */}

                    <div className="dashboard-card full-width">

                        <div className="card-header">
                            <h3>AI Suggestions</h3>
                            <FiCheckCircle />
                        </div>

                        <ul>
                             <FiCheckCircle />  Quantify project achievements with numbers.<br></br>
                             <FiCheckCircle />  Add measurable business impact wherever possible.<br></br>
                             <FiCheckCircle />  Strengthen the professional summary with relevant keywords.
                        </ul>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default ResumeDashboard;