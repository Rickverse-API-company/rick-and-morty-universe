import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </div>
                <div className="footer-copyright">
                    © {currentYear} Rick and Morty Universe. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;