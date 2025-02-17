import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Search from '../components/Search';
import CharacterList from '../components/characterlist'
import CharacterDetails from '../components/characterdetails'
import AddCharacterForm from '../components/addcharacterform'
import HeroSection from '../components/HeroSection'
import './homepage.css'



function HomePage() {

    const [CharacterToDisplay, setCharacterToDisplay] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); /* state to the filter */

    useEffect(() => {
        axios.get("https://rick-morty-universe-5598d-default-rtdb.europe-west1.firebasedatabase.app/character.json")
            .then(response => {
                const characterObj = response.data;

                const charactersArr = Object.keys(characterObj).map((id) => ({
                    id,
                    ...characterObj[id],
                }));

                setCharacterToDisplay(charactersArr);
                console.log(charactersArr)
            })
            .catch((error) => {
                console.log("error Page")
            })
    }, [])

    if (CharacterToDisplay === null) {
        console.log("...loading")
    }
    const filteredCharacters = CharacterToDisplay.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <main className="HomePage">

            <div className="search-section">
                <h2>Search for a character</h2>
                <Search setSearchTerm={setSearchTerm} />
            </div>

            <div id="homepage-hero-section">
                <HeroSection />
            </div>

            <div className="character-list">
                <h2>Featured Characters</h2>
                <CharacterList characters={filteredCharacters} />
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