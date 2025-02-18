import React, { useRef } from 'react';
import './CharacterList.css'
import { useNavigate } from 'react-router-dom'


const CharacterList = ({ characters, onDelete }) => {
    const navigate = useNavigate()
    const carouselRef = useRef(null);

    const handleCharacterClick = (characterDetail) => {
        navigate(`/character/${characterDetail.id}`);
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
        <div className="character-list">
            <div className="carousel-container">
                <button className="carousel-button left" onClick={scrollLeft}>
                    &lt;
                </button>
                <div className="character-grid" ref={carouselRef}>
                    {characters.length > 0 ? (
                        characters.map((characterDetail) => (
                            <div
                                key={characterDetail.id}
                                className="character-card"
                                onClick={(event) => {
                                    if (event.target.tagName !== 'BUTTON') {
                                        handleCharacterClick(characterDetail);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={characterDetail.image}
                                    alt={characterDetail.id}
                                    className="character-image"
                                />
                                <div className="character-info">
                                    <h2 className="character-name">{characterDetail.name}</h2>
                                    <div className="character-status">
                                        <span className={`status-indicator status-${characterDetail.status?.toLowerCase() || 'unknown'}`}></span>
                                        <span>{characterDetail.status}</span>
                                    </div>
                                    <p className="character-species">{characterDetail.species}</p>
                                    {characterDetail.location && (
                                        <p className="character-location">Location: {characterDetail.location.name}</p>
                                    )}
                                    {characterDetail.canDelete && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(characterDetail.id);
                                            }}
                                        >
                                            Delete Character
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No characters found</p>
                    )}
                </div>
                <button className="carousel-button right" onClick={scrollRight}>
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default CharacterList;