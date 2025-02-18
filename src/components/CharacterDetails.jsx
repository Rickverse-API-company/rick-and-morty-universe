import React, { useEffect } from 'react'
import './CharacterList.css'
import { useParams, Navigate } from 'react-router-dom'

const CharacterDetails = ({ characters }) => {
    const { id } = useParams();
    
    useEffect(() => {
        console.log('Characters in details:', characters);
        console.log('Looking for ID:', id);
        console.log('Available IDs:', characters.map(char => char.id));
    }, [characters, id]);

    // Ensure both IDs are strings when comparing
    const character = characters.find(char => 
        char.id.toString() === id.toString() && !char.isDeleted
    );
    
    console.log('Found character:', character);

    if (!character) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="character-details">
            <h1>Character Details</h1>
            <div className="character-card">
                <img
                    src={character.image}
                    alt={character.name}
                    className="character-image"
                />
                <div className="character-info">
                    <h2 className="character-name">{character.name}</h2>
                    <div className="character-status">
                        <span className={`status-indicator status-${character.status?.toLowerCase() || 'unknown'}`}></span>
                        <span>{character.status}</span>
                    </div>
                    <p className="character-species">{character.species}</p>
                    {character.location && (
                        <p className="character-location">Location: {character.location.name}</p>
                    )}
                    <p className="character-gender">{character.gender}</p>
                    <p className="character-origin">Origin: {character.origin.name}</p>
                    <p className="episode-count">Episodes: {character.episode.length}</p>
                </div>

                
            
            </div>
        </div>
    )
}

export default CharacterDetails


