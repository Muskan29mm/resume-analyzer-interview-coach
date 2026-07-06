import "./Hero.css";
import { HiArrowRight } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { HiChartBar, HiSparkles, HiBolt } from "react-icons/hi2";

function Hero() {
    return (
        <section id="home" className="hero section">
            <div className="container hero-container">

                <div className="hero-content">
                    <h1>Smarter Resume Analysis. Better Interview Preparation.
                        <br />
                        Ace Your Next Interview
                    </h1>

                    <p>
                        Upload your resume and receive an ATS score, detailed feedback, keyword optimization, skill gap analysis, and AI-generated interview questions—all in one place.
                    </p>


                    <div className="hero-buttons">
                        <h1>Anlayze Resume <HiArrowRight /></h1>
                        <h1>Learn More<HiPlay /></h1>
                    </div>

                    <div className="hero-highlights">
                        <span className="flex items-center gap-2">
                            <HiChartBar className="text-blue-500" /> ATS Analysis
                        </span>
                        <span className="flex items-center gap-2">
                            <HiSparkles className="text-purple-500" /> AI Interview Coach
                        </span>
                        <span className="flex items-center gap-2">
                            <HiBolt className="text-yellow-500" /> Instant Feedback
                        </span>
                    </div>

                </div>
                <div className="hero-image">
                    Illistartion Here
                </div>
            </div>
        </section>
    );
}

export default Hero;