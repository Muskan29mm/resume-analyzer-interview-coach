import "./HowItWorks.css";
import {HiSparkles,HiLightBulb,HiChatBubbleLeftRight,HiDocumentText} from "react-icons/hi2";
import SectionTitle from "../SectionTitle/SectionTitle";


function HowItWorks() 
{
    //return (
        // <div className="how-it-works">
        //     <h2>How It Works</h2>
        //     <p>Our platform simplifies the process of connecting with professionals in your field. Here's how it works:</p>
        // </div>
    const steps = [
        {
            title: "Step 1: Upload Your Resume",
            description: "Upload your resume to our platform for analysis and feedback.",
            icon: <HiDocumentText />
        },
        {   
            title: "Step 2: AI Analysis",
            description: "Our AI algorithms analyze your resume for ATS compatibility and provide personalized suggestions.",
            icon: <HiSparkles />
        },
        {   
            title: "Step 3: Insights and Recommendations",  
            description: "Receive detailed insights and recommendations to improve your resume and increase your chances of landing interviews.",
            icon: <HiLightBulb />
        },
        {
            title: "Step 4: Practice Interviews",
            description: "Use our AI-powered interview coach to practice and refine your interview skills.",
            icon: <HiChatBubbleLeftRight />
        }
    ];

    return (
        <section id="howitworks" className="howitworks section">
            <div className="container howitworks-container">
                <SectionTitle
                    badge="How It Works"
                    title="Simple 4-Step Process"
                    subtitle="Upload your resume, receive AI-powered insights, and prepare for interviews in four simple steps."/>

                <div className="howitworks-list">
                    {steps.map((step, index) => (
                        <div key={index} className="howitworks-item">
                            <div className="howitworks-icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
    );
    
}

export default HowItWorks;