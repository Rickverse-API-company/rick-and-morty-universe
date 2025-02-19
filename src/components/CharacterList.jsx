import React, { useRef } from 'react';
import './CharacterList.css'
import { useNavigate } from 'react-router-dom'
import { rickifyCharacter } from '../services/openai';

const CharacterList = ({ characters, onDelete, onUpdate }) => {
    const navigate = useNavigate()
    const carouselRef = useRef(null);

    const handleCharacterClick = (characterDetail) => {
        navigate(`/character/${characterDetail.id}`);
    };

    const handleRickify = async (e, characterDetail) => {
        e.stopPropagation();
        const button = e.target;
        const originalText = button.textContent;
        
        try {
            // Disable button and show loading state
            button.disabled = true;
            button.textContent = 'Rickifying...';
            
            // Get rickified character from OpenAI
            const rickifiedCharacter = await rickifyCharacter(characterDetail);
            
            // Update the character in the database
            if (onUpdate) {
                await onUpdate(characterDetail.id, rickifiedCharacter);
            }
            
            // Show success state briefly
            button.textContent = 'Rickified!';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Failed to rickify character:', error);
            // Show error message to user
            alert(error.message || 'Failed to rickify character. Please try again later.');
            
            // Reset button state
            button.textContent = originalText;
            button.disabled = false;
        }
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
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(characterDetail.id);
                                                }}
                                            >
                                                Delete Character
                                            </button>
                                            <button
                                                onClick={(e) => handleRickify(e, characterDetail)}
                                            >
                                                Rickify Character
                                            </button>
                                        </>
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