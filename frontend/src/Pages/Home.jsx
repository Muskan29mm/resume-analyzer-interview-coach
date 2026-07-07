import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/How it works/HowItWorks";

function Home()
 {
    return (
        <section className="home">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
        </section>
    );
}

export default Home;