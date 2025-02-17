import React from 'react'


const CharacterList = ({ characters, onDelete }) => {

    return (
        <div>
            <h2>Hello Characters</h2>
            {characters.length > 0 ? (
                characters.map((characterDetail) => (
                    <div key={characterDetail.id}>
                        <h2>{characterDetail.name}</h2>
                        <h3>{characterDetail.species}</h3>
                        <img src={characterDetail.image} alt={characterDetail.name} />

                        <button onClick={() => onDelete(characterDetail.id)}>Delete Character</button> 
                    </div>
                ))
            ) : (
                <p>No characters found</p>
            )}
        </div>
    )
}

export default CharacterList
