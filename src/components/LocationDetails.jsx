import React, { useEffect, useState } from 'react'
import './LocationDetails.css'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import CharacterList from './CharacterList'

const LocationDetails = ({ locations, setAppCharacters }) => {
    const { id } = useParams();
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log('Locations in details:', locations);
        console.log('Looking for ID:', id);
        console.log('Available IDs:', locations.map(location => location.id));

        const fetchCharacters = async () => {
            if (location && location.residents) {
                try {
                    const characterPromises = location.residents.map(url => 
                        fetch(url).then(res => res.json())
                    );
                    const characterData = await Promise.all(characterPromises);
                    setCharacters(characterData);
                    setAppCharacters(characterData);
                } catch (error) {
                    console.error('Error fetching characters:', error);
                }
            }
        };

        fetchCharacters();
    }, [locations, id, setAppCharacters]);

    // Ensure both IDs are strings when comparing
    const location = locations.find(location => 
        location.id.toString() === id.toString() && !location.isDeleted
    );
    
    console.log('Found location:', location);

    if (!location) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="location-details-page">
            <div className="location-details-portal location-details-portal-1"></div>
            <div className="location-details-portal location-details-portal-2"></div>
            
            <div className="location-details-container">
                <div className="location-details-card">
                    <div className="location-details-info">
                        <h1 className="location-details-title">{location.name}</h1>
                        <div className="location-details-type">
                            <span>{location.type}</span>
                        </div>
                        <p className="location-details-dimension">Dimension: {location.dimension}</p>
                        {location.residents && (
                            <p className="location-details-residents">
                                Number of Residents: {location.residents.length}
                            </p>
                        )}
                        <button 
                            onClick={() => navigate(-1)} 
                            className="location-details-back"
                        >
                            ← Back
                        </button>
                    </div>
                </div>
                <CharacterList characters={characters} />
            </div>
        </div>
    )
}

export default LocationDetails


