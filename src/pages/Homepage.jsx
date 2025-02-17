import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css'
import CharacterList from '../components/characterlist'
import CharacterDetails from '../components/characterdetails'
import AddCharacterForm from '../components/addcharacterform'
import HeroSection from '../components/HeroSection'



function HomePage() {
    return (
        <main className="HomePage">
            <div id="homepage-hero-section">
                <HeroSection />
            </div>

            <div className="character-list">
                <h2>Featured Characters</h2>
                <CharacterList />
            </div>

            <div className="search-section">
                <h2>Search for a character</h2>
                <input type="text" placeholder="Search for a character" />
                <button>Search</button>
            </div>

            <div className="character-details">
                <h2>Character Details</h2>
                <CharacterDetails />
            </div>

            <div className="add-character">
                <h2>Add a Character</h2>
                <AddCharacterForm />
            </div>
        </main>
    )
}

export default HomePage;