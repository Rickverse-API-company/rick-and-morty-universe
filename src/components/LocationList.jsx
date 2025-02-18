import React from 'react'
import './LocationList.css'


const LocationList = ({ locations }) => {
    return (
        <div className="location-list">
            <h2>Locations</h2>
    
            <ul>
                {locations.map((location) => (
                    <div key={location.id}>
                    <li key={location.id}>{location.name}</li>
                    <p>{location.name}</p>
                    <p>{location.type}</p>
                    <p>{location.dimension}</p>
                    </div>
                ))}
            </ul>
        
        </div>
    )
}

export default LocationList


