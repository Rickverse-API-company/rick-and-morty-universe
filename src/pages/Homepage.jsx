import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Search from '../components/Search';
import CharacterList from '../components/characterlist'
import CharacterDetails from '../components/characterdetails'
import AddCharacterForm from '../components/addcharacterform'
import HeroSection from '../components/HeroSection'
import './homepage.css'
import { API_URL } from "../config/api";



function HomePage() {

    const [CharacterToDisplay, setCharacterToDisplay] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCharacters = () => {
        axios.get(`${API_URL}/character.json`)
            .then(response => {
                const characterObj = response.data;
                const charactersArr = Object.keys(characterObj)
                    .filter(id => characterObj[id] !== null)
                    .map((id) => ({
                        id,
                        ...characterObj[id],
                        isDeleted: characterObj[id].isDeleted ?? false,
                    }));
                setCharacterToDisplay(charactersArr);
                console.log(charactersArr)
            })
            .catch((error) => {
                console.log("error Page")
            })
    };

    useEffect(() => {
        fetchCharacters();
    }, [])

    if (CharacterToDisplay === null) {
        console.log("...loading")
    }
    const filteredCharacters = CharacterToDisplay.filter((character) =>
    character &&
    character.name &&
    !character.isDeleted &&
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const onDelete = (id) => {
    //     axios.delete(`${API_URL}/character/${id}.json`)
    //         .then(response => {
    //             console.log('Character deleted successfully:', response.data)
    //             fetchCharacters();
    //         })
    //         .catch(error => {
    //             console.error('Error deleting character:', error)
    //         })
    // }
    const softDeleteCharacter = (id) => {
        const character = CharacterToDisplay.find(char => char.id === id);
        if (character && character.canDelete === false) {
            console.log("Cant be deleted");
            return;
        }
        axios.patch(`${API_URL}/character/${id}.json`, { isDeleted: true })
            .then(response => {
                console.log('Mark as deleted', response.data);
                setCharacterToDisplay(prevState =>
                    prevState.map(element =>
                    element.id === id ? { ...element, isDeleted: true } : element
                    )
                );
            })
            .catch(error => {
                console.error('Error al marcar como eliminado:', error);
            });
    };

    const createCharacter = (characterDetails) => {
        const characterIds = CharacterToDisplay.map((character) =>
            parseInt(character.id)
        );
        const maxId = characterIds.length > 0 ? Math.max(...characterIds) : 0;
        const nextId = maxId + 1;

        const newCharacter = {
            ...characterDetails,
            id: nextId.toString(),
            canDelete: true
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