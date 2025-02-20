import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import pickle from '../assets/pickle.png';
import { useAuth } from './AuthContext';

function NavBar() {
    const [isRaining, setIsRaining] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pickleContainerRef = useRef(null);
    const { currentUser, logout } = useAuth();

    useEffect(() => {
        // Create pickle container on mount
        const container = document.createElement('div');
        container.className = 'pickle-container';
        document.body.appendChild(container);
        pickleContainerRef.current = container;

        // Cleanup on unmount
        return () => {
            document.body.removeChild(container);
        };
    }, []);

    const startPickleRain = () => {
        setIsRaining(true);
        setTimeout(() => {
            setIsRaining(false);
            // Clean up any remaining pickles
            if (pickleContainerRef.current) {
                pickleContainerRef.current.innerHTML = '';
            }
        }, 10000);
    };

    useEffect(() => {
        if (isRaining && pickleContainerRef.current) {
            const createPickle = () => {
                const pickleElement = document.createElement('img');
                pickleElement.src = pickle;
                pickleElement.className = 'falling-pickle';
                pickleElement.style.left = `${Math.random() * 100}vw`;
                pickleContainerRef.current.appendChild(pickleElement);

                pickleElement.addEventListener('animationend', () => {
                    if (pickleContainerRef.current && pickleContainerRef.current.contains(pickleElement)) {
                        pickleContainerRef.current.removeChild(pickleElement);
                    }
                });
            };

            const rainInterval = setInterval(createPickle, 200);
            return () => {
                clearInterval(rainInterval);
                if (pickleContainerRef.current) {
                    pickleContainerRef.current.innerHTML = '';
                }
            };
        }
    }, [isRaining]);

    // Handle user logout
    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">

                <Link to="/" className="site-title" onClick={handleLinkClick}>Rick and Morty Universe</Link>
                <button className="hamburger" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/About" className="nav-link">About</Link>
                    <button onClick={() => { startPickleRain(); handleLinkClick(); }} className="nav-link pickle-btn">Pickles</button>
                    
                    {currentUser ? (
                        <div className="nav-user">
                            <span className="nav-user-name"><h4>{currentUser.displayName || currentUser.email}</h4></span>
                            <button onClick={() => { handleLogout(); handleLinkClick(); }} className="nav-link">Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={handleLinkClick}>Login</Link>
                            <Link to="/register" className="nav-link" onClick={handleLinkClick}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
