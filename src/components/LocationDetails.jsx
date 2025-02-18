import React, { useEffect, useState } from 'react'
import './LocationList.css'
import { useParams, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CharacterList from './characterlist'
import LocationList from './LocationList'


const LocationDetails = ({ locations, setAppCharacters }) => {
    const { id } = useParams();
    const [characters, setCharacters] = useState([]);
    
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
        <div className="location-details">
            <h1>Location Details</h1>
            <div className="location-card">
                
                <div className="location-info">
                    <h2 className="location-name">{location.name}</h2>
                    <div className="location-status">
                       
                        <span>{location.type}</span>
                    </div>
                    <p className="location-dimension">{location.dimension}</p>
                    {location.residents && (
                        <p className="location-residents">Residents: {location.residents.length}</p>
                    )}
                </div>

                
            
            </div>
            <CharacterList characters={characters} />

        </div>
    )


}

export default LocationDetails


