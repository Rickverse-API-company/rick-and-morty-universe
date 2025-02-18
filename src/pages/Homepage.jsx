import { useState, useEffect } from 'react'
import axios from 'axios';
import Search from '../components/Search';
import CharacterList from '../components/characterlist'
import AddCharacterForm from '../components/addcharacterform'
import HeroSection from '../components/HeroSection'
import './homepage.css'
import { API_URL } from "../config/api";

function HomePage({ characters, setCharacters }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCharacters = () => {
        setLoading(true);
        axios.get(`${API_URL}/character.json`)
            .then(response => {
                const characterObj = response.data;
                if (!characterObj) {
                    console.log('No character data received');
                    setCharacters([]);
                    return;
                }
                
                const charactersArr = Object.entries(characterObj)
                    .filter(([_, char]) => char !== null)
                    .map(([id, char]) => ({
                        ...char,
                        id: id.toString(),
                        isDeleted: char.isDeleted ?? false,
                    }));
                
                console.log('Fetched characters:', charactersArr);
                setCharacters(charactersArr);
            })
            .catch((error) => {
                console.error("Error fetching characters:", error);
                setCharacters([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (characters.length === 0) {
            fetchCharacters();
        } else {
            setLoading(false);
        }
    }, [characters.length]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredCharacters = characters.filter((character) =>
        character &&
        character.name &&
        !character.isDeleted &&
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const softDeleteCharacter = (id) => {
        const character = characters.find(char => char.id === id);
        if (character && character.canDelete === false) {
            console.log("Can't be deleted");
            return;
        }
        axios.patch(`${API_URL}/character/${id}.json`, { isDeleted: true })
            .then(response => {
                console.log('Marked as deleted', response.data);
                setCharacters(prevState =>
                    prevState.map(element =>
                        element.id === id ? { ...element, isDeleted: true } : element
                    )
                );
            })
            .catch(error => {
                console.error('Error marking as deleted:', error);
            });
    };

    const createCharacter = (characterDetails) => {
        const placeholderImage = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
        const finalImage = characterDetails.image.trim() !== '' ? characterDetails.image : placeholderImage;

        const characterIds = characters.map((character) =>
            parseInt(character.id)
        );
        const maxId = characterIds.length > 0 ? Math.max(...characterIds) : 0;
        const nextId = maxId + 1;

        const newCharacter = {
            ...characterDetails,
            id: nextId.toString(),
            canDelete: true,
            image: finalImage
        };

        return axios.post(`${API_URL}/character.json`, newCharacter)
            .then(response => {
                console.log('Character added successfully:', response.data);
                fetchCharacters();
                return response.data;
            })
            .catch(error => {
                console.error('Error adding character:', error);
                throw error;
            });
    };

    return (
        <main className="HomePage">
            <div id="homepage-hero-section">
                <HeroSection />
            </div>

            <div className="search-section">
                <Search setSearchTerm={setSearchTerm} />
            </div>

            <div className="character-list">
                <h2>Featured Characters</h2>
                <CharacterList characters={filteredCharacters} onDelete={softDeleteCharacter} />
            </div>

            <div className="add-character">
                <AddCharacterForm onCharacterAdded={createCharacter} />
            </div>
        </main>
    )
}

export default HomePage;