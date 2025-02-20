import React from 'react'
import './about.css'

const About = () => {
    return (
        <div className="about-container">
            <h1>Our Universe</h1>
            <div className="about-person">
                <img src="../src/assets/david-morty.jpg" alt="David" />
                <div>
                    <h2>David</h2>
                    <p>Hey Mortys! My name is David, and I’m an Argentine traveler.
                        In my free time, I enjoy going for runs, watching anime,
                        and taking leisurely walks in the park. I love discovering new adventures,
                        and at nearly 30 years old, I’m embarking on the exciting journey of web development with a clear focus on the future.
                        I had an incredible time creating this app with my partner George,
                        and I’m thrilled to share our passion for all things Rick and Morty with you!</p>
                </div>
            </div>
            <div className="about-person">
                <img src="../src/assets/george-rick.jpg" alt="George" />
                <div>
                    <h2>George</h2>
                    <p>Howdy friends, George here, 30-ish (for the past couple of years). 
                        Loves watching Rick & Morty, eating pickles and making apps with AI in his free time. 
                        My favorite place in the world is Area 51 in the Nevada desert and I enjoy visiting aliens from time to time. 
                        Throughout this process my partner David has been a source of inspiration for thoughtful params, 
                        states and cross-component functions. He is my Morty and I am his Rick.</p>
                </div>
            </div>
        </div>
    )
}

export default About

