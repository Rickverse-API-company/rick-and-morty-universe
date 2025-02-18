import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import pickle from '../assets/pickle.png';

function NavBar() {
    const [isRaining, setIsRaining] = useState(false);
    const pickleContainerRef = useRef(null);

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
                // Clean up any remaining pickles when rain stops
                if (pickleContainerRef.current) {
                    pickleContainerRef.current.innerHTML = '';
                }
            };
        }
    }, [isRaining]);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="site-title">Rick and Morty Universe</Link>
                <div className="nav-links">
                    <Link to="/about" className="nav-link">About</Link>
                    <button onClick={startPickleRain} className="nav-link pickle-btn">Pickles</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;