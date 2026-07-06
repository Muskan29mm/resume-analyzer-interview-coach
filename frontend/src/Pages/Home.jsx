import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";

function Home()
 {
    return (
        <section className="home">
            <Navbar />
            <Hero />
            <Features />
        </section>
    );
}

export default Home;