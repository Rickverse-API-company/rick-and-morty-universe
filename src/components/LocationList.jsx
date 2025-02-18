import React from 'react'
import './LocationList.css'


const LocationList = ({ locations }) => {
    return (
        <div className="location-list">
            <h2>Locations</h2>
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>{location.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default LocationList


