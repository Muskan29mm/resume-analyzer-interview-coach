import "./Navbar.css";
import { HiDocumentText } from "react-icons/hi2";


function Navbar() {
    return (
        <header className="navbar">
            <div className="container navbar-container">

                <div className="logo">
                    <a href="#home">
                        <HiDocumentText className="logo-icon" />
                        <h2>ResumeAI</h2>
                    </a>
                </div>

                <nav>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </nav>

                <button className="nav-btn">
                    Analyze Resume
                </button>

            </div>
        </header>
    );
}

export default Navbar;