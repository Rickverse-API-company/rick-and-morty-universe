import React, { useRef } from 'react';
import './LocationList.css'
import { useNavigate } from 'react-router-dom'

const LocationList = ({ locations, onDelete }) => {
    const navigate = useNavigate()
    const carouselRef = useRef(null);

    const handleLocationClick = (locationDetail) => {
        console.log('Clicked location:', locationDetail);
        navigate(`/location/${locationDetail.id}`);
    };
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };
    return (
        <div className="location-list">
            <div className="carousel-container">
                <button className="carousel-button left" onClick={scrollLeft}>
                    &lt;
                </button>
                <div className="location-grid" ref={carouselRef}>
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
                                    {locationDetail.dimension && (
                                        <p className="location-dimension">Dimension: {locationDetail.dimension}</p>
                                    )}
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
                <button className="carousel-button right" onClick={scrollRight}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default LocationList;