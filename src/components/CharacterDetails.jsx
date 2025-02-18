import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';
import './CharacterList.css';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios
            .get(`${API_URL}/character/${id}.json`)
            .then(response => {
                const data = response.data;
                if (data) {

                    setCharacter({ id, ...data });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching character:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!character) {
        console.log("this character doesnt exist")
        return <Navigate to="/" replace />;
    }

    return (
        <div className="character-details">
            <h1>Character Details</h1>
            <div className="character-card">
                <img
                    src={character.image || 'https://via.placeholder.com/150'}
                    alt={character.name}
                    className="character-image"
                />
                <div className="character-info">
                    <h2 className="character-name">{character.name}</h2>
                    <div className="character-status">
                        <span
                            className={`status-indicator status-${character.status?.toLowerCase() || 'unknown'}`}
                        ></span>
                        <span>{character.status}</span>
                    </div>
                    <p className="character-species">{character.species}</p>
                    {character.location && (
                        <p className="character-location">Location: {character.location.name}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
