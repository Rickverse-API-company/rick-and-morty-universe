import React from 'react'
import './LocationList.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CharacterList from './characterlist'
const LocationList = ({ locations, onDelete }) => {
    const navigate = useNavigate()
    
    const handleLocationClick = (locationDetail) => {
        console.log('Clicked location:', locationDetail);
        navigate(`/location/${locationDetail.id}`);
    };

    return (
        <div className="location-list">
            <div className="location-grid">
                    {locations.length > 0 ? (
                    locations.map((locationDetail) => (
                        <div 
                            key={locationDetail.id} 
                            className="location-card"
                            onClick={(event) => {
                                if (event.target.tagName !== 'BUTTON') {
                                    handleLocationClick(locationDetail);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            
                            <div className="location-info">
                                <h2 className="location-name">{locationDetail.name}</h2>
                                <div className="location-status">
                                    
                                    
                                </div>
                                <p className="location-type">{locationDetail.type}</p>
                                {locationDetail.location && (
                                    <p className="location-dimension">Dimension: {locationDetail.dimension}</p>
                                )}
                                {/* <button onClick={() => onDelete(locationDetail.id)}>Delete Location</button> */}
                                {locationDetail.canDelete && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(locationDetail.id);
                                        }}
                                    >
                                        Delete Location
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No locations found</p>
                )}
            </div>
        </div>
    )
}

export default LocationList
