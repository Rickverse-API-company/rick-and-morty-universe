import React from 'react'
import './CharacterList.css'
import { useNavigate } from 'react-router-dom'

const CharacterList = ({ characters, onDelete }) => {
    const navigate = useNavigate()
    return (
        <div className="character-list">
            <div className="character-grid">
                {characters.length > 0 ? (
                    characters.map((characterDetail) => (
                        <div 
                            key={characterDetail.id} 
                            className="character-card"
                            onClick={(event) => {
                                if (event.target.tagName !== 'BUTTON') {
                                    navigate(`/character/${characterDetail.id}`)
                                    
                                        
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
                                {/* <button onClick={() => onDelete(characterDetail.id)}>Delete Character</button> */}
                                {characterDetail.canDelete && (
                                    <button onClick={() => onDelete(characterDetail.id)}>
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
        </div>
    )
}

export default CharacterList
