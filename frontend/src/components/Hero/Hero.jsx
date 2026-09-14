import "./Hero.css";
import {
    HiArrowRight,
    HiPlay,
    HiChartBar,
    HiSparkles,
    HiBolt
} from "react-icons/hi2";

function Hero() {
    const scrollToSection = (sectionId) => {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="home" className="hero section">
            <div className="container hero-container">
                <div className="hero-content">

                    <h1>
                        Smarter Resume Analysis. Better Interview Preparation.
                    </h1>

                    <p>
                        Upload your resume and receive an ATS score, detailed
                        feedback, keyword optimization, skill gap analysis,
                        and AI-generated interview questions — all in one place.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-btn"
                            onClick={() => scrollToSection("resume-dashboard")}
                        >
                            Analyze Resume
                            <HiArrowRight />
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() => scrollToSection("howitworks")}
                        >
                            Learn More
                            <HiPlay />
                        </button>
                    </div>

                    <div className="hero-highlights">
                        <span>
                            <HiChartBar />
                            ATS Analysis
                        </span>

                        <span>
                            <HiSparkles />
                            AI Interview Coach
                        </span>

                        <span>
                            <HiBolt />
                            Instant Feedback
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
