import "./Features.css";
import {HiChartBar,HiSparkles,HiBolt,HiMagnifyingGlass,HiLightBulb,HiChatBubbleLeftRight} from "react-icons/hi2";
import SectionTitle from "../SectionTitle/SectionTitle";

function Features() {
    const features = [
        {
            title: "ATS Analysis",
            description: "Get your resume analyzed for ATS compatibility and receive a detailed report on how to improve your chances of getting noticed by recruiters.",
            icon: <HiChartBar />
        },
        {
            title: "AI Interview Coach",
            description: "Practice your interview skills with our AI-powered interview coach, which provides personalized feedback and tips to help you ace your next interview.",
            icon: <HiSparkles />
        },
        {
            title: "Resume Feedback",
            description: "Receive personalized suggestions to improve your resume's clarity, formatting, and overall impact.",
            icon: <HiChatBubbleLeftRight />
        },
        {
            title: "Skill Gap Analysis",
            description: "Identify missing skills by comparing your resume with industry requirements and job descriptions.",
            icon: <HiBolt />
        },
        {
            title: "Keyword Optimization",
            description: "Optimize your resume with relevant keywords to improve ATS compatibility and recruiter visibility.",
            icon: <HiMagnifyingGlass />
        },
        {
            title: "AI Suggestions",
            description: "Get AI-powered recommendations to strengthen your resume and boost your interview readiness.",
            icon: <HiLightBulb />
        }
    ];

    return (
        <section id="features" className="features section">
            <div className="container features-container">
                <SectionTitle
                    badge="Features"
                    title="Powerful AI Features"
                    subtitle="Everything you need to optimize your resume, improve ATS compatibility, and prepare confidently for interviews."
                />

                <div className="features-list">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;