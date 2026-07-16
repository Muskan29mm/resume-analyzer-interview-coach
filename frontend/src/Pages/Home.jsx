import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/How it works/HowItWorks";
import InterviewCoach from "../components/InterviewCoach/InterviewCoach";
import ResumeDashboard from "../components/ResumeDashboard/ResumeDashboard";

function Home()
 {
    return (
        <section className="home">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <InterviewCoach />
            <ResumeDashboard />
        </section>
    );
}

export default Home;