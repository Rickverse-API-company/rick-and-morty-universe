import React, { useEffect } from 'react'
import './CharacterDetails.css'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { FaHeartbeat, FaUserAlt, FaGlobe, FaRocket, FaTv } from 'react-icons/fa'

const CharacterDetails = ({ characters }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log('Characters in details:', characters);
        console.log('Looking for ID:', id);
        console.log('Available IDs:', characters.map(char => char.id));
    }, [characters, id]);

    const character = characters.find(char => 
        char.id.toString() === id.toString() && !char.isDeleted
    );
    
    console.log('Found character:', character);

    if (!character) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="character-details">
            <div className="portal-effect portal-effect-1"></div>
            <div className="portal-effect portal-effect-2"></div>
            
            <div className="details-container">
                
                <div className="details-content">
                    <h1 className="details-title">{character.name}</h1>
                    <p className="details-description">
                        A fascinating character from the Rick and Morty universe, {character.name} is a {character.species} who has appeared in {character.episode.length} episodes.
                    </p>
                    
                    <ul className="abilities-list">
                        <li className="ability-item">
                            <FaHeartbeat className="ability-icon" />
                            <span className="ability-text">Status: {character.status}</span>
                        </li>
                        <li className="ability-item">
                            <FaUserAlt className="ability-icon" />
                            <span className="ability-text">Species: {character.species} - {character.gender}</span>
                        </li>
                        <li className="ability-item">
                            <FaGlobe className="ability-icon" />
                            <span className="ability-text">Current Location: {character.location.name}</span>
                        </li>
                        <li className="ability-item">
                            <FaRocket className="ability-icon" />
                            <span className="ability-text">Origin: {character.origin.name}</span>
                        </li>
                        <li className="ability-item">
                            <FaTv className="ability-icon" />
                            <span className="ability-text">Featured in {character.episode.length} episodes</span>
                        </li>
                        
                    </ul>
                    <button onClick={() => navigate(-1)} className="back-button">← Back</button>
                    
                    
                </div>
                
                
                <img
                    src={character.image}
                    alt={character.name}
                    className="details-image"
                />
            </div>
        </div>
    )
}

export default CharacterDetails