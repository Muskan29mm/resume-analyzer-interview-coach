import './Navbar.css';

function Navbar() {
    return (
        <header className="navbar">

            <div className="container">
                <div className="logo">
                    <a href="#home">
                        <span>Resume Analyzer</span>
                    </a>
                </div>
                {/* Updated to use semantic <a> tags */}
                <nav className="navigation">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>

                {/* Updated to use a semantic <button> tag */}
                <button className="btn btn-primary">Get Started</button>

            </div>
        </header>
    );
}

export default Navbar;